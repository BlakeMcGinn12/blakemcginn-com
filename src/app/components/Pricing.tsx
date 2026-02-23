"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$300",
    description: "Get your first AI employee running",
    features: [
      "OpenClaw setup & configuration",
      "Key skills installation (5-10 essential)",
      "2 personalized workflows",
      "30-minute handoff training",
      "Email support (48hr response)",
      "30-day warranty"
    ],
    cta: "Get Started",
    popular: false,
    bestFor: "Solopreneurs, first-time AI adopters"
  },
  {
    name: "Growth",
    price: "$1,000",
    description: "Build your AI team",
    features: [
      "Everything in Starter, plus:",
      "3 AI agents configured",
      "Full integrations (CRM, calendar, email)",
      "Custom skills development",
      "4 advanced workflows",
      "Priority support (24hr response)",
      "60-day warranty"
    ],
    cta: "Scale Your Operations",
    popular: true,
    bestFor: "Growing businesses, 2-10 employees"
  },
  {
    name: "Scale",
    price: "$5,000",
    description: "Unlimited AI operations",
    features: [
      "Unlimited AI agents",
      "Unlimited workflows",
      "Custom API development",
      "Advanced integrations",
      "90-day support + optimization",
      "Monthly strategy calls",
      "Dedicated implementation specialist"
    ],
    cta: "Talk to Sales",
    popular: false,
    bestFor: "Established businesses, agencies"
  }
];

const supportTier = {
  name: "Ongoing Support",
  price: "$100",
  period: "/month",
  description: "Keep your agents sharp",
  features: [
    "Monthly optimization check-in",
    "Workflow tweaks & updates",
    "New skill installations (up to 3/mo)",
    "Troubleshooting & support",
    "Priority email/Slack access",
    "Quarterly ROI review"
  ]
};

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 px-6 lg:px-8">
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
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Hire AI Employees Starting at $300
          </h2>
          <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
            One-time setup. No hidden fees. Your agents run 24/7 for pennies per hour.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                tier.popular
                  ? "bg-gradient-to-b from-[#00d4ff]/20 to-[#7b2cbf]/20 border-2 border-[#00d4ff]"
                  : "bg-[#12121a] border border-[#27272a]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-[#9ca3af] text-sm">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{tier.price}</span>
                <span className="text-[#9ca3af]"> one-time</span>
              </div>

              <p className="text-xs text-[#9ca3af] mb-6">
                Best for: {tier.bestFor}
              </p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#22c55e] flex-shrink-0 mt-0.5" />
                    <span className="text-[#9ca3af] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/assessment"
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-opacity duration-200 ${
                  tier.popular
                    ? "bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white hover:opacity-90"
                    : "bg-[#27272a] text-white hover:bg-[#3f3f46]"
                }`}
              >
                {tier.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Support Tier */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#12121a] rounded-3xl p-8 md:p-12 border border-[#27272a] max-w-3xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#00d4ff]" />
                <h3 className="text-xl font-semibold text-white">{supportTier.name}</h3>
              </div>
              <p className="text-[#9ca3af] mb-4">{supportTier.description}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-white">{supportTier.price}</span>
                <span className="text-[#9ca3af]">{supportTier.period}</span>
              </div>
              <ul className="space-y-2">
                {supportTier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <Check className="w-4 h-4 text-[#22c55e]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <a
                href="/assessment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#27272a] text-white font-semibold rounded-xl hover:bg-[#3f3f46] transition-colors duration-200"
              >
                Add Support
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-[#9ca3af] mb-6">Trusted by businesses saving 10+ hours per week</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[#9ca3af]">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#22c55e]" />
              30-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#22c55e]" />
              No Hidden Fees
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#22c55e]" />
              Cancel Support Anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
