# BlakeMcGinn.com

AI Consulting landing page with animated mesh gradient background, service tools grid, and AI readiness quiz.

## Features

- **Animated Mesh Gradient Background** — Subtle, professional animation using CSS
- **Responsive Navigation** — Fixed header with blur effect on scroll
- **Hero Section** — Value proposition with CTAs and social proof stats
- **Tools Grid** — 6 service cards with hover effects
- **AI Readiness Quiz** — 5-question assessment with personalized results
- **About Section** — Bio and credibility markers
- **Footer** — Newsletter signup and navigation links

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Font:** Inter (via Next.js)

## Getting Started

### Development

```bash
cd blakemcginn-com
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

Static files output to `dist/` directory.

## Deployment

### Option 1: Vercel (Recommended)

1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Connect custom domain `blakemcginn.com`

### Option 2: Static Hosting

Upload contents of `dist/` folder to:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static host

## Customization

### Colors
Edit `src/app/globals.css`:
- `--background`: Main background (#0a0a0f)
- `--accent-cyan`: Primary accent (#00d4ff)
- `--accent-purple`: Secondary accent (#7b2cbf)

### Content
- **Hero:** Edit `src/app/components/Hero.tsx`
- **Tools:** Edit `src/app/components/ToolsGrid.tsx`
- **Quiz:** Edit `src/app/components/Quiz.tsx`
- **About:** Edit `src/app/components/About.tsx`

### Add Your Photo
Replace the placeholder in `src/app/components/About.tsx`:

```tsx
<div className="aspect-square rounded-3xl overflow-hidden">
  <img 
    src="/your-photo.jpg" 
    alt="Blake McGinn"
    className="w-full h-full object-cover"
  />
</div>
```

### Connect Calendly
Update the Calendly link in `src/app/components/Quiz.tsx`:

```tsx
<a href="https://calendly.com/YOUR_LINK" ...>
```

## Quiz Scoring

The quiz calculates a score from 0-20 based on answers:
- **0-6:** Explorer — Start with basics
- **7-12:** Builder — Ready for automation
- **13-20:** Transformer — Full AI transformation

## Project Structure

```
blakemcginn-com/
├── src/
│   └── app/
│       ├── components/
│       │   ├── Navigation.tsx    # Fixed header
│       │   ├── Hero.tsx          # Hero section
│       │   ├── ToolsGrid.tsx     # 6 service cards
│       │   ├── Quiz.tsx          # AI readiness quiz
│       │   ├── About.tsx         # Bio section
│       │   └── Footer.tsx        # Footer with newsletter
│       ├── globals.css           # Global styles + animations
│       ├── layout.tsx            # Root layout
│       └── page.tsx              # Main page
├── dist/                         # Build output
└── next.config.ts                # Next.js config
```

## License

MIT
