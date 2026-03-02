// src/app/forecast/page.tsx - Automation Forecast Tool
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Target,
  Clock,
  DollarSign,
  Brain,
  Share2,
  CheckCircle,
  Loader2
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const AGENTS = [
  { id: "decomposer", name: "Decomposer Agent", icon: "🔍", description: "Breaking down your role into atomic tasks" },
  { id: "researcher", name: "Researcher Agent", icon: "🔬", description: "Checking current AI capabilities" },
  { id: "forecaster", name: "Forecaster Agent", icon: "📈", description: "Projecting automation timelines" },
  { id: "economist", name: "Economist Agent", icon: "💰", description: "Running the numbers" },
  { id: "strategist", name: "Strategist Agent", icon: "🎯", description: "Preparing your survival guide" },
];

interface AnalysisResult {
  role_title: string;
  overall_risk_level: string;
  primary_metrics: {
    one_year_risk: number;
    five_year_risk: number;
    confidence: number;
    tasks_at_risk: string;
  };
  timeline: {
    six_months: number;
    one_year: number;
    three_years: number;
    five_years: number;
  };
  economics: {
    salary_median: number;
    current_roi: number;
    payback_months: number;
    annual_savings: number;
  };
  high_risk_tasks: Array<{
    task_name: string;
    automation_timeline: string;
    risk_score: number;
    recommended_action: string;
  }>;
  low_risk_tasks: Array<{
    task_name: string;
    automation_timeline: string;
    risk_score: number;
    recommended_action: string;
  }>;
  benchmark: {
    percentile: number;
    comparison_text: string;
  };
}

