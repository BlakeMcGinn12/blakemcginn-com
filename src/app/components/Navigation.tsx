"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Calendar, ClipboardCheck, Download } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const getStartedRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (getStartedRef.current && !getStartedRef.current.contains(event.target as Node)) {
        setGetStartedOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "How It Works", href: "#workflows" },
    { name: "Skills", href: "#skills" },
    { name: "Pricing", href: "#pricing" },
    { name: "Security", href: "#security" },
  ];

  const getStartedOptions = [
    { 
      name: "Book Free Consultation", 
      href: "https://calendly.com/blakemcginn/30min",
      icon: Calendar,
      description: "30-min call to discuss your needs"
    },
    { 
      name: "Take 2-Min Assessment", 
      href: "/assessment",
      icon: ClipboardCheck,
      description: "Find your automation opportunities"
    },
    { 
      name: "Download AI Checklist", 
      href: "/checklist",
      icon: Download,
      description: "Free implementation guide"
    },
  ];

  const resourceLinks = [
    { name: "Blog", href: "#blog" },
    { name: "AI Checklist", href: "/checklist" },
    { name: "Case Studies", href: "#case-studies" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BM</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-slate-900">Blake McGinn</div>
              <div className="text-xs text-slate-500">AI Automation Consultant</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-700 transition-colors"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                  >
                    {resourceLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-700 hover:bg-slate-50 transition-colors"
                        onClick={() => setResourcesOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Get Started Dropdown */}
            <div className="relative" ref={getStartedRef}>
              <button
                onClick={() => setGetStartedOpen(!getStartedOpen)}
                className="flex items-center gap-1 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Get Started
                <ChevronDown className={`w-4 h-4 transition-transform ${getStartedOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {getStartedOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-3 z-50"
                  >
                    {getStartedOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.href}
                        target={option.href.startsWith("http") ? "_blank" : undefined}
                        rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
                        onClick={() => setGetStartedOpen(false)}
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                          <option.icon className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{option.name}</div>
                          <div className="text-xs text-slate-500">{option.description}</div>
                        </div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-6 bg-white"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-slate-600 hover:text-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Resources */}
              <div className="border-t border-slate-200 pt-4 mt-2">
                <div className="text-sm font-semibold text-slate-900 mb-2">Resources</div>
                <div className="flex flex-col gap-2 pl-2">
                  {resourceLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-blue-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Mobile Get Started Options */}
              <div className="border-t border-slate-200 pt-4 mt-2">
                <div className="text-sm font-semibold text-slate-900 mb-3">Get Started</div>
                <div className="flex flex-col gap-3">
                  {getStartedOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target={option.href.startsWith("http") ? "_blank" : undefined}
                      rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <option.icon className="w-5 h-5 text-blue-700" />
                      <span className="text-sm font-medium text-slate-900">{option.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
