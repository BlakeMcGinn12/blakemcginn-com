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
    x: number; // achievability_score
    y: number; // time_score
    name: string;
    why: string;
    recommended_action: string;
    roi: number;
    quadrant: string;
  }[];
}

const QuadrantLabels = () => (
  <>
    {/* Top Right - Quick Wins */}
    <div className="absolute top-4 right-4 text-right pointer-events-none">
      <div className="text-xs font-bold text-green-400 uppercase tracking-wider">Quick Wins</div>
      <div className="text-[10px] text-gray-500">High Time Save • High Achievability</div>
    </div>
    {/* Top Left - Strategic */}
    <div className="absolute top-4 left-4 pointer-events-none">
      <div className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Strategic</div>
      <div className="text-[10px] text-gray-500">High Time Save • Lower Achievability</div>
    </div>
    {/* Bottom Right - Easy Wins */}
    <div className="absolute bottom-4 right-4 text-right pointer-events-none">
      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Easy Wins</div>
      <div className="text-[10px] text-gray-500">Lower Time Save • High Achievability</div>
    </div>
    {/* Bottom Left - Skip */}
    <div className="absolute bottom-4 left-4 pointer-events-none">
      <div className="text-xs font-bold text-red-400 uppercase tracking-wider">Skip</div>
      <div className="text-[10px] text-gray-500">Lower on Both</div>
    </div>
  </>
);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#1a1a24] border border-[#27272a] rounded-lg p-3 shadow-xl max-w-xs">
        <p className="font-semibold text-white mb-1">{data.name}</p>
        <p className="text-xs text-[#9ca3af] mb-2">{data.why}</p>
        <div className="flex gap-4 text-xs">
          <span className="text-[#00d4ff]">Time: {data.y}/10</span>
          <span className="text-purple-400">AI: {data.x}/10</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyzerPage() {
  const [taskInput, setTaskInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);

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

      // Transform data for chart
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

      setResult({ tasks: data.tasks, chart_data: chartData });
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
      // Send to your backend to save results
      await fetch("https://consulting-analyze-tasks.execute-api.us-east-1.amazonaws.com/prod/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          newsletter,
          tasks: result.tasks,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save results:", err);
      // Still mark as submitted even if save fails
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
      case "quick-win":
        return "#4ade80"; // green-400
      case "strategic":
        return "#facc15"; // yellow-400
      case "easy-win":
        return "#60a5fa"; // blue-400
      case "skip":
        return "#f87171"; // red-400
      default:
        return "#9ca3af";
    }
  };

  const getQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case "quick-win":
        return "Quick Win";
      case "strategic":
        return "Strategic";
      case "easy-win":
        return "Easy Win";
      case "skip":
        return "Skip";
      default:
        return quadrant;
    }
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case "quick-win":
        return "from-green-500 to-green-600";
      case "strategic":
        return "from-yellow-500 to-yellow-600";
      case "easy-win":
        return "from-blue-500 to-blue-600";
      case "skip":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-[#27272a] rounded-lg w-3/4 mx-auto"></div>
      <div className="h-4 bg-[#27272a] rounded w-1/2 mx-auto"></div>
      <div className="space-y-3">
        <div className="h-32 bg-[#27272a] rounded-xl"></div>
        <div className="h-32 bg-[#27272a] rounded-xl"></div>
        <div className="h-32 bg-[#27272a] rounded-xl"></div>
      </div>
    </div>
  );

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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
              AI Task Analyzer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              What Could You{" "}
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] bg-clip-text text-transparent">
                Automate?
              </span>
            </h1>
            <p className="text-lg text-[#9ca3af] max-w-2xl mx-auto">
              Enter your weekly tasks. Get a personalized automation chart showing exactly
              what to automate first.
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
                      placeholder="• Check and respond to emails (2 hours/day)
