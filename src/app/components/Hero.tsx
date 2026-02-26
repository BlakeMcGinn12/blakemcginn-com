"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Users, Zap, Shield, Briefcase, FileText } from "lucide-react";
import InteractiveBackground from "./InteractiveBackground";
import AIReadinessChecklist from "./AIReadinessChecklist";

const recognizedApps = [
  // Communication
  "Slack", "Microsoft Teams", "Discord", "Zoom", "Google Meet",
  // Email
  "Gmail", "Microsoft Outlook", "SendGrid",
  // Calendar
  "Google Calendar", "Calendly", "Microsoft Outlook Calendar",
  // CRM
  "Salesforce", "HubSpot", "Pipedrive", "Zoho CRM",
  // Project Management
  "Asana", "Trello", "Monday.com", "Notion", "Jira", "ClickUp", "Linear",
  // Finance
  "Stripe", "QuickBooks", "Xero", "PayPal", "Wise",
  // Marketing
  "Mailchimp", "Klaviyo", "ActiveCampaign", "ConvertKit",
  // Social Media
  "Twitter/X", "LinkedIn", "Instagram", "Facebook", "TikTok", "Pinterest", "YouTube",
  // Storage
  "Google Drive", "Dropbox", "OneDrive", "Box", "iCloud",
  // E-commerce
  "Shopify", "WooCommerce", "BigCommerce",
  // Analytics
  "Google Analytics", "Mixpanel", "Amplitude",
  // AI/ML
  "OpenAI", "Anthropic", "Groq",
  // Design/Dev
  "Figma", "GitHub", "GitLab", "Webflow", "Framer", "Airtable", "Typeform"
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Interactive Background Container - Full size */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
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
            The Executive's
            <span className="block text-blue-700">AI Assistant</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            You don't need to become an AI expert—that's my job. I handle the complexity of 
            OpenClaw, Claude Code, and Perplexity so you can focus on what you do best.
            <span className="text-slate-900 font-medium"> Practical AI, real results, zero overwhelm.</span>
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
            { icon: Users, text: "OpenClaw/AI Agent Setup" },
            { icon: Briefcase, text: "Claude Code Development" },
            { icon: Shield, text: "Perplexity Computer Workflows" },
            { icon: Zap, text: "API Integrations" },
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
            href="https://calendly.com/blakemcginn/consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20"
          >
            Get Your Custom Setup
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#workflows"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#workflows')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
          >
            See What We Can Connect
          </a>
        </motion.div>

        {/* AI Readiness Checklist */}
        <AIReadinessChecklist />

        {/* Lead Magnet CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <a
            href="/checklist"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#00d4ff]/10 to-[#7b2cbf]/10 border border-[#00d4ff]/30 rounded-full px-6 py-3 hover:border-[#00d4ff]/50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#7b2cbf] flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-700 font-medium">
              Not ready yet? 
              <span className="text-blue-700 group-hover:underline ml-1">
                Take the AI Readiness Quiz
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-[#00d4ff] group-hover:translate-x-1 transition-transform" />
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
          
          <DraggableMarquee apps={recognizedApps} />
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
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Draggable Marquee Component
function DraggableMarquee({ apps }: { apps: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
      container.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - container.offsetLeft);
      setScrollLeft(container.scrollLeft);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, startX, scrollLeft]);

  const duplicatedApps = [...apps, ...apps, ...apps, ...apps];

  return (
    <div 
      ref={containerRef}
      className="relative overflow-x-auto scrollbar-hide cursor-grab select-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div 
        className={`flex gap-4 ${!isDragging ? 'animate-marquee' : ''}`}
        style={{ width: 'max-content' }}
      >
        {duplicatedApps.map((app, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-sm font-medium text-slate-700 whitespace-nowrap">{app}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
