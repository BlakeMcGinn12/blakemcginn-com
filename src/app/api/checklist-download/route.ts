import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("[Checklist Download] New submission:", {
      email,
      name: name || "Not provided",
      timestamp: new Date().toISOString(),
      source: "AI Readiness Checklist",
    });

    // TODO: Integrate with email service (Airtable, Mailchimp, ConvertKit, etc.)
    // Example integrations:

    // AIRTABLE INTEGRATION (uncomment and configure):
    /*
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Leads";
    
    if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
      await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: email,
            Name: name || "",
            Source: "AI Readiness Checklist",
            "Download Date": new Date().toISOString(),
            Tags: ["Lead Magnet", "AI Checklist"],
          },
        }),
      });
    }
    */

    // MAILCHIMP INTEGRATION (uncomment and configure):
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
    
    if (MAILCHIMP_API_KEY && MAILCHIMP_AUDIENCE_ID && MAILCHIMP_SERVER_PREFIX) {
      await fetch(`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${MAILCHIMP_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          tags: ["AI Checklist Download"],
          merge_fields: {
            FNAME: name?.split(" ")[0] || "",
            LNAME: name?.split(" ").slice(1).join(" ") || "",
          },
        }),
      });
    }
    */

    // SEND EMAIL WITH PDF (uncomment and configure):
    /*
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Blake McGinn <hello@blakemcginn.com>",
          to: email,
          subject: "Your AI Readiness Checklist",
          html: `
            <h1>Thanks for downloading the AI Readiness Checklist!</h1>
            <p>Hi there,</p>
            <p>Here's your copy of the AI Readiness Checklist. Use it to assess where your business stands and identify the best opportunities for AI implementation.</p>
            <p><a href="https://blakemcginn.com/downloads/ai-readiness-checklist.pdf" style="display:inline-block;padding:12px 24px;background:linear-gradient(to right,#00d4ff,#7b2cbf);color:white;text-decoration:none;border-radius:8px;font-weight:bold;">Download Checklist</a></p>
            <p>Want to discuss your results? <a href="https://calendly.com/blakemcginn/consultation">Book a free strategy call</a>.</p>
            <p>Best,<br>Blake McGinn</p>
          `,
        }),
      });
    }
    */

    return NextResponse.json({
      success: true,
      message: "Checklist download recorded",
      email,
    });
  } catch (error) {
    console.error("[Checklist Download] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint to track downloads or serve the PDF directly
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (email) {
    console.log("[Checklist Download] PDF accessed by:", email);
  }

  // Could redirect to actual PDF file or return download stats
  return NextResponse.json({
    message: "Checklist API endpoint",
    pdfUrl: "/downloads/ai-readiness-checklist.pdf", // Update with actual path
  });
}
