# Cold Email Templates for Blake McGinn AI Consulting

## Email Infrastructure Setup

### Domain Setup
- **Primary:** blake@blakemcginn.com (existing)
- **Outbound:** blake@outreach.blakemcginn.com (new)
- **Subdomain:** outreach.blakemcginn.com

### DNS Records (Add to Cloudflare/Namecheap)
```
# SPF Record
v=spf1 include:_spf.google.com include:spf.postmarkapp.com ~all

# DKIM (Postmark will provide)
# Add Postmark DKIM record to outreach.blakemcginn.com

# DMARC Record
_dmarc.outreach.blakemcginn.com
v=DMARC1; p=quarantine; rua=mailto:dmarc@blakemcginn.com

# MX Record (for subdomain)
outreach.blakemcginn.com MX 10 inbound.postmarkapp.com
```

---

## 5-Part Email Sequence

### Email 1: Pattern Interrupt (Day 1)
**Subject:** Quick question about {{company.name}}'s workflow

```
Hi {{first_name}},

I help business owners like you eliminate repetitive tasks using AI automation.

Most of my clients save 10+ hours/week by automating things like:
• Email triage and responses
• Calendar scheduling
• CRM updates
• Report generation

I built a quick assessment that shows exactly which tasks you should automate first (takes 2 minutes):

→ https://blakemcginn.com/assessment

Curious what it would find for {{company.name}}?

Blake
P.S. I'm based in Chicago too - always happy to grab coffee if you're local.
```

**Why it works:**
- Pattern interrupt subject line
- Clear value proposition
- Specific examples
- Low-friction CTA (2 minutes)
- Local connection (Chicago)

---

### Email 2: Social Proof (Day 3)
**Subject:** Re: Quick question about {{company.name}}'s workflow

```
Hi {{first_name}},

Quick follow-up - I recently helped a {{industry}} business owner save 12 hours/week by automating their client onboarding process.

Before: Manual emails, data entry, document sending
After: Fully automated workflow

The ROI was clear within the first week.

If repetitive tasks are eating your time, this assessment will show you the low-hanging fruit:

→ https://blakemcginn.com/assessment

Best,
Blake
```

**Why it works:**
- Same subject (thread continuity)
- Concrete example
- Before/after contrast
- Reinforces CTA

---

### Email 3: Case Study (Day 5)
**Subject:** How {{similar_company}} saved 15 hours/week

```
Hi {{first_name}},

Thought you'd find this interesting:

I just finished a project for a {{industry}} company similar to {{company.name}}.

Their biggest time sink was {{common_pain_point}} - taking 3-4 hours every day.

We built an AI agent that handles it automatically now.

Result: They got 15 hours back every week. That's nearly 2 full work days.

The owner told me: "I wish I had done this 6 months ago."

Want to see what automation could do for your workflow?

→ https://blakemcginn.com/assessment

Or book a quick call: https://calendly.com/blakemcginn/consultation

Blake
```

**Why it works:**
- Specific numbers (15 hours)
- Emotional hook ("wish I had done this")
- Two CTAs (assessment or call)

---

### Email 4: Direct Pitch (Day 7)
**Subject:** 10 hours back every week?

```
Hi {{first_name}},

Most business owners I talk to are losing 10+ hours/week to repetitive tasks:

→ Answering the same emails
→ Updating spreadsheets
→ Scheduling meetings
→ Generating reports

Tasks that AI can handle automatically.

I help businesses implement these automations in 3-5 days, starting at $300.

Worth a 15-minute call to see what's possible?

→ https://calendly.com/blakemcginn/consultation

Best,
Blake
```

**Why it works:**
- Lists pain points (relatable)
- Clear offer
- Specific timeline (3-5 days)
- Price anchor ($300)
- Direct CTA

---

### Email 5: Breakup (Day 10)
**Subject:** Should I close your file?

```
Hi {{first_name}},

I've reached out a few times about helping {{company.name}} automate repetitive tasks.

Haven't heard back, so I'll assume this isn't a priority right now.

If you ever want to reclaim 10+ hours/week, you know where to find me:

→ https://blakemcginn.com/assessment

Good luck with {{company.name}}!

Blake
```

**Why it works:**
- Permission to close file (psychological trigger)
- No pressure
- Leaves door open
- Clean break

---

## Alternative Subject Lines (A/B Test)

### Email 1 Variations:
1. Quick question about {{company.name}}'s workflow
2. {{first_name}}, 10 hours back every week?
3. Automation for {{company.name}}
4. {{company.name}} + AI automation?
5. Idea for {{company.name}}

### Email 2 Variations:
1. Re: Quick question about {{company.name}}'s workflow
2. Follow-up: {{company.name}} automation
3. {{first_name}}, quick follow-up
4. Results from a similar business
5. How {{similar_company}} saved time

---

## Industry-Specific Variations

### For E-commerce
**Email 1 Hook:**
```
Most e-commerce owners I work with spend 10+ hours/week on:
• Order processing
• Inventory updates
• Customer service emails
• Shipping notifications
```

