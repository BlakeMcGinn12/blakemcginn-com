"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#050508] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Blake McGinn</h3>
            <p className="text-[#9ca3af] mb-6 max-w-md">
              AI marketing consultant helping businesses implement systems that 
              drive real results — not hype, not experiments, but scalable solutions.
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-[#00d4ff] focus:outline-none transition-colors duration-200 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#7b2cbf] text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <p className="text-[#22c55e] text-sm">Thanks for subscribing!</p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#quiz" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
                  AI Quiz
                </a>
              </li>
              <li>
                <a href="mailto:hello@blakemcginn.com" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-[#9ca3af]">Workflow Automation</span>
              </li>
              <li>
                <span className="text-[#9ca3af]">Content Generation</span>
              </li>
              <li>
                <span className="text-[#9ca3af]">AI Assistants</span>
              </li>
              <li>
                <span className="text-[#9ca3af]">Custom AI Models</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9ca3af] text-sm">
            © {new Date().getFullYear()} Blake McGinn. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
