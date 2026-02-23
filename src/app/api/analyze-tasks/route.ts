import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { tasks } = await request.json();

    if (!tasks || typeof tasks !== "string") {
      return NextResponse.json(
        { error: "Tasks input is required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert AI automation consultant. Analyze the following business tasks and rate each on:
1. TIME_COST (hours per week)
2. BUILD_EASE (1-10 scale: 1-3 easy, 4-6 medium, 7-10 hard)
3. REPETITION_FREQUENCY (daily=5, multiple/week=4, weekly=3, monthly=2, quarterly=1)
4. API_COST (low/medium/high)

Then calculate:
- Monthly time value = hours/week × 4.3 weeks × $50/hr
- Implementation cost = based on build ease ($300-800 easy, $800-1500 medium, $1500-3000 hard)
- Monthly API cost = runs/month × cost per run
- Monthly savings = Time value - API cost
- ROI % = (Monthly savings × 12 - Implementation cost) / Implementation cost × 100

Assign quadrant:
- QUICK_WIN: High time (4+ hrs/week), Easy build (1-5), High repetition
- STRATEGIC: High time (4+ hrs/week), Hard build (6-10), High repetition  
- FILLER: Low time (<4 hrs/week), Easy build (1-5)
- SKIP: Low time (<4 hrs/week), Hard build (6-10)

Recommend package:
- Starter ($300): Easy builds, single workflows
- Growth ($1,000): Medium builds, multiple integrations
- Scale ($5,000): Hard builds, custom development

Tasks to analyze:
${tasks}

Return ONLY valid JSON in this exact format:
{
  "tasks": [
    {
      "task_name": "string",
      "time_cost_hours_per_week": number,
      "build_ease": number,
      "repetition": "string",
      "repetition_score": number,
      "api_cost_per_run": "low" | "medium" | "high",
      "quadrant": "QUICK_WIN" | "STRATEGIC" | "FILLER" | "SKIP",
      "implementation_cost_estimate": number,
      "monthly_time_value": number,
      "monthly_api_cost": number,
      "monthly_savings": number,
      "roi_percent": number,
      "recommended_package": "Starter" | "Growth" | "Scale",
      "why": "explanation"
    }
  ],
  "summary": {
    "total_hours_per_week": number,
    "total_monthly_savings_potential": number,
    "quick_wins_count": number,
    "recommended_first_task": "string",
    "estimated_total_implementation_cost": number
  }
}

Sort tasks by ROI (highest first). Be realistic with time estimates. Return only the JSON, no markdown or explanation.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert AI automation consultant specializing in ROI analysis and task automation prioritization.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content from OpenAI");
    }

    // Parse the JSON response
    const cleanedContent = content.replace(/```json\n?|\n?```/g, "").trim();
    const analysis = JSON.parse(cleanedContent);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Task analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze tasks" },
      { status: 500 }
    );
  }
}
