"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import DashboardView from "../views/DashboardView";
import CoursesView from "../views/CoursesView";
import ActivityView from "../views/ActivityView";
import SettingsView from "../views/SettingsView";
import type { Course } from "../../types/course";
import type { NavItemId } from "../sidebar/Sidebar";

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function ViewSwitcher({ activeView, courses }: { activeView: NavItemId; courses: Course[] }) {
  return (
    <AnimatePresence mode="wait">
      {activeView === "dashboard" && (
        <motion.div key="dashboard" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
          <DashboardView courses={courses} />
        </motion.div>
      )}

      {activeView === "courses" && (
        <motion.div key="courses" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
          <CoursesView courses={courses} />
        </motion.div>
      )}

      {activeView === "activity" && (
        <motion.div key="activity" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
          <ActivityView />
        </motion.div>
      )}

      {activeView === "settings" && (
        <motion.div key="settings" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }}>
          <SettingsView />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
