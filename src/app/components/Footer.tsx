"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone, Calendar, Linkedin, Twitter, Github, ExternalLink } from "lucide-react";

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

  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: "Discovery Call", href: "#workflows" },
    { name: "Custom Design", href: "#workflows" },
    { name: "Build & Test", href: "#workflows" },
    { name: "Deploy & Train", href: "#workflows" },
    { name: "Executive Assistant Workflow", href: "#workflows" },
    { name: "Sales Pipeline Automation", href: "#workflows" },
    { name: "Content Marketing Engine", href: "#workflows" },
    { name: "Finance & Operations", href: "#workflows" },
  ];

  const resourceLinks = [
    { name: "Blog", href: "#blog" },
    { name: "AI Checklist", href: "/checklist" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Assessment Tool", href: "/assessment" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "https://linkedin.com/in/blakemcginn", icon: Linkedin },
    { name: "Twitter/X", href: "https://twitter.com/blakemcginn", icon: Twitter },
    { name: "GitHub", href: "https://github.com/blakemcginn", icon: Github },
  ];

  return (
    <footer className="bg-[#050508] py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BM</span>
              </div>
              <div>
                <div className="font-semibold text-white">Blake McGinn</div>
                <div className="text-xs text-slate-400">AI Automation Consultant</div>
              </div>
            </div>
            <p className="text-[#9ca3af] text-sm mb-6">
              Helping businesses implement AI systems that drive real results — not hype, 
              not experiments, but scalable automation solutions that actually work.
            </p>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Stay Updated</h4>
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0f] border border-[#27272a] text-white placeholder:text-[#9ca3af] focus:border-blue-500 focus:outline-none transition-colors duration-200 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <p className="text-green-400 text-sm">Thanks for subscribing!</p>
              )}
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[#9ca3af] hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mb-3 mt-6 text-sm uppercase tracking-wider">Workflows</h4>
            <ul className="space-y-2">
              {serviceLinks.slice(4).map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[#9ca3af] hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[#9ca3af] hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="text-white font-semibold mb-3 mt-6 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-[#9ca3af] text-sm">Workflow Automation</span>
              </li>
              <li>
                <span className="text-[#9ca3af] text-sm">Content Generation</span>
              </li>
              <li>
                <span className="text-[#9ca3af] text-sm">AI Assistants</span>
              </li>
              <li>
                <span className="text-[#9ca3af] text-sm">Custom AI Models</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:blake@blakemcginn.com" 
                  className="flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors duration-200 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  blake@blakemcginn.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-[#9ca3af] text-sm">
                  <Phone className="w-4 h-4" />
                  [Phone placeholder]
                </span>
              </li>
              <li>
                <a 
                  href="https://calendly.com/blakemcginn/30min" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors duration-200 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Book a Call
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <h4 className="text-white font-semibold mb-3 mt-6 text-sm uppercase tracking-wider">Follow</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#0a0a0f] border border-[#27272a] rounded-lg flex items-center justify-center text-[#9ca3af] hover:text-white hover:border-blue-500 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9ca3af] text-sm">
            © {currentYear} Blake McGinn. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#privacy" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#terms" className="text-[#9ca3af] hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
