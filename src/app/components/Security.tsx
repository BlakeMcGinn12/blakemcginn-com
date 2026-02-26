"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server, Eye, CheckCircle, AlertTriangle } from "lucide-react";

const securityFeatures = [
  {
    icon: Server,
    title: "Local-First Architecture",
    description: "AI agents run on your local machine, keeping your configuration and credentials on your device. However, AI processing requires sending data to external APIs (Claude, OpenAI) which have their own security practices.",
    benefits: [
      "Configuration and credentials stored locally",
      "You control the deployment environment",
      "Choose between local or cloud AI models",
      "Full visibility into data flows"
    ]
  },
  {
    icon: Lock,
    title: "Standard Encryption",
    description: "Data is encrypted in transit using industry-standard TLS. Credentials are stored securely on your local device, not on external servers.",
    benefits: [
      "TLS 1.3 for API communications",
      "Local credential storage",
      "No central database of client data",
      "You manage your own encryption keys"
    ]
  },
  {
    icon: Eye,
    title: "Permission Controls",
    description: "You decide exactly what each AI agent can access. Grant only the permissions needed for specific tasks, and revoke access anytime.",
    benefits: [
      "Granular API permissions",
      "Service account isolation",
      "Easy credential rotation",
      "Audit trail of agent actions"
    ]
  },
  {
    icon: Shield,
    title: "Transparency First",
    description: "Unlike black-box SaaS tools, you can see exactly what data flows where. This gives you control to implement compliance measures that fit your requirements.",
    benefits: [
      "Open source components",
      "Visible data processing pipeline",
      "No hidden data collection",
      "You own your configuration"
    ]
  }
];

export default function Security() {
  return (
    <section id="security" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-blue-400 tracking-wider uppercase mb-4">
            Security & Privacy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            You Control Your Data
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            AI agents run locally on your machine, giving you transparency and control over your data. 
            However, AI features require sending data to external APIs — here's what that means for your security.
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-amber-900/30 border border-amber-700/50 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-200 mb-2">Important: AI Processing Happens Externally</h3>
              <p className="text-amber-100/80 text-sm">
                AI agents run locally, but AI features (Claude, GPT) send data to external APIs for processing. 
                These providers (Anthropic, OpenAI) have their own security and data handling policies. 
                For sensitive data, consider using local models or reviewing provider terms.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800 rounded-2xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Custom AI Setup</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Runs on your machine
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  You own the configuration
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Transparent data flow
                </li>
              </ul>
            </div>
            <div className="text-center md:border-x md:border-slate-700 px-8">
              <div className="w-16 h-16 bg-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">SaaS AI Tools</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-slate-400">•</span>
                  Hosted on vendor servers
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-slate-400">•</span>
                  Vendor controls your data
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-slate-400">•</span>
                  Black-box processing
                </li>
              </ul>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Virtual Assistants</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-slate-400">•</span>
                  Human access to data
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-slate-400">•</span>
                  Limited by work hours
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-slate-400">•</span>
                  Training variability
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
              <ul className="space-y-2 ml-16">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Data Flow Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-slate-800 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold mb-4">What Data Goes Where</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-400 mb-2">Stays Local</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Your AI agent configuration</li>
                <li>• API credentials and tokens</li>
                <li>• Workflow definitions</li>
                <li>• Local file system access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-amber-400 mb-2">Sent to External APIs</h4>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>• Prompts sent to Claude/OpenAI</li>
                <li>• Email content for processing</li>
                <li>• Document text for analysis</li>
                <li>• Web content for research</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            External API providers typically do not train models on API data, but they do process and temporarily store 
            it. Review their privacy policies for specifics.
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6">
            Have specific security or compliance requirements? Let&apos;s discuss what setup works for you.
          </p>
          <a
            href="mailto:blake@blakemcginn.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Schedule a Security Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
