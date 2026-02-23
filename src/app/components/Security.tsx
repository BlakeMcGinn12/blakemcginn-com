"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const pillars = [
  {
    icon: Server,
    title: "Local-First Architecture",
    subtitle: "Your Data Stays Yours",
    description: "Unlike cloud-only solutions, your OpenClaw agents run on infrastructure you control. Sensitive customer data, proprietary workflows, and business intelligence never leave your environment unless you explicitly choose to connect external services.",
    points: [
      "Agents run locally or on your AWS account",
      "No data mining or training on your information",
      "Complete data sovereignty"
    ]
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    subtitle: "Encrypted at Rest and In Transit",
    description: "All data is protected with industry-standard encryption protocols used by banks and financial institutions.",
    points: [
      "TLS 1.3 for all data in transit",
      "AES-256 encryption for data at rest",
      "Secure credential storage via AWS Secrets Manager",
      "No plaintext passwords ever stored or logged"
    ]
  },
  {
    icon: Eye,
    title: "Principle of Least Privilege",
    subtitle: "Minimal Access, Maximum Security",
    description: "Every AI agent operates with the minimum permissions necessary. No broad account access by default.",
    points: [
      "Granular scope controls per agent",
      "Approval workflows for sensitive actions",
      "Detailed audit logs of all activities",
      "One-click permission revocation"
    ]
  },
  {
    icon: Shield,
    title: "SOC 2 & Compliance Ready",
    subtitle: "Built for Business Requirements",
    description: "OpenClaw's architecture supports enterprise compliance needs and audit requirements.",
    points: [
      "SOC 2 Type II aligned controls",
      "GDPR-ready data handling",
      "HIPAA-compatible deployment options",
      "Full audit trails available"
    ]
  }
];

type ComparisonValue = true | false | "partial";

const comparisons: { feature: string; us: ComparisonValue; saas: ComparisonValue; va: ComparisonValue }[] = [
  { feature: "Data stays in your environment", us: true, saas: false, va: false },
  { feature: "No training on your data", us: true, saas: false, va: true },
  { feature: "Full audit logs", us: true, saas: "partial", va: false },
  { feature: "Instant access revocation", us: true, saas: "partial", va: false },
  { feature: "Encryption at rest", us: true, saas: true, va: false },
  { feature: "Local legal jurisdiction", us: true, saas: false, va: false }
];

const faqs = [
  {
    question: "Where does my data actually go?",
    answer: "Your OpenClaw agents run on your local machine or your own AWS infrastructure. Data processed by AI models (OpenAI, Claude, etc.) is subject to their privacy policies, but we configure connections to minimize data retention and never use your data for model training."
  },
  {
    question: "Can you see my business data?",
    answer: "No. When agents run locally, only you have access. For managed deployments, we use zero-trust architecture and encrypted channels, but we never access your data without explicit permission for support purposes."
  },
  {
    question: "What happens if an agent makes a mistake?",
    answer: "Agents operate within scoped permissions. They can't delete data, transfer funds, or take irreversible actions without human approval. All actions are logged and can be rolled back."
  },
  {
    question: "Is this compliant with my industry regulations?",
    answer: "The underlying infrastructure (OpenClaw + AWS) supports most major compliance frameworks. Specific compliance (HIPAA, SOC 2, etc.) depends on your deployment configuration. We provide documentation to support your compliance audits."
  },
  {
    question: "How do you handle API keys and credentials?",
    answer: "All credentials are stored in encrypted vaults (AWS Secrets Manager or local keychain). They're never hardcoded, never logged, and rotated automatically when possible."
  }
];

export default function Security() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="security" className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
            Security
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Bank-Level Security for Your AI Operations
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
            Your data never touches our servers. Your AI agents run in isolated, 
            encrypted environments. And you maintain full control.
          </p>
        </motion.div>

        {/* Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#12121a] rounded-2xl p-8 border border-[#27272a] hover:border-[#00d4ff]/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2cbf]/20 flex items-center justify-center mb-6">
                <pillar.icon className="w-6 h-6 text-[#00d4ff]" />
              </div>
              <p className="text-sm text-[#00d4ff] font-medium mb-2">{pillar.subtitle}</p>
              <h3 className="text-xl font-semibold text-white mb-3">{pillar.title}</h3>
              <p className="text-[#9ca3af] mb-4">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <CheckCircle className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#12121a] rounded-3xl p-8 border border-[#27272a] mb-16 overflow-x-auto"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Security Comparison</h3>
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#27272a]">
                <th className="text-left py-4 text-[#9ca3af] font-medium">Feature</th>
                <th className="text-center py-4 text-[#00d4ff] font-medium">Our Service</th>
                <th className="text-center py-4 text-[#9ca3af] font-medium">Generic SaaS</th>
                <th className="text-center py-4 text-[#9ca3af] font-medium">Offshore VA</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, index) => (
                <tr key={index} className="border-b border-[#27272a] last:border-0">
                  <td className="py-4 text-white">{row.feature}</td>
                  <td className="py-4 text-center">
                    {row.us === true ? (
                      <CheckCircle className="w-5 h-5 text-[#22c55e] mx-auto" />
                    ) : row.us === "partial" ? (
                      <span className="text-yellow-500 text-sm">Partial</span>
                    ) : (
                      <span className="text-red-500 text-sm">No</span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {row.saas === true ? (
                      <CheckCircle className="w-5 h-5 text-[#22c55e] mx-auto" />
                    ) : row.saas === "partial" ? (
                      <span className="text-yellow-500 text-sm">Partial</span>
                    ) : (
                      <span className="text-red-500 text-sm">No</span>
                    )}
                  </td>
                  <td className="py-4 text-center">
                    {row.va === true ? (
                      <CheckCircle className="w-5 h-5 text-[#22c55e] mx-auto" />
                    ) : row.va === "partial" ? (
                      <span className="text-yellow-500 text-sm">Partial</span>
                    ) : (
                      <span className="text-red-500 text-sm">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Common Security Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#12121a] rounded-xl border border-[#27272a] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#9ca3af]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#9ca3af]" />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-[#9ca3af]">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white font-medium mb-4">Have specific security requirements?</p>
          <a
            href="mailto:blake@blakemcginn.com?subject=Security Review Request"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200"
          >
            Schedule a Security Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
