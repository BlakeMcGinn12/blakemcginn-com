const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const OpenAI = require('openai');
const Parser = require('rss-parser');

// Initialize clients
const ddbClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(ddbClient);
const sesClient = new SESClient({ region: 'us-east-1' });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const parser = new Parser();

// RSS feeds to monitor (FREE - no API keys needed)
const RSS_FEEDS = [
  { url: 'https://openai.com/blog/rss.xml', source: 'openai' },
  { url: 'https://www.anthropic.com/blog/rss.xml', source: 'anthropic' },
  { url: 'https://blog.google/technology/ai/rss/', source: 'google' },
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', source: 'techcrunch' },
  { url: 'https://www.theverge.com/ai-artificial-intelligence/rss/index.xml', source: 'verge' },
  { url: 'https://simonwillison.net/tags/ai/rss/', source: 'simonwillison' },
  { url: 'https://buttondown.email/ainews/rss', source: 'ainews' },
  { url: 'https://news.ycombinator.com/rss', source: 'hackernews' }
];

// Job roles taxonomy for classification
const JOB_ROLES = [
  'software_engineer', 'data_analyst', 'marketing_manager', 'content_writer',
  'customer_support', 'sales_representative', 'paralegal', 'accountant',
  'graphic_designer', 'ux_designer', 'product_manager', 'project_manager',
  'hr_specialist', 'recruiter', 'administrative_assistant', 'data_entry',
  'research_analyst', 'financial_analyst', 'social_media_manager', 'copywriter'
];

