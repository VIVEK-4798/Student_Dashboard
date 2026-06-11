"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import type { Course } from "../../types/course";
import { getIconByName } from "../../lib/icons";
import ProgressBar from "./ProgressBar";

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
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

export default function CourseCard({
  course,
}: {
  course: Course;
}) {
  const Icon = getIconByName(course.icon_name || "");

  // Fixed locale formatting
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(course.created_at));

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="rounded-xl p-4 glass card-glow lg:col-span-1"
      aria-labelledby={`course-${course.id}-title`}
    >
      <div className="flex items-start gap-3">
        <Icon className="h-6 w-6 text-indigo-400" />

        <div>
          <h4
            id={`course-${course.id}-title`}
            className="font-semibold"
          >
            {course.title}
          </h4>

          <p className="text-xs text-slate-400">
            {formattedDate}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">
            Progress
          </span>

          <span className="text-sm font-medium">
            {course.progress}%
          </span>
        </div>

        <ProgressBar value={course.progress} />
      </div>
    </motion.article>
  );
}