• Update CRM after sales calls
• Generate weekly client reports
• Post to social media 3x per week
• Create meeting summaries
• Data entry from forms"
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
                  {error && <p className="text-red-400 text-sm">{error}</p>}

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
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Chart Display */}
                  <div className="bg-[#0a0a0f] rounded-2xl p-6 border border-[#27272a]">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <Target className="w-5 h-5 text-[#00d4ff]" />
                          Your Automation Matrix
                        </h3>
                        <p className="text-sm text-[#9ca3af]">
                          Click any dot to see details
                        </p>
                      </div>
                      <div className="flex gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-green-400"></span>
                          Quick Win
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                          Strategic
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                          Easy Win
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-3 h-3 rounded-full bg-red-400"></span>
                          Skip
                        </span>
                      </div>
                    </div>

                    <div className="relative h-[400px] w-full">
                      <QuadrantLabels />
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis
                            type="number"
                            dataKey="x"
                            name="AI Achievability"
                            domain={[0, 10]}
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                            axisLine={{ stroke: "#27272a" }}
                            tickLine={{ stroke: "#27272a" }}
                            label={{
                              value: "AI Achievability →",
                              position: "bottom",
                              fill: "#9ca3af",
                              fontSize: 12,
                            }}
                          />
                          <YAxis
                            type="number"
                            dataKey="y"
                            name="Time Saving Potential"
                            domain={[0, 10]}
                            tick={{ fill: "#9ca3af", fontSize: 12 }}
                            axisLine={{ stroke: "#27272a" }}
                            tickLine={{ stroke: "#27272a" }}
                            label={{
                              value: "← Time Saving Potential",
                              angle: -90,
                              position: "left",
                              fill: "#9ca3af",
                              fontSize: 12,
                            }}
                          />
                          <ReferenceLine x={5} stroke="#27272a" strokeDasharray="3 3" />
                          <ReferenceLine y={5} stroke="#27272a" strokeDasharray="3 3" />
                          <Tooltip content={<CustomTooltip />} />
                          <Scatter
                            data={result.chart_data}
                            onClick={(data) => {
                              if (data && data.payload) {
                                const task = result.tasks.find(
                                  (t) => t.task_name === data.payload.name
                                );
                                if (task) setSelectedTask(task);
                              }
                            }}
                            cursor="pointer"
                          >
                            {result.chart_data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={getDotColor(entry.quadrant)}
                                strokeWidth={2}
                                stroke="#0a0a0f"
                              />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Selected Task Detail */}
                  <AnimatePresence>
                    {selectedTask && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-gradient-to-r from-[#00d4ff]/10 to-[#7b2cbf]/10 rounded-2xl p-6 border border-[#00d4ff]/20"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-[#00d4ff] font-medium mb-1">Task Details</p>
                            <h4 className="text-xl font-bold text-white mb-2">
                              {selectedTask.task_name}
                            </h4>
                            <p className="text-[#9ca3af] mb-3">{selectedTask.why}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1 text-[#00d4ff]">
                                <Clock className="w-4 h-4" />
                                Time Score: {selectedTask.time_score}/10
                              </span>
                              <span className="flex items-center gap-1 text-purple-400">
                                <Zap className="w-4 h-4" />
                                AI Score: {selectedTask.achievability_score}/10
                              </span>
                              <span className="flex items-center gap-1 text-green-400">
                                <TrendingUp className="w-4 h-4" />
                                ROI: {selectedTask.roi}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedTask(null)}
                            className="text-[#9ca3af] hover:text-white"
                          >
                            ×
                          </button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#27272a]">
                          <p className="text-sm text-[#9ca3af]">
                            <span className="text-white font-medium">Recommended Action:</span>{" "}
                            {selectedTask.recommended_action}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Results List - Ranked by ROI */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#00d4ff]" />
                      Tasks Ranked by ROI
                    </h3>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {[...result.tasks]
                        .sort((a, b) => b.roi - a.roi)
                        .map((task, index) => {
                          const quadrant =
                            task.time_score >= 5 && task.achievability_score >= 5
                              ? "quick-win"
                              : task.time_score >= 5
                              ? "strategic"
                              : task.achievability_score >= 5
                              ? "easy-win"
                              : "skip";
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="bg-[#0a0a0f] rounded-xl p-4 border border-[#27272a] hover:border-[#00d4ff]/30 transition-colors duration-200 cursor-pointer"
                              onClick={() => setSelectedTask(task)}
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span
                                      className={`text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r ${getQuadrantColor(
                                        quadrant
                                      )} text-white`}
                                    >
                                      {getQuadrantLabel(quadrant)}
                                    </span>
                                    <span className="text-xs text-[#9ca3af]">
                                      Time: {task.time_score}/10 • AI: {task.achievability_score}/10
                                    </span>
                                  </div>
                                  <h4 className="text-white font-medium mb-1">{task.task_name}</h4>
                                  <p className="text-sm text-[#9ca3af]">{task.why}</p>
                                  <p className="text-sm text-[#00d4ff] mt-2">
                                    → {task.recommended_action}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-[#22c55e]">
                                    {task.roi}
                                  </div>
                                  <div className="text-xs text-[#9ca3af]">ROI Score</div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="bg-gradient-to-r from-[#00d4ff]/10 to-[#7b2cbf]/10 rounded-2xl p-6 border border-[#00d4ff]/20">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Ready to Automate{" "}
                        {topTask ? `"${topTask.task_name}"` : "Your Top Task"}?
                      </h3>
                      <p className="text-[#9ca3af]">
                        Book a free 15-minute call to discuss implementation.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="https://calendly.com/blakemcginn/consultation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200"
                      >
                        Book Free Strategy Call
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Email Capture */}
                    {!submitted ? (
                      <form onSubmit={handleSaveResults} className="mt-6 pt-6 border-t border-[#27272a]">
                        <div className="flex items-center gap-2 mb-3">
                          <Mail className="w-4 h-4 text-[#00d4ff]" />
                          <span className="text-sm text-white font-medium">
                            Save your results
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
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
                            className="px-6 py-3 bg-[#27272a] text-white font-semibold rounded-xl hover:bg-[#3f3f46] transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            Save Results
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                        <label className="flex items-center gap-2 mt-3 text-sm text-[#9ca3af] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newsletter}
                            onChange={(e) => setNewsletter(e.target.checked)}
                            className="w-4 h-4 rounded border-[#27272a] bg-[#0a0a0f] text-[#00d4ff] focus:ring-[#00d4ff]"
                          />
                          Also subscribe to AI automation tips (weekly, unsubscribe anytime)
                        </label>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 pt-6 border-t border-[#27272a] flex items-center gap-2 text-green-400"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Results saved! Check your inbox.</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Reset */}
                  <button
                    onClick={resetAnalyzer}
                    className="text-[#9ca3af] hover:text-white transition-colors duration-200 flex items-center gap-2 mx-auto"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Analyze Different Tasks
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
