"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo placeholder - replace with actual photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2cbf]/20 flex items-center justify-center overflow-hidden">
              {/* Replace this div with an actual image */}
              <div className="text-center p-8">
                <div className="w-32 h-32 rounded-full bg-[#27272a] mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl">👋</span>
                </div>
                <p className="text-[#9ca3af]">Add your photo here</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7b2cbf] opacity-50 blur-xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Hi, I&apos;m Blake
            </h2>
            <div className="space-y-4 text-[#9ca3af] text-lg leading-relaxed">
              <p>
                I help businesses cut through the AI hype and implement systems that actually drive results. 
                With 5+ years in marketing technology and AI, I&apos;ve seen what works and what&apos;s just noise.
              </p>
              <p>
                My approach is practical: start with your business goals, identify the highest-ROI AI opportunities, 
                and build systems that your team can actually use. No fancy tech for tech&apos;s sake.
              </p>
              <p>
                I&apos;ve worked with startups, agencies, and enterprise teams to automate workflows, 
                generate content at scale, and turn data into competitive advantage. The common thread? 
                Measurable results, not just impressive demos.
              </p>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#12121a] border border-[#27272a] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#00d4ff] transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-[#12121a] border border-[#27272a] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#00d4ff] transition-all duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@blakemcginn.com"
                className="w-12 h-12 rounded-xl bg-[#12121a] border border-[#27272a] flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-[#00d4ff] transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
