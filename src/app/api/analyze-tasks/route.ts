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

    const prompt = `You are an expert AI automation consultant. Analyze the following business tasks and rate each on:

1. AUTOMATION POTENTIAL (0-10 scale) - Consider:
   - Technical feasibility (can current AI tools do this?)
   - Data availability (is the necessary data accessible via APIs?)
   - Complexity (simple rule-based vs complex decision-making)
   - Reliability (will AI handle this consistently well?)
   - 8-10: Highly automatable with current tools
   - 5-7: Moderately automatable, some complexity
   - 0-4: Difficult to automate or better done by humans

2. CAN_BE_AUTOMATED (boolean) - Should this be automated?

For each task, provide a brief reasoning (1-2 sentences) explaining WHY it has that automation potential.

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

Be realistic. Some tasks are better left to humans. Focus on whether AI can do it WELL, not just whether it's technically possible. Return only the JSON, no markdown or explanation.`;

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
