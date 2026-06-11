"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { getIconByName } from "../../lib/icons";

type Nav = { id: string; label: string; icon?: string };

const NAV: Nav[] = [
  { id: "overview", label: "Overview", icon: "layoutdashboard" },
  { id: "courses", label: "Courses", icon: "code" },
  { id: "settings", label: "Settings", icon: "database" },
];

export default function Sidebar() {
  const [active, setActive] = useState<string>(NAV[0].id);

  return (
    <>
      {/* Full sidebar for desktop */}
      <nav aria-label="Primary navigation" className="hidden lg:block w-64 px-4 py-6">
        <ul className="space-y-1">
          {NAV.map((item) => {
            const Icon = getIconByName(item.icon || "");
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActive(item.id)}
                  className="relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-current={active === item.id ? "page" : undefined}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5 text-slate-300" />
                  <span className="flex-1 text-left">{item.label}</span>

                  {active === item.id && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-y-0 right-0 w-1 rounded-l-md bg-indigo-500"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapsed sidebar for tablet: icons-only */}
      <nav aria-label="Primary navigation" className="hidden md:block lg:hidden md:w-20 px-2 py-6">
        <ul className="space-y-2 flex flex-col items-center">
          {NAV.map((item) => {
            const Icon = getIconByName(item.icon || "");
            return (
              <li key={item.id} className="w-full">
                <button
                  onClick={() => setActive(item.id)}
                  className={`relative flex w-full items-center justify-center rounded-md p-2 text-slate-200 hover:bg-white/2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    active === item.id ? 'bg-indigo-600' : ''
                  }`}
                  aria-current={active === item.id ? "page" : undefined}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5 text-slate-100" />
                  <span className="sr-only">{item.label}</span>

                  {active === item.id && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-y-0 right-0 w-1 rounded-l-md bg-indigo-500"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
