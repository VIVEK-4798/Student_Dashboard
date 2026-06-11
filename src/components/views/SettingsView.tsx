"use client";

import React from "react";
import { motion } from "framer-motion";
import BentoGrid from "../dashboard/BentoGrid";

function Toggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div className="h-6 w-10 bg-slate-700 rounded-full relative">
        <div className="h-5 w-5 bg-white rounded-full absolute left-0.5 top-0.5 transform" />
      </div>
    </div>
  );
}

export default function SettingsView() {
  return (
    <BentoGrid>
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl p-4 glass card-glow">
        <h4 className="font-semibold">Profile</h4>
        <div className="mt-3 text-sm text-slate-200">
          <div><strong>Name:</strong> Vivek Kumar</div>
          <div><strong>Role:</strong> Student Developer</div>
          <div><strong>Email:</strong> <a className="text-indigo-400" href="mailto:vivek@example.com">vivek@example.com</a></div>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl p-4 glass card-glow">
        <h4 className="font-semibold">Appearance</h4>
        <div className="mt-3 text-sm text-slate-200">
          <Toggle label="Dark Mode Enabled" />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl p-4 glass card-glow">
        <h4 className="font-semibold">Notifications</h4>
        <div className="mt-3 space-y-2 text-sm text-slate-200">
          <Toggle label="Email Notifications" />
          <Toggle label="Course Reminders" />
          <Toggle label="Weekly Reports" />
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="rounded-xl p-4 glass card-glow">
        <h4 className="font-semibold">Account Statistics</h4>
        <div className="mt-3 text-sm text-slate-200">
          <div><strong>Member Since:</strong> 2026</div>
          <div><strong>Courses Completed:</strong> 12</div>
        </div>
      </motion.div>
    </BentoGrid>
  );
}
