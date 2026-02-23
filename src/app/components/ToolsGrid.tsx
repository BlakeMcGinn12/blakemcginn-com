"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  FileText, 
  BarChart3, 
  MessageSquare, 
  TrendingUp, 
  Cpu,
  ArrowRight 
} from "lucide-react";

const tools = [
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Replace repetitive tasks with AI agents that work 24/7",
    details: {
      what: "Automate your marketing operations with intelligent agents that handle lead routing, content scheduling, data syncing, and follow-ups without human intervention.",
      how: [
        "Audit current workflows to identify automation opportunities",
        "Build custom AI agents using n8n, Make, or custom code",
        "Integrate with your existing stack (CRM, email, ads)",
        "Monitor and optimize performance over time"
      ],
      caseStudy: "A B2B SaaS company reduced manual work by 60% and improved lead response time from 4 hours to 5 minutes."
    }
  },
  {
    icon: FileText,
    title: "Content Generation",
    description: "Blogs, social posts, emails — created in minutes, not hours",
    details: {
      what: "Scale your content production with AI that maintains your brand voice and quality standards across all channels.",
      how: [
        "Train AI models on your brand voice and top-performing content",
        "Set up automated content pipelines for blogs, social, and email",
        "Implement human-in-the-loop review processes",
        "Optimize based on engagement data and feedback"
      ],
      caseStudy: "A marketing agency increased content output by 400% while maintaining editorial quality standards."
    }
  },
  {
    icon: BarChart3,
    title: "Data Intelligence",
    description: "Turn your scattered data into actionable predictions",
    details: {
      what: "Unify your marketing data sources and apply AI to uncover insights that drive better decision-making.",
      how: [
        "Connect all data sources (CRM, analytics, ads, email)",
        "Build unified customer data platform",
        "Apply ML models for attribution and forecasting",
        "Create automated dashboards and alerts"
      ],
      caseStudy: "An e-commerce brand improved ROAS by 35% through AI-powered attribution modeling."
    }
  },
  {
    icon: MessageSquare,
    title: "AI Assistants",
    description: "Custom chatbots for support, sales, and lead qualification",
    details: {
      what: "Deploy intelligent conversational AI that handles customer inquiries, qualifies leads, and drives conversions around the clock.",
      how: [
        "Design conversation flows for your specific use cases",
        "Train on your product docs, FAQs, and past conversations",
        "Integrate with your website, Slack, and messaging platforms",
        "Continuously improve based on conversation analytics"
      ],
      caseStudy: "A real estate firm automated 80% of initial inquiries and increased qualified leads by 45%."
    }
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    description: "See market trends and customer behavior before competitors",
    details: {
      what: "Use machine learning to forecast trends, predict churn, and identify high-value opportunities before they become obvious.",
      how: [
        "Analyze historical patterns in your market and customer data",
        "Build predictive models for churn, LTV, and demand",
        "Set up automated scoring and segmentation",
        "Create early warning systems for key metrics"
      ],
      caseStudy: "A subscription business reduced churn by 25% through predictive intervention campaigns."
    }
  },
  {
    icon: Cpu,
    title: "Custom AI Models",
    description: "Proprietary models trained specifically on your business data",
    details: {
      what: "When off-the-shelf AI isn't enough, build custom models trained on your unique data and optimized for your specific challenges.",
      how: [
        "Assess feasibility and ROI of custom model development",
        "Prepare and clean your proprietary datasets",
        "Train, validate, and deploy custom models",
        "Monitor performance and retrain as needed"
      ],
      caseStudy: "A financial services firm built a custom model that improved fraud detection accuracy by 40% over generic solutions."
    }
  }
];

export default function ToolsGrid() {
  return (
    <section id="services" className="py-24 lg:py-32 px-6 lg:px-8">
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
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            AI Tools That Transform Your Marketing
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
            From automation to intelligence — here&apos;s how we can work together
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full gradient-border p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2cbf]/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <tool.icon className="w-6 h-6 text-[#00d4ff]" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {tool.title}
                </h3>
                
                <p className="text-[#9ca3af] mb-6 leading-relaxed">
                  {tool.description}
                </p>
                
                <button className="inline-flex items-center gap-2 text-[#00d4ff] font-medium group/btn">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
