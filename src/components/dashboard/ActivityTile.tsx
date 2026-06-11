"use client";

import React, { useMemo } from "react";
import { motion, type Variants, type Transition } from "framer-motion";

// Types
interface ActivityData {
  value: number;
  date: Date;
}

interface HeatmapCell {
  value: number;
  intensity: 'none' | 'low' | 'medium' | 'high';
  tooltip: string;
}

// Constants
const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Heatmap data with proper typing
const HEATMAP_DATA: number[][] = [
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 1, 2, 0, 1, 2, 3],
  [1, 3, 0, 2, 1, 1, 2, 3, 0, 1, 2, 3, 1, 2, 0, 2, 1, 3, 1, 0, 2, 3, 1, 2, 0, 1, 2],
  [2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 3, 1, 2, 1, 3, 0, 2, 1, 2, 3, 1, 0, 2, 1, 3, 2, 1],
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1, 0, 3, 1, 2, 0, 2, 3, 1, 2, 0, 1, 3, 2, 1, 0],
  [1, 3, 0, 2, 1, 1, 2, 3, 0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 1, 2, 3, 2, 1, 0, 1, 3, 2],
  [2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 3, 1, 2, 3, 0, 1, 2, 1, 3, 0, 2, 1, 3, 2, 1, 0, 2],
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 1, 3, 2, 1, 0],
];

// Animation configurations
const tileTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

const cellTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.005,
      delayChildren: 0.1,
    },
  },
};

const cellVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: cellTransition,
  },
  hover: {
    scale: 1.2,
    transition: { type: "spring", stiffness: 500, damping: 15 },
  },
};

// Helper function to get color based on intensity
const getIntensityColor = (value: number): string => {
  switch (value) {
    case 0:
      return "bg-slate-800/50 hover:bg-slate-700/50";
    case 1:
      return "bg-slate-700/70 hover:bg-slate-600/70";
    case 2:
      return "bg-indigo-700/80 hover:bg-indigo-600/80";
    case 3:
      return "bg-indigo-500 hover:bg-indigo-400";
    default:
      return "bg-slate-800/50";
  }
};

// Helper function to get intensity label
const getIntensityLabel = (value: number): string => {
  switch (value) {
    case 0:
      return "No activity";
    case 1:
      return "Low activity";
    case 2:
      return "Medium activity";
    case 3:
      return "High activity";
    default:
      return "Unknown";
  }
};

export default function ActivityTile() {
  // Flatten and memoize heatmap data to prevent recalculation
  const flattenedData = useMemo(() => HEATMAP_DATA.flat(), []);
  
  // Calculate statistics
  const stats = useMemo(() => {
    const total = flattenedData.reduce((sum, val) => sum + val, 0);
    const average = (total / flattenedData.length).toFixed(1);
    const maxActivity = Math.max(...flattenedData);
    const daysWithActivity = flattenedData.filter(v => v > 0).length;
    const streak = calculateCurrentStreak(flattenedData);
    
    return { total, average, maxActivity, daysWithActivity, streak };
  }, [flattenedData]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={tileTransition}
      className="relative md:col-span-2 lg:col-span-1 rounded-2xl p-5 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5 shadow-xl overflow-hidden group"
      aria-label="Activity heatmap"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Activity Overview
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Last 27 days • Contribution heatmap
            </p>
          </div>
          
          {/* Streak Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20"
          >
            <div>
              <p className="text-xs text-emerald-400/80 font-medium">Current Streak</p>
              <p className="text-sm font-bold text-emerald-400">{stats.streak} days</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <div className="grid grid-cols-27 gap-1.5">
          {flattenedData.map((value, index) => (
            <motion.div
              key={index}
              variants={cellVariants}
              whileHover="hover"
              className={`
                aspect-square w-full rounded-md transition-all duration-200
                cursor-pointer relative group/cell
                ${getIntensityColor(value)}
              `}
              title={`${getIntensityLabel(value)} • ${MONTHS[Math.floor(index / 7) % 12]} ${(index % 27) + 1}`}
              role="img"
              aria-label={`${getIntensityLabel(value)} on day ${index + 1}`}
            >
              {/* Hover tooltip effect */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-slate-900/90 backdrop-blur-sm border border-white/10 text-xs whitespace-nowrap pointer-events-none z-20"
              >
                <span className="text-indigo-300 font-medium">{getIntensityLabel(value)}</span>
                <span className="text-slate-400 ml-1">
                  {value > 0 ? `(${value} contributions)` : ''}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-5 pt-4 border-t border-white/5"
      >
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Total Activity</p>
            <p className="text-lg font-bold text-white">{stats.total}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Daily Average</p>
            <p className="text-lg font-bold text-indigo-400">{stats.average}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Active Days</p>
            <p className="text-lg font-bold text-purple-400">{stats.daysWithActivity}</p>
          </div>
        </div>
      </motion.div>

      {/* Weekday Labels (Optional - adds context) */}
      <div className="relative z-10 mt-3 flex justify-between px-1">
        {DAYS_OF_WEEK.map((day, index) => (
          <span key={index} className="text-[10px] text-slate-500">
            {day}
          </span>
        ))}
      </div>
    </motion.aside>
  );
}

// Helper function to calculate current streak
function calculateCurrentStreak(data: number[]): number {
  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}