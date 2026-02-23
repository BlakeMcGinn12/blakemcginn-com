"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, RefreshCcw } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What's your biggest marketing challenge?",
    options: [
      "Creating enough content consistently",
      "Generating qualified leads",
      "Understanding our data",
      "Automating repetitive tasks",
      "All of the above"
    ]
  },
  {
    id: 2,
    question: "What size is your team?",
    options: [
      "Just me (solo founder)",
      "Small team (2-10 people)",
      "Growing company (11-50)",
      "Established business (50+)"
    ]
  },
  {
    id: 3,
    question: "What's your current AI experience?",
    options: [
      "Haven't started yet",
      "Experimented with ChatGPT",
      "Using AI tools regularly",
      "Already have AI systems in place"
    ]
  },
  {
    id: 4,
    question: "What's your approximate monthly marketing budget?",
    options: [
      "Under $5,000",
      "$5,000 - $15,000",
      "$15,000 - $50,000",
      "$50,000+"
    ]
  },
  {
    id: 5,
    question: "How soon do you want to see results?",
    options: [
      "ASAP (within 30 days)",
      "Next quarter",
      "3-6 months",
      "Just exploring options"
    ]
  }
];

const results = {
  explorer: {
    title: "Explorer",
    description: "You're in the early stages of your AI journey.",
    recommendation: "Start with quick wins: content automation and a simple chatbot. These deliver immediate ROI while building your team's AI fluency.",
    nextSteps: [
      "30-minute AI strategy assessment",
      "Identify 3 automation opportunities",
      "Build your first AI workflow"
    ],
    color: "from-[#00d4ff] to-[#0099cc]"
  },
  builder: {
    title: "Builder",
    description: "You have the foundation. Now let's scale with AI.",
    recommendation: "You're ready for full workflow automation and predictive analytics. Focus on integrating AI deeply into your existing processes.",
    nextSteps: [
      "Custom AI roadmap session",
      "Implement 2-3 automation workflows",
      "Set up predictive analytics dashboard"
    ],
    color: "from-[#7b2cbf] to-[#5a1d8f]"
  },
  transformer: {
    title: "Transformer",
    description: "You're ready for a complete AI transformation.",
    recommendation: "Build custom AI models and advanced automation. This is where AI becomes a true competitive advantage.",
    nextSteps: [
      "Enterprise AI consultation",
      "Custom model development",
      "Full AI infrastructure build"
    ],
    color: "from-[#ff006e] to-[#cc0058]"
  }
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    const score = answers.reduce((acc, answer) => acc + answer, 0);
    if (score <= 6) return "explorer";
    if (score <= 12) return "builder";
    return "transformer";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmail("");
    setSubmitted(false);
  };

  const result = showResult ? results[calculateResult()] : null;

  return (
    <section id="quiz" className="py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium text-[#00d4ff] tracking-wider uppercase mb-4">
            AI Readiness Assessment
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What&apos;s Your AI Potential?
          </h2>
          <p className="text-lg text-[#9ca3af]">
            Take this 2-minute quiz to discover how AI can transform your marketing
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#12121a] rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/50"
        >
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-[#9ca3af] mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-[#27272a] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf]"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className="w-full text-left p-4 rounded-xl border border-[#27272a] hover:border-[#00d4ff]/50 hover:bg-[#1a1a24] transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-[#27272a] group-hover:border-[#00d4ff] flex items-center justify-center transition-colors duration-200">
                          <div className="w-3 h-3 rounded-full bg-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                        <span className="text-white">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : !submitted ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Result Badge */}
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${result?.color} text-white text-sm font-semibold mb-6`}>
                  Your Profile: {result?.title}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {result?.description}
                </h3>

                <p className="text-[#9ca3af] text-lg mb-8 leading-relaxed">
                  {result?.recommendation}
                </p>

                {/* Next Steps */}
                <div className="mb-8">
                  <h4 className="text-white font-semibold mb-4">Recommended Next Steps:</h4>
                  <ul className="space-y-3">
                    {result?.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-center gap-3 text-[#9ca3af]">
                        <CheckCircle className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Email Capture */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-white font-medium">
                    Get your detailed AI roadmap emailed to you:
                  </p>
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
                      className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
                    >
                      Send My Roadmap
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                <button
                  onClick={resetQuiz}
                  className="mt-6 text-[#9ca3af] hover:text-white transition-colors duration-200 flex items-center gap-2 mx-auto"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Retake Quiz
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
                  Roadmap Sent!
                </h3>
                <p className="text-[#9ca3af] mb-8">
                  Check your inbox for your personalized AI strategy. I&apos;ll be in touch within 24 hours.
                </p>
                <a
                  href="https://calendly.com" // Replace with your Calendly
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity duration-200"
                >
                  Book a Call Now
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
