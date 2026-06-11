import React from "react";
import { Code, Rocket, Database, LayoutDashboard, File } from "lucide-react";

export const IconPlaceholder = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0f172a" />
  </svg>
);

export function getIconByName(name: string) {
  switch ((name || "").toLowerCase()) {
    case "code":
      return Code;
    case "rocket":
      return Rocket;
    case "database":
      return Database;
    case "layoutdashboard":
    case "layout_dashboard":
    case "dashboard":
      return LayoutDashboard;
    default:
      return File;
  }
}
