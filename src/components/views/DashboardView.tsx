"use client";

import React, { useMemo } from "react";
import { motion, type Variants, type Transition, AnimatePresence } from "framer-motion";
import MotionWrapper from "../ui/MotionWrapper";
import BentoGrid from "../dashboard/BentoGrid";
import HeroTile from "../dashboard/HeroTile";
import ActivityTile from "../dashboard/ActivityTile";
import CourseCard from "../dashboard/CourseCard";
import type { Course } from "../../types/course";

// Types
interface DashboardViewProps {
  courses: Course[];
  isLoading?: boolean;
  error?: Error | null;
  userName?: string;
  streak?: number;
}

// Animation configurations
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.6,
    },
  },
};

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="rounded-2xl p-5 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5 animate-pulse"
        >
          <div className="h-6 bg-white/5 rounded-lg w-3/4 mb-3" />
          <div className="h-4 bg-white/5 rounded-lg w-1/2 mb-2" />
          <div className="h-2 bg-white/5 rounded-full w-full" />
        </div>
      ))}
    </div>
  </div>
);

// Error State Component
const ErrorState = ({ error, onRetry }: { error: Error; onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
  >
    <div className="rounded-full bg-red-500/10 p-4 mb-4">
      <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">Failed to Load Dashboard</h3>
    <p className="text-sm text-slate-400 mb-4 max-w-md">
      {error.message || "Unable to fetch your courses. Please check your connection and try again."}
    </p>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onRetry}
      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors"
    >
      Try Again
    </motion.button>
  </motion.div>
);

// Empty State Component
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
  >
    <div className="rounded-full bg-indigo-500/10 p-4 mb-4">
      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">No Courses Yet</h3>
    <p className="text-sm text-slate-400 mb-4 max-w-md">
      You haven't enrolled in any courses yet. Check back later or browse our course catalog.
    </p>
  </motion.div>
);

// Stats Summary Component
const StatsSummary = ({ courses, streak }: { courses: Course[]; streak?: number }) => {
  const stats = useMemo(() => {
    const totalProgress = courses.reduce((sum, course) => sum + course.progress, 0);
    const averageProgress = courses.length > 0 ? Math.round(totalProgress / courses.length) : 0;
    const completedCourses = courses.filter(course => course.progress === 100).length;
    const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100).length;
    
    return {
      averageProgress,
      completedCourses,
      inProgressCourses,
      totalCourses: courses.length,
    };
  }, [courses]);

  if (courses.length === 0) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
    >
      <div className="rounded-xl p-4 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5">
        <p className="text-xs text-slate-400 mb-1">Avg. Progress</p>
        <p className="text-2xl font-bold text-indigo-400">{stats.averageProgress}%</p>
      </div>
      <div className="rounded-xl p-4 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5">
        <p className="text-xs text-slate-400 mb-1">In Progress</p>
        <p className="text-2xl font-bold text-purple-400">{stats.inProgressCourses}</p>
      </div>
      <div className="rounded-xl p-4 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5">
        <p className="text-xs text-slate-400 mb-1">Completed</p>
        <p className="text-2xl font-bold text-emerald-400">{stats.completedCourses}</p>
      </div>
      <div className="rounded-xl p-4 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5">
        <p className="text-xs text-slate-400 mb-1">Total Courses</p>
        <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
      </div>
    </motion.div>
  );
};

// Main DashboardView Component
export default function DashboardView({ 
  courses, 
  isLoading = false, 
  error = null, 
  userName = "Student",
  streak = 0 
}: DashboardViewProps) {
  // Generate personalized greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  // Handle retry logic
  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (isLoading) {
    return (
      <MotionWrapper>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/5 rounded-lg w-64 mb-2" />
            <div className="h-4 bg-white/5 rounded-lg w-96" />
          </div>
          <LoadingSkeleton />
        </div>
      </MotionWrapper>
    );
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={handleRetry} />;
  }

  // Success state
  return (
    <MotionWrapper>
      <div className="space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-slate-400 mt-1">
            {streak > 0 && (
              <span className="inline-flex items-center gap-1">
                🔥 {streak} day streak • Keep the momentum going!
              </span>
            )}
          </p>
        </motion.div>

        {/* Stats Summary */}
        <StatsSummary courses={courses} streak={streak} />

        {/* Main Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <BentoGrid>
            {/* Hero Tile - Large greeting with streak indicator */}
            <motion.div variants={itemVariants}>
              <HeroTile 
                title={`${greeting}, ${userName}!`}
                subtitle={
                  streak > 0 
                    ? `🔥 ${streak} day learning streak! Keep up the amazing work!`
                    : "Ready to start your learning journey today?"
                }
              />
            </motion.div>

            {/* Activity Tile - Contribution heatmap */}
            <motion.div variants={itemVariants}>
              <ActivityTile />
            </motion.div>

            {/* Course Cards - Dynamic from Supabase */}
            <AnimatePresence mode="wait">
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    variants={itemVariants}
                    custom={index}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <CourseCard course={course} index={index} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-2"
                >
                  <EmptyState />
                </motion.div>
              )}
            </AnimatePresence>
          </BentoGrid>
        </motion.div>

        {/* Quick Tips Section (Optional) */}
        {courses.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/10"
          >
            <p className="text-xs text-slate-400 text-center">
              💡 Pro tip: Complete lessons daily to build your learning streak and unlock achievements!
            </p>
          </motion.div>
        )}
      </div>
    </MotionWrapper>
  );
}