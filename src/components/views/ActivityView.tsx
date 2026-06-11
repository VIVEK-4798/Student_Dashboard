"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, type Variants, type Transition, AnimatePresence } from "framer-motion";
import BentoGrid from "../dashboard/BentoGrid";

// Types
interface ActivityData {
  date: string;
  count: number;
}

interface WeeklyData {
  day: string;
  hours: number;
  progress: number;
}

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Animation configurations
const cardTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  }),
  hover: {
    scale: 1.02,
    transition: cardTransition,
  },
};

// Enhanced Card Component
function Card({ title, children, className = "", delay = 0 }: CardProps) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        relative rounded-2xl p-5 
        bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] 
        border border-white/5 shadow-xl overflow-hidden group
        ${className}
      `}
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 rounded-2xl pointer-events-none"
        initial={false}
        animate={{
          background: [
            "linear-gradient(135deg, rgba(99,102,241,0) 0%, rgba(168,85,247,0) 100%)",
            "linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(168,85,247,0.08) 100%)",
          ],
        }}
        transition={{ duration: 0.3 }}
      />
      
      {title && (
        <h4 className="font-semibold mb-3 text-white/90 text-lg flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-indigo-500" />
          {title}
        </h4>
      )}
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Main ActivityView Component
export default function ActivityView() {
  const [animateStats, setAnimateStats] = useState(false);

  // Memoized heatmap data (consistent across renders)
  const heatmapData = useMemo(() => {
    // Generate deterministic but realistic-looking heatmap
    const weeks = 4;
    const days = 30;
    return Array(weeks).fill(0).map(() => 
      Array(days).fill(0).map(() => {
        // Weighted random to make higher values less common
        const rand = Math.random();
        if (rand < 0.5) return 0;
        if (rand < 0.75) return 1;
        if (rand < 0.9) return 2;
        return 3;
      })
    );
  }, []);

  // Weekly progress data with proper typing
  const weeklyData: WeeklyData[] = useMemo(() => [
    { day: "Mon", hours: 3.5, progress: 65 },
    { day: "Tue", hours: 5.2, progress: 78 },
    { day: "Wed", hours: 2.8, progress: 45 },
    { day: "Thu", hours: 6.1, progress: 82 },
    { day: "Fri", hours: 4.3, progress: 70 },
    { day: "Sat", hours: 7.5, progress: 90 },
    { day: "Sun", hours: 5.8, progress: 75 },
  ], []);

  // Mock activity timeline
  const activityTimeline = useMemo(() => {
    const today = new Date();
    return Array(7).fill(null).map((_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count: Math.floor(Math.random() * 24) + 1,
      };
    }).reverse();
  }, []);

  useEffect(() => {
    // Trigger statistics animation after mount
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Helper function to get heatmap color
  const getHeatmapColor = (value: number): string => {
    switch (value) {
      case 0: return "bg-slate-800/60 hover:bg-slate-700/60";
      case 1: return "bg-slate-700/70 hover:bg-slate-600/70";
      case 2: return "bg-indigo-700/80 hover:bg-indigo-600/80";
      case 3: return "bg-indigo-500 hover:bg-indigo-400";
      default: return "bg-slate-800/60";
    }
  };

  return (
    <BentoGrid>
      {/* Large Activity Heatmap Card */}
      <div className="lg:col-span-2">
        <Card title="Activity Heatmap" delay={0}>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
              <span>Last 30 days</span>
              <div className="flex gap-2">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-slate-800" />
                  None
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-slate-700" />
                  Low
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-indigo-700" />
                  Med
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-sm bg-indigo-500" />
                  High
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {heatmapData.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex gap-1 mb-1">
                    {week.map((value, dayIdx) => (
                      <motion.div
                        key={`${weekIdx}-${dayIdx}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          delay: (weekIdx * week.length + dayIdx) * 0.002,
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        whileHover={{ scale: 1.2, transition: { duration: 0.1 } }}
                        className={`h-8 flex-1 rounded-sm transition-all duration-200 cursor-pointer ${getHeatmapColor(value)}`}
                        title={`Activity level: ${value}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mt-2">
              {heatmapData.flat().filter(v => v > 0).length} active days in the last month
            </p>
          </div>
        </Card>
      </div>

      {/* Learning Streak Card */}
      <Card title="Learning Streak" delay={1}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              17
            </div>
          </div>
          <div className="text-sm text-slate-300 mt-2">Day Streak</div>
          <p className="text-xs text-slate-400 mt-1">Keep up the great work! 🎯</p>
          
          {/* Next milestone indicator */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
            />
          </motion.div>
          <p className="text-xs text-slate-500 mt-2">3 more days to reach 20-day streak!</p>
        </motion.div>
      </Card>

      {/* Study Hours Card */}
      <Card title="Study Hours" delay={2}>
        <div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
          >
            <div className="text-3xl font-bold text-indigo-400">32.5</div>
            <div className="text-sm text-slate-300">Hours This Month</div>
          </motion.div>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="text-xs text-slate-400">vs last month</span>
            <motion.span 
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xs text-emerald-400 flex items-center gap-1"
            >
              ↑ 12%
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </motion.span>
          </div>
          
          {/* Mini progress ring */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Monthly goal: 40 hours</span>
              <span>81%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "81%" }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Progress Card with Bar Chart */}
      <Card title="Weekly Progress" delay={3}>
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-slate-400">Study Hours</span>
            <span className="text-xs text-slate-400">This week</span>
          </div>
          
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map((item, index) => (
              <motion.div
                key={item.day}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${item.hours * 10}px` }}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.5, type: "spring" }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-md relative group/bar cursor-pointer"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">
                    {item.hours} hours
                  </div>
                </motion.div>
                <span className="text-xs text-slate-400">{item.day}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 pt-3 border-t border-white/5"
          >
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total this week</span>
              <span className="font-semibold text-indigo-400">
                {weeklyData.reduce((sum, item) => sum + item.hours, 0).toFixed(1)} hours
              </span>
            </div>
          </motion.div>
        </div>
      </Card>

      {/* Activity Timeline Card (Bonus) */}
      <Card title="Recent Activity" delay={4} className="lg:col-span-2">
        <div className="space-y-3">
          {activityTimeline.map((activity, index) => (
            <motion.div
              key={activity.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <span className="text-sm text-slate-300">{activity.date}</span>
              <div className="flex items-center gap-3 flex-1 mx-4">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(activity.count / 24) * 100}%` }}
                    transition={{ delay: 1 + index * 0.03, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-indigo-400 min-w-[40px] text-right">
                  {activity.count}h
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </BentoGrid>
  );
}