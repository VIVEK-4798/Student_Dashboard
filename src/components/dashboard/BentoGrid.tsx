import React from "react";

export default function BentoGrid({ children }: { children?: React.ReactNode }) {
  return (
    <section aria-label="Dashboard grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </section>
  );
}
