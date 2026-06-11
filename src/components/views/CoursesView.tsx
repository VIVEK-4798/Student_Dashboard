"use client";

import React from "react";
import BentoGrid from "../dashboard/BentoGrid";
import { motion } from "framer-motion";
import type { Course } from "../../types/course";

function StatTile({ title, value }: { title: string; value: number | string }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl p-4 glass card-glow">
      <h4 className="text-sm text-slate-300">{title}</h4>
      <div className="text-2xl font-semibold mt-2">{value}</div>
    </motion.div>
  );
}

export default function CoursesView({ courses }: { courses: Course[] }) {
  const active = courses.filter((c) => c.progress > 0 && c.progress < 100).length;
  const completed = courses.filter((c) => c.progress >= 100).length;

  return (
    <BentoGrid>
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatTile title="Active Courses" value={active} />
        <StatTile title="Completed" value={completed} />
      </div>

      <motion.div className="rounded-xl p-4 glass card-glow">
        <h4 className="font-semibold">Learning Paths</h4>
        <ul className="mt-3 space-y-2">
          <li className="px-3 py-2 rounded bg-gradient-to-r from-indigo-700 to-indigo-500 text-white">Frontend Path</li>
          <li className="px-3 py-2 rounded bg-gradient-to-r from-slate-700 to-slate-600 text-white">Backend Path</li>
          <li className="px-3 py-2 rounded bg-gradient-to-r from-amber-700 to-amber-500 text-white">System Design</li>
        </ul>
      </motion.div>

      <motion.div className="rounded-xl p-4 glass card-glow">
        <h4 className="font-semibold">Recent Achievements</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-200">
          <li>React Expert</li>
          <li>Next.js Explorer</li>
          <li>DSA Beginner</li>
        </ul>
      </motion.div>

      {courses.map((course) => (
        <motion.article key={course.id} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl p-4 glass card-glow">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-indigo-600 flex items-center justify-center text-white">{course.title.charAt(0)}</div>
            <div>
              <div className="font-semibold">{course.title}</div>
              <div className="text-xs text-slate-400">Progress: {course.progress}%</div>
            </div>
          </div>
        </motion.article>
      ))}
    </BentoGrid>
  );
}
