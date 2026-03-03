# AI Research Oracle - Project Summary for Cursor

## Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  AWS us-east-1                                              │
│  ├── Lambda: ai-research-agent (runs daily 6 AM EST)        │
│  ├── DynamoDB: ai_findings, user_analyses, user_alerts     │
│  └── EventBridge: Daily cron trigger                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Webhook calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Render (Next.js)                                           │
│  ├── /api/oracle/analyze  →  User analysis endpoint        │
│  ├── /api/oracle/webhook  →  Receives research updates     │
│  ├── /api/save-email      →  Email collection              │
│  ├── /forecast            →  Automation Forecast UI        │
│  └── /assessment          →  Task Assessment UI            │
└─────────────────────────────────────────────────────────────┘
```

## What's Working

✅ DynamoDB tables created (ai_findings, user_analyses, user_alerts, email_subscribers)
✅ Lambda deployed with EventBridge cron (daily 6 AM EST)
✅ Oracle API endpoints deployed on Render
✅ Frontend pages with email collection (required)
✅ Research Agent fetches RSS feeds and GitHub trending

## Current Issue: Lambda Not Storing Findings

**Problem:** Lambda runs successfully but stores 0 findings to DynamoDB

**Root cause from logs:**
- Fetches 6 items successfully from RSS/GitHub
- Sends to OpenAI for classification
- OpenAI classifies all as "not significant" for job automation
- Lambda only stores items with risk_impact >= threshold

**Evidence from CloudWatch:**
```
"Classifying 6 items..."
"Research complete: { total: 6, major: 0 }"
```

## What Needs to Be Fixed

### 1. Fix Lambda Classification Threshold

**File:** `apps/research-agent/index.js`

The `classifyWithAI` function is too strict. It filters out everything. Options:

**Option A:** Lower significance threshold in classification
**Option B:** Store ALL findings regardless of significance (for debugging)
**Option C:** Improve the OpenAI prompt to better identify job automation news

**Current prompt (too strict):**
```javascript
content: `You analyze AI news for job automation impact.
Return JSON: { "significant": boolean, ... }`
```

**Suggested fix:** Lower threshold or store everything temporarily.

### 2. Verify Environment Variables in Lambda

**Check AWS Console:**
- Lambda → ai-research-agent → Configuration → Environment variables
- Should have: OPENAI_API_KEY, ORACLE_WEBHOOK_URL, ORACLE_SECRET

**Test OpenAI connection:**
Add explicit test in Lambda handler to verify API key works.

### 3. Fix Broken RSS Feeds

**From logs, these fail with 404:**
- anthropic (https://www.anthropic.com/blog/rss.xml)
- verge (https://www.theverge.com/ai-artificial-intelligence/rss/index.xml)
- simonwillison (https://simonwillison.net/tags/ai/rss/)

**Find working URLs or remove them.**

### 4. Test End-to-End Flow

1. Manually invoke Lambda:
```bash
aws lambda invoke --function-name ai-research-agent --region us-east-1 response.json
cat response.json
```

2. Check if findings appear in DynamoDB:
```bash
aws dynamodb scan --table-name ai_findings --region us-east-1
```

3. Test Oracle API:
```bash
curl -X POST https://blakemcginn.com/api/oracle/analyze \
  -H "Content-Type: application/json" \
  -d '{"job_description": "Marketing manager", "experience": "5 years", "industry": "Tech"}'
```

## Required Environment Variables

### Lambda (AWS Console)
- `OPENAI_API_KEY` - sk-...
- `ORACLE_WEBHOOK_URL` - https://blakemcginn.com/api/oracle/webhook
- `ORACLE_SECRET` - (same as Render)

### Render
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` - us-east-1
- `OPENAI_API_KEY`
- `ORACLE_SECRET`

## Code Locations

- **Lambda:** `website/apps/research-agent/index.js`
- **Oracle API:** `website/src/app/api/oracle/analyze/route.ts`
- **Webhook:** `website/src/app/api/oracle/webhook/route.ts`
- **Frontend:** `website/src/app/forecast/page.tsx`, `website/src/app/assessment/page.tsx`

## Success Criteria

1. Lambda runs daily and stores findings in ai_findings table
2. Oracle API queries findings when analyzing user jobs
3. Users get personalized risk scores based on latest research
4. Webhook notifies Oracle of major findings
5. Email collection works and stores to email_subscribers table

## Notes

- Lambda timeout: 5 minutes
- RSS time filter: currently 7 days (was 24 hours)
- Research Agent uses GPT-4o-mini for classification
- Oracle uses GPT-4o for analysis
- All tables use on-demand billing (PAY_PER_REQUEST)
