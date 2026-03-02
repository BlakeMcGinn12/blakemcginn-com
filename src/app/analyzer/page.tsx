"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  CheckCircle,
  RefreshCcw,
  Sparkles,
  ArrowLeft,
  Target,
  TrendingUp,
  Clock,
  Zap,
  ChevronRight,
  Mail,
  AlertTriangle,
  Bot,
  BrainCircuit,
  Skull,
} from "lucide-react";
import Link from "next/link";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

interface TaskData {
  task_name: string;
  time_score: number;
  achievability_score: number;
  why: string;
  recommended_action: string;
  roi: number;
}

interface AnalysisResult {
  tasks: TaskData[];
  chart_data: {
    x: number;
    y: number;
    name: string;
    why: string;
    recommended_action: string;
    roi: number;
    quadrant: string;
  }[];
  automation_risk?: {
    oneYear: number;
    fiveYear: number;
    tenYear: number;
    summary: string;
  };
}

const QuadrantLabels = () => (
  <>
    <div className="absolute top-4 right-4 text-right pointer-events-none">
      <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Quick Wins</div>
      <div className="text-[10px] text-slate-400">High Time Save • High Achievability</div>
    </div>
    <div className="absolute top-4 left-4 pointer-events-none">
      <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">Strategic</div>
      <div className="text-[10px] text-slate-400">High Time Save • Lower Achievability</div>
    </div>
    <div className="absolute bottom-4 right-4 text-right pointer-events-none">
      <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">Easy Wins</div>
      <div className="text-[10px] text-slate-400">Lower Time Save • High Achievability</div>
    </div>
    <div className="absolute bottom-4 left-4 pointer-events-none">
      <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Skip</div>
      <div className="text-[10px] text-slate-400">Lower on Both</div>
    </div>
  </>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-xl max-w-xs">
        <p className="font-semibold text-slate-900 mb-1">{data.name}</p>
        <p className="text-xs text-slate-500 mb-2">{data.why}</p>
        <div className="flex gap-4 text-xs">
          <span className="text-blue-700">Time: {data.y}/10</span>
          <span className="text-purple-600">AI: {data.x}/10</span>
        </div>
      </div>
    );
  }
  return null;
};

const CREATIVE_NAMES = [
  { name: "The Jobocalypse Forecast", emoji: "🤖", tagline: "Will robots take over? Let's find out." },
  { name: "Skynet Scanner", emoji: "🦾", tagline: "Detecting AI threats before they detect you." },
  { name: "Robot Risk-o-Meter", emoji: "📊", tagline: "Measuring your odds against the machine uprising." },
  { name: "Bot Replacement Index", emoji: "🔄", tagline: "How soon until a bot does your job?" },
  { name: "The Automation Crystal Ball", emoji: "🔮", tagline: "Peek into your AI-powered future." },
  { name: "Will Robots Take My Job?", emoji: "🤔", tagline: "The question on everyone's mind." },
  { name: "AI Job Threat Detector", emoji: "⚠️", tagline: "Scanning for incoming automation." },
];

