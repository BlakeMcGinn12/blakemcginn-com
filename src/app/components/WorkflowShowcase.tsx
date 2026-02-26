"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, CheckCircle, Users, Cog, Rocket, Terminal, BarChart3, Brain, Zap } from "lucide-react";

const processSteps = [
  {
    id: "discovery",
    title: "Discovery Call",
    icon: Users,
    description: "We start with a 30-minute call to understand your pain points, current workflows, and where AI can make the biggest impact.",
    details: [
      "Audit your current manual processes",
      "Identify time-draining repetitive tasks", 
      "Map out your existing tool stack",
      "Prioritize quick wins vs. strategic builds"
    ]
  },
  {
    id: "design",
    title: "Custom Design",
    icon: Cog,
    description: "I design a tailored automation architecture using sub-agents that work together to handle your specific workflows.",
    details: [
      "Design sub-agent architecture for your needs",
      "Map API connections to your existing tools",
      "Create decision trees and approval workflows",
      "Build in error handling and fallback processes"
    ]
  },
  {
    id: "build",
    title: "Build & Test",
    icon: Rocket,
    description: "Your personal assistant (OpenClaw) is configured with the exact skills and integrations needed for your business.",
    details: [
      "Configure your personal AI assistant",
      "Set up API integrations with your tools",
      "Build custom workflows and automations",
      "Test with real scenarios before go-live"
    ]
  },
  {
    id: "deploy",
    title: "Deploy & Train",
    icon: CheckCircle,
    description: "We go live with hands-on training so your team knows exactly how to work with and manage the AI agents.",
    details: [
      "Deploy to your environment (local or cloud)",
      "Train your team on agent management",
      "Provide documentation and runbooks",
      "30 days of support for fine-tuning"
    ]
  }
];

const integrationExamples = [
  {
    title: "Executive Assistant Workflow",
    description: "Calendar, email, and meeting management",
    integrations: ["Google Calendar", "Gmail", "Slack", "Zoom"],
    timeSaved: "10 hours/week"
  },
  {
    title: "Sales Pipeline Automation",
    description: "Lead qualification and follow-ups",
    integrations: ["HubSpot", "LinkedIn", "Calendly", "Gmail"],
    timeSaved: "8 hours/week"
  },
  {
    title: "Content Marketing Engine",
    description: "Research, write, and distribute content",
    integrations: ["Notion", "Twitter/X", "LinkedIn", "Mailchimp"],
    timeSaved: "12 hours/week"
  },
  {
    title: "Finance & Operations",
    description: "Invoicing, reporting, and tracking",
    integrations: ["QuickBooks", "Stripe", "Google Sheets", "Slack"],
    timeSaved: "6 hours/week"
  }
];

