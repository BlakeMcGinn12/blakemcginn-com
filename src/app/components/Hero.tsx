"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Users, Zap, Shield, Briefcase } from "lucide-react";
import InteractiveBackground from "./InteractiveBackground";

const recognizedApps = [
  "Slack", "Microsoft Outlook", "Gmail", "Google Calendar", 
  "Zoom", "Notion", "HubSpot", "Salesforce",
  "Zapier", "Mailchimp", "Calendly", "Stripe",
  "QuickBooks", "Xero", "Shopify", "WordPress",
  "Figma", "GitHub", "Trello", "Asana",
  "Dropbox", "Google Drive", "OneDrive", "Box",
  "Twitter/X", "LinkedIn", "Instagram", "YouTube",
  "Airtable", "Typeform", "Webflow", "Framer"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Interactive Background Container - Positioned to fill section */}
      <div className="absolute" style={{ zIndex: 0, top: 0, left: 0, right: 0, bottom: 0 }}>
        <InteractiveBackground />
      </div>
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/50 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20" style={{ zIndex: 2, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">B</div>
              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">M</div>
            </div>
            <span className="text-sm text-slate-600">Trusted by 50+ business leaders</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Custom AI Automation
            <span className="block text-blue-700">Built for Your Business</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            I help CEOs and business leaders implement practical AI solutions. 
            From automated workflows to intelligent agents that handle your repetitive tasks—
            <span className="text-slate-900 font-medium">customized to your exact needs.</span>
          </p>
        </motion.div>

        {/* Key Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { icon: Users, text: "Personal Assistant (OpenClaw) Setup" },
            { icon: Zap, text: "API Integrations" },
            { icon: Briefcase, text: "Automation Workflows" },
            { icon: Shield, text: "Agentic Workflows" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
              <item.icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-slate-700 font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="/assessment"
            className="group inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20"
          >
            Get Your Custom Setup
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#integrations"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
          >
            See What We Can Connect
          </a>
        </motion.div>

        {/* App Integrations Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-200 pt-12"
        >
          <p className="text-center text-sm text-slate-500 mb-6 uppercase tracking-wide">
            Works with the tools you already use
          </p>
          
          <div className="relative overflow-hidden">
            <div className="flex gap-8 animate-marquee">
              {[...recognizedApps, ...recognizedApps].map((app, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm"
                >
                  <span className="text-sm font-medium text-slate-700">{app}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">$300</div>
            <div className="text-sm text-slate-500">Starting Price</div>
          </div>
          <div className="text-center border-x border-slate-200">
            <div className="text-3xl font-bold text-slate-900">1 Week</div>
            <div className="text-sm text-slate-500">Typical Setup</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900">100%</div>
            <div className="text-sm text-slate-500">Custom Built</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
    </section>
  );
}
