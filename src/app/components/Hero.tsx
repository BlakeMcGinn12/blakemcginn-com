"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Bot, Clock, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 pt-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-6"
        >
          AI Agent Consultant
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          Hire AI Employees{" "}
          <span className="gradient-text">Starting at $300</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-[#9ca3af] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Build a team of AI agents that work 24/7, never call in sick, 
          and handle the repetitive tasks eating your time.
        </motion.p>

        {/* Value Props */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          <div className="flex items-center gap-2 text-[#9ca3af]">
            <Bot className="w-5 h-5 text-[#00d4ff]" />
            <span>Custom AI Agents</span>
          </div>
          <div className="flex items-center gap-2 text-[#9ca3af]">
            <Clock className="w-5 h-5 text-[#00d4ff]" />
            <span>24/7 Operation</span>
          </div>
          <div className="flex items-center gap-2 text-[#9ca3af]">
            <Shield className="w-5 h-5 text-[#00d4ff]" />
            <span>Secure & Private</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="/assessment"
            className="group px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] hover:opacity-90 transition-all duration-200 flex items-center gap-2"
          >
            Analyze Your Tasks
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          <a
            href="#pricing"
            className="px-8 py-4 text-base font-semibold text-white rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            View Pricing
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">$0.50</div>
            <div className="text-sm text-[#9ca3af] mt-1">Per Hour of Work</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">24/7</div>
            <div className="text-sm text-[#9ca3af] mt-1">Always On</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold gradient-text">10x</div>
            <div className="text-sm text-[#9ca3af] mt-1">Faster Response</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[#9ca3af]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
