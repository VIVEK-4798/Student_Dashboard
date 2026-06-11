"use client";

import React, { useCallback } from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import { getIconByName } from "../../lib/icons";

// Types
type NavItemId = "dashboard" | "courses" | "activity" | "settings";

interface NavItem {
  id: NavItemId;
  label: string;
  icon: string;
}

interface SidebarProps {
  active: NavItemId;
  onChange: (id: NavItemId) => void;
  collapsed?: boolean;
}

// Navigation configuration
const NAV_ITEMS: readonly NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "layoutdashboard" },
  { id: "courses", label: "Courses", icon: "code" },
  { id: "activity", label: "Activity", icon: "rocket" },
  { id: "settings", label: "Settings", icon: "database" },
] as const;

// Animation configurations
const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
};

const hoverTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.5,
};

const buttonVariants: Variants = {
  idle: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const activeIndicatorVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1 },
};

export default function Sidebar({ active, onChange, collapsed = false }: SidebarProps) {
  const handleNavClick = useCallback((id: NavItemId) => {
    onChange(id);
  }, [onChange]);

  return (
    <>
      {/* Desktop Sidebar (Full width) */}
      <nav
        aria-label="Primary navigation"
        className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0a0e1a] to-[#05070a] border-r border-white/5 z-40"
      >
        <div className="flex flex-col h-full px-4 py-6">
          {/* Logo Area */}
          <div className="mb-8 px-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              LearnHub
            </h1>
            <p className="text-xs text-slate-400 mt-1">Next-Gen Learning</p>
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = getIconByName(item.icon);
              const isActive = active === item.id;

              return (
                <li key={item.id}>
                  <motion.button
                    onClick={() => handleNavClick(item.id)}
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    transition={hoverTransition}
                    className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0a0e1a]`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={item.label}
                  >
                    <Icon className={`h-5 w-5 transition-colors duration-200 ${
                      isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200"
                    }`} />
                    <span className="flex-1 text-left">{item.label}</span>

                    {/* Active Indicator with Animation */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        variants={activeIndicatorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={springTransition}
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-gradient-to-b from-indigo-500 to-purple-500"
                      />
                    )}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* Footer Area */}
          <div className="pt-4 mt-auto border-t border-white/5">
            <div className="px-3 py-2">
              <p className="text-xs text-slate-500">v2.0.0</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Tablet Sidebar (Collapsed - Icons Only) */}
      <nav
        aria-label="Primary navigation collapsed"
        className="hidden md:block lg:hidden fixed left-0 top-0 h-screen w-20 bg-gradient-to-b from-[#0a0e1a] to-[#05070a] border-r border-white/5 z-40"
      >
        <div className="flex flex-col h-full items-center px-2 py-6">
          {/* Logo Icon */}
          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
          </div>

          {/* Navigation Icons */}
          <ul className="flex-1 space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = getIconByName(item.icon);
              const isActive = active === item.id;

              return (
                <li key={item.id}>
                  <motion.button
                    onClick={() => handleNavClick(item.id)}
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    transition={hoverTransition}
                    className={`relative flex w-full items-center justify-center rounded-lg p-2.5 transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0a0e1a]`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={item.label}
                  >
                    <Icon className={`h-5 w-5 transition-colors duration-200 ${
                      isActive ? "text-indigo-400" : "text-slate-400"
                    }`} />
                    <span className="sr-only">{item.label}</span>

                    {/* Active Indicator for Collapsed Sidebar */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-collapsed"
                        variants={activeIndicatorVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={springTransition}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-gradient-to-b from-indigo-500 to-purple-500"
                      />
                    )}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {/* Footer Icon */}
          <div className="pt-4 mt-auto">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer div to offset content (prevents overlap) */}
      <div className={`hidden ${collapsed ? 'md:block lg:hidden' : 'lg:block'}`} style={{ width: collapsed ? '80px' : '256px' }} />
    </>
  );
}