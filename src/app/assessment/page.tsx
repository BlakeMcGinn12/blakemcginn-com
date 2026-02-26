"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, CheckCircle, RefreshCcw, Plus, X, ArrowLeft, Target } from "lucide-react";
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
  LabelList,
} from "recharts";

interface Task {
  id: string;
  description: string;
  hoursPerWeek: number;
}

interface AnalyzedTask extends Task {
  automationPotential: number; // 0-10 scale
  canBeAutomated: boolean;
  reasoning: string;
}

interface AnalysisResult {
  tasks: AnalyzedTask[];
  chartData: {
    x: number; // automationPotential
    y: number; // hoursPerWeek
    name: string;
    reasoning: string;
    canBeAutomated: boolean;
  }[];
}

export default function AssessmentPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  const [currentHours, setCurrentHours] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const addTask = () => {
    if (!currentTask.trim() || !currentHours.trim()) return;
    
    const hours = parseFloat(currentHours);
    if (isNaN(hours) || hours <= 0) return;

    const newTask: Task = {
      id: Date.now().toString(),
      description: currentTask.trim(),
      hoursPerWeek: hours,
    };

    setTasks([...tasks, newTask]);
    setCurrentTask("");
    setCurrentHours("");
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAnalyze = async () => {
    if (tasks.length === 0) return;
    
    setIsAnalyzing(true);
    setError("");
    
    try {
      const response = await fetch("/api/analyze-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks }),
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

  const resetAssessment = () => {
    setTasks([]);
    setResult(null);
    setError("");
  };

  // Chart colors based on quadrant
  const getDotColor = (automationPotential: number, hoursPerWeek: number) => {
    if (automationPotential >= 7 && hoursPerWeek >= 5) return "#22c55e"; // Green - Priority
    if (automationPotential >= 7 && hoursPerWeek < 5) return "#3b82f6"; // Blue - Easy wins
    if (automationPotential < 7 && hoursPerWeek >= 5) return "#f59e0b"; // Yellow - Consider
    return "#ef4444"; // Red - Skip
  };

  const getQuadrantLabel = (automationPotential: number, hoursPerWeek: number) => {
    if (automationPotential >= 7 && hoursPerWeek >= 5) return "Priority";
    if (automationPotential >= 7 && hoursPerWeek < 5) return "Easy Win";
    if (automationPotential < 7 && hoursPerWeek >= 5) return "Consider";
    return "Skip";
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-[#27272a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              What Should You Automate?
            </h1>
            <p className="text-base sm:text-lg text-[#9ca3af] max-w-2xl mx-auto px-2 sm:px-0">
              Add your repetitive tasks and we&apos;ll show you which ones are worth automating 
              and which can be done easily with AI.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl mx-auto"
              >
                {/* Task Input Form */}
                <div className="bg-[#12121a] rounded-2xl p-4 sm:p-6 md:p-8 border border-[#27272a] mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr,auto,auto] gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Task Description
                      </label>
                      <input
                        type="text"
                        value={currentTask}
                        onChange={(e) => setCurrentTask(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        placeholder="e.g., Check and respond to emails"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-[#00d4ff] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="w-full sm:w-32">
                      <label className="block text-sm font-medium text-white mb-2">
                        Hours/Week
                      </label>
                      <input
                        type="number"
                        value={currentHours}
                        onChange={(e) => setCurrentHours(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        placeholder="5"
                        min="0.5"
                        step="0.5"
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-[#00d4ff] focus:outline-none transition-colors"
                      />
                    </div>
                    <button
                      onClick={addTask}
                      disabled={!currentTask.trim() || !currentHours.trim()}
                      className="px-6 py-3 bg-[#27272a] text-white rounded-xl hover:bg-[#3f3f46] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </button>
                  </div>
                </div>

                {/* Task List */}
                {tasks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#12121a] rounded-2xl p-4 sm:p-6 border border-[#27272a] mb-6"
                  >
                    <h3 className="text-sm font-medium text-[#9ca3af] mb-4 uppercase tracking-wider">
                      Your Tasks ({tasks.length})
                    </h3>
                    <div className="space-y-3">
                      {tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-between bg-[#0a0a0f] rounded-xl p-4 border border-[#27272a]"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="text-white font-medium truncate">{task.description}</p>
                            <p className="text-sm text-[#9ca3af]">{task.hoursPerWeek} hours/week</p>
                          </div>
                          <button
                            onClick={() => removeTask(task.id)}
                            className="p-2 text-[#9ca3af] hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Error */}
                {error && (
                  <p className="text-red-400 text-sm text-center mb-4">{error}</p>
                )}

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={tasks.length === 0 || isAnalyzing}
                  className="w-full py-4 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5" />
                      Analyze My Tasks
                    </>
                  )}
                </button>

                {/* Tips */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-[#9ca3af]">
                    Tip: Add 3-8 tasks for the best analysis
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
              >
                {/* Left: Task List with Results */}
                <div className="space-y-6 order-2 lg:order-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Your Tasks</h2>
                    <button
                      onClick={resetAssessment}
                      className="text-sm text-[#9ca3af] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Start Over
                    </button>
                  </div>

                  <div className="space-y-3">
                    {result.tasks.map((task, index) => {
                      const color = getDotColor(task.automationPotential, task.hoursPerWeek);
                      const label = getQuadrantLabel(task.automationPotential, task.hoursPerWeek);
                      
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-[#12121a] rounded-xl p-4 border border-[#27272a]"
                        >
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div 
                              className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: color }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                                <h3 className="text-white font-medium truncate">{task.description}</h3>
                                <span 
                                  className="text-xs px-2 py-0.5 rounded-full font-medium w-fit"
                                  style={{ 
                                    backgroundColor: `${color}20`,
                                    color: color 
                                  }}
                                >
                                  {label}
                                </span>
                              </div>
                              <p className="text-sm text-[#9ca3af] mb-2">
                                {task.hoursPerWeek} hours/week
                              </p>
                              <p className="text-sm text-white/80">{task.reasoning}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: The Chart */}
                <div className="bg-[#12121a] rounded-2xl p-4 sm:p-6 border border-[#27272a] order-1 lg:order-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Automation Map</h2>
                  <p className="text-sm text-[#9ca3af] mb-4 sm:mb-6">
                    Tasks plotted by time cost vs. automation potential
                  </p>

                  {/* Chart */}
                  <div className="relative">
                    {/* Y-axis label - positioned outside chart on desktop, hidden on mobile */}
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6">
                      <span className="text-xs text-[#9ca3af] whitespace-nowrap -rotate-90 block origin-center">
                        Time Cost (hours/week) →
                      </span>
                    </div>
                    
                    <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart 
                          margin={{ 
                            top: 20, 
                            right: 10, 
                            bottom: 20, 
                            left: 0 
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis 
                            type="number" 
                            dataKey="x" 
                            name="Automation Potential" 
                            domain={[0, 10]}
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            stroke="#27272a"
                            tickCount={6}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="y" 
                            name="Hours/Week" 
                            stroke="#27272a"
                            tick={{ fill: '#9ca3af', fontSize: 11 }}
                            width={35}
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-[#1a1a24] border border-[#27272a] rounded-lg p-3 shadow-xl max-w-[200px] sm:max-w-xs">
                                    <p className="font-semibold text-white mb-1 text-sm">{data.name}</p>
                                    <p className="text-xs text-[#9ca3af] mb-2 line-clamp-3">{data.reasoning}</p>
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 text-xs">
                                      <span className="text-[#00d4ff]">Time: {data.y}h/week</span>
                                      <span className="text-purple-400">Potential: {data.x}/10</span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          {/* Quadrant lines */}
                          <ReferenceLine x={7} stroke="#3f3f46" strokeDasharray="5 5" />
                          <ReferenceLine y={5} stroke="#3f3f46" strokeDasharray="5 5" />
                          
                          <Scatter data={result.chartData}>
                            {result.chartData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={getDotColor(entry.x, entry.y)}
                              />
                            ))}
                            <LabelList 
                              dataKey="name" 
                              position="top" 
                              fill="#9ca3af" 
                              fontSize={10}
                              className="hidden sm:block"
                            />
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Quadrant Labels - Responsive positioning */}
                    {/* Top Right - Priority */}
                    <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-right pointer-events-none bg-[#12121a]/80 px-1.5 py-0.5 rounded">
                      <div className="text-[10px] sm:text-xs font-bold text-green-400">Priority</div>
                      <div className="hidden sm:block text-[9px] sm:text-[10px] text-[#9ca3af]">High time • High potential</div>
                    </div>
                    
                    {/* Top Left - Consider */}
                    <div className="absolute top-1 left-8 sm:top-2 sm:left-12 pointer-events-none bg-[#12121a]/80 px-1.5 py-0.5 rounded">
                      <div className="text-[10px] sm:text-xs font-bold text-yellow-400">Consider</div>
                      <div className="hidden sm:block text-[9px] sm:text-[10px] text-[#9ca3af]">High time • Lower potential</div>
                    </div>
                    
                    {/* Bottom Right - Easy Win */}
                    <div className="absolute bottom-6 right-1 sm:bottom-8 sm:right-2 text-right pointer-events-none bg-[#12121a]/80 px-1.5 py-0.5 rounded">
                      <div className="text-[10px] sm:text-xs font-bold text-blue-400">Easy Win</div>
                      <div className="hidden sm:block text-[9px] sm:text-[10px] text-[#9ca3af]">Less time • High potential</div>
                    </div>
                    
                    {/* Bottom Left - Skip */}
                    <div className="absolute bottom-6 left-8 sm:bottom-8 sm:left-12 pointer-events-none bg-[#12121a]/80 px-1.5 py-0.5 rounded">
                      <div className="text-[10px] sm:text-xs font-bold text-red-400">Skip</div>
                      <div className="hidden sm:block text-[9px] sm:text-[10px] text-[#9ca3af]">Lower on both</div>
                    </div>
                  </div>

                  {/* X-axis label */}
                  <div className="flex justify-center mt-2">
                    <span className="text-xs text-[#9ca3af] text-center">
                      ← Automation Potential (ease + efficiency) →
                    </span>
                  </div>
                  
                  {/* Y-axis label for mobile - below chart */}
                  <div className="flex lg:hidden justify-center mt-1">
                    <span className="text-xs text-[#9ca3af]">
                      ↑ Time Cost (hours/week)
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="lg:col-span-2 text-center pt-6 sm:pt-8 border-t border-[#27272a] order-3">
                  <p className="text-[#9ca3af] mb-4 text-sm sm:text-base">
                    Want help implementing these automations?
                  </p>
                  <a
                    href="https://calendly.com/blakemcginn/consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base"
                  >
                    Book a Free Strategy Call
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
