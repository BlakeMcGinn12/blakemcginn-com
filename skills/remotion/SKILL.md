---
name: remotion-video-generator
description: Generate automated videos from data using Remotion and React. Create shareable MP4s from AI research findings, personalized forecasts, and social media content. Deploy to AWS Lambda for serverless rendering.
---

# Remotion Video Generator

Generate professional videos programmatically from your data using React components and Remotion.

## Use Cases

1. **Content Generation** - Auto-generate videos from AI research findings
2. **Personalized Marketing** - Create custom videos for each user  
3. **Social Media Automation** - Auto-post video content to platforms

## Quick Start

### Install Dependencies

```bash
npm install remotion @remotion/cli @remotion/lambda
```

### Create Video Component

```tsx
// Video template for automation forecast
import { useVideoConfig, useCurrentFrame } from 'remotion';

export const ForecastVideo = ({ riskScore, roleTitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12">
      <h1 className="text-6xl font-bold">Your Automation Forecast</h1>
      <p className="text-3xl mt-8">{roleTitle}</p>
      <div className="text-8xl font-bold text-blue-400 mt-12">
        {riskScore}% Risk
      </div>
    </div>
  );
};
```

### Render Video

```bash
npx remotion render src/index.ts ForecastVideo out.mp4
```

## AWS Lambda Deployment

### 1. Setup Remotion Lambda

```bash
npx remotion lambda policies validate
npx remotion lambda functions deploy --compatible
```

### 2. Deploy Function

```bash
npx remotion lambda functions deploy
```

### 3. Render via Lambda

```typescript
import { renderMediaOnLambda } from '@remotion/lambda';

const { renderId } = await renderMediaOnLambda({
  region: 'us-east-1',
  functionName: 'remotion-render',
  serveUrl: 'https://your-site.com/remotion',
  composition: 'ForecastVideo',
  inputProps: { riskScore: 65, roleTitle: 'Marketing Manager' },
  codec: 'h264',
});
```

## Templates Included

### ForecastVideo
Personalized automation risk forecast video
- Props: `{ riskScore: number, roleTitle: string, timeline: object }`
- Duration: 15 seconds
- Resolution: 1080x1920 (vertical, mobile-friendly)

### AlertVideo  
Breaking news style AI automation alert
- Props: `{ findingTitle: string, summary: string, riskImpact: number }`
- Duration: 10 seconds
- Resolution: 1080x1920

## Integration with AI Research Oracle

### Trigger Video Generation

When a user completes their forecast:

```typescript
// In /api/oracle/analyze
const analysis = await analyzeJob(jobDescription);

// Generate personalized video
const videoUrl = await generateForecastVideo({
  riskScore: analysis.one_year_risk,
  roleTitle: analysis.role_title,
  userEmail: email
});

// Email video link to user
await sendEmail(email, 'Your Automation Forecast Video', videoUrl);
```

### Auto-Generate from Research

When Research Agent finds major findings:

```typescript
// In Lambda webhook handler
if (finding.risk_impact >= 8) {
  const video = await generateAlertVideo({
    findingTitle: finding.title,
    summary: finding.summary,
    riskImpact: finding.risk_impact
  });
  
  // Post to social media
  await postToTwitter(video);
}
```

## Configuration

### Environment Variables

```bash
REMOTION_AWS_ACCESS_KEY_ID=...
REMOTION_AWS_SECRET_ACCESS_KEY=...
REMOTION_AWS_REGION=us-east-1
REMOTION_SERVE_URL=https://your-site.com/remotion
```

### Video Settings

| Setting | Default | Options |
|---------|---------|---------|
| Codec | h264 | h264, h265, vp8, vp9 |
| Resolution | 1080x1920 | Any 16:9 or 9:16 |
| FPS | 30 | 24, 30, 60 |
| Duration | 15s | 1s to 5min |

## Cost Estimates

AWS Lambda rendering costs:
- 15 second 1080p video: ~$0.02
- 100 videos/month: ~$2.00
- 1,000 videos/month: ~$20.00

## Best Practices

1. **Pre-render templates** - Cache compositions that don't change
2. **Optimize images** - Use WebP, limit resolution
3. **Batch renders** - Group multiple videos in one Lambda invocation
4. **Monitor costs** - Set up CloudWatch alarms for Lambda usage