const complexWorkflowExamples = [
  {
    title: "CEO Command Center",
    description: "Multi-agent system that acts as your executive brain—delegating research, scheduling, and communications while autonomously monitoring markets and competitors 24/7.",
    hierarchy: `┌─────────────────────────────────────────┐
│         🎯 CEO Agent (Orchestrator)      │
│    "Handle my day, keep me informed"    │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┼─────────┬──────────┐
    ▼         ▼         ▼          ▼
┌───────┐ ┌────────┐ ┌──────────┐ ┌──────────┐
│Research│ │Scheduling│ │Communication│ │Monitoring│
│ Agent  │ │  Agent   │ │   Agent     │ │  Skills  │
└───┬───┘ └────┬─────┘ └─────┬─────┘ └────┬─────┘
    │          │             │            │
    ▼          ▼             ▼            ▼
• Market intel  • Calendar mgmt  • Slack/Email  • Market alerts
• Competitor    • Meeting prep   • DM routing   • News digests  
• News synthesis • Travel coord  • Summaries    • Trend detect`,
    integrations: ["Slack", "Gmail", "Google Calendar", "News APIs", "CRM", "Notion", "Alpha Vantage"],
    timeSaved: "25 hours/week",
    features: ["Autonomous market monitoring", "Competitor tracking alerts", "Daily executive briefings", "Smart delegation routing"]
  },
  {
    title: "Autonomous Sales System",
    description: "Self-improving sales engine with specialized sub-agents for lead scoring, qualification, and personalized outreach that learns from every interaction.",
    hierarchy: `┌─────────────────────────────────────────────┐
│      🚀 Sales Director Agent                 │
│  "Find, score, and convert our ICPs"        │
└──────────────┬────────────────────────────────┘
               │
    ┌──────────┼──────────┬──────────────┐
    ▼          ▼          ▼              ▼
┌─────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐
│  Lead   │ │Qualification│ │ Outreach │ │Performance │
│ Scoring │ │   Agent     │ │  Agent   │ │  Tracker   │
│  Agent  │ │             │ │          │ │  (Learning)│
└────┬────┘ └─────┬──────┘ └────┬─────┘ └─────┬──────┘
     │            │             │             │
     ▼            ▼             ▼             ▼
• LinkedIn data  • Enrichment   • Personalized • Response tracking
• Firmographic   • ICP matching  • Sequences   • A/B testing
• Behavioral     • Intent scoring • Follow-ups  • Auto-optimization
• Intent signals • Qual scoring   • Calendly    • Strategy adjust`,
    integrations: ["HubSpot", "LinkedIn Sales Navigator", "Gmail", "Calendly", "Apollo", "Clearbit", "OpenAI"],
    timeSaved: "30 hours/week",
    features: ["AI-powered lead scoring", "Industry-specific personas", "Self-optimizing outreach", "Automated follow-up sequences"]
  },
  {
    title: "24/7 Operations Monitor",
    description: "Always-on monitoring suite that watches your financial health, customer sentiment, and competitive landscape—delivering daily intelligence briefings.",
    hierarchy: `┌──────────────────────────────────────────────────┐
│        📊 Operations Command Center               │
│     "Watch everything, alert on anomalies"       │
└────────────────┬─────────────────────────────────┘
                 │
        ┌────────┼────────┬──────────┐
        ▼        ▼        ▼          ▼
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│  Financial │ │  Customer  │ │ Competitor │ │   Daily    │
│  Monitor   │ │  Sentiment │ │   Watch    │ │   Digest   │
│   Skill    │ │   Skill    │ │   Skill    │ │  Generator │
└─────┬──────┘ └─────┬──────┘ └─────┬──────┘ └─────┬──────┘
      │              │              │              │
      ▼              ▼              ▼              ▼
• Stripe/PayPal   • Review sites   • Price tracking • Morning briefing
• Anomaly alerts  • Support tickets • Product changes • Slack digest  
• Cash flow       • Social mentions • News alerts    • Action items
• Forecasting     • NPS tracking    • Hiring signals • Trend summary`,
    integrations: ["Stripe", "QuickBooks", "Twitter/X", "Google Alerts", "Zendesk", "Trustpilot", "Slack", "Notion"],
    timeSaved: "20 hours/week",
    features: ["Financial anomaly detection", "Real-time sentiment tracking", "Competitor price monitoring", "Automated daily digests"]
  },
  {
    title: "Content Intelligence Engine",
    description: "End-to-end content creation pipeline that researches trending topics, writes SEO-optimized drafts, and distributes across channels—learning what resonates.",
    hierarchy: `┌───────────────────────────────────────────────┐
│      📝 Content Director Agent                 │
│   "Create, optimize, and distribute content"  │
└───────────────┬─────────────────────────────────┘
                │
    ┌───────────┼───────────┬──────────────┐
    ▼           ▼           ▼              ▼
┌─────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│ Research│ │ Writing  │ │   SEO    │ │Distribution  │
│  Agent  │ │  Agent   │ │  Agent   │ │   Agent      │
└────┬────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘
     │           │            │              │
     ▼           ▼            ▼              ▼
• Trend analysis  • Draft creation  • Keyword opt  • Social scheduling
• Topic discovery • Tone matching   • Meta tags    • Email campaigns  
• Competitor gaps • Multi-format    • Readability  • Cross-posting
• Audience intel  • Voice training  • SERP analysis • Analytics sync`,
    integrations: ["Notion", "Twitter/X", "LinkedIn", "Mailchimp", "SEMrush", "Ahrefs", "Google Analytics", "Buffer"],
    timeSaved: "35 hours/week",
    features: ["AI trend research", "Multi-channel distribution", "SEO auto-optimization", "Performance learning loop"]
  }
];

