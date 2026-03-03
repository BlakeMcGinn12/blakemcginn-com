const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const OpenAI = require("openai");

const REGION = process.env.AWS_REGION || "us-east-1";

const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Sources used by ai-research-agent when writing to ai_findings
const SOURCES = [
  "openai",
  "anthropic",
  "google",
  "techcrunch",
  "verge",
  "simonwillison",
  "ainews",
  "hackernews",
  "github"
];

exports.handler = async () => {
  console.log("Starting daily AI research report at", new Date().toISOString());

  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    console.log("Looking for findings since", since);

    const findings = await fetchRecentFindings(since);
    console.log(`Collected ${findings.length} findings from ai_findings`);

    const summary = await summarizeFindingsWithOpenAI(findings, since);
    console.log("OpenAI summary generated.");

    await sendEmailReport(summary);
    console.log("Daily report email sent.");

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, findings: findings.length })
    };
  } catch (error) {
    console.error("Daily report failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};

async function fetchRecentFindings(sinceIso) {
  const allFindings = [];

  for (const source of SOURCES) {
    try {
      const { Items } = await docClient.send(
        new QueryCommand({
          TableName: "ai_findings",
          KeyConditionExpression: "#src = :src AND created_at > :since",
          ExpressionAttributeNames: {
            "#src": "source"
          },
          ExpressionAttributeValues: {
            ":src": source,
            ":since": sinceIso
          },
          ScanIndexForward: false,
          Limit: 20
        })
      );

      if (Items && Items.length > 0) {
        allFindings.push(...Items);
      }
    } catch (err) {
      console.error(`Failed to query findings for ${source}:`, err.message || err);
    }
  }

  // Sort by risk_impact desc, then most recent
  return allFindings
    .sort((a, b) => (b.risk_impact || 0) - (a.risk_impact || 0))
    .slice(0, 40);
}

async function summarizeFindingsWithOpenAI(findings, sinceIso) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment");
  }

  if (!findings || findings.length === 0) {
    return {
      subject: "Daily AI Research Report: No new high-impact findings",
      summary_markdown:
        `No qualifying AI findings were recorded in DynamoDB (ai_findings) since ${sinceIso}.` +
        "\n\nThe ai-research-agent may have run without major items, or only low-impact entries were stored.",
      highlights: [],
      top_risks: []
    };
  }

  const bulletLines = findings.map((f) => {
    const impact = typeof f.risk_impact === "number" ? f.risk_impact : f.risk_impact || 0;
    const source = f.source || "unknown";
    const title = f.title || "Untitled finding";
    const summary = f.summary || f.content || "";
    return `- [${source}] (impact ${impact}/10) ${title}\n  ${summary}`;
  });

  const findingsText = bulletLines.join("\n\n");

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are an analyst summarizing daily AI automation risk news for an expert audience. " +
          "You MUST respond as a single valid JSON object only (no extra text). The JSON must follow this schema exactly: " +
          "{" +
          '"subject": string, "summary_markdown": string, "highlights": string[], "top_risks": string[]' +
          "}. Make sure your JSON is parseable."
      },
      {
        role: "user",
        content:
          `Summarize the following AI findings (stored in DynamoDB table ai_findings) into a concise daily report.\n\n` +
          `Time window start (ISO): ${sinceIso}\n` +
          `Number of findings: ${findings.length}\n\n` +
          `Findings:\n${findingsText}`
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.4,
    max_tokens: 1200
  });

  let parsed;
  try {
    parsed = JSON.parse(response.choices[0].message.content || "{}");
  } catch (err) {
    console.error("Failed to parse OpenAI JSON response:", err);
    parsed = {};
  }

  return {
    subject: parsed.subject || "Daily AI Research Report",
    summary_markdown:
      parsed.summary_markdown ||
      "Daily AI research summary was generated, but no detailed markdown was provided.",
    highlights: Array.isArray(parsed.highlights) ? parsed.highlights : [],
    top_risks: Array.isArray(parsed.top_risks) ? parsed.top_risks : []
  };
}

async function sendEmailReport(summary) {
  const serverToken = process.env.POSTMARK_SERVER_TOKEN;
  const toEmail = process.env.REPORT_TO_EMAIL;
  const fromEmail = process.env.REPORT_FROM_EMAIL || toEmail;

  if (!serverToken) {
    throw new Error("POSTMARK_SERVER_TOKEN is not set in environment");
  }
  if (!toEmail) {
    throw new Error("REPORT_TO_EMAIL is not set in environment");
  }
  if (!fromEmail) {
    throw new Error("REPORT_FROM_EMAIL (or REPORT_TO_EMAIL) is not set in environment");
  }

  const textBody = buildTextBody(summary);
  const htmlBody = buildHtmlBody(summary);

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": serverToken
    },
    body: JSON.stringify({
      From: fromEmail,
      To: toEmail,
      Subject: summary.subject,
      TextBody: textBody,
      HtmlBody: htmlBody,
      MessageStream: "outbound"
    })
  });

  if (!res.ok) {
    const bodyText = await res.text();
    throw new Error(`Postmark email failed with status ${res.status}: ${bodyText}`);
  }
}

function buildTextBody(summary) {
  const lines = [];
  lines.push(summary.summary_markdown);

  if (summary.highlights && summary.highlights.length > 0) {
    lines.push("\nKey highlights:");
    summary.highlights.forEach((h) => lines.push(`- ${h}`));
  }

  if (summary.top_risks && summary.top_risks.length > 0) {
    lines.push("\nTop risks:");
    summary.top_risks.forEach((r) => lines.push(`- ${r}`));
  }

  return lines.join("\n");
}

function buildHtmlBody(summary) {
  const esc = (s) =>
    String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const md = esc(summary.summary_markdown).replace(/\n/g, "<br/>");

  const highlights = Array.isArray(summary.highlights)
    ? summary.highlights.map((h) => `<li>${esc(h)}</li>`).join("")
    : "";

  const risks = Array.isArray(summary.top_risks)
    ? summary.top_risks.map((r) => `<li>${esc(r)}</li>`).join("")
    : "";

  return `<!DOCTYPE html>
<html>
  <body style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 700px; margin: 0 auto; padding: 24px; background: #0b1120; color: #e5e7eb;">
    <h1 style="font-size: 20px; margin-bottom: 16px; color: #facc15;">${esc(
      summary.subject
    )}</h1>
    <div style="background: #020617; border-radius: 8px; padding: 16px; border: 1px solid #1e293b;">
      <div style="font-size: 14px; line-height: 1.6;">${md}</div>
    </div>
    ${
      highlights
        ? `<h2 style="margin-top: 24px; font-size: 16px; color: #e5e7eb;">Key highlights</h2><ul>${highlights}</ul>`
        : ""
    }
    ${
      risks
        ? `<h2 style="margin-top: 24px; font-size: 16px; color: #e5e7eb;">Top risks</h2><ul>${risks}</ul>`
        : ""
    }
    <p style="margin-top: 32px; font-size: 12px; color: #64748b;">
      This report was generated automatically from the ai_findings DynamoDB table populated by the ai-research-agent Lambda.
    </p>
  </body>
</html>`;
}
