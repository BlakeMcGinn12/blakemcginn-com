"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server, Eye, CheckCircle } from "lucide-react";

const securityFeatures = [
  {
    icon: Server,
    title: "Your Data Stays With You",
    description: "Unlike most AI services, your data never leaves your environment. Your personal assistant (OpenClaw) runs on your local machine or your own AWS account—not on my servers.",
    benefits: [
      "Complete data sovereignty",
      "No third-party data mining",
      "You control all access permissions",
      "Easy to audit and monitor"
    ]
  },
  {
    icon: Lock,
    title: "Bank-Level Encryption",
    description: "All data is protected with the same encryption standards used by banks and financial institutions.",
    benefits: [
      "TLS 1.3 for data in transit",
      "AES-256 encryption at rest",
      "Secure credential storage",
      "No plaintext passwords ever stored"
    ]
  },
  {
    icon: Eye,
    title: "Principle of Least Privilege",
    description: "Every AI agent operates with the minimum permissions necessary. They can only access what you explicitly allow.",
    benefits: [
      "Granular permission controls",
      "Approval workflows for sensitive actions",
      "Detailed audit logs",
      "One-click access revocation"
    ]
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "The architecture supports SOC 2, GDPR, and HIPAA requirements. Perfect for businesses with strict compliance needs.",
    benefits: [
      "Full audit trails",
      "Custom data retention policies",
      "PII detection and masking",
      "Documentation for compliance audits"
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
            Your Data Never Leaves Your Control
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Most AI tools require you to send your data to their servers. 
            I don&apos;t. Your AI assistant runs entirely in your environment.
          </p>
        </motion.div>

        {/* Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-800 rounded-2xl p-8 mb-16"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">My Service</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Data stays in your environment
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  You own everything
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Full audit control
                </li>
              </ul>
            </div>
            <div className="text-center md:border-x md:border-slate-700 px-8">
              <div className="w-16 h-16 bg-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Generic AI Tools</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-red-400">✗</span>
                  Data sent to their servers
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-red-400">✗</span>
                  Used for model training
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-red-400">✗</span>
                  Limited audit visibility
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
                  <span className="text-red-400">✗</span>
                  Human sees your data
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-red-400">✗</span>
                  Limited by work hours
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-red-400">✗</span>
                  Turnover & training issues
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6">
            Have specific security requirements? Let&apos;s discuss your needs.
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
