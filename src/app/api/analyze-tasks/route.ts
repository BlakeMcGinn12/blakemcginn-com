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

    const prompt = `You are an expert AI automation consultant specializing in CLI-based AI agents like OpenClaw, Claude Code, and Perplexity Computer. Your job is to score tasks on their PRACTICAL automation potential using these modern AI tools.

IMPORTANT CONTEXT - What These CLI Agents Can Do:
- OpenClaw: Multi-agent orchestration, skill execution, tool integrations, background task management
- Claude Code: Direct codebase manipulation, file operations, terminal commands, API integrations
- Perplexity Computer: Live web research, data gathering, competitive analysis, fact-checking

Together, these tools can:
✓ Monitor and respond to emails, Slack, calendars in real-time
✓ Read/write files, update CRMs, generate reports automatically
✓ Research any topic live on the web and compile findings
✓ Execute terminal commands and scripts
✓ Coordinate multiple agents working in parallel
✓ Handle complex multi-step workflows with memory
✓ Integrate with 500+ tools via APIs

## SCORING RUBRIC (0-100 scale)

Base your score on these criteria:

- 90-100: Excellent automation candidate
  - Uses standard integrations (Gmail, Outlook, Slack, Google Calendar, common CRMs)
  - Clear inputs/outputs with explicit rules
  - No complex human judgment required
  - CLI agents can handle end-to-end
  - Examples: Email triage, Slack responses, calendar scheduling, data entry, report generation

- 70-89: Good automation candidate
  - Well-documented APIs with predictable data
  - Some context awareness needed but rules-based
  - May require occasional human review
  - Examples: Content drafting, research summaries, lead qualification, meeting notes

- 50-69: Moderate automation candidate
  - Multiple steps or less common APIs
  - Requires some interpretation or judgment
  - Human-in-the-loop recommended
  - Examples: Complex research synthesis, multi-stakeholder scheduling, compliance checking

- 30-49: Poor automation candidate
  - Obscure APIs or significant judgment required
  - High variability in inputs/outputs
  - Requires significant human oversight
  - Examples: Legal contract review, creative direction, strategic decisions

- 0-29: Not suitable for automation
  - Physical world interaction required
  - Deep expertise or ethics/legal judgment needed
  - No APIs available or completely unstructured
  - Examples: In-person meetings, hiring decisions, physical inventory

## SCORING ADJUSTMENTS

Apply these adjustments:

PENALTIES (subtract from base score):
- Task requires 2+ API integrations: -15 points
- APIs are obscure/non-standard (no CLI tool support): -20 points
- Requires complex human judgment/context: -25 points
- Data is unstructured/scattered: -10 points
- Requires real-time negotiation or persuasion: -20 points

BONUSES (add to base score):
- Uses standard email/Slack/Calendar/CRM: +10 points
- Repetitive with explicit rules: +10 points
- Structured data available: +10 points
- Can be done entirely via CLI/commands: +15 points

Final score must be 0-100. Be realistic about current capabilities.

## SCORING EXAMPLES

- "Monitor Gmail and flag urgent emails from VIP clients" → 95/100
  (OpenClaw + Claude Code handle this natively, clear rules, Gmail API is standard)

- "Research competitors weekly and summarize findings" → 85/100
  (Perplexity Computer excels at live web research, Claude Code can compile reports)

- "Post daily updates to Twitter and LinkedIn" → 90/100
  (Standard APIs, rule-based, can schedule and automate entirely)

- "Extract data from 3 obscure government databases and cross-reference" → 35/100
  (Obscure sources, -30 penalty for obscure APIs and multiple integrations, may need manual verification)

- "Review legal contracts for compliance" → 25/100
  (Requires legal expertise, -25 penalty for judgment, high stakes for errors)

- "Schedule meetings across 5 executives' calendars considering preferences" → 65/100
  (Standard calendar APIs but requires preference interpretation, human-in-the-loop recommended)

- "Generate weekly sales reports from CRM data" → 92/100
  (Claude Code can query APIs, process data, generate files automatically)

## OUTPUT REQUIREMENTS

For each task, provide:
1. automationPotential: number (0-100, calculated using rubric above)
2. canBeAutomated: boolean (true if score >= 60, false otherwise)
3. reasoning: 1-2 sentences explaining the score, citing specific CLI agent capabilities or limitations

Tasks to analyze:
${tasks.map((t: Task, i: number) => `${i + 1}. "${t.description}" (${t.hoursPerWeek} hours/week)`).join('\n')}

Return ONLY valid JSON in this exact format:
{
  "tasks": [
    {
      "id": "string (same as input)",
      "description": "string (same as input)",
      "hoursPerWeek": number (same as input),
      "automationPotential": number (0-100),
      "canBeAutomated": boolean,
      "reasoning": "explanation referencing CLI agent capabilities"
    }
  ]
}

Remember: Be conservative. Score based on what OpenClaw + Claude Code + Perplexity can do TODAY, not theoretical future capabilities. Return only the JSON, no markdown or explanation.`;

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

    // Build chart data - automationPotential is already 0-100 from the API
    const maxHours = Math.max(...analysis.tasks.map((t: AnalyzedTask) => t.hoursPerWeek));
    const chartData = analysis.tasks.map((task: AnalyzedTask) => ({
      x: task.automationPotential, // 0-100 scale
      y: task.hoursPerWeek,
      maxHours: maxHours, // Pass max hours for quadrant calculations
      name: task.description.length > 25
        ? task.description.substring(0, 25) + "..."
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