export default function ForecastPage() {
  const [step, setStep] = useState<"input" | "analyzing" | "results">("input");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("3-5 years");
  const [industry, setIndustry] = useState("Technology");
  const [activeAgents, setActiveAgents] = useState<{[key: string]: {progress: number; complete: boolean}}>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const startAnalysis = async () => {
    if (!jobDescription.trim()) return;
    
    setStep("analyzing");
    setActiveAgents({});
    
    // Simulate agent progress
    for (let i = 0; i < AGENTS.length; i++) {
      const agent = AGENTS[i];
      
      // Start agent
      setActiveAgents(prev => ({
        ...prev,
        [agent.id]: { progress: 0, complete: false }
      }));
      
      // Progress to 100
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(r => setTimeout(r, 200));
        setActiveAgents(prev => ({
          ...prev,
          [agent.id]: { progress, complete: progress === 100 }
        }));
      }
    }
    
    // Call API
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_description: jobDescription,
          years_experience: experience,
          industry
        })
      });
      
      const data = await response.json();
      setResult(data);
      setStep("results");
    } catch (err) {
      setError("Analysis failed. Please try again.");
      setStep("input");
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "high": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-cyan-400 text-sm font-medium">Powered by 5 AI Agents</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Automation Forecast
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Will AI take your job? Our team of 5 specialized AI agents analyzes your role 
              and predicts your automation risk over 1, 3, and 5 years.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Input Step */}
            {step === "input" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Describe your role</label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white resize-none"
                      placeholder="Paste your job description here, or describe your typical week: What tasks do you spend time on? What are your main responsibilities? What tools do you use?"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Experience</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white"
                      >
                        <option>0-2 years</option>
                        <option>3-5 years</option>
                        <option>6-10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white"
                      >
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Marketing</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Size</label>
                      <select className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 focus:border-cyan-500 focus:outline-none text-white">
                        <option>1-50</option>
                        <option>51-200</option>
                        <option>201-1000</option>
                        <option>1000+</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={startAnalysis}
                    disabled={!jobDescription.trim()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2"
                  >
                    Start Analysis
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {error && (
                    <p className="text-red-400 text-center">{error}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Analyzing Step */}
            {step === "analyzing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Analyzing Your Role</h2>
                  <p className="text-gray-400">Our 5 AI agents are working together to forecast your automation risk...</p>
                </div>

                <div className="space-y-4">
                  {AGENTS.map((agent, idx) => {
                    const status = activeAgents[agent.id];
                    const isActive = status && !status.complete;
                    const isComplete = status?.complete;

                    return (
                      <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-6 rounded-xl border transition-all ${
                          isActive 
                            ? "border-cyan-500 bg-cyan-950/20" 
                            : isComplete 
                              ? "border-green-500/50 bg-green-950/10"
                              : "border-gray-800 bg-gray-900/30"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl p-3 rounded-xl ${
                            isActive ? "bg-cyan-500/20" : isComplete ? "bg-green-500/20" : "bg-gray-800"
                          }`}>
                            {isComplete ? "✓" : agent.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-bold ${isActive ? "text-cyan-400" : "text-white"}`}>
                                {agent.name}
                              </h3>
                              <span className={`text-sm font-mono ${
                                isComplete ? "text-green-400" : isActive ? "text-cyan-400" : "text-gray-500"
                              }`}>
                                {isComplete ? "COMPLETE" : isActive ? `${status.progress}%` : "WAITING"}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">{agent.description}</p>
                            {(isActive || isComplete) && (
                              <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${
                                    isComplete ? "bg-green-500" : "bg-gradient-to-r from-cyan-500 to-blue-500"
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${status?.progress || 0}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Results Step */}
            {step === "results" && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Results Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <h2 className="text-3xl font-bold">{result.role_title}</h2>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full text-sm font-medium border ${getRiskColor(result.overall_risk_level)}`}>
                      {result.overall_risk_level.toUpperCase()} RISK
                    </span>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-gray-400">More automatable than</div>
                    <div className="text-3xl font-bold text-cyan-400">{result.benchmark.percentile}%</div>
                    <div className="text-sm text-gray-400">of similar roles</div>
                  </div>
                </div>

                {/* Primary Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-4xl font-bold text-red-400 mb-2">{result.primary_metrics.one_year_risk}%</div>
                    <div className="text-sm text-gray-400">1-Year Risk</div>
                  </div>
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-4xl font-bold text-purple-400 mb-2">{result.primary_metrics.five_year_risk}%</div>
                    <div className="text-sm text-gray-400">5-Year Replace</div>
                  </div>
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-4xl font-bold text-green-400 mb-2">{result.primary_metrics.confidence}%</div>
                    <div className="text-sm text-gray-400">Confidence</div>
                  </div>
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">{result.primary_metrics.tasks_at_risk}</div>
                    <div className="text-sm text-gray-400">Tasks at Risk</div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    Automation Timeline
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "6 Months", value: result.timeline.six_months, color: "bg-blue-500" },
                      { label: "1 Year", value: result.timeline.one_year, color: "bg-cyan-500" },
                      { label: "3 Years", value: result.timeline.three_years, color: "bg-purple-500" },
                      { label: "5 Years", value: result.timeline.five_years, color: "bg-pink-500" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-20 text-sm text-gray-400">{item.label}</div>
                        <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                        <div className="w-16 text-right text-sm font-mono">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High Risk Tasks */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    High Risk Tasks
                  </h3>
                  <div className="space-y-3">
                    {result.high_risk_tasks.map((task, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-gray-900 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                          <span className="text-white">{task.task_name}</span>
                          <span className="text-sm text-gray-500">{task.automation_timeline}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{task.recommended_action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Risk Tasks */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Your Moat (Human Advantage)
                  </h3>
                  <div className="space-y-3">
                    {result.low_risk_tasks.map((task, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-gray-900 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                          <span className="text-white">{task.task_name}</span>
                          <span className="text-sm text-gray-500">{task.automation_timeline}</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{task.recommended_action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 text-center">
                  <h3 className="text-2xl font-bold mb-4">Want to future-proof your career?</h3>
                  <p className="text-gray-400 mb-6">
                    I help professionals navigate AI disruption and build automation-resistant careers.
                  </p>
                  <a
                    href="https://calendly.com/blakemcginn/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition-colors font-semibold"
                  >
                    Book a Free Discovery Call
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setStep("input");
                    setJobDescription("");
                    setResult(null);
                  }}
                  className="w-full py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors text-gray-400"
                >
                  Analyze Another Role
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
