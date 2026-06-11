import { getCourses } from "../lib/getCourses";
import Sidebar from "../components/sidebar/Sidebar";
import BentoGrid from "../components/dashboard/BentoGrid";
import HeroTile from "../components/dashboard/HeroTile";
import ActivityTile from "../components/dashboard/ActivityTile";
import CourseCard from "../components/dashboard/CourseCard";
import MotionWrapper from "../components/ui/MotionWrapper";
import type { Course } from "../types/course";

import MobileNav from "../components/mobile/MobileNav";

export default async function Page() {
  const courses: Course[] = await getCourses();

  return (
    <div className="app-shell min-h-screen">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        <main aria-label="Student dashboard" className="min-h-screen pb-24">
          <MotionWrapper>
            <BentoGrid>
              <HeroTile title="Welcome back" subtitle="Continue your learning journey" />
              <ActivityTile />

              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </BentoGrid>
          </MotionWrapper>
        </main>

        {/* Mobile bottom navigation */}
        {/* MobileNav is a client component */}
        <div className="lg:hidden">
          {/* MobileNav will mount on client */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
        </div>
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
