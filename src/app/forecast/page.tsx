// src/app/forecast/page.tsx - Automation Forecast Tool (Balanced Edition)
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
  Skull,
  Info,
  X
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const AGENTS = [
  { id: "decomposer", name: "Decomposer Agent", icon: "🔍", description: "Breaking down your role into automatable chunks" },
  { id: "researcher", name: "Researcher Agent", icon: "🔬", description: "Finding all the ways AI can replace you" },
  { id: "forecaster", name: "Forecaster Agent", icon: "📈", description: "Predicting your unemployment timeline" },
  { id: "economist", name: "Economist Agent", icon: "💰", description: "Calculating how much your boss will save firing you" },
  { id: "strategist", name: "Strategist Agent", icon: "🎯", description: "Planning your career's funeral" },
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

// Info Modal Component
function InfoModal({ title, children, isOpen, onClose }: { title: string; children: React.ReactNode; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl z-50"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-gray-300 text-sm leading-relaxed">
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
      setError("Even our AI couldn't figure out what you do. Try being clearer.");
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
          {/* Header - Mixed tone */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
              <Skull className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm font-medium">Career Obsolescence Calculator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Will AI End Your Career?
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our team of 5 AI agents will analyze how screwed you are. 
              Spoiler: It's probably worse than you think.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* Input Step - Keep the snarky tone */}
            {step === "input" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Describe your job (before it's gone)
                    </label>
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-700 focus:border-red-500 focus:outline-none text-white resize-none"
                      placeholder="Paste your job description. Be honest—we'll know if you're padding it with buzzwords to look more important."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Experience</label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 focus:border-red-500 focus:outline-none text-white"
                      >
                        <option>0-2 years (Basically an intern)</option>
                        <option>3-5 years (Peak delusion)</option>
                        <option>6-10 years (Too expensive to keep)</option>
                        <option>10+ years (Ageism incoming)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 focus:border-red-500 focus:outline-none text-white"
                      >
                        <option>Technology (Self-aware irony)</option>
                        <option>Finance (AI loves money)</option>
                        <option>Healthcare (Robot doctors)</option>
                        <option>Marketing (Already half bots)</option>
                        <option>Other (No one is safe)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Company Size</label>
                      <select className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 focus:border-red-500 focus:outline-none text-white">
                        <option>1-50 (Can't afford AI yet)</option>
                        <option>51-200 (Getting ideas)</option>
                        <option>201-1000 (Definitely automating)</option>
                        <option>1000+ (You're a headcount reduction away)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={startAnalysis}
                    disabled={!jobDescription.trim()}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-2"
                  >
                    Calculate My Demise
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {error && (
                    <p className="text-red-400 text-center">{error}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Analyzing Step - Snarky */}
            {step === "analyzing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Calculating Your Obsolescence...</h2>
                  <p className="text-gray-400">Our AI agents are determining exactly how replaceable you are.</p>
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
                            ? "border-red-500 bg-red-950/20" 
                            : isComplete 
                              ? "border-green-500/50 bg-green-950/10"
                              : "border-gray-800 bg-gray-900/30"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl p-3 rounded-xl ${
                            isActive ? "bg-red-500/20" : isComplete ? "bg-green-500/20" : "bg-gray-800"
                          }`}>
                            {isComplete ? "✓" : agent.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`font-bold ${isActive ? "text-red-400" : "text-white"}`}>
                                {agent.name}
                              </h3>
                              <span className={`text-sm font-mono ${
                                isComplete ? "text-green-400" : isActive ? "text-red-400" : "text-gray-500"
                              }`}>
                                {isComplete ? "DONE" : isActive ? `${status.progress}%` : "WAITING"}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">{agent.description}</p>
                            {(isActive || isComplete) && (
                              <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${
                                    isComplete ? "bg-green-500" : "bg-gradient-to-r from-red-500 to-orange-500"
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

            {/* Results Step - Mixed serious and snarky */}
            {step === "results" && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Results Header - Mixed */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-gray-800">
                  <div>
                    <h2 className="text-3xl font-bold text-white">{result.role_title}</h2>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full text-sm font-medium border ${getRiskColor(result.overall_risk_level)}`}>
                      {result.overall_risk_level === "high" ? "☠️ DOOMED" : result.overall_risk_level === "medium" ? "⚠️ WORRYING" : "😐 SAFEISH"}
                    </span>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-gray-400">More doomed than</div>
                    <div className="text-3xl font-bold text-red-400">{result.benchmark.percentile}%</div>
                    <div className="text-sm text-gray-400">of your peers</div>
                  </div>
                </div>

                {/* Primary Metrics - SERIOUS with info buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 font-medium">1-Year Automation Risk</span>
                      <button 
                        onClick={() => setActiveModal('one_year')}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-white">{result.primary_metrics.one_year_risk}%</div>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 font-medium">5-Year Replacement Probability</span>
                      <button 
                        onClick={() => setActiveModal('five_year')}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-white">{result.primary_metrics.five_year_risk}%</div>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 font-medium">Confidence Score</span>
                      <button 
                        onClick={() => setActiveModal('confidence')}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-white">{result.primary_metrics.confidence}%</div>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-gray-900 border border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300 font-medium">Tasks at Risk</span>
                      <button 
                        onClick={() => setActiveModal('tasks')}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-4xl font-bold text-white">{result.primary_metrics.tasks_at_risk}</div>
                  </div>
                </div>

                {/* Info Modals - SERIOUS explanations */}
                <InfoModal 
                  title="1-Year Automation Risk" 
                  isOpen={activeModal === 'one_year'} 
                  onClose={() => setActiveModal(null)}
                >
                  <p className="mb-3">The percentage of your current job responsibilities that could be automated using AI tools available today or launching within the next 12 months.</p>
                  <p className="text-gray-400">This considers current AI capabilities, enterprise tool maturity, and integration complexity. A 60% score means 60% of your tasks could be automated—you'd transition to oversight and exception-handling.</p>
                </InfoModal>

                <InfoModal 
                  title="5-Year Replacement Probability" 
                  isOpen={activeModal === 'five_year'} 
                  onClose={() => setActiveModal(null)}
                >
                  <p className="mb-3">The likelihood your role changes significantly or becomes redundant within 5 years, accounting for AI advancement curves and industry adoption.</p>
                  <p className="text-gray-400">AI capabilities improve 20-30% annually. Tasks that are hard to automate today become easier as models improve and tools mature. This projection factors in projected breakthroughs in reasoning, multi-modal understanding, and agent capabilities.</p>
                </InfoModal>

                <InfoModal 
                  title="Confidence Score" 
                  isOpen={activeModal === 'confidence'} 
                  onClose={() => setActiveModal(null)}
                >
                  <p className="mb-3">How reliable this forecast is based on data quality and market information.</p>
                  <p className="text-gray-400">Scores above 80% indicate high confidence based on clear job descriptions, abundant benchmark data for similar roles, and well-understood AI capabilities. Lower scores suggest the role may be unique, emerging, or the description lacks detail.</p>
                </InfoModal>

                <InfoModal 
                  title="Tasks at Risk" 
                  isOpen={activeModal === 'tasks'} 
                  onClose={() => setActiveModal(null)}
                >
                  <p className="mb-3">The ratio of high-risk tasks to total tasks identified in your role.</p>
                  <p className="text-gray-400">High-risk tasks are those automatable within 0-24 months. Low-risk tasks resist automation beyond 5 years. A ratio of 8/15 means 8 out of 15 identified tasks are at high risk of automation.</p>
                </InfoModal>

                {/* Timeline - Mixed title */}
                <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-200">
                    <Clock className="w-5 h-5 text-red-400" />
                    Your Career's Expiration Date
                  </h3>
                  <div className="space-y-4 mt-4">
                    {[
                      { label: "6 Months", value: result.timeline.six_months, color: "bg-yellow-500" },
                      { label: "1 Year", value: result.timeline.one_year, color: "bg-orange-500" },
                      { label: "3 Years", value: result.timeline.three_years, color: "bg-red-500" },
                      { label: "5 Years", value: result.timeline.five_years, color: "bg-purple-500" },
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

                {/* High Risk Tasks - Mixed title */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-200">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Tasks AI Wants to Steal
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

                {/* Low Risk Tasks - Mixed title */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-200">
                    <Shield className="w-5 h-5 text-green-400" />
                    The Few Things Keeping You Employed
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

                {/* CTA - Snarky */}
                <div className="p-8 rounded-2xl bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 text-center">
                  <h3 className="text-2xl font-bold mb-4">Scared yet? Good.</h3>
                  <p className="text-gray-400 mb-6">
                    I help professionals pivot before the robots take over. 
                    Book a call before your calendar is managed by an AI assistant.
                  </p>
                  <a
                    href="https://calendly.com/blakemcginn/discovery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition-colors font-semibold"
                  >
                    Book an Emergency Career Consultation
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                {/* Reset - Snarky */}
                <button
                  onClick={() => {
                    setStep("input");
                    setJobDescription("");
                    setResult(null);
                    setActiveModal(null);
                  }}
                  className="w-full py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors text-gray-400"
                >
                  Check Another Dying Career
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
