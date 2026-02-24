"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ChevronDown, ChevronUp, CheckCircle, Users, Cog, Rocket } from "lucide-react";

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

export default function WorkflowShowcase() {
  const [expandedStep, setExpandedStep] = useState<string | null>("discovery");
  const [selectedExample, setSelectedExample] = useState(0);

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
