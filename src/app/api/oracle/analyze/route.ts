import { NextRequest } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import OpenAI from 'openai';

// Initialize AWS clients
const ddbClient = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(ddbClient);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Job roles taxonomy
const JOB_ROLES = [
  'software_engineer', 'data_analyst', 'marketing_manager', 'content_writer',
  'customer_support', 'sales_representative', 'paralegal', 'accountant',
  'graphic_designer', 'ux_designer', 'product_manager', 'project_manager',
  'hr_specialist', 'recruiter', 'administrative_assistant', 'data_entry',
  'research_analyst', 'financial_analyst', 'social_media_manager', 'copywriter',
  'video_editor', 'translator', 'transcriptionist', 'bookkeeper',
  'travel_agent', 'proofreader', 'medical_coder', 'legal_assistant'
];

export async function POST(request: NextRequest) {
  console.log('Oracle analyze endpoint called');
  
  try {
    // Parse request
    const { 
      job_description, 
      user_id, 
      experience = '3-5 years',
      industry = 'Technology'
    } = await request.json();
    
    if (!job_description) {
      return Response.json(
        { error: 'Job description is required' },
        { status: 400 }
      );
    }
    
    // Generate anonymous user ID if not provided
    const uid = user_id || `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 1. Get user's analysis history (memory)
    const userHistory = await getUserHistory(uid);
    console.log(`Found ${userHistory.length} previous analyses for user`);
    
    // 2. Get recent AI findings (research context)
    const recentFindings = await getRecentResearch();
    console.log(`Found ${recentFindings.length} recent research findings`);
    
    // 3. Perform intelligent analysis with OpenAI
    const analysis = await performAnalysis({
      job_description,
      experience,
      industry,
      userHistory,
      recentFindings
    });
    
    // 4. Store analysis in DynamoDB
    await storeAnalysis(uid, analysis);
    console.log('Analysis stored in DynamoDB');
    
    // 5. Return result
    return Response.json({
      success: true,
      analysis,
      user_id: uid,
      context: {
        previous_analyses: userHistory.length,
        research_findings: recentFindings.length
      }
    });
    
  } catch (error) {
    console.error('Oracle analysis failed:', error);
    return Response.json(
      { error: 'Analysis failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}

async function getUserHistory(userId: string) {
  try {
    // Query last 5 analyses for this user
    const { Items } = await docClient.send(new QueryCommand({
      TableName: 'user_analyses',
      KeyConditionExpression: 'user_id = :uid',
      ExpressionAttributeValues: {
        ':uid': userId
      },
      ScanIndexForward: false, // Most recent first
      Limit: 5
    }));
    
    return Items || [];
  } catch (err) {
    console.error('Failed to get user history:', err);
    return [];
  }
}

async function getRecentResearch() {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    
    // Query all sources for recent findings
    const sources = ['openai', 'anthropic', 'google', 'techcrunch', 'github'];
    const allFindings: any[] = [];
    
    for (const source of sources) {
      const { Items } = await docClient.send(new QueryCommand({
        TableName: 'ai_findings',
        KeyConditionExpression: '#src = :src AND created_at > :date',
        ExpressionAttributeNames: {
          '#src': 'source'
        },
        ExpressionAttributeValues: {
          ':src': source,
          ':date': thirtyDaysAgo
        },
        ScanIndexForward: false,
        Limit: 5
      }));
      
      if (Items) {
        allFindings.push(...Items);
      }
    }
    
    // Sort by risk impact and return top 10
    return allFindings
      .sort((a, b) => (b.risk_impact || 0) - (a.risk_impact || 0))
      .slice(0, 10);
      
  } catch (err) {
    console.error('Failed to get recent research:', err);
    return [];
  }
}

async function performAnalysis({
  job_description,
  experience,
  industry,
  userHistory,
  recentFindings
}: {
  job_description: string;
  experience: string;
  industry: string;
  userHistory: any[];
  recentFindings: any[];
}) {
  
  // Build context for OpenAI
  const historyContext = userHistory.length > 0 
    ? `User's previous analyses:\n${userHistory.map(h => 
        `- ${h.created_at}: ${h.role_title}, 1-year risk: ${h.one_year_risk}%`
      ).join('\n')}`
    : 'No previous analyses found.';
  
  const researchContext = recentFindings.length > 0
    ? `Recent AI developments (last 30 days):\n${recentFindings.map(f =>
        `- ${f.title} (Risk impact: ${f.risk_impact}/10): ${f.summary}`
      ).join('\n')}`
    : 'No major AI developments in the last 30 days.';
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert AI job automation forecaster. Analyze job roles and predict automation risk.

You MUST respond as a single valid JSON object only. Do not include any prose, markdown, or explanation outside of the JSON. The JSON must strictly follow this schema:

Available job roles for classification: ${JOB_ROLES.join(', ')}

Provide a detailed forecast with the following structure:
{
  "role_title": "Specific job title",
  "overall_risk_level": "low" | "medium" | "high",
  "one_year_risk": number 0-100,
  "five_year_risk": number 0-100,
  "confidence": number 0-100,
  "tasks_at_risk": "X/Y tasks",
  "explanation": "Detailed explanation of the risk assessment",
  "high_risk_tasks": [
    {
      "task_name": "Specific task",
      "automation_timeline": "6-12 months" | "1-2 years" | "2-5 years",
      "risk_score": 1-10,
      "recommended_action": "What the user should do about this"
    }
  ],
  "low_risk_tasks": [
    {
      "task_name": "Task that will remain human",
      "automation_timeline": "5+ years" | "unlikely",
      "risk_score": 1-10,
      "recommended_action": "How to emphasize this skill"
    }
  ],
  "timeline": {
    "six_months": number 0-100,
    "one_year": number 0-100,
    "three_years": number 0-100,
    "five_years": number 0-100
  },
  "roadmap": [
    "Action item 1",
    "Action item 2",
    "Action item 3"
  ],
  "benchmark": {
    "percentile": number 0-100,
    "comparison_text": "How this compares to similar roles"
  }
}`
      },
      {
        role: 'user',
        content: `Analyze this job role:

Description: ${job_description}
Experience: ${experience}
Industry: ${industry}

${historyContext}

${researchContext}

Consider the recent AI developments when assessing risk. If recent tools directly impact this role, adjust risk scores accordingly.`
      }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 2500
  });
  
  const result = JSON.parse(response.choices[0].message.content || '{}');
  
  // Ensure all required fields exist
  return {
    role_title: result.role_title || 'Unknown Role',
    overall_risk_level: result.overall_risk_level || 'medium',
    one_year_risk: Math.min(100, Math.max(0, result.one_year_risk || 30)),
    five_year_risk: Math.min(100, Math.max(0, result.five_year_risk || 50)),
    confidence: Math.min(100, Math.max(0, result.confidence || 70)),
    tasks_at_risk: result.tasks_at_risk || '0/0',
    explanation: result.explanation || 'No explanation provided',
    high_risk_tasks: result.high_risk_tasks || [],
    low_risk_tasks: result.low_risk_tasks || [],
    timeline: result.timeline || {
      six_months: 10,
      one_year: 20,
      three_years: 40,
      five_years: 60
    },
    roadmap: result.roadmap || ['Learn AI tools', 'Develop human skills', 'Stay updated'],
    benchmark: result.benchmark || {
      percentile: 50,
      comparison_text: 'Average automation risk'
    }
  };
}

async function storeAnalysis(userId: string, analysis: any) {
  await docClient.send(new PutCommand({
    TableName: 'user_analyses',
    Item: {
      user_id: userId,
      created_at: new Date().toISOString(),
      role_title: analysis.role_title,
      overall_risk_level: analysis.overall_risk_level,
      one_year_risk: analysis.one_year_risk,
      five_year_risk: analysis.five_year_risk,
      confidence: analysis.confidence,
      tasks_at_risk: analysis.tasks_at_risk,
      explanation: analysis.explanation,
      high_risk_tasks: analysis.high_risk_tasks,
      low_risk_tasks: analysis.low_risk_tasks,
      timeline: analysis.timeline,
      roadmap: analysis.roadmap,
      benchmark: analysis.benchmark
    }
  }));
}