export default function WorkflowShowcase() {
  const [expandedStep, setExpandedStep] = useState<string | null>("discovery");
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedComplexExample, setSelectedComplexExample] = useState(0);
  const [showComplexWorkflows, setShowComplexWorkflows] = useState(false);

  return (
    <section id="workflows" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-blue-700 tracking-wider uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Custom Builds for Your Exact Needs
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Every business is different. That&apos;s why we don&apos;t use templates—
            we build sub-agents that integrate with your specific tools and workflows.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {processSteps.map((step, index) => {
              const isExpanded = expandedStep === step.id;
              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl border-2 transition-all duration-300 ${
                    isExpanded ? "border-blue-500 shadow-lg" : "border-slate-200"
                  }`}
                >
                  <button
                    onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    className="w-full flex items-center gap-4 p-6 text-left"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isExpanded ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-blue-700">Step {index + 1}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-slate-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Right: Example Workflows */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 p-8"
          >
            <h3 className="text-xl font-semibold text-slate-900 mb-6">
              Example: {integrationExamples[selectedExample].title}
            </h3>
            
            <p className="text-slate-600 mb-6">
              {integrationExamples[selectedExample].description}
            </p>

            {/* Integration Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {integrationExamples[selectedExample].integrations.map((integration) => (
                <span
                  key={integration}
                  className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {integration}
                </span>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-slate-600 mb-1">Typical Time Saved</div>
              <div className="text-2xl font-bold text-blue-700">
                {integrationExamples[selectedExample].timeSaved}
              </div>
            </div>

            {/* Example Selector */}
            <div className="grid grid-cols-4 gap-2">
              {integrationExamples.map((example, index) => (
                <button
                  key={example.title}
                  onClick={() => setSelectedExample(index)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedExample === index
                      ? "bg-blue-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {example.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Complex Workflow Examples */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 mb-16"
        >
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-purple-700 tracking-wider uppercase mb-4">
              Enterprise Solutions
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Complex Multi-Agent Workflows
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              For businesses ready to deploy sophisticated AI systems with specialized sub-agents working in concert.
            </p>
          </div>

          {/* Complex Example Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {complexWorkflowExamples.map((example, index) => {
              const icons = [Brain, BarChart3, Terminal, Zap];
              const Icon = icons[index];
              return (
                <button
                  key={example.title}
                  onClick={() => setSelectedComplexExample(index)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                    selectedComplexExample === index
                      ? "bg-purple-700 text-white shadow-lg"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {example.title.split(" ")[0]}
                </button>
              );
            })}
          </div>

          {/* Complex Example Detail Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                {selectedComplexExample === 0 && <Brain className="w-8 h-8 text-purple-600" />}
                {selectedComplexExample === 1 && <BarChart3 className="w-8 h-8 text-purple-600" />}
                {selectedComplexExample === 2 && <Terminal className="w-8 h-8 text-purple-600" />}
                {selectedComplexExample === 3 && <Zap className="w-8 h-8 text-purple-600" />}
                <h4 className="text-2xl font-bold text-slate-900">
                  {complexWorkflowExamples[selectedComplexExample].title}
                </h4>
              </div>
              
              <p className="text-slate-600 mb-6 text-lg">
                {complexWorkflowExamples[selectedComplexExample].description}
              </p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Agent Hierarchy */}
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                    Agent Architecture
                  </h5>
                  <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                    <pre className="text-xs text-green-400 font-mono whitespace-pre">
                      {complexWorkflowExamples[selectedComplexExample].hierarchy}
                    </pre>
                  </div>
                </div>

                {/* Features & Integrations */}
                <div className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                      Key Capabilities
                    </h5>
                    <ul className="space-y-2">
                      {complexWorkflowExamples[selectedComplexExample].features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-700">
                          <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Integrations */}
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                      Integrations
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {complexWorkflowExamples[selectedComplexExample].integrations.map((integration) => (
                        <span
                          key={integration}
                          className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm font-medium border border-purple-100"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Time Saved */}
                  <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <div className="text-sm text-slate-600 mb-1">Estimated Time Saved</div>
                    <div className="text-3xl font-bold text-purple-700">
                      {complexWorkflowExamples[selectedComplexExample].timeSaved}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      per week across your team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="/assessment"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Start Your Custom Build
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-slate-500 text-sm">
            Free 30-minute discovery call. No commitment required.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
