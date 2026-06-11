"use client";

import React from "react";
import { motion } from "framer-motion";

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export default function HeroTile({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <motion.section
      variants={tileVariants}
      className="md:col-span-2 lg:col-span-2 rounded-xl p-6 glass card-glow lg:col-span-2"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-labelledby="hero-title"
    >
      <h2 id="hero-title" className="text-2xl font-semibold">
        {title}
      </h2>
      {subtitle && <p className="text-sm text-slate-300 mt-2">{subtitle}</p>}
    </motion.section>
  );
}
