import React from "react";

export default function Skeleton({ width = "100%", height = 12 }: { width?: string | number; height?: number }) {
  return (
    <div
      style={{ width: typeof width === "number" ? `${width}px` : width }}
      className={`rounded-md bg-gradient-to-r from-slate-700 to-slate-800 animate-pulse`}
      aria-hidden
    >
      <div style={{ height }} />
    </div>
  );
}
