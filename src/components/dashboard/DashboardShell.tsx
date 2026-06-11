"use client";

import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import MobileNav from "../mobile/MobileNav";
import ViewSwitcher from "./ViewSwitcher";
import type { Course } from "../../types/course";

export default function DashboardShell({ courses }: { courses: Course[] }) {
  const [activeView, setActiveView] = useState<string>("dashboard");

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <aside>
        <Sidebar active={activeView} onChange={setActiveView} />
      </aside>

      <main aria-label="Student dashboard" className="min-h-screen pb-24">
        <ViewSwitcher activeView={activeView} courses={courses} />
      </main>

      <MobileNav active={activeView} onChange={setActiveView} />
    </div>
  );
}
