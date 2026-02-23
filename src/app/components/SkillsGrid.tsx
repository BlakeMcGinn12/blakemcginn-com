"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Mail, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Search, 
  BarChart3,
  Database,
  Globe,
  Image,
  Video,
  Phone,
  Clipboard,
  TrendingUp,
  Users,
  Share2,
  Code,
  Lock,
  Zap,
  Cpu
} from "lucide-react";

const categories = [
  { id: "all", label: "All Skills" },
  { id: "communication", label: "Communication" },
  { id: "research", label: "Research" },
  { id: "content", label: "Content" },
  { id: "data", label: "Data" },
  { id: "sales", label: "Sales" }
];

const skills = [
  // Communication
  { name: "Email Drafting", icon: Mail, category: "communication", popular: true },
  { name: "Slack Messaging", icon: MessageSquare, category: "communication" },
  { name: "Calendar Scheduling", icon: Calendar, category: "communication", popular: true },
  { name: "Meeting Transcription", icon: FileText, category: "communication" },
  { name: "Follow-up Reminders", icon: Zap, category: "communication" },
  { name: "SMS Automation", icon: Phone, category: "communication" },
  
  // Research
  { name: "Web Scraping", icon: Globe, category: "research", popular: true },
  { name: "Competitor Monitoring", icon: Search, category: "research", popular: true },
  { name: "Price Tracking", icon: TrendingUp, category: "research" },
  { name: "News Aggregation", icon: FileText, category: "research" },
  { name: "Trend Analysis", icon: BarChart3, category: "research" },
  { name: "Report Generation", icon: Clipboard, category: "research" },
  
  // Content
  { name: "Blog Writing", icon: FileText, category: "content", popular: true },
  { name: "Social Posts", icon: Share2, category: "content", popular: true },
  { name: "Image Generation", icon: Image, category: "content" },
  { name: "Video Scripts", icon: Video, category: "content" },
  { name: "Email Sequences", icon: Mail, category: "content" },
  { name: "Ad Copy", icon: Zap, category: "content" },
  
  // Data
  { name: "Spreadsheet Management", icon: Database, category: "data" },
  { name: "Data Cleaning", icon: Code, category: "data" },
  { name: "Report Building", icon: BarChart3, category: "data" },
  { name: "CRM Updates", icon: Users, category: "data", popular: true },
  { name: "Analytics Summaries", icon: TrendingUp, category: "data" },
  { name: "Database Queries", icon: Lock, category: "data" },
  
  // Sales
  { name: "Lead Qualification", icon: Users, category: "sales", popular: true },
  { name: "Proposal Generation", icon: FileText, category: "sales" },
  { name: "Contract Drafting", icon: Clipboard, category: "sales" },
  { name: "Pipeline Updates", icon: TrendingUp, category: "sales" },
  { name: "Follow-up Sequences", icon: Mail, category: "sales", popular: true },
  { name: "Demo Scheduling", icon: Calendar, category: "sales" }
];

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const popularCount = skills.filter(s => s.popular).length;

  return (
    <section id="skills" className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
            Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            100+ Skills Your AI Agents Can Learn
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
            From email management to complex research — your agents can handle it all
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white"
                  : "bg-[#12121a] text-[#9ca3af] hover:text-white border border-[#27272a]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`relative p-4 rounded-xl border transition-all duration-200 cursor-default ${
                hoveredSkill === skill.name
                  ? "bg-[#1a1a24] border-[#00d4ff]/50"
                  : "bg-[#12121a] border-[#27272a]"
              }`}
            >
              {skill.popular && (
                <span className="absolute -top-2 -right-2 bg-[#00d4ff] text-[#0a0a0f] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  POPULAR
                </span>
              )}
              <div className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                  skill.popular 
                    ? "bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2cbf]/20"
                    : "bg-[#0a0a0f]"
                }`}>
                  <skill.icon className={`w-5 h-5 ${
                    skill.popular ? "text-[#00d4ff]" : "text-[#9ca3af]"
                  }`} />
                </div>
                <span className="text-sm text-white font-medium">{skill.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-white">{skills.length}+</div>
            <div className="text-sm text-[#9ca3af]">Available Skills</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00d4ff]">{popularCount}</div>
            <div className="text-sm text-[#9ca3af]">Most Popular</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">∞</div>
            <div className="text-sm text-[#9ca3af]">Custom Possible</div>
          </div>
        </motion.div>

        {/* Custom Agent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-[#00d4ff]/10 to-[#7b2cbf]/10 rounded-3xl p-8 md:p-12 border border-[#00d4ff]/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-6 h-6 text-[#00d4ff]" />
                <span className="text-[#00d4ff] font-medium">Custom Agents</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Need Something Unique?
              </h3>
              <p className="text-[#9ca3af]">
                Your AI agent can literally do anything on a computer — browse websites, 
                fill forms, process files, send messages. If you can describe it, we can build it.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200"
              >
                View Scale Package
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
