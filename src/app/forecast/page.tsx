"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Target,
  Clock,
  Info,
  X,
  Bot,
  ChevronRight,
  RefreshCcw
} from "lucide-react";
import Link from "next/link";

const AGENTS = [
  { id: "decomposer", name: "Decomposer Agent", icon: "🔍", description: "Breaking down your role into tasks" },
  { id: "researcher", name: "Researcher Agent", icon: "🔬", description: "Checking AI capabilities" },
  { id: "forecaster", name: "Forecaster Agent", icon: "📈", description: "Projecting automation timelines" },
  { id: "strategist", name: "Strategist Agent", icon: "🎯", description: "Building survival strategy" },
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
  descriptions: {
    one_year: string;
    five_year: string;
    confidence: string;
    tasks_at_risk: string;
  };
  timeline: {
    six_months: number;
    one_year: number;
    three_years: number;
    five_years: number;
  };
  economics?: {
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

function InfoModal({ title, children, isOpen, onClose }: { title: string; children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-slate-600 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ForecastPage() {
  const [step, setStep] = useState<"input" | "analyzing" | "results">("input");
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("3-5 years");
  const [industry, setIndustry] = useState("Technology");
  const [activeAgents, setActiveAgents] = useState<{[key: string]: {progress: number; complete: boolean}}>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const startAnalysis = async () => {
    if (!jobDescription.trim()) return;
    
    setStep("analyzing");
    setActiveAgents({});
    
    for (let i = 0; i < AGENTS.length; i++) {
      const agent = AGENTS[i];
      
      setActiveAgents(prev => ({
        ...prev,
        [agent.id]: { progress: 0, complete: false }
      }));
      
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(r => setTimeout(r, 200));
        setActiveAgents(prev => ({
          ...prev,
          [agent.id]: { progress, complete: progress === 100 }
        }));
      }
    }
    
    try {
      const response = await fetch("/api/oracle/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_description: jobDescription,
          experience,
          industry
        })
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }
      
      // Transform the response to match the expected format
      setResult({
        role_title: data.analysis.role_title,
        overall_risk_level: data.analysis.overall_risk_level,
        primary_metrics: {
          one_year_risk: data.analysis.one_year_risk,
          five_year_risk: data.analysis.five_year_risk,
          confidence: data.analysis.confidence,
          tasks_at_risk: data.analysis.tasks_at_risk
        },
        descriptions: {
          one_year: data.analysis.explanation,
          five_year: data.analysis.explanation,
          confidence: `Based on ${data.context?.previous_analyses || 0} previous analyses`,
          tasks_at_risk: data.analysis.tasks_at_risk
        },
        timeline: data.analysis.timeline,
        high_risk_tasks: data.analysis.high_risk_tasks,
        low_risk_tasks: data.analysis.low_risk_tasks,
        benchmark: data.analysis.benchmark
      });
      
      setStep("results");
    } catch (err) {
      console.error('Analysis error:', err);
      setError("Analysis failed. Please try again.");
      setStep("input");
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-100 text-green-700 border-green-200";
      case "medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "high": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900">Blake McGinn</Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Link>
        </div>
      </header>
      
      <div className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-blue-700 tracking-wider uppercase mb-4">📊 Robot Risk-o-Meter</p>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Your <span className="text-blue-700">Automation Forecast</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Our team of 5 specialized AI agents analyzes your role 
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
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-900">
                      Job Description
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-700 focus:outline-none text-slate-900 resize-none"
                      placeholder="Paste your job description or describe your typical responsibilities, tasks, and tools you use."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Experience</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-700 focus:outline-none text-slate-900"
                      >
                        <option>0-2 years</option>
                        <option>3-5 years</option>
                        <option>6-10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-700 focus:outline-none text-slate-900"
                      >
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>Marketing</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-900">Company Size</label>
                      <select className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-700 focus:outline-none text-slate-900">
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
                    className="w-full py-4 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2 text-white shadow-lg shadow-blue-700/20"
                  >
                    Start Analysis
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {error && (
                    <p className="text-red-500 text-center">{error}</p>
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Your Role</h2>
                  <p className="text-slate-600">Our 5 AI agents are working together to forecast your automation risk...</p>
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
                            ? "border-blue-500 bg-blue-50" 
                            : isComplete 
                              ? "border-green-500 bg-green-50"
                              : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl p-3 rounded-xl ${
                            isActive ? "bg-blue-100" : isComplete ? "bg-green-100" : "bg-slate-100"
                          }`}>
                            {isComplete ? "✓" : agent.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-bold ${isActive ? "text-blue-700" : "text-slate-900"}`}>
                                {agent.name}
                              </h3>
                              <span className={`text-sm font-mono ${
                                isComplete ? "text-green-600" : isActive ? "text-blue-700" : "text-slate-400"
                              }`}>
                                {isComplete ? "COMPLETE" : isActive ? `${status.progress}%` : "WAITING"}
                              </span>
                            </div>
                            <p className="text-slate-500 text-sm">{agent.description}</p>
                            {(isActive || isComplete) && (
                              <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${
                                    isComplete ? "bg-green-500" : "bg-blue-700"
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
                {/* 1 Year Risk - Featured First & Bigger */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-2 mb-6">
                    <Bot className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold">Your Automation Risk Forecast</h2>
                  </div>
                  
                  {/* 1 Year Risk - Featured/Bigger */}
                  <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <div>
                          <p className="text-sm text-slate-300 uppercase tracking-wider">1 Year Risk</p>
                          <p className="text-xs text-slate-400">Immediate threat level</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-bold text-blue-400">{result.primary_metrics.one_year_risk}%</p>
                        <p className="text-xs text-slate-400">Automation Probability</p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-sm text-slate-200">
                        <span className="font-semibold text-white">What this means:</span>{" "}
                        {result.primary_metrics.one_year_risk < 30 
                          ? "Your job is relatively safe for now. Focus on upskilling in areas AI struggles with — creativity, complex decision-making, and human empathy."
                          : result.primary_metrics.one_year_risk < 60
                          ? "Some of your tasks could be automated within a year. Consider which parts of your job you want to keep human, and start learning to work alongside AI."
                          : "High automation risk in the near term. Start planning your pivot now — either upskill dramatically or transition to a role requiring more human judgment."
                        }
                      </p>
                    </div>
                  </div>

                  {/* 5 and 10 Year - Smaller side by side */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">5 Year Outlook</p>
                      <p className="text-3xl font-bold text-amber-400">{result.primary_metrics.five_year_risk}%</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {result.primary_metrics.five_year_risk < 50 ? "Moderate concern" : "Significant changes likely"}
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Long-term Security</p>
                      <p className="text-3xl font-bold text-green-400">{100 - result.primary_metrics.five_year_risk}%</p>
                      <p className="text-xs text-slate-400 mt-1">Human advantage</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 mt-6 text-center">
                    {result.benchmark.comparison_text}
                  </p>
                </div>

                {/* Results Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-200">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">{result.role_title}</h2>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full text-sm font-medium border ${getRiskColor(result.overall_risk_level)}`}>
                      {result.overall_risk_level === "high" ? "HIGH RISK" : result.overall_risk_level === "medium" ? "MEDIUM RISK" : "LOW RISK"}
                    </span>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-slate-500">More automatable than</div>
                    <div className="text-3xl font-bold text-blue-700">{result.benchmark.percentile}%</div>
                    <div className="text-sm text-slate-500">of similar roles</div>
                  </div>
                </div>

                {/* Primary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 font-medium">5-Year Replacement Probability</span>
                      <button onClick={() => setActiveModal('five_year')} className="text-slate-400 hover:text-blue-700 transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-slate-900">{result.primary_metrics.five_year_risk}%</div>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 font-medium">Confidence Score</span>
                      <button onClick={() => setActiveModal('confidence')} className="text-slate-400 hover:text-blue-700 transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-slate-900">{result.primary_metrics.confidence}%</div>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 font-medium">Tasks at Risk</span>
                      <button onClick={() => setActiveModal('tasks')} className="text-slate-400 hover:text-blue-700 transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-slate-900">{result.primary_metrics.tasks_at_risk}</div>
                  </div>
                </div>

                {/* Info Modals */}
                <InfoModal title="5-Year Replacement Probability" isOpen={activeModal === 'five_year'} onClose={() => setActiveModal(null)}>
                  <p className="mb-3">The likelihood your role changes significantly or becomes redundant within 5 years, accounting for AI advancement curves and industry adoption.</p>
                  <p className="text-slate-500">AI capabilities improve 20-30% annually. Tasks that are hard to automate today become easier as models improve and tools mature.</p>
                </InfoModal>

                <InfoModal title="Confidence Score" isOpen={activeModal === 'confidence'} onClose={() => setActiveModal(null)}>
                  <p className="mb-3">How reliable this forecast is based on data quality and market information.</p>
                  <p className="text-slate-500">Scores above 80% indicate high confidence based on clear job descriptions, abundant benchmark data for similar roles, and well-understood AI capabilities.</p>
                </InfoModal>

                <InfoModal title="Tasks at Risk" isOpen={activeModal === 'tasks'} onClose={() => setActiveModal(null)}>
                  <p className="mb-3">The ratio of high-risk tasks to total tasks identified in your role.</p>
                  <p className="text-slate-500">High-risk tasks are those automatable within 0-24 months. Low-risk tasks resist automation beyond 5 years.</p>
                </InfoModal>

                {/* Timeline */}
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-900">
                    <Clock className="w-5 h-5 text-blue-700" />
                    Automation Timeline
                  </h3>
                  <div className="space-y-4 mt-4">
                    {[
                      { label: "6 Months", value: result.timeline.six_months, color: "bg-blue-500" },
                      { label: "1 Year", value: result.timeline.one_year, color: "bg-cyan-500" },
                      { label: "3 Years", value: result.timeline.three_years, color: "bg-purple-500" },
                      { label: "5 Years", value: result.timeline.five_years, color: "bg-pink-500" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-20 text-sm text-slate-600">{item.label}</div>
                        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, delay: idx * 0.2 }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                        <div className="w-16 text-right text-sm font-mono text-slate-900">{item.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High Risk Tasks */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    High Risk Tasks
                  </h3>
                  <div className="space-y-3">
                    {result.high_risk_tasks.map((task, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-red-50 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-900 font-medium">{task.task_name}</span>
                          <span className="text-sm text-slate-500">{task.automation_timeline}</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{task.recommended_action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Risk Tasks */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900">
                    <Shield className="w-5 h-5 text-green-600" />
                    Human Advantage
                  </h3>
                  <div className="space-y-3">
                    {result.low_risk_tasks.map((task, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-green-50 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-900 font-medium">{task.task_name}</span>
                          <span className="text-sm text-slate-500">{task.automation_timeline}</span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{task.recommended_action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="p-8 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">Future-proof your career</h3>
                  <p className="text-slate-600 mb-6">
                    I help professionals navigate AI disruption and build automation-resistant skills.
                  </p>
                  <a
                    href="https://calendly.com/blakemcginn/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 transition-colors font-semibold text-white shadow-lg shadow-blue-700/20"
                  >
                    Book a Discovery Call
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setStep("input");
                    setJobDescription("");
                    setResult(null);
                    setActiveModal(null);
                  }}
                  className="w-full py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Analyze Another Role
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