export default function AnalyzerPage() {
  const [taskInput, setTaskInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

  const calculateAutomationRisk = (tasks: TaskData[]) => {
    if (!tasks.length) return null;
    const avgAchievability = tasks.reduce((sum, t) => sum + t.achievability_score, 0) / tasks.length;
    const baseRisk = (avgAchievability / 10) * 100;
    
    return {
      oneYear: Math.min(Math.round(baseRisk * 0.3), 95),
      fiveYear: Math.min(Math.round(baseRisk * 0.7), 95),
      tenYear: Math.min(Math.round(baseRisk * 0.95), 95),
      summary: avgAchievability > 7 
        ? "Your tasks are highly automatable. Act now to stay ahead."
        : avgAchievability > 4
        ? "Some tasks can be automated. Strategic implementation recommended."
        : "Your tasks are relatively safe from automation. Focus on efficiency.",
    };
  };

  const handleAnalyze = async () => {
    if (!taskInput.trim()) return;
    setIsAnalyzing(true);
    setError("");

    try {
      const response = await fetch(
        "https://consulting-analyze-tasks.execute-api.us-east-1.amazonaws.com/prod/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tasks: taskInput }),
        }
      );

      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();

      const chartData = data.tasks.map((task: TaskData) => ({
        x: task.achievability_score,
        y: task.time_score,
        name: task.task_name,
        why: task.why,
        recommended_action: task.recommended_action,
        roi: task.roi,
        quadrant:
          task.time_score >= 5 && task.achievability_score >= 5
            ? "quick-win"
            : task.time_score >= 5
            ? "strategic"
            : task.achievability_score >= 5
            ? "easy-win"
            : "skip",
      }));

      const automationRisk = calculateAutomationRisk(data.tasks);
      setResult({ tasks: data.tasks, chart_data: chartData, automation_risk: automationRisk || undefined });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !result) return;
    try {
      await fetch("https://consulting-analyze-tasks.execute-api.us-east-1.amazonaws.com/prod/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newsletter, tasks: result.tasks }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save results:", err);
      setSubmitted(true);
    }
  };

  const resetAnalyzer = () => {
    setTaskInput("");
    setResult(null);
    setEmail("");
    setNewsletter(false);
    setSubmitted(false);
    setError("");
    setSelectedTask(null);
  };

  const topTask = useMemo(() => {
    if (!result) return null;
    return result.tasks.reduce((max, task) => (task.roi > max.roi ? task : max), result.tasks[0]);
  }, [result]);

  const getDotColor = (quadrant: string) => {
    switch (quadrant) {
      case "quick-win": return "#22c55e";
      case "strategic": return "#eab308";
      case "easy-win": return "#3b82f6";
      case "skip": return "#ef4444";
      default: return "#9ca3af";
    }
  };

  const getQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case "quick-win": return "Quick Win";
      case "strategic": return "Strategic";
      case "easy-win": return "Easy Win";
      case "skip": return "Skip";
      default: return quadrant;
    }
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "quick-win": return "from-green-500 to-green-600";
      case "strategic": return "from-yellow-500 to-yellow-600";
      case "easy-win": return "from-blue-500 to-blue-600";
      case "skip": return "from-red-500 to-red-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900">Blake McGinn</Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Home
          </Link>
        </div>
      </header>

      <div className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="text-sm font-medium text-blue-700 tracking-wider uppercase mb-4">📊 Robot Risk-o-Meter</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">Will Robots Take <span className="text-blue-700">Your Job?</span></h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Enter your weekly tasks. Get a personalized automation forecast showing exactly how soon AI might replace your work — and what to do about it.</p>
          </motion.div>

          {!result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <BrainCircuit className="w-5 h-5 text-blue-700" />
                <h3 className="font-semibold text-slate-900">Name Ideas for Your Consideration:</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CREATIVE_NAMES.map((option, i) => (
                  <div key={i} className="bg-white rounded-lg p-3 border border-slate-200 text-sm">
                    <span className="mr-2">{option.emoji}</span>
                    <span className="font-medium text-slate-900">{option.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">Pick your favorite! Current favorites: <span className="font-semibold text-blue-700">"Bot Replacement Index"</span> or <span className="font-semibold text-blue-700">"The Jobocalypse Forecast"</span></p>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-200">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div>
                    <label className="block text-slate-900 font-medium mb-3">What repetitive tasks eat your time?</label>
                    <textarea
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder="• Check and respond to emails (2 hours/day)
• Update CRM after sales calls
• Generate weekly client reports
• Post to social media 3x per week
• Create meeting summaries
• Data entry from forms"
                      className="w-full h-64 px-4 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none transition-colors duration-200 resize-none"
                    />
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Sparkles className="w-4 h-4 text-blue-700" />
                      <span className="font-medium text-slate-900">Tips for best results:</span>
                    </div>
                    <ul className="text-sm text-slate-600 space-y-1 ml-6">
                      <li>• Include time estimates (e.g., "2 hours/day")</li>
                      <li>• List 5-10 tasks for the most accurate analysis</li>
                      <li>• Be specific about what the task involves</li>
                    </ul>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button onClick={handleAnalyze} disabled={!taskInput.trim() || isAnalyzing} className="w-full py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-700/20">
                    {isAnalyzing ? (<><Loader2 className="w-5 h-5 animate-spin" />Analyzing Your Tasks...</>) : (<><Bot className="w-5 h-5" />Calculate My Risk</>)}
                  </button>

                  <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                    <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />Free analysis</span>
                    <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />Takes 10 seconds</span>
                    <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" />No email required</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  {result.automation_risk && (
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
                      <div className="flex items-center gap-2 mb-6">
                        <Bot className="w-6 h-6 text-blue-400" />
                        <h2 className="text-2xl font-bold">Your Automation Risk Forecast</h2>
                      </div>
                      
                      <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 border border-white/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center"><span className="text-2xl">⚡</span></div>
                            <div>
                              <p className="text-sm text-slate-300 uppercase tracking-wider">1 Year Risk</p>
                              <p className="text-xs text-slate-400">Immediate threat level</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-4xl font-bold text-blue-400">{result.automation_risk.oneYear}%</p>
                            <p className="text-xs text-slate-400">Automation Probability</p>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="text-sm text-slate-200">
                            <span className="font-semibold text-white">What this means:</span>{" "}
                            {result.automation_risk.oneYear < 30 
                              ? "Your job is relatively safe for now. Focus on upskilling in areas AI struggles with — creativity, complex decision-making, and human empathy."
                              : result.automation_risk.oneYear < 60
                              ? "Some of your tasks could be automated within a year. Consider which parts of your job you want to keep human, and start learning to work alongside AI."
                              : "High automation risk in the near term. Start planning your pivot now — either upskill dramatically or transition to a role requiring more human judgment."
                            }
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">5 Year Outlook</p>
                          <p className="text-3xl font-bold text-amber-400">{result.automation_risk.fiveYear}%</p>
                          <p className="text-xs text-slate-400 mt-1">{result.automation_risk.fiveYear < 50 ? "Moderate concern" : "Significant changes likely"}</p>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">10 Year Outlook</p>
                          <p className="text-3xl font-bold text-red-400">{result.automation_risk.tenYear}%</p>
                          <p className="text-xs text-slate-400 mt-1">{result.automation_risk.tenYear < 50 ? "Long-term security" : "Major disruption expected"}</p>
                        </div>
                      </div>

                      <p className="text-sm text-slate-300 mt-6 text-center">{result.automation_risk.summary}</p>
                    </div>
                  )}

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Target className="w-5 h-5 text-blue-700" />Your Automation Matrix</h3>
                        <p className="text-sm text-slate-500">Click any dot to see details</p>
                      </div>
                      <div className="flex gap-3 text-xs">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span>Quick Win</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-500"></span>Strategic</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span>Easy Win</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500"></span>Skip</span>
                      </div>
                    </div>

                    <div className="relative h-[400px] w-full">
                      <QuadrantLabels />
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                          <XAxis type="number" dataKey="x" name="AI Achievability" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={{ stroke: "#e2e8f0" }} label={{ value: "AI Achievability →", position: "bottom", fill: "#64748b", fontSize: 12 }} />
                          <YAxis type="number" dataKey="y" name="Time Saving Potential" domain={[0, 10]} tick={{ fill: "#64748b", fontSize: 12 }} axisLine={{ stroke: "#e2e8f0" }} tickLine={{ stroke: "#e2e8f0" }} label={{ value: "← Time Saving Potential", angle: -90, position: "left", fill: "#64748b", fontSize: 12 }} />
                          <ReferenceLine x={5} stroke="#cbd5e1" strokeDasharray="3 3" />
                          <ReferenceLine y={5} stroke="#cbd5e1" strokeDasharray="3 3" />
                          <Tooltip content={<CustomTooltip />} />
                          <Scatter data={result.chart_data} onClick={(data) => { if (data && data.payload) { const task = result.tasks.find((t) => t.task_name === data.payload.name); if (task) setSelectedTask(task); } }} cursor="pointer">
                            {result.chart_data.map((entry, index) => (<Cell key={`cell-${index}`} fill={getDotColor(entry.quadrant)} strokeWidth={2} stroke="#ffffff" />))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedTask && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-blue-700 font-medium mb-1">Task Details</p>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">{selectedTask.task_name}</h4>
                            <p className="text-slate-600 mb-3">{selectedTask.why}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1 text-blue-700"><Clock className="w-4 h-4" />Time Score: {selectedTask.time_score}/10</span>
                              <span className="flex items-center gap-1 text-purple-600"><Zap className="w-4 h-4" />AI Score: {selectedTask.achievability_score}/10</span>
                              <span className="flex items-center gap-1 text-green-600"><TrendingUp className="w-4 h-4" />ROI: {selectedTask.roi}</span>
                            </div>
                          </div>
                          <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-slate-900">×</button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <p className="text-sm text-slate-600"><span className="text-slate-900 font-medium">Recommended Action:</span> {selectedTask.recommended_action}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-700" />Tasks Ranked by ROI</h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {[...result.tasks].sort((a, b) => b.roi - a.roi).map((task, index) => {
                        const quadrant = task.time_score >= 5 && task.achievability_score >= 5 ? "quick-win" : task.time_score >= 5 ? "strategic" : task.achievability_score >= 5 ? "easy-win" : "skip";
                        return (
                          <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: index * 0.05 }} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 transition-colors duration-200 cursor-pointer" onClick={() => setSelectedTask(task)}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${getQuadrantColor(quadrant)} text-white`}>{getQuadrantLabel(quadrant)}</span>
                                  <span className="text-xs text-slate-500">Time: {task.time_score}/10 • AI: {task.achievability_score}/10</span>
                                </div>
                                <h4 className="text-slate-900 font-medium mb-1">{task.task_name}</h4>
                                <p className="text-sm text-slate-600">{task.why}</p>
                                <p className="text-sm text-blue-700 mt-2">→ {task.recommended_action}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">{task.roi}</div>
                                <div className="text-xs text-slate-500">ROI Score</div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Automate {topTask ? `"${topTask.task_name}"` : "Your Top Task"}?</h3>
                      <p className="text-slate-600">Book a free 15-minute call to discuss implementation.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="https://calendly.com/blakemcginn/consultation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20">Book Free Strategy Call<ChevronRight className="w-4 h-4" /></a>
                    </div>

                    {!submitted ? (
                      <form onSubmit={handleSaveResults} className="mt-6 pt-6 border-t border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <Mail className="w-4 h-4 text-blue-700" />
                          <span className="text-sm text-slate-900 font-medium">Save your results</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-blue-700 focus:outline-none transition-colors" required />
                          <button type="submit" className="px-6 py-3 bg-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-slate-300 transition-colors flex items-center justify-center gap-2">Save Results<ArrowRight className="w-4 h-4" /></button>
                        </div>
                        <label className="flex items-center gap-2 mt-3 text-sm text-slate-600 cursor-pointer">
                          <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="w-4 h-4 rounded border-slate-300 bg-white text-blue-700 focus:ring-blue-700" />
                          Also subscribe to AI automation tips (weekly, unsubscribe anytime)
                        </label>
                      </form>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-6 border-t border-blue-200 flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-5 h-5" /><span>Results saved! Check your inbox.</span>
                      </motion.div>
                    )}
                  </div>

                  <button onClick={resetAnalyzer} className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2 mx-auto">
                    <RefreshCcw className="w-4 h-4" />Analyze Different Tasks
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
