"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  CheckCircle, 
  FileText, 
  BarChart3, 
  Target, 
  Sparkles,
  Download,
  Mail,
  Shield,
  ArrowRight,
  Check
} from "lucide-react";
import Link from "next/link";

const checklistFeatures = [
  {
    icon: FileText,
    title: "10 Criteria for AI Readiness",
    description: "Comprehensive evaluation covering data, processes, team, and technology"
  },
  {
    icon: BarChart3,
    title: "Score Your Business 0-100",
    description: "Get an objective score to understand where you stand"
  },
  {
    icon: Target,
    title: "Identify Quick Wins vs Strategic Builds",
    description: "Know exactly what to tackle first for maximum impact"
  },
  {
    icon: Sparkles,
    title: "Get Personalized Recommendations",
    description: "Tailored next steps based on your unique situation"
  }
];

const trustBadges = [
  "No spam, unsubscribe anytime",
  "Instant PDF download",
  "Used by 100+ business owners"
];

export default function ChecklistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setError("");

    try {
      // For now, just log to console as requested
      console.log("Checklist download requested for:", email);

      // Call the API endpoint (backend can be added later)
      const response = await fetch("/api/checklist-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        console.warn("API returned error, but continuing with UI flow");
      }

      // Show success regardless of API response for now
      setSubmitted(true);
    } catch (err) {
      console.error("Error:", err);
      // Still show success for demo purposes
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-white">
            Blake McGinn
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-[#9ca3af] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full px-4 py-2 mb-6"
                  >
                    <FileText className="w-4 h-4 text-[#00d4ff]" />
                    <span className="text-sm font-medium text-[#00d4ff]">Free Download</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
                  >
                    Is Your Business{" "}
                    <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] bg-clip-text text-transparent">
                      Ready for AI?
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-[#9ca3af] max-w-2xl mx-auto"
                  >
                    Download our free 10-point checklist to find out where you stand and 
                    what steps to take next.
                  </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left: Features */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-[#12121a] rounded-3xl p-8 border border-[#27272a]">
                      <h2 className="text-xl font-semibold text-white mb-6">
                        What&apos;s Inside
                      </h2>
                      
                      <div className="space-y-6">
                        {checklistFeatures.map((feature, index) => (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#7b2cbf]/20 flex items-center justify-center flex-shrink-0">
                              <feature.icon className="w-6 h-6 text-[#00d4ff]" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium mb-1">
                                {feature.title}
                              </h3>
                              <p className="text-sm text-[#9ca3af]">
                                {feature.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-4">
                      {trustBadges.map((badge) => (
                        <div
                          key={badge}
                          className="flex items-center gap-2 text-sm text-[#9ca3af]"
                        >
                          <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                          {badge}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right: Form */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="bg-[#12121a] rounded-3xl p-8 border border-[#27272a] shadow-2xl shadow-black/50 sticky top-24">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#7b2cbf] flex items-center justify-center mx-auto mb-4">
                          <Download className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          Get Your Free Checklist
                        </h2>
                        <p className="text-[#9ca3af]">
                          Enter your email to download instantly
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@company.com"
                              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-[#00d4ff] focus:outline-none transition-colors duration-200"
                              required
                            />
                          </div>
                        </div>

                        {error && (
                          <p className="text-red-400 text-sm">{error}</p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Download className="w-5 h-5" />
                              Download Free Checklist
                            </>
                          )}
                        </button>
                      </form>

                      {/* Trust Indicators */}
                      <div className="mt-6 pt-6 border-t border-[#27272a] space-y-3">
                        <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                          <Shield className="w-4 h-4 text-[#22c55e]" />
                          <span>Your email is safe with us</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
                          <Check className="w-4 h-4 text-[#22c55e]" />
                          <span>No spam, unsubscribe anytime</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#22c55e]" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Checklist Sent!
                </h2>
                
                <p className="text-lg text-[#9ca3af] mb-4 max-w-xl mx-auto">
                  We&apos;ve sent the AI Readiness Checklist to{" "}
                  <span className="text-white font-medium">{email}</span>
                </p>

                <p className="text-[#9ca3af] mb-8">
                  Check your inbox (and spam folder just in case) for the download link.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://calendly.com/blakemcginn/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200"
                  >
                    Book a Free Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#27272a] text-white font-semibold rounded-xl hover:bg-[#3f3f46] transition-colors duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                </div>

                {/* Additional Resources */}
                <div className="mt-16 pt-8 border-t border-[#27272a]">
                  <p className="text-sm text-[#9ca3af] mb-6">
                    While you wait, check out these resources:
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      href="/assessment"
                      className="text-[#00d4ff] hover:underline flex items-center gap-2"
                    >
                      <Target className="w-4 h-4" />
                      Free AI Task Assessment
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
