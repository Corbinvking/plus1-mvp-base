"use client";

import { useState } from "react";
import { CoursePreview } from "@/components/courses/CoursePreview";
import { Search, Filter, X, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Temporary mock data - will be replaced with API call
const mockCourses = [
  {
    id: "1",
    title: "Introduction to Music Production",
    description: "Learn the fundamentals of music production, from basic concepts to advanced techniques.",
    thumbnail: "/course-thumbnails/music-production.jpg",
    duration: "6h 30m",
    level: "beginner",
    category: "Production",
    contentType: "video",
    contentUrl: "https://example.com/intro.mp4"
  },
  {
    id: "2",
    title: "Advanced Songwriting Techniques",
    description: "Master the art of songwriting with professional techniques and creative exercises.",
    thumbnail: "/course-thumbnails/songwriting.jpg",
    duration: "8h 45m",
    level: "advanced",
    category: "Songwriting",
    contentType: "video",
    contentUrl: "https://example.com/songwriting.mp4"
  },
  {
    id: "3",
    title: "Music Marketing Essentials",
    description: "Learn how to promote your music effectively in the digital age.",
    thumbnail: "/course-thumbnails/marketing.jpg",
    duration: "4h 15m",
    level: "intermediate",
    category: "Marketing",
    contentType: "video",
    contentUrl: "https://example.com/marketing.mp4"
  },
  {
    id: "4",
    title: "Mixing and Mastering Basics",
    description: "Get started with professional audio mixing and mastering techniques.",
    thumbnail: "/course-thumbnails/mixing.jpg",
    duration: "5h 20m",
    level: "beginner",
    category: "Production",
    contentType: "video",
    contentUrl: "https://example.com/mixing.mp4"
  }
] as const;

const categories = ["All", "Production", "Songwriting", "Marketing"] as const;
const levels = ["All", "beginner", "intermediate", "advanced"] as const;

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("All");
  const [selectedLevel, setSelectedLevel] = useState<typeof levels[number]>("All");

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                Browse Courses
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Discover new skills and expand your creative potential
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as typeof categories[number])}
                className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as typeof levels[number])}
                className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === "All" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CoursePreview
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              thumbnail={course.thumbnail}
              duration={course.duration}
              level={course.level}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              No courses found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 