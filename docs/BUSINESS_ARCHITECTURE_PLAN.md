# Blake McGinn AI Consulting - Business Architecture Plan

## Business Model Overview

### Target Customers
1. **Executives** - C-suite who need AI assistants but don't have time to learn AI
2. **Small Business Owners** - 5-50 employees, need automation but no IT team
3. **Solo Preneurs** - Consultants, coaches, creators who need to scale themselves

### Core Value Proposition
"I stay on top of AI so you don't have to. You get the benefits of OpenClaw, Claude Code, and Perplexity without becoming an AI expert."

---

## Service Packages (Updated)

### Tier 1: AI Assistant Setup ($500)
- OpenClaw personal assistant configuration
- 5-10 essential skills installed
- 2-3 core integrations (Email, Calendar, Slack)
- 30-minute training session
- Basic workflow automation
- 30-day support

### Tier 2: Growth System ($1,500)
- Everything in Tier 1
- Multi-agent system setup
- Claude Code development environment
- 5-7 advanced workflows
- Custom skills development
- Perplexity Computer integration
- 60-day support + optimization

### Tier 3: Executive Command Center ($5,000)
- Everything in Tier 2
- Unlimited agents and workflows
- Autonomous skill deployment
- Custom API development
- 24/7 monitoring setup
- Monthly strategy calls
- 90-day dedicated support

### Ongoing: Concierge Support ($200/month)
- Monthly optimization
- New workflow additions
- Priority support (same day)
- Quarterly strategy reviews
- Early access to new AI features

---

## Customer Journey & Button Flows

### 1. Homepage CTAs

**Primary CTA: "Get Your AI Assistant"**
- Current: Links to /assessment
- Better: Direct to Calendly booking
- Why: Get them on the phone faster

**Secondary CTA: "See How It Works"**
- Current: Links to #workflows
- Keep: But add scroll animation

**Tertiary: "Download AI Readiness Checklist"**
- New: Email capture for lead magnet
- Deliverable: PDF checklist
- Follow-up: Drip campaign

### 2. Assessment Page Flow (/assessment)

Current flow:
Input tasks → AI analyzes → Shows ROI → Email capture → Book call

