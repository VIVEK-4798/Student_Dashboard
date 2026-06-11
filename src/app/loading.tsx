import Skeleton from "../components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="app-shell min-h-screen">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside className="hidden lg:block">
          <div className="w-64 space-y-4">
            <Skeleton height={24} />
            <Skeleton height={16} />
            <Skeleton height={16} />
            <Skeleton height={16} />
          </div>
        </aside>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-32 rounded-lg glass card-glow p-6 animate-pulse" />
            </div>
            <div className="h-32 rounded-lg glass card-glow p-6 animate-pulse" />

            <div className="col-span-1 space-y-4">
              <div className="h-28 rounded-lg glass card-glow p-4 animate-pulse" />
              <div className="h-28 rounded-lg glass card-glow p-4 animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
