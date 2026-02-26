"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, HelpCircle } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$300",
    description: "Perfect for solopreneurs testing AI automation",
    features: [
      "Personal assistant (OpenClaw) setup",
      "5-10 essential skills installed",
      "2 custom workflows built",
      "30-minute training session",
      "Email support (48hr response)",
      "30-day warranty",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth",
    price: "$1,000",
    description: "For growing teams ready to scale operations",
    features: [
      "Everything in Starter, plus:",
      "3 AI agents configured",
      "Full tool integrations (CRM, calendar, email)",
      "4 advanced workflows",
      "Priority support (24hr response)",
      "60-day warranty",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$5,000",
    description: "Unlimited automation for established businesses",
    features: [
      "Unlimited AI agents",
      "Unlimited workflows",
      "Custom API development",
      "Advanced integrations",
      "90-day support + optimization",
      "Monthly strategy calls",
      "Dedicated implementation",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const faqs = [
  {
    q: "What's included in the setup?",
    a: "I handle everything: initial consultation, design of your automation architecture, configuration of your personal AI assistant (OpenClaw), integration with your existing tools, custom workflow building, testing, and team training."
  },
  {
    q: "How long does implementation take?",
    a: "Most projects are completed within 1-2 weeks. Simple setups can be ready in just a few days, while more complex enterprise implementations may take 3-4 weeks depending on requirements."
  },
  {
    q: "Do I need technical knowledge?",
    a: "Not at all. I handle all the technical work. You just need to explain your workflows and pain points. I'll translate that into working automations."
  },
  {
    q: "What tools can you integrate with?",
    a: "Pretty much anything with an API: Slack, Gmail, Outlook, HubSpot, Salesforce, Calendly, Stripe, QuickBooks, Notion, Airtable, Zapier, and 500+ more tools."
  },
  {
    q: "Is my data secure?",
    a: "Yes. Your AI assistant runs in your environment (local or your cloud), not mine. Your data never leaves your control. See the Security section for details."
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-blue-700 tracking-wider uppercase mb-4">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            One-time setup fee. No monthly platform costs. 
            You own the automation outright.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                tier.popular
                  ? "bg-blue-700 text-white shadow-xl"
                  : "bg-slate-50 border border-slate-200"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-slate-900 text-sm font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${tier.popular ? "text-white" : "text-slate-900"}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.popular ? "text-blue-100" : "text-slate-600"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${tier.popular ? "text-white" : "text-slate-900"}`}>
                  {tier.price}
                </span>
                <span className={tier.popular ? "text-blue-100" : "text-slate-500"}>
                  {" "}one-time
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.popular ? "text-blue-200" : "text-blue-600"}`} />
                    <span className={`text-sm ${tier.popular ? "text-blue-50" : "text-slate-700"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="https://calendly.com/blakemcginn/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                  tier.popular
                    ? "bg-white text-blue-700 hover:bg-blue-50"
                    : "bg-blue-700 text-white hover:bg-blue-800"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Ongoing Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-slate-50 rounded-2xl p-8 mb-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Need Ongoing Support?
              </h3>
              <p className="text-slate-600">
                Monthly optimization, new workflow additions, and priority support.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">$100</div>
                <div className="text-sm text-slate-500">/month</div>
              </div>
              <a
                href="https://calendly.com/blakemcginn/consultation"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Add Support
              </a>
            </div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <h4 className="font-semibold text-slate-900">{faq.q}</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
