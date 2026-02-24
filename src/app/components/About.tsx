"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-blue-700 tracking-wider uppercase mb-4">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              I Help Business Leaders Implement Practical AI
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                I work directly with CEOs, founders, and business leaders to cut through the AI hype 
                and build systems that actually save time and money. No jargon, no unnecessary complexity—
                just practical automation that works.
              </p>
              <p>
                Every solution is custom-built for your specific workflows, integrated with the tools 
                you already use, and designed to grow with your business. You own everything, and 
                I&apos;ll train your team to manage it.
              </p>
              <p>
                Based in Chicago, working with clients nationwide. Let&apos;s talk about what 
                automation could do for your business.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/assessment"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="mailto:blake@blakemcginn.com"
                className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Me
              </a>
            </div>
          </motion.div>

          {/* Right: Stats/Trust */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">50+</div>
              <div className="text-slate-600">Businesses Helped</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
              <div className="text-slate-600">Hours Saved Weekly</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">$300</div>
              <div className="text-slate-600">Starting Price</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
              <div className="text-slate-600">Custom Built</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
