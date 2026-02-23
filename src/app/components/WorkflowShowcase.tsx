"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Clock, Zap, Mail, Calendar, FileText, Search, MessageSquare, Truck, Package, MapPin, ClipboardCheck, BarChart3 } from "lucide-react";

const workflows = [
  {
    id: "leads",
    title: "Lead Capture & Response",
    icon: Mail,
    category: "Marketing",
    timeBefore: "2 hours/day",
    timeAfter: "5 minutes/day",
    description: "Never lose a lead to slow response times",
    steps: [
      { icon: Mail, label: "Inquiry Received", color: "#00d4ff" },
      { icon: Zap, label: "AI Qualifies", color: "#7b2cbf" },
      { icon: FileText, label: "Sends Proposal", color: "#00d4ff" },
      { icon: Calendar, label: "Books Meeting", color: "#7b2cbf" },
      { icon: MessageSquare, label: "You Get Summary", color: "#22c55e" }
    ]
  },
  {
    id: "content",
    title: "Content Machine",
    icon: FileText,
    category: "Marketing",
    timeBefore: "8 hours/week",
    timeAfter: "30 minutes/week",
    description: "Turn one idea into a week of content",
    steps: [
      { icon: MessageSquare, label: "Voice Note", color: "#00d4ff" },
      { icon: Zap, label: "AI Expands", color: "#7b2cbf" },
      { icon: FileText, label: "Blog Post", color: "#00d4ff" },
      { icon: MessageSquare, label: "5 Social Posts", color: "#7b2cbf" },
      { icon: Mail, label: "Newsletter", color: "#22c55e" }
    ]
  },
  {
    id: "research",
    title: "Research Assistant",
    icon: Search,
    category: "Research",
    timeBefore: "4 hours/week",
    timeAfter: "15 minutes/week",
    description: "Intelligence gathering on autopilot",
    steps: [
      { icon: Clock, label: "Daily Trigger", color: "#00d4ff" },
      { icon: Search, label: "Scrapes 10 Sources", color: "#7b2cbf" },
      { icon: Zap, label: "AI Synthesizes", color: "#00d4ff" },
      { icon: FileText, label: "Creates Report", color: "#7b2cbf" },
      { icon: MessageSquare, label: "Slack Summary", color: "#22c55e" }
    ]
  },
  {
    id: "logistics",
    title: "Logistics Command Center",
    icon: Truck,
    category: "Custom",
    timeBefore: "6 hours/day",
    timeAfter: "30 minutes/day",
    description: "Route optimization, tracking, and dispatch — fully automated",
    custom: true,
    steps: [
      { icon: Package, label: "Orders Received", color: "#00d4ff" },
      { icon: Zap, label: "AI Optimizes Routes", color: "#7b2cbf" },
      { icon: Truck, label: "Auto-Dispatches", color: "#00d4ff" },
      { icon: MapPin, label: "Real-Time Tracking", color: "#7b2cbf" },
      { icon: ClipboardCheck, label: "Delivery Confirmed", color: "#22c55e" }
    ],
    details: {
      what: "A fully integrated logistics automation system that handles order intake, route optimization, driver dispatch, customer notifications, and delivery confirmation — all without human intervention.",
      integrations: ["Shopify/WooCommerce", "Google Maps API", "SMS Gateway", "Fleet Management", "Customer Database"],
      roi: "3,200% ROI in first year — $50K+ saved on dispatch labor"
    }
  }
];