Optimized flow:
1. **Task Input** (keep)
2. **AI Analysis** (keep)
3. **Results Display** (enhance with package recommendation)
4. **Email Capture** (keep)
5. **Immediate Calendly Booking** (don't make them wait for email)
6. **Thank You Page** with:
   - Booking confirmation
   - "What to expect" section
   - Prep questions for the call
   - Downloadable prep guide

### 3. Navigation CTAs

**"Get Started" button**
- Current: Links to /assessment
- Better: Dropdown with options:
  - "Book a Free Call" → Calendly
  - "Take 2-Min Assessment" → /assessment
  - "Download Checklist" → Lead magnet

### 4. Pricing Page CTAs

Each tier needs clear next step:
- Starter: "Get Started" → Stripe checkout for $500
- Growth: "Schedule Consultation" → Calendly
- Enterprise: "Contact Us" → Form or Calendly

### 5. Footer/Contact

Add:
- Email: blake@blakemcginn.com
- Phone: [User to provide]
- Calendly link: [User to provide exact link]
- LinkedIn: [User to provide]
- Twitter/X: [User to provide]

---

## Backend Infrastructure

### Customer Data Storage

**Option 1: Airtable (Recommended for MVP)**
- Tables: Leads, Customers, Projects, Tasks
- Forms: Capture leads directly
- Automations: Email sequences
- Cost: Free tier sufficient for start

**Option 2: Notion Database**
- Similar to Airtable
- More flexible
- Good for internal knowledge base

**Option 3: Custom (Later)**
- PostgreSQL database
- Next.js API routes
- More control, more work

### Recommended: Airtable Setup

**Base: "AI Consulting CRM"**

**Table 1: Leads**
- Name
- Email
- Company
- Role (Executive/SMB Owner/Solo)
- Source (Website/Referral/etc)
- Lead Magnet Downloaded (Checklist)
- Assessment Completed (Boolean)
- Package Interest (Starter/Growth/Enterprise)
- Status (New/Contacted/Qualified/Closed/Lost)
- Notes
- Created Date
- Last Contact Date

**Table 2: Customers**
- Link to Lead
- Package Purchased
- Purchase Date
- Setup Status (Not Started/In Progress/Complete)
- Monthly Support Active (Boolean)
- Support Tier
- Next Check-in Date
- Lifetime Value

**Table 3: Projects**
- Link to Customer
- Project Type (Setup/Workflow/Integration)
- Status (Planning/In Progress/Testing/Delivered)
- Start Date
- Target Completion
- Actual Completion
- Hours Logged
- Notes

**Table 4: Tasks (Internal)**
- Link to Project
- Task Name
- Status
- Priority
- Due Date
- Assigned To

### Email Marketing

**Tool: ConvertKit or Mailchimp**

**Sequences:**

1. **Lead Magnet Delivery**
   - Trigger: Checklist download
   - Email 1: Deliver PDF + quick win tip
   - Email 2 (Day 2): "What's an AI Assistant?"
   - Email 3 (Day 5): Case study
   - Email 4 (Day 8): Book a call CTA

2. **Post-Assessment Nurture**
   - Trigger: Assessment completion
   - Email 1: Detailed report
   - Email 2 (Day 1): "Here's what I'd recommend..."
   - Email 3 (Day 3): Social proof
   - Email 4 (Day 7): Final CTA to book

3. **Customer Onboarding**
   - Trigger: Purchase
   - Email 1: Welcome + onboarding calendar link
   - Email 2: Prep questions
   - Email 3: During setup - check-in
   - Email 4: Completion + training materials
   - Email 5 (30 days): Support check-in

### Payment Processing

**Stripe**
- Products: Starter Setup ($500), Growth System ($1,500)
- Subscriptions: Concierge Support ($200/month)
- Invoices for Enterprise

**Calendly Integration**
- Free consultation calls
- Paid strategy sessions (if offering)
- Team scheduling

### Project Management

**Notion or Linear**
- Track client projects
- Document workflows built
- Store SOPs
- Knowledge base

---

## Tech Stack for Website

Current: Next.js + Vercel
Keep: This is perfect

### Forms & Data Capture

**Option A: Next.js API Routes + Airtable**
- Assessment submits to API
- API writes to Airtable
- Serverless functions handle logic

**Option B: Typeform + Webhooks**
- Use Typeform for assessment (easier)
- Webhook to Airtable
- Embed in Next.js

**Option C: Tally.so**
- Free tier
- Good looking forms
- Airtable integration

### Recommended: Next.js API Routes

Already have `/api/analyze-tasks`

Add:
- `/api/contact` - Contact form
- `/api/lead-magnet` - Checklist download
- `/api/newsletter` - Email signup

### Analytics

**Plausible or Fathom**
- Privacy-friendly
- Simple
- No cookie banner needed

**Or Google Analytics 4**
- More features
- Free
- Track conversion goals

---

## Immediate Action Items

### Week 1: Foundation
1. [ ] Set up Airtable CRM
2. [ ] Create lead magnet (AI Readiness Checklist PDF)
3. [ ] Set up ConvertKit/Mailchimp
4. [ ] Configure Stripe products
5. [ ] Update Calendly with consultation types

### Week 2: Website Updates
1. [ ] Update all buttons to link to real destinations
2. [ ] Add /checklist page for lead magnet
3. [ ] Add contact form with backend
4. [ ] Add social links to footer
5. [ ] Set up analytics

### Week 3: Automation
1. [ ] Connect assessment to Airtable
2. [ ] Set up email sequences
3. [ ] Test full customer journey
4. [ ] Document SOPs

---

## Information Needed from User

1. **Calendly Links:**
   - Free consultation link
   - Discovery call link
   - Any other booking types

2. **Contact Information:**
   - Business email (blake@blakemcginn.com?)
   - Phone number (optional)
   - Physical address (if LLC registered)

3. **Social Media:**
   - LinkedIn profile URL
   - Twitter/X handle
   - Any other platforms

4. **Payment:**
   - Stripe account set up?
   - Preferred payment methods

5. **Legal:**
   - LLC name for contracts
   - Terms of service needed?
   - Privacy policy needed?

6. **Content:**
   - Case studies to showcase?
   - Testimonials from past clients?
   - Preferred headshot/photo

---

## Competitive Positioning

### vs. Traditional Consultants
- They give you a plan, you execute
- I build and deploy the solution
- You get working automations, not PowerPoints

### vs. Agencies
- They need 3-6 months
- I deliver in 1-2 weeks
- Direct work with me, not junior staff

### vs. DIY AI Tools
- Tools require learning curve
- I handle the complexity
- You get expertise without the study time

### vs. AI Courses
- Courses teach you to fish
- I catch the fish for you
- Faster ROI, less time investment

---

## Success Metrics

### Monthly Targets
- Leads: 50
- Assessment Completions: 20
- Consultation Calls: 10
- Closed Deals: 3-5
- Revenue: $3,000-7,000

### Key Metrics to Track
- Website visitors
- Assessment starts/completions
- Email open rates
- Consultation booking rate
- Close rate
- Customer satisfaction
- Referrals

---

## Next Steps

1. Review this plan
2. Provide missing information (Calendly links, contact info)
3. Prioritize which pieces to build first
4. Approve/revise pricing structure
5. Set up Airtable + email tool
6. Begin website button/link updates
