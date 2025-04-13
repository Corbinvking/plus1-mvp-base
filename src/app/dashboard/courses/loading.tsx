"use client";

export default function LoadingCourses() {
  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg mb-2 animate-pulse" />
          <div className="h-4 w-96 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
            <div className="w-32 h-10 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Course Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              <div className="aspect-video bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                  <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
                <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 