exports.handler = async (event) => {
  console.log('Starting daily AI research at:', new Date().toISOString());
  
  const findings = [];
  const majorFindings = [];
  
  try {
    // 1. Scrape RSS feeds
    console.log('Scraping RSS feeds...');
    const rssFindings = await scrapeRSSFeeds();
    findings.push(...rssFindings);
    
    // 2. Scrape GitHub trending AI repos
    console.log('Fetching GitHub trending...');
    const githubFindings = await scrapeGitHubTrending();
    findings.push(...githubFindings);
    
    // 3. Scrape Twitter via Nitter (if available)
    if (process.env.ENABLE_NITTER === 'true') {
      console.log('Scraping Twitter via Nitter...');
      const nitterFindings = await scrapeNitter();
      findings.push(...nitterFindings);
    }
    
    // 4. Classify and filter findings
    console.log(`Classifying ${findings.length} items...`);
    const classifiedFindings = await classifyFindings(findings);
    
    // 5. Store in DynamoDB
    console.log('Storing findings...');
    for (const finding of classifiedFindings) {
      await storeFinding(finding);
      
      if (finding.risk_impact >= 7) {
        majorFindings.push(finding);
      }
    }
    
    // 6. If major findings, notify Oracle
    if (majorFindings.length > 0) {
      console.log(`Notifying Oracle of ${majorFindings.length} major findings...`);
      await notifyOracle(majorFindings);
    }
    
    // 7. Send daily summary email (optional)
    if (process.env.ADMIN_EMAIL && findings.length > 0) {
      await sendSummaryEmail(findings.length, majorFindings.length);
    }
    
    console.log('Research complete:', {
      total: findings.length,
      major: majorFindings.length
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        processed: findings.length,
        major: majorFindings.length,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Research agent failed:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};

async function scrapeRSSFeeds() {
  const findings = [];
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  for (const feed of RSS_FEEDS) {
    try {
      console.log(`Fetching ${feed.source}...`);
      const feedData = await parser.parseURL(feed.url);
      
      // Only get items from last 24 hours
      const recentItems = feedData.items.filter(item => {
        const pubDate = new Date(item.pubDate || item.isoDate);
        return pubDate > oneDayAgo;
      }).slice(0, 3); // Max 3 per source
      
      for (const item of recentItems) {
        findings.push({
          source: feed.source,
          url: item.link,
          title: item.title,
          content: (item.contentSnippet || item.content || '').substring(0, 2000),
          published_at: item.pubDate || item.isoDate,
          raw: item
        });
      }
    } catch (err) {
      console.error(`Failed to fetch ${feed.source}:`, err.message);
    }
  }
  
  return findings;
}

async function scrapeGitHubTrending() {
  try {
    // GitHub search API for AI repos created/updated recently
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    
    const query = `ai+autelligence+created:>${oneWeekAgo}`;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=5`
    );
    
    if (!response.ok) {
      console.log('GitHub API rate limited or failed');
      return [];
    }
    
    const data = await response.json();
    
    return data.items.map(repo => ({
      source: 'github',
      url: repo.html_url,
      title: `GitHub Trending: ${repo.name}`,
      content: `${repo.description || 'No description'}. Stars: ${repo.stargazers_count}. Language: ${repo.language || 'Unknown'}`,
      published_at: repo.created_at,
      raw: repo
    }));
  } catch (err) {
    console.error('GitHub scrape failed:', err.message);
    return [];
  }
}

async function scrapeNitter() {
  // Nitter instances are flaky, so we try multiple
  const nitterInstances = [
    'https://nitter.net',
    'https://nitter.it',
    'https://nitter.cz'
  ];
  
  const accountsToMonitor = [
    'sama', 'ylecun', 'DrJimFan', 'EMostaque', 'AndrewYNg'
  ];
  
  const findings = [];
  
  for (const instance of nitterInstances) {
    try {
      for (const account of accountsToMonitor.slice(0, 2)) { // Limit to avoid rate limits
        const response = await fetch(`${instance}/${account}/rss`, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          timeout: 5000
        });
        
        if (response.ok) {
          const rssText = await response.text();
          const feed = await parser.parseString(rssText);
          
          const recentItems = feed.items.slice(0, 2);
          for (const item of recentItems) {
            findings.push({
              source: `twitter_${account}`,
              url: item.link,
              title: `Twitter @${account}: ${item.title.substring(0, 100)}`,
              content: item.contentSnippet || item.content || '',
              published_at: item.pubDate,
              raw: { account, ...item }
            });
          }
        }
      }
      break; // If successful, don't try other instances
    } catch (err) {
      console.log(`Nitter instance ${instance} failed:`, err.message);
      continue;
    }
  }
  
  return findings;
}

async function classifyFindings(findings) {
  const classified = [];
  
  for (const finding of findings) {
    try {
      // Use GPT-4o-mini for cheap classification
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You analyze AI news for job automation impact.
            
Available job roles: ${JOB_ROLES.join(', ')}

Classify this content and return JSON:
{
  "significant": boolean (is this about AI capabilities/tools that could automate jobs?),
  "category": "tool_launch" | "capability_breakthrough" | "adoption_trend" | "research" | "not_relevant",
  "affected_roles": string[] (which job roles from the list above could be affected),
  "impact": number 1-10 (10 = massive disruption, immediate job replacement potential),
  "summary": string (2-3 sentence summary of what this means for workers)
}`
          },
          {
            role: 'user',
            content: `Title: ${finding.title}\n\nContent: ${finding.content}`
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 500
      });
      
      const classification = JSON.parse(response.choices[0].message.content);
      
      // Only include significant findings
      if (classification.significant) {
        classified.push({
          ...finding,
          category: classification.category,
          affected_roles: classification.affected_roles || [],
          risk_impact: classification.impact,
          summary: classification.summary,
          processed: false,
          created_at: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Classification failed:', err.message);
      // Include with low impact if classification fails
      classified.push({
        ...finding,
        category: 'unknown',
        affected_roles: [],
        risk_impact: 3,
        summary: 'Unable to classify automatically',
        processed: false,
        created_at: new Date().toISOString()
      });
    }
  }
  
  return classified;
}

async function storeFinding(finding) {
  // Check for duplicates (same URL in last 7 days)
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    
    const { Items } = await docClient.send(new QueryCommand({
      TableName: 'ai_findings',
      KeyConditionExpression: 'source = :src AND created_at > :date',
      FilterExpression: 'url = :url',
      ExpressionAttributeValues: {
        ':src': finding.source,
        ':date': sevenDaysAgo,
        ':url': finding.url
      }
    }));
    
    if (Items && Items.length > 0) {
      console.log(`Skipping duplicate: ${finding.title.substring(0, 50)}`);
      return;
    }
  } catch (err) {
    console.error('Duplicate check failed:', err.message);
  }
  
  // Store the finding
  await docClient.send(new PutCommand({
    TableName: 'ai_findings',
    Item: {
      source: finding.source,
      created_at: finding.created_at,
      url: finding.url,
      title: finding.title,
      content: finding.content,
      category: finding.category,
      affected_roles: finding.affected_roles,
      risk_impact: finding.risk_impact,
      summary: finding.summary,
      processed: false
    }
  }));
}

async function notifyOracle(findings) {
  try {
    const response = await fetch(process.env.ORACLE_WEBHOOK_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ORACLE_SECRET}`
      },
      body: JSON.stringify({ findings })
    });
    
    if (!response.ok) {
      throw new Error(`Oracle returned ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Oracle notified:', result);
    
  } catch (err) {
    console.error('Failed to notify Oracle:', err.message);
  }
}

async function sendSummaryEmail(totalCount, majorCount) {
  try {
    await sesClient.send(new SendEmailCommand({
      Source: process.env.FROM_EMAIL || 'alerts@blakemcginn.com',
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL]
      },
      Message: {
        Subject: {
          Data: `AI Research Daily Summary: ${totalCount} findings, ${majorCount} major`
        },
        Body: {
          Text: {
            Data: `Daily Research Summary\n\nTotal findings: ${totalCount}\nMajor findings: ${majorCount}\n\nTimestamp: ${new Date().toISOString()}`
          }
        }
      }
    }));
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}
