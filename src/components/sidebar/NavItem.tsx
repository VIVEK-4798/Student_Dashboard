"use client";

import React from "react";
import { motion } from "framer-motion";

export function NavItem({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`w-full text-left px-3 py-2 rounded-md ${
        active ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-white/2"
      } focus:outline-none`}
    >
      {label}
    </motion.button>
  );
}
