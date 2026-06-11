"use client";

import React from "react";
import { motion, type Variants, type Transition } from "framer-motion";

interface NavItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  collapsed?: boolean;
  className?: string;
}

const hoverTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.5,
};

const variants: Variants = {
  idle: { scale: 1, x: 0 },
  hover: { scale: 1.02, x: 4 },
  tap: { scale: 0.98, x: 0 },
};

export function NavItem({
  label,
  icon,
  onClick,
  active = false,
  collapsed = false,
  className = "",
}: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      variants={variants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      transition={hoverTransition}
      className={`
        relative flex items-center gap-3 rounded-lg px-3 py-2.5
        text-sm font-medium transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        ${active 
          ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white border border-indigo-500/30" 
          : "text-slate-300 hover:text-white hover:bg-white/5"
        }
        ${collapsed ? "justify-center px-2" : "w-full"}
        ${className}
      `}
      aria-current={active ? "page" : undefined}
      aria-label={label}
    >
      {icon && (
        <span className={`transition-colors duration-200 ${
          active ? "text-indigo-400" : "text-slate-400"
        }`}>
          {icon}
        </span>
      )}
      
      {!collapsed && <span className="flex-1 text-left">{label}</span>}
      
      {collapsed && <span className="sr-only">{label}</span>}

      {/* Active Indicator */}
      {active && (
        <motion.div
          layoutId="nav-item-active"
          className={`absolute top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500 ${
            collapsed ? "left-0" : "right-0"
          }`}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={hoverTransition}
        />
      )}
    </motion.button>
  );
}