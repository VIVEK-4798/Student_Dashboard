"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({ value = 0 }: { value?: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: pct / 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
