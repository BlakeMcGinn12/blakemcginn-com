"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Circle, ArrowRight, Sparkles, BarChart3 } from "lucide-react";

interface ChecklistItem {
  id: number;
  text: string;
}

const checklistItems: ChecklistItem[] = [
  { id: 1, text: "I spend 5+ hours/week on repetitive tasks" },
  { id: 2, text: "I use 5+ different software tools daily" },
  { id: 3, text: "I frequently copy/paste data between apps" },
  { id: 4, text: "I have tasks that follow the same steps every time" },
  { id: 5, text: "I check multiple dashboards/platforms for updates" },
  { id: 6, text: "I send similar emails/messages repeatedly" },
  { id: 7, text: "I wish I had more time for strategic work" },
  { id: 8, text: "My team asks me the same questions repeatedly" },
  { id: 9, text: "I have data spread across multiple places" },
  { id: 10, text: "I've tried automation tools but gave up" },
];

interface ScoreResult {
  category: string;
  description: string;
  color: string;
  bgColor: string;
}

function calculateResult(score: number): ScoreResult {
  if (score <= 30) {
    return {
      category: "Early Stage",
      description: "You're just getting started. There's huge potential to automate your workflows and reclaim your time. Let's explore the possibilities together.",
      color: "text-amber-600",
      bgColor: "from-amber-500 to-orange-500",
    };
  } else if (score <= 60) {
    return {
      category: "Getting There",
      description: "You have a solid foundation. With the right AI setup, you can eliminate most of your repetitive work and focus on what matters most.",
      color: "text-blue-600",
      bgColor: "from-blue-500 to-indigo-500",
    };
  } else {
    return {
      category: "AI-Ready",
      description: "You're primed for transformation. You clearly understand the pain of manual work—now let's build the automated systems you need.",
      color: "text-emerald-600",
      bgColor: "from-emerald-500 to-teal-500",
    };
  }
}

export default function AIReadinessChecklist() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [showResults, setShowResults] = useState(false);

  const toggleItem = (id: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const score = useMemo(() => {
    return Math.round((checkedItems.size / checklistItems.length) * 100);
  }, [checkedItems]);

  const progress = score;
  const result = calculateResult(score);
  const checkedCount = checkedItems.size;

  const handleViewResults = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setCheckedItems(new Set());
    setShowResults(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="max-w-2xl mx-auto mb-12"
    >
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full group"
      >
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#7b2cbf] flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">
                Quick AI Readiness Check
              </h3>
              <p className="text-sm text-slate-500">
                {isExpanded ? "Check all that apply to you" : "2-minute assessment — no email required"}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-slate-200 border-t-0 rounded-b-2xl p-6 shadow-sm">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">
                    Progress
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {checkedCount}/{checklistItems.length}
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {!showResults ? (
                <>
                  {/* Checklist Items */}
                  <div className="space-y-2 mb-6">
                    {checklistItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-200 group ${
                          checkedItems.has(item.id)
                            ? "bg-blue-50 border border-blue-200"
                            : "bg-slate-50 border border-transparent hover:bg-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {checkedItems.has(item.id) ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            </motion.div>
                          ) : (
                            <Circle className="w-5 h-5 text-slate-400 group-hover:text-slate-500 transition-colors" />
                          )}
                        </div>
                        <span
                          className={`text-sm leading-relaxed ${
                            checkedItems.has(item.id)
                              ? "text-slate-900 font-medium"
                              : "text-slate-600"
                          }`}
                        >
                          {item.text}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* View Results Button */}
                  <motion.button
                    onClick={handleViewResults}
                    disabled={checkedCount === 0}
                    whileHover={checkedCount > 0 ? { scale: 1.02 } : {}}
                    whileTap={checkedCount > 0 ? { scale: 0.98 } : {}}
                    className={`w-full py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      checkedCount > 0
                        ? "bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    See Your AI Readiness Score
                  </motion.button>
                </>
              ) : (
                <>
                  {/* Results Display */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                  >
                    {/* Score Circle */}
                    <div className="mb-6">
                      <div className="relative inline-flex items-center justify-center">
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="58"
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="8"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="58"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(score / 100) * 364} 364`}
                            initial={{ strokeDasharray: "0 364" }}
                            animate={{ strokeDasharray: `${(score / 100) * 364} 364` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#00d4ff" />
                              <stop offset="100%" stopColor="#7b2cbf" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-slate-900">{score}</span>
                          <span className="text-xs text-slate-500">/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${result.bgColor} text-white font-semibold text-sm mb-4`}
                    >
                      {result.category}
                    </motion.div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-slate-600 mb-6 max-w-md mx-auto"
                    >
                      {result.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                      <a
                        href="/assessment"
                        className="group inline-flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/20"
                      >
                        See what you can automate
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 px-6 py-3 rounded-xl font-medium transition-colors"
                      >
                        Start over
                      </button>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
