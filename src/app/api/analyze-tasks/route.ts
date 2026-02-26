import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy initialization - only create client when needed
let openai: OpenAI | null = null;

function getOpenAI() {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY environment variable is not set");
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

interface Task {
  id: string;
  description: string;
  hoursPerWeek: number;
}

interface AnalyzedTask extends Task {
  automationPotential: number;
  canBeAutomated: boolean;
  reasoning: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tasks } = body;

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { error: "Tasks array is required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert AI automation consultant. Your job is to score tasks on their PRACTICAL automation potential using current AI tools and APIs.

IMPORTANT: Score conservatively. When in doubt, score LOWER. Theoretical possibility does NOT equal practical automation.

## SCORING RUBRIC (0-10 scale)

Base your score on these criteria:

- 9-10: Excellent automation candidate
  - Uses standard integrations (Gmail, Outlook, Slack, Google Calendar, common CRMs like Salesforce/HubSpot)
  - Simple, rule-based logic with clear inputs/outputs
  - No complex decision-making required
  - Data is structured and accessible

- 7-8: Good automation candidate
  - Well-documented APIs with predictable data formats
  - Simple data transformations
  - Minimal edge cases

- 5-6: Moderate automation candidate
  - Requires multiple API integrations OR
  - Some complexity in logic OR
  - Uses less common but documented APIs

- 3-4: Poor automation candidate
  - Obscure or rare APIs with limited documentation
  - Complex multi-step logic requiring state management
  - Requires some human judgment or context

- 0-2: Not suitable for automation
  - Requires physical action in the real world
  - Requires nuanced human judgment (legal, ethical, creative decisions)
  - APIs don't exist or data is inaccessible

## SCORING ADJUSTMENTS

Apply these adjustments to your base score:

PENALTIES (subtract points):
- Task requires 2+ API integrations: -2 points
- APIs are obscure/non-standard: -2 points
- Requires complex decision-making or judgment: -3 points
- Data is unstructured or scattered across sources: -1 point

BONUSES (add points):
- Uses Gmail/Outlook/Slack/Calendar/major CRMs: +1 point
- Highly repetitive with clear, explicit rules: +1 point
- Data is structured and easily accessible: +1 point

Final score must be 0-10. Round to nearest whole number.

## SCORING EXAMPLES

- "Monitor Gmail inbox and flag emails from VIP clients" → 9/10
  (Standard Gmail API, clear rules, no judgment needed, +1 bonus for Gmail)

- "Post weekly updates to company Twitter and LinkedIn accounts" → 9/10
  (Standard APIs, simple action, repetitive, +1 bonus for standard platforms)

- "Extract data from 3 obscure government databases and cross-reference for compliance" → 3/10
  (Obscure sources requiring 2+ integrations, -2 penalty for multiple APIs, -2 for obscure APIs)

- "Review legal contracts for compliance and risk assessment" → 2/10
  (Requires expert legal judgment, -3 penalty for complex decision-making)

- "Summarize daily Slack messages and email digest to team leads" → 9/10
  (Standard Slack/email APIs, clear inputs/outputs, structured data, +1 bonus)

- "Schedule meetings by negotiating availability across 5 executives' calendars" → 5/10
  (Uses standard calendar APIs but requires judgment about priorities and preferences)

## OUTPUT REQUIREMENTS

For each task, provide:
1. automationPotential: number (0-10, calculated using rubric above)
2. canBeAutomated: boolean (true if score >= 6, false otherwise)
3. reasoning: 1-2 sentences explaining the score, citing specific factors from the rubric

Tasks to analyze:
${tasks.map((t: Task, i: number) => `${i + 1}. "${t.description}" (${t.hoursPerWeek} hours/week)`).join('\n')}

Return ONLY valid JSON in this exact format:
{
  "tasks": [
    {
      "id": "string (same as input)",
      "description": "string (same as input)",
      "hoursPerWeek": number (same as input),
      "automationPotential": number (0-10),
      "canBeAutomated": boolean,
      "reasoning": "explanation of automation potential"
    }
  ]
}

Remember: Be conservative. If a task seems borderline, score it lower. Focus on what can be RELIABLY automated TODAY, not what might be possible in the future. Return only the JSON, no markdown or explanation.`;

    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert AI automation consultant. Be honest about what AI can and cannot do well. Focus on practical automation potential.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content from OpenAI");
    }

    // Parse the JSON response
    const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim();
    const analysis = JSON.parse(cleanedContent);

    // Build chart data
    const chartData = analysis.tasks.map((task: AnalyzedTask) => ({
      x: task.automationPotential,
      y: task.hoursPerWeek,
      name: task.description.length > 30 
        ? task.description.substring(0, 30) + "..." 
        : task.description,
      fullName: task.description,
      reasoning: task.reasoning,
      canBeAutomated: task.canBeAutomated,
    }));

    return NextResponse.json({
      tasks: analysis.tasks,
      chartData,
    });
  } catch (error) {
    console.error("Task analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze tasks" },
      { status: 500 }
    );
  }
}
