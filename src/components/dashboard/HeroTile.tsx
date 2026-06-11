"use client";

import React from "react";
import { motion, MotionProps, Variants } from "framer-motion";

// Define the props interface for the HeroTile component
interface HeroTileProps {
  /** The main greeting or heading text */
  title: string;
  /** Optional supporting text, such as a streak or motivational message */
  subtitle?: string;
  /** Optional CSS class name for additional styling */
  className?: string;
}

// Staggered entrance animation variant (can be used with a parent stagger container)
const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.5,
    },
  },
};

// Custom hover animation with spring physics for natural, non-linear feel
const hoverSpringTransition: MotionProps["transition"] = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

/**
 * HeroTile Component
 *
 * A large greeting tile prominently displayed in the dashboard.
 * Features:
 * - Staggered entrance animation (fade + translate Y)
 * - Spring-based hover scaling with subtle glow effect
 * - Uses transform for animations (no layout shifts)
 * - Semantic HTML with accessibility attributes
 */
export default function HeroTile({ title, subtitle, className = "" }: HeroTileProps) {
  return (
    <motion.section
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={hoverSpringTransition}
      className={`
        relative md:col-span-2 lg:col-span-2 rounded-2xl p-6 
        bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] 
        border border-white/5 shadow-xl overflow-hidden
        backdrop-blur-sm
        ${className}
      `}
      aria-labelledby="hero-title"
    >
      {/* Subtle gradient mesh background - adds depth without affecting performance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Subtle grain texture overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjMiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZikiLz48L3N2Zz4=')] bg-repeat" />

      {/* Content container - ensures proper z-index stacking */}
      <div className="relative z-10">
        <h2 id="hero-title" className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-300/80 mt-3 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {subtitle}
          </p>
        )}
      </div>
    </motion.section>
  );
}