export default function WorkflowShowcase() {
  const [activeWorkflow, setActiveWorkflow] = useState(workflows[0]);
  const [showDetails, setShowDetails] = useState(false);

  const isCustom = activeWorkflow.id === "logistics";

  return (
    <section id="workflows" className="py-24 lg:py-32 px-6 lg:px-8 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What AI Agents Actually Do
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
            From marketing to logistics — watch your repetitive tasks transform into automated workflows
          </p>
        </motion.div>

        {/* Category Label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {workflows.map((workflow) => (
            <button
              key={workflow.id}
              onClick={() => {
                setActiveWorkflow(workflow);
                setShowDetails(false);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeWorkflow.id === workflow.id
                  ? "bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white"
                  : "bg-[#12121a] text-[#9ca3af] hover:text-white border border-[#27272a]"
              }`}
            >
              <span className="flex items-center gap-2">
                <workflow.icon className="w-4 h-4" />
                {workflow.title}
                {workflow.custom && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">CUSTOM</span>
                )}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Workflow Visualization */}
        <motion.div
          key={activeWorkflow.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#12121a] rounded-3xl p-8 md:p-12 border border-[#27272a]"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-[#00d4ff] font-medium uppercase tracking-wider">
                  {activeWorkflow.category}
                </span>
                {isCustom && (
                  <span className="text-xs bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white px-2 py-0.5 rounded-full">
                    Custom Build
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">{activeWorkflow.title}</h3>
              <p className="text-[#9ca3af]">{activeWorkflow.description}</p>
            </div>
            
            {/* Time Comparison */}
            <div className="flex items-center gap-6 bg-[#0a0a0f] rounded-2xl p-4">
              <div className="text-center">
                <p className="text-xs text-[#9ca3af] mb-1">Before</p>
                <p className="text-lg font-semibold text-red-400">{activeWorkflow.timeBefore}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#9ca3af]" />
              <div className="text-center">
                <p className="text-xs text-[#9ca3af] mb-1">After</p>
                <p className="text-lg font-semibold text-[#22c55e]">{activeWorkflow.timeAfter}</p>
              </div>
            </div>
          </div>

          {/* Custom Details Toggle */}
          {isCustom && (
            <div className="mb-8">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-[#00d4ff] hover:text-white transition-colors flex items-center gap-2"
              >
                {showDetails ? "Hide Details" : "View Custom Implementation Details"}
                <ArrowRight className={`w-4 h-4 transition-transform ${showDetails ? "rotate-90" : ""}`} />
              </button>
              
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 bg-[#0a0a0f] rounded-2xl p-6 border border-[#27272a]"
                >
                  <p className="text-[#9ca3af] mb-4">{activeWorkflow.details?.what}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Integrations</h4>
                      <ul className="space-y-1">
                        {activeWorkflow.details?.integrations.map((int, i) => (
                          <li key={i} className="text-sm text-[#9ca3af] flex items-center gap-2">
                            <Zap className="w-3 h-3 text-[#00d4ff]" />
                            {int}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">ROI</h4>
                      <p className="text-sm text-[#22c55e]">{activeWorkflow.details?.roi}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Steps Visualization */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d4ff]/20 via-[#7b2cbf]/20 to-[#22c55e]/20 hidden md:block" />
            
            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {activeWorkflow.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Circle */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"
                    style={{ backgroundColor: `${step.color}20`, border: `2px solid ${step.color}` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  
                  {/* Step Label */}
                  <p className="text-center text-sm text-white font-medium">{step.label}</p>
                  
                  {/* Arrow (mobile only) */}
                  {index < activeWorkflow.steps.length - 1 && (
                    <div className="flex justify-center my-4 md:hidden">
                      <ArrowRight className="w-5 h-5 text-[#9ca3af] rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Result Badge */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-6 py-3">
              <Zap className="w-5 h-5 text-[#22c55e]" />
              <span className="text-[#22c55e] font-medium">
                {isCustom 
                  ? "Custom implementation starting at $5,000"
                  : `You save ${activeWorkflow.timeBefore.replace('/day', '').replace('/week', '')} per day`
                }
              </span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[#9ca3af] mb-4">
            {isCustom 
              ? "Need a custom logistics solution? Let's talk."
              : "Want to see what workflows work for your business?"
            }
          </p>
          <a
            href="/assessment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200"
          >
            {isCustom ? "Discuss Custom Build" : "Analyze Your Tasks"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
