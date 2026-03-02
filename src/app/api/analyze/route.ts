// src/app/api/analyze/route.ts - Analysis API Route
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { job_description, years_experience, industry } = body;

    if (!job_description) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    // Extract role title from job description (simple heuristic)
    const roleMatch = job_description.match(/(\w+\s+)?(Manager|Engineer|Analyst|Designer|Developer|Director|Specialist|Coordinator|Assistant|Consultant|Strategist)/i);
    const role_title = roleMatch 
      ? roleMatch[0].replace(/^\w/, (c: string) => c.toUpperCase()) 
      : "Professional";

    // Calculate risk based on keywords in job description
    const highRiskKeywords = ["data entry", "scheduling", "reporting", "documentation", "administrative", "processing", "coordination"];
    const lowRiskKeywords = ["strategy", "creative", "leadership", "decision", "judgment", "relationship", "negotiation", "innovation"];
    
    const descLower = job_description.toLowerCase();
    const highRiskCount = highRiskKeywords.filter(k => descLower.includes(k)).length;
    const lowRiskCount = lowRiskKeywords.filter(k => descLower.includes(k)).length;
    
    // Base risk calculation
    let baseRisk = 50;
    baseRisk += highRiskCount * 8;
    baseRisk -= lowRiskCount * 10;
    
    // Industry adjustments
    const industryMultipliers: {[key: string]: number} = {
      "Technology": 1.1,
      "Finance": 1.0,
      "Healthcare": 0.8,
      "Marketing": 0.9,
      "Other": 1.0
    };
    baseRisk *= (industryMultipliers[industry] || 1.0);
    
    // Experience adjustments (senior roles slightly more protected)
    const expMultipliers: {[key: string]: number} = {
      "0-2 years": 1.1,
      "3-5 years": 1.0,
      "6-10 years": 0.95,
      "10+ years": 0.9
    };
    baseRisk *= (expMultipliers[years_experience] || 1.0);
    
    // Calculate risks with HYPERBOLIC flair - make it dramatic
    const oneYearRisk = Math.min(85, Math.max(20, Math.round(baseRisk)));
    
    // 5-year risk goes HARD - AI doesn't wait for anyone
    const fiveYearRisk = Math.min(98, Math.max(oneYearRisk + 15, Math.round(baseRisk * 1.5)));
    
    // Determine risk level - make it spicy
    let overall_risk_level = "medium";
    if (oneYearRisk >= 55) overall_risk_level = "high";
    else if (oneYearRisk <= 30) overall_risk_level = "low";

    // Generate timeline - acceleration is real
    const timeline = {
      six_months: Math.round(oneYearRisk * 0.7),  // AI moves fast
      one_year: oneYearRisk,
      three_years: Math.round(oneYearRisk + (fiveYearRisk - oneYearRisk) * 0.7),
      five_years: fiveYearRisk
    };

    // Generate SNARKY descriptions based on the actual role
    const getOneYearDescription = (risk: number, role: string) => {
      if (risk >= 75) return "Your job is basically a ChatGPT prompt waiting to happen.";
      if (risk >= 60) return "Start learning to code, or start learning to serve coffee.";
      if (risk >= 45) return "You'll survive... but your resume won't look the same.";
      return "You're safe... for now. Don't get comfortable.";
    };

    const getFiveYearDescription = (risk: number, role: string) => {
      if (risk >= 90) return "In 5 years, you'll be explaining what you used to do to your grandkids.";
      if (risk >= 75) return "Your job title will be 'AI Whisperer' or 'Unemployed.' Choose wisely.";
      if (risk >= 60) return "You'll still have a job, but the AI will be your boss.";
      return "Congrats, you're in the 5% that might survive the robot uprising.";
    };

    const getConfidenceDescription = (role: string) => {
      const roasts = [
        `We've analyzed 10,000+ ${role}s. You're all equally doomed.`,
        `Our AI is more confident about replacing you than you are about your career.`,
        `The data doesn't lie. Your job security, however...`,
        `Trust us, we're robots. We know what other robots can do.`
      ];
      return roasts[Math.floor(Math.random() * roasts.length)];
    };

    const getTasksDescription = (high: number, total: number, role: string) => {
      const ratio = high / total;
      if (ratio >= 0.7) return `${high} out of ${total} tasks? Might as well train your replacement now.`;
      if (ratio >= 0.5) return `${high}/${total} tasks are toast. Time to get creative.`;
      return `Only ${high}/${total} tasks at risk. You're basically unfireable... for 6 months.`;
    };

    // Generate tasks based on keywords found
    const high_risk_tasks = [];
    const low_risk_tasks = [];
    
    if (descLower.includes("email") || descLower.includes("communication")) {
      high_risk_tasks.push({
        task_name: "Email management & communication",
        automation_timeline: "6-12 months",
        risk_score: 8,
        recommended_action: "Transition to high-value relationship building"
      });
    }
    
    if (descLower.includes("report") || descLower.includes("data") || descLower.includes("analysis")) {
      high_risk_tasks.push({
        task_name: "Data analysis & reporting",
        automation_timeline: "12-24 months",
        risk_score: 7,
        recommended_action: "Move to insight interpretation & strategic recommendations"
      });
    }
    
    if (descLower.includes("schedule") || descLower.includes("calendar")) {
      high_risk_tasks.push({
        task_name: "Scheduling & calendar management",
        automation_timeline: "0-6 months",
        risk_score: 9,
        recommended_action: "Automate immediately using AI scheduling tools"
      });
    }
    
    if (descLower.includes("strategy") || descLower.includes("planning")) {
      low_risk_tasks.push({
        task_name: "Strategic planning & vision",
        automation_timeline: "5+ years",
        risk_score: 2,
        recommended_action: "Double down — core differentiator that AI can't replicate"
      });
    }
    
    if (descLower.includes("relationship") || descLower.includes("client")) {
      low_risk_tasks.push({
        task_name: "Client relationship management",
        automation_timeline: "5+ years",
        risk_score: 3,
        recommended_action: "Build deeper, trust-based relationships"
      });
    }
    
    if (descLower.includes("creative") || descLower.includes("design")) {
      low_risk_tasks.push({
        task_name: "Creative problem solving",
        automation_timeline: "3-5 years",
        risk_score: 4,
        recommended_action: "Focus on novel, industry-specific challenges"
      });
    }

    // Ensure we have at least some tasks
    if (high_risk_tasks.length === 0) {
      high_risk_tasks.push(
        {
          task_name: "Routine administrative tasks",
          automation_timeline: "6-18 months",
          risk_score: 7,
          recommended_action: "Identify automatable workflows and delegate to AI"
        },
        {
          task_name: "Information processing",
          automation_timeline: "12-24 months",
          risk_score: 6,
          recommended_action: "Transition to analysis and decision-making"
        }
      );
    }
    
    if (low_risk_tasks.length === 0) {
      low_risk_tasks.push(
        {
          task_name: "Complex decision making",
          automation_timeline: "5+ years",
          risk_score: 3,
          recommended_action: "Develop expertise in high-judgment areas"
        },
        {
          task_name: "Stakeholder management",
          automation_timeline: "3-5 years",
          risk_score: 4,
          recommended_action: "Build deep organizational relationships"
        }
      );
    }

    // Salary estimate based on role
    const salaryEstimates: {[key: string]: number} = {
      "Manager": 95000,
      "Engineer": 110000,
      "Analyst": 75000,
      "Designer": 80000,
      "Developer": 105000,
      "Director": 140000,
      "Specialist": 70000,
      "Coordinator": 55000,
      "Assistant": 45000,
      "Consultant": 85000,
      "Strategist": 90000
    };
    
    let salary_median = 75000;
    for (const [key, value] of Object.entries(salaryEstimates)) {
      if (role_title.includes(key)) {
        salary_median = value;
        break;
      }
    }

    // Calculate economics
    const annual_savings = Math.round(salary_median * (oneYearRisk / 100) * 0.8);
    const current_roi = Math.round((annual_savings / 15000) * 100);

    // Generate snarky descriptions
    const totalTasks = high_risk_tasks.length + low_risk_tasks.length;
    const descriptions = {
      one_year: getOneYearDescription(oneYearRisk, role_title),
      five_year: getFiveYearDescription(fiveYearRisk, role_title),
      confidence: getConfidenceDescription(role_title),
      tasks_at_risk: getTasksDescription(high_risk_tasks.length, totalTasks, role_title)
    };

    // Generate response with ATTITUDE
    const result = {
      role_title,
      overall_risk_level,
      primary_metrics: {
        one_year_risk: oneYearRisk,
        five_year_risk: fiveYearRisk,
        confidence: 87,
        tasks_at_risk: `${high_risk_tasks.length}/${totalTasks}`
      },
      descriptions,
      timeline,
      economics: {
        salary_median,
        current_roi,
        payback_months: 5.4,
        annual_savings
      },
      high_risk_tasks,
      low_risk_tasks,
      benchmark: {
        percentile: Math.round(30 + Math.random() * 50),
        comparison_text: `More doomed than ${Math.round(30 + Math.random() * 50)}% of similar roles`
      }
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
