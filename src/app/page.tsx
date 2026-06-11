import { getCourses } from "../lib/getCourses";
import DashboardShell from "../components/dashboard/DashboardShell";
import type { Course } from "../types/course";

export default async function Page() {
  const courses: Course[] = await getCourses();

  return (
    <div className="app-shell min-h-screen">
      <DashboardShell courses={courses} />
    </div>
  );
}
