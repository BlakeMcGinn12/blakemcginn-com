"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle, RefreshCcw, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AnalyzedTask {
  task_name: string;
  time_cost_hours_per_week: number;
  build_ease: number;
  repetition: string;
  repetition_score: number;
  api_cost_per_run: "low" | "medium" | "high";
  quadrant: "QUICK_WIN" | "STRATEGIC" | "FILLER" | "SKIP";
  implementation_cost_estimate: number;
  monthly_time_value: number;
  monthly_api_cost: number;
  monthly_savings: number;
  roi_percent: number;
  recommended_package: "Starter" | "Growth" | "Scale";
  why: string;
}

interface AnalysisResult {
  tasks: AnalyzedTask[];
  summary: {
    total_hours_per_week: number;
    total_monthly_savings_potential: number;
    quick_wins_count: number;
    recommended_first_task: string;
    estimated_total_implementation_cost: number;
  };
}

export default function AssessmentPage() {
  const [taskInput, setTaskInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!taskInput.trim()) return;
    
    setIsAnalyzing(true);
    setError("");
    
    try {
      const response = await fetch("/api/analyze-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: taskInput }),
      });
      
      if (!response.ok) throw new Error("Analysis failed");
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const resetAssessment = () => {
    setTaskInput("");
    setResult(null);
    setEmail("");
    setSubmitted(false);
    setError("");
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "QUICK_WIN": return "from-green-500 to-green-600";
      case "STRATEGIC": return "from-yellow-500 to-yellow-600";
      case "FILLER": return "from-blue-500 to-blue-600";
      case "SKIP": return "from-red-500 to-red-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case "QUICK_WIN": return "Quick Win 🎯";
      case "STRATEGIC": return "Strategic 📊";
      case "FILLER": return "Filler 📝";
      case "SKIP": return "Skip ❌";
      default: return quadrant;
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
              AI Task Assessment
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Not Sure What to Automate?
            </h1>
            <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
              Paste your task list below. Our AI analyzes each task and shows you the 
              automation sweet spot — ranked by ROI.
            </p>
          </motion.div>

          {/* Main Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#12121a] rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50"
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Input Area */}
                  <div>
                    <label className="block text-white font-medium mb-3">
                      What repetitive tasks eat your time?
                    </label>
                    <textarea
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder="Examples:
• Check and respond to emails (about 2 hours/day)
• Update CRM after sales calls
• Post to social media 3x per week
• Generate weekly client reports
• Research competitors every Monday"
                      className="w-full h-64 px-4 py-4 rounded-xl bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-[#00d4ff] focus:outline-none transition-colors duration-200 resize-none"
                    />
                  </div>

                  {/* Tips */}
                  <div className="bg-[#0a0a0f] rounded-xl p-4 border border-[#27272a]">
                    <div className="flex items-center gap-2 text-sm text-[#9ca3af] mb-2">
                      <Sparkles className="w-4 h-4 text-[#00d4ff]" />
                      <span className="font-medium text-white">Tips for best results:</span>
                    </div>
                    <ul className="text-sm text-[#9ca3af] space-y-1 ml-6">
                      <li>• Include time estimates (e.g., &quot;2 hours/day&quot;)</li>
                      <li>• List 5-10 tasks for the most accurate analysis</li>
                      <li>• Be specific about what the task involves</li>
                    </ul>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  {/* Analyze Button */}
                  <button
                    onClick={handleAnalyze}
                    disabled={!taskInput.trim() || isAnalyzing}
                    className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing Your Tasks...
                      </>
                    ) : (
                      <>
                        Analyze My Tasks
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-[#9ca3af]">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      Free analysis
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      Takes 10 seconds
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                      No email required
                    </span>
                  </div>
                </motion.div>
              ) : !submitted ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#0a0a0f] rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-white">{result.summary.total_hours_per_week}h</div>
                      <div className="text-sm text-[#9ca3af]">Hours/Week Analyzed</div>
                    </div>
                    <div className="bg-[#0a0a0f] rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#22c55e]">${result.summary.total_monthly_savings_potential.toLocaleString()}</div>
                      <div className="text-sm text-[#9ca3af]">Monthly Savings Potential</div>
                    </div>
                    <div className="bg-[#0a0a0f] rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#00d4ff]">{result.summary.quick_wins_count}</div>
                      <div className="text-sm text-[#9ca3af]">Quick Wins Found</div>
                    </div>
                    <div className="bg-[#0a0a0f] rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-white">${result.summary.estimated_total_implementation_cost.toLocaleString()}</div>
                      <div className="text-sm text-[#9ca3af]">Est. Setup Cost</div>
                    </div>
                  </div>

                  {/* Top Recommendation */}
                  <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#7b2cbf]/10 rounded-2xl p-6 border border-[#00d4ff]/20">
                    <p className="text-sm text-[#00d4ff] font-medium mb-2">Start Here</p>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Automate: {result.summary.recommended_first_task}
                    </h3>
                    <p className="text-[#9ca3af]">
                      Highest ROI opportunity. Estimated payback in under 2 weeks.
                    </p>
                  </div>

                  {/* Task List */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">All Tasks Ranked by ROI</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {result.tasks.map((task, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-[#0a0a0f] rounded-xl p-4 border border-[#27272a] hover:border-[#00d4ff]/30 transition-colors duration-200"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${getQuadrantColor(task.quadrant)} text-white`}>
                                  {getQuadrantLabel(task.quadrant)}
                                </span>
                                <span className="text-xs text-[#9ca3af]">
                                  {task.time_cost_hours_per_week}h/week • {task.recommended_package} Package
                                </span>
                              </div>
                              <h4 className="text-white font-medium mb-1">{task.task_name}</h4>
                              <p className="text-sm text-[#9ca3af]">{task.why}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-[#22c55e]">+{task.roi_percent}%</div>
                              <div className="text-xs text-[#9ca3af]">ROI</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Email Capture */}
                  <div className="border-t border-[#27272a] pt-8">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Get Your Full Automation Roadmap
                    </h3>
                    <p className="text-[#9ca3af] mb-4">
                      We&apos;ll email you a detailed PDF report with implementation timeline and pricing.
                    </p>
                    <form onSubmit={handleSubmitEmail} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-[#00d4ff] focus:outline-none transition-colors duration-200"
                        required
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
                      >
                        Send My Report
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                  {/* Reset */}
                  <button
                    onClick={resetAssessment}
                    className="text-[#9ca3af] hover:text-white transition-colors duration-200 flex items-center gap-2 mx-auto"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Analyze Different Tasks
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-[#22c55e]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Report Sent!
                  </h3>
                  <p className="text-[#9ca3af] mb-8">
                    Check your inbox for your detailed automation roadmap. I&apos;ll follow up within 24 hours.
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
