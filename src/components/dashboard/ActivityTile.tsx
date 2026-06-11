"use client";

import React from "react";
import { motion } from "framer-motion";

// Fixed deterministic data
const heatmap = [
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1],
  [1, 3, 0, 2, 1, 1, 2, 3, 0, 1, 2, 3],
  [2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 3, 1],
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1],
  [1, 3, 0, 2, 1, 1, 2, 3, 0, 1, 2, 3],
  [2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 3, 1],
  [0, 1, 2, 3, 1, 0, 2, 1, 3, 0, 2, 1],
];

export default function ActivityTile() {
  return (
    <motion.aside
      className="md:col-span-2 lg:col-span-1 rounded-xl p-4 glass card-glow"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label="Activity heatmap"
    >
      <h3 className="text-lg font-medium">Activity</h3>

      <p className="text-sm text-slate-400 mb-3">
        Contribution heatmap (mock data)
      </p>

      <div className="grid grid-cols-12 gap-1">
        {heatmap.flat().map((value, i) => (
          <motion.div
            key={i}
            className={`w-6 h-6 rounded-sm ${
              value === 0
                ? "bg-slate-800"
                : value === 1
                ? "bg-slate-700"
                : value === 2
                ? "bg-indigo-700"
                : "bg-indigo-500"
            }`}
            whileHover={{ scale: 1.1 }}
            title={`Intensity: ${value}`}
            role="img"
            aria-label={`Contribution intensity ${value}`}
          />
        ))}
      </div>
    </motion.aside>
  );
}