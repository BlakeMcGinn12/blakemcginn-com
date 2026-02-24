"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Plus, Send, X, Mail, ArrowRight } from "lucide-react";

const categories = [
  { id: "communication", label: "Communication" },
  { id: "research", label: "Research" },
  { id: "content", label: "Content" },
  { id: "data", label: "Data & Reports" },
  { id: "sales", label: "Sales & CRM" },
  { id: "operations", label: "Operations" },
];

const skills = [
  // Communication
  { name: "Email Management", category: "communication", icon: "📧", popular: true },
  { name: "Calendar Scheduling", category: "communication", icon: "📅", popular: true },
  { name: "Meeting Notes", category: "communication", icon: "📝" },
  { name: "Slack Responses", category: "communication", icon: "💬" },
  { name: "SMS Automation", category: "communication", icon: "📱" },
  { name: "Voice Transcription", category: "communication", icon: "🎤" },
  
  // Research
  { name: "Market Research", category: "research", icon: "🔍", popular: true },
  { name: "Competitor Analysis", category: "research", icon: "📊", popular: true },
  { name: "News Monitoring", category: "research", icon: "📰" },
  { name: "Trend Tracking", category: "research", icon: "📈" },
  { name: "Price Monitoring", category: "research", icon: "💰" },
  { name: "Report Generation", category: "research", icon: "📑" },
  
  // Content
  { name: "Blog Writing", category: "content", icon: "✍️", popular: true },
  { name: "Social Media Posts", category: "content", icon: "📱", popular: true },
  { name: "Email Newsletters", category: "content", icon: "📧" },
  { name: "Ad Copy", category: "content", icon: "🎯" },
  { name: "Video Scripts", category: "content", icon: "🎬" },
  { name: "Proposal Drafting", category: "content", icon: "📄" },
  
  // Data
  { name: "Spreadsheet Automation", category: "data", icon: "📊" },
  { name: "Data Entry", category: "data", icon: "⌨️" },
  { name: "Report Building", category: "data", icon: "📈" },
  { name: "CRM Updates", category: "data", icon: "🗄️", popular: true },
  { name: "Analytics Summaries", category: "data", icon: "📉" },
  { name: "Invoice Processing", category: "data", icon: "🧾" },
  
  // Sales
  { name: "Lead Qualification", category: "sales", icon: "🎯", popular: true },
  { name: "Proposal Generation", category: "sales", icon: "📋" },
  { name: "Follow-up Sequences", category: "sales", icon: "🔄", popular: true },
  { name: "Demo Scheduling", category: "sales", icon: "🤝" },
  { name: "Contract Drafting", category: "sales", icon: "⚖️" },
  { name: "Pipeline Updates", category: "sales", icon: "🔄" },
  
  // Operations
  { name: "Task Management", category: "operations", icon: "✅" },
  { name: "Document Processing", category: "operations", icon: "📁" },
  { name: "Onboarding Flows", category: "operations", icon: "👋" },
  { name: "Inventory Tracking", category: "operations", icon: "📦" },
  { name: "Approval Workflows", category: "operations", icon: "✓" },
  { name: "Compliance Checks", category: "operations", icon: "🛡️" },
];

export default function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [interestedSkills, setInterestedSkills] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const toggleSkill = (skillName: string) => {
    setInterestedSkills(prev => 
      prev.includes(skillName) 
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && interestedSkills.length > 0) {
      // TODO: Send to your backend/email service
      console.log({ email, interestedSkills });
      setSubmitted(true);
    }
  };

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-blue-700 tracking-wider uppercase mb-4">
            What We Can Build
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            36+ Skills Your AI Assistant Can Learn
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Click the skills you&apos;re interested in. We&apos;ll build a custom solution 
            for exactly what you need.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-blue-700 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Skills
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
        >
          {filteredSkills.map((skill, index) => {
            const isSelected = interestedSkills.includes(skill.name);
            return (
              <motion.button
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                onClick={() => toggleSkill(skill.name)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-blue-50 border-blue-500 shadow-md"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-medium text-slate-900">{skill.name}</div>
                
                {skill.popular && (
                  <span className="absolute top-2 right-2 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
                    Popular
                  </span>
                )}
                
                {isSelected && (
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Interested List */}
        {interestedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Your Selection ({interestedSkills.length})
              </h3>
              <button
                onClick={() => setInterestedSkills([])}
                className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {interestedSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    onClick={() => toggleSkill(skill)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {!showForm && !submitted && (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Get Quote for These Skills
              </button>
            )}

            {showForm && !submitted && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Send Request
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-900 mb-1">Request Sent!</h4>
                <p className="text-green-700 text-sm">
                  We&apos;ll review your requirements and get back to you within 24 hours.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
