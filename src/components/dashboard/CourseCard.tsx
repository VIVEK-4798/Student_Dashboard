"use client";

import React from "react";
import { motion, type Variants, type Transition } from "framer-motion";
import type { Course } from "../../types/course";
import { getIconByName } from "../../lib/icons";
import ProgressBar from "./ProgressBar";

// Spring configuration for natural, non-linear feel with proper typing
const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
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
  hover: {
    scale: 1.02,
    transition: springTransition,
  },
};

interface CourseCardProps {
  course: Course;
  index?: number; // Optional index for staggered animations
}

export default function CourseCard({ course, index = 0 }: CourseCardProps) {
  const Icon = getIconByName(course.icon_name || "BookOpen");

  // Memoize formatted date to prevent recalculation on re-renders
  const formattedDate = React.useMemo(() => {
    try {
      return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(course.created_at));
    } catch {
      return "Recently added";
    }
  }, [course.created_at]);

  // Custom delay based on index for staggered entrance
  const getCustomVariant = (): Variants => ({
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.5,
        delay: index * 0.05,
      },
    },
    hover: {
      scale: 1.02,
      transition: springTransition,
    },
  });

  const customVariants = getCustomVariant();

  return (
    <motion.article
      variants={customVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group relative rounded-2xl p-5 bg-gradient-to-br from-[#0f0f12] to-[#1a1a20] border border-white/5 shadow-xl overflow-hidden cursor-pointer"
      aria-labelledby={`course-${course.id}-title`}
    >
      {/* Subtle gradient mesh background that shifts on hover */}
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

      {/* Glow effect on hover - positioned behind content */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.15), transparent 70%)",
        }}
      />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjciIG51bU9jdGF2ZXM9IjMiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjZikiLz48L3N2Zz4=')] bg-repeat" />

      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          {/* Icon with animated background */}
          <motion.div
            className="relative"
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-indigo-500/20 rounded-lg blur-lg" />
            <div className="relative p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
              <Icon className="h-5 w-5 text-indigo-400" />
            </div>
          </motion.div>

          <div className="flex-1 min-w-0">
            <h4
              id={`course-${course.id}-title`}
              className="font-semibold text-white/90 text-lg truncate group-hover:text-white transition-colors duration-200"
            >
              {course.title}
            </h4>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                In progress
              </span>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300 font-medium">Course Progress</span>
            <motion.span
              key={course.progress}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm font-bold text-indigo-400"
            >
              {course.progress}%
            </motion.span>
          </div>

          <ProgressBar value={course.progress} />
        </div>

        {/* Optional: Quick action hint on hover */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="mt-4 text-xs text-indigo-400/60 text-center"
        >
          Click to continue learning →
        </motion.div>
      </div>
    </motion.article>
  );
}