### For Consultants/Agencies
**Email 1 Hook:**
```
Most consultants I work with lose 10+ hours/week to:
• Scheduling back-and-forth
• Proposal writing
• Client onboarding
• Invoicing and follow-ups
```

### For SaaS
**Email 1 Hook:**
```
Most SaaS founders I work with spend 10+ hours/week on:
• User onboarding emails
• Support ticket triage
• Reporting and analytics
• Demo scheduling
```

### For Real Estate
**Email 1 Hook:**
```
Most agents I work with lose 10+ hours/week to:
• Lead follow-up
• Appointment scheduling
• Listing updates
• Document collection
```

---

## LinkedIn Connection Templates

### Version 1: Direct
```
Hi {{first_name}}, came across your profile while researching {{industry}} leaders in Chicago. Love what you're building at {{company.name}}. Would love to connect!
```

### Version 2: Value-First
```
Hi {{first_name}}, noticed you're in the {{industry}} space. I help businesses in your industry automate repetitive tasks. Thought you might find my content valuable. Would love to connect!
```

### Version 3: Local
```
Hi {{first_name}}, fellow Chicago business owner here! I help local businesses automate their workflows. Would love to connect and support each other.
```

---

## LinkedIn Follow-Up Messages

### After They Accept (Day 1)
```
Thanks for connecting {{first_name}}! I help business owners automate repetitive tasks using AI. Curious - what's your biggest time drain right now?
```

### Follow-Up (Day 3, No Response)
```
{{first_name}}, I built a quick tool that shows which tasks you should automate first. Takes 2 minutes and might save you 10+ hours/week. Worth checking out?

https://blakemcginn.com/assessment
```

### Voice Message Script
```
"Hey {{first_name}}, Blake here. Thanks for connecting! I was looking at your profile and noticed you're in {{industry}}. I actually just helped a similar business automate their {{common_task}} process and they saved about 12 hours a week. Thought it might be relevant for you. Happy to share more if you're interested. Talk soon!"
```

---

## Follow-Up Sequences

### LinkedIn + Email Combo
**Day 1:** Send LinkedIn connection
**Day 2:** Accept + thank you message
**Day 3:** Send Email 1
**Day 5:** LinkedIn voice message
**Day 7:** Email 2
**Day 10:** LinkedIn comment on their post
**Day 12:** Email 3
**Day 15:** LinkedIn direct pitch
**Day 20:** Email 4
**Day 25:** Email 5 (breakup)

---

## Metrics to Track

### Email Metrics
- **Delivered:** >95%
- **Opened:** >25%
- **Replied:** >5%
- **Clicked (assessment):** >3%
- **Meetings booked:** >2%

### LinkedIn Metrics
- **Connection accepted:** >30%
- **Message replied:** >10%
- **Meeting booked:** >2%

### Overall Funnel
- **Discovery calls:** 5/week
- **Close rate:** 20-40%
- **New customers:** 1-2/week
- **CAC:** $100-200 per customer

---

## Tools Setup Checklist

### Week 1
- [ ] Create outreach.blakemcginn.com subdomain
- [ ] Set up Postmark for subdomain
- [ ] Configure DNS records (SPF, DKIM, DMARC)
- [ ] Sign up for Apollo.io
- [ ] Connect Apollo to Postmark
- [ ] Import 50 leads
- [ ] Write personalized first lines for each
- [ ] Set up tracking (UTM parameters)

### Week 2
- [ ] Start email warm-up
- [ ] Send first 10 emails
- [ ] Monitor deliverability
- [ ] A/B test subject lines
- [ ] Connect with 50 people on LinkedIn
- [ ] Post first piece of content

---

## Personalization At Scale

### Use Apollo.io Data Points
- {{first_name}}
- {{company.name}}
- {{company.industry}}
- {{title}}
- {{company.size}}
- {{company.location}}
- {{technologies}} (what tools they use)
- {{recent_news}} (funding, hiring, etc.)

### Custom First Lines
Spend 30 seconds per email to write a custom first line:

**Examples:**
- "Noticed {{company.name}} just raised a Series A - congrats!"
- "Saw you're hiring for {{role}} - growth mode?"
- "Love the work {{company.name}} is doing in {{industry}}"
- "Fellow Chicago business owner here - how's the winter treating you?"

---

## Automation Rules

### Stop Sequence If:
- They reply (any reply)
- They book a meeting
- They unsubscribe
- They mark as spam

### Move to Nurture If:
- They say "not now"
- They say "maybe later"
- They say "6 months"

### Immediate Escalation If:
- They say "interested"
- They ask for pricing
- They ask for a call

---

## Legal/Compliance

### CAN-SPAM Requirements
- [ ] Include physical address in email
- [ ] Provide unsubscribe link
- [ ] Honor unsubscribe requests within 10 days
- [ ] Clear "From" name and email

### GDPR (if targeting EU)
- [ ] Legitimate interest basis
- [ ] Clear opt-out mechanism
- [ ] Don't contact if they've opted out

---

**Ready to launch:** Copy these templates into Apollo.io or your email tool of choice.

**First 10 emails:** Send manually to ensure deliverability and learn what works.

**Scale:** After 50 emails with good metrics, automate the sequence.
