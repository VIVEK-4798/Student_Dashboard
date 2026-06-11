"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { Home, Book, Activity, Settings, Menu, X, Sparkles } from "lucide-react";

// Types
type NavId = "dashboard" | "courses" | "activity" | "settings";

interface NavItem {
  id: NavId;
  label: string;
  icon: typeof Home;
  description?: string;
}

interface MobileNavProps {
  active?: NavId;
  onChange?: (id: NavId) => void;
  userName?: string;
}

// Navigation configuration
const NAV_ITEMS: readonly NavItem[] = [
  { id: "dashboard", label: "Home", icon: Home, description: "Overview" },
  { id: "courses", label: "Courses", icon: Book, description: "Your learning" },
  { id: "activity", label: "Activity", icon: Activity, description: "Progress" },
  { id: "settings", label: "Settings", icon: Settings, description: "Preferences" },
] as const;

// Animation configurations
const menuTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const sidebarVariants: Variants = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { 
    x: "-100%",
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, type: "spring", stiffness: 300 }
  }),
  exit: { opacity: 0, x: -20 },
};

const bottomNavVariants: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.1 }
  },
};

const buttonVariants: Variants = {
  tap: { scale: 0.92 },
  hover: { scale: 1.05, transition: { type: "spring", stiffness: 400 } },
};

export default function MobileNav({ active = "dashboard", onChange, userName = "Student" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Handle mounting for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = useCallback((id: NavId) => {
    onChange?.(id);
    setOpen(false);
  }, [onChange]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating Menu Button */}
      <motion.button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        className="fixed top-4 left-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-xl glass-backdrop text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden shadow-lg"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Bottom Navigation Bar */}
      <motion.nav
        aria-label="Mobile navigation"
        variants={bottomNavVariants}
        initial="hidden"
        animate="visible"
        className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-lg rounded-2xl bg-gradient-to-r from-[#0a0e1a]/95 to-[#05070a]/95 backdrop-blur-xl border border-white/10 p-2 flex justify-between items-center lg:hidden shadow-2xl"
        role="navigation"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <motion.button
              key={item.id}
              aria-label={item.label}
              onClick={() => handleNavClick(item.id)}
              variants={buttonVariants}
              whileTap="tap"
              whileHover="hover"
              className={`
                relative flex h-12 w-12 items-center justify-center rounded-xl 
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500
                ${isActive 
                  ? "text-white bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/25" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                }
              `}
            >
              <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
              
              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="mobile-active-dot"
                  className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-indigo-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
              )}
              
              <span className="sr-only">{item.label}</span>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* Overlay Sidebar for Mobile */}
      <AnimatePresence mode="wait">
        {open && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-50 flex lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-50 w-80 max-w-[85vw] h-full bg-gradient-to-b from-[#0a0e1a] to-[#05070a] border-r border-white/10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <div>
                  <motion.h3 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    LearnHub
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs text-slate-400 mt-1"
                  >
                    Welcome back, {userName}
                  </motion.p>
                </div>
                
                <motion.button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <ul className="p-4 space-y-2">
                {NAV_ITEMS.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  
                  return (
                    <motion.li
                      key={item.id}
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                    >
                      <motion.button
                        onClick={() => handleNavClick(item.id)}
                        whileHover={{ x: 4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative flex w-full items-center gap-3 rounded-xl px-4 py-3 
                          text-sm font-medium transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-indigo-500
                          ${isActive 
                            ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white border border-indigo-500/30" 
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                          }
                        `}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Icon className={`h-5 w-5 transition-colors ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                        
                        <div className="flex-1 text-left">
                          <span className="block">{item.label}</span>
                          {item.description && (
                            <span className="text-xs text-slate-400 block">{item.description}</span>
                          )}
                        </div>
                        
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-indicator"
                            className="absolute right-3 w-1.5 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10"
              >
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-white/5">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs text-slate-400">Keep learning, stay curious!</span>
                </div>
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}