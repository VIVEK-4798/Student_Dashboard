"use client";

import React from "react";
import { Home, Book, Activity, Settings } from "lucide-react";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "courses", label: "Courses", icon: Book },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl glass-backdrop blur-lg p-2 flex justify-between items-center"
      role="navigation"
    >
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            aria-label={item.label}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-200 hover:bg-white/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </nav>
  );
}
