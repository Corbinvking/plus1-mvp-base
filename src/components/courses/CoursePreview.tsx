"use client";

import { useState } from 'react'
import { cn } from "@/lib/utils";
import { Play, Clock, BarChart } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CourseModal } from "./CourseModal";

interface CoursePreviewProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  progress?: number;
  level: "beginner" | "intermediate" | "advanced";
  contentType?: 'video' | 'pdf';
  contentUrl?: string;
}

const levelColors = {
  beginner: "text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950",
  intermediate: "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950",
  advanced: "text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-950"
};

const levelGradients = {
  beginner: "from-emerald-500 to-teal-500",
  intermediate: "from-blue-500 to-cyan-500",
  advanced: "from-purple-500 to-pink-500"
};

export function CoursePreview({
  id,
  title,
  description,
  thumbnail,
  duration,
  progress,
  level,
  contentType = 'video',
  contentUrl = 'https://www.youtube.com/embed/Ke90Tje7VS0'
}: CoursePreviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors text-left w-full"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
              >
                <Play className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </div>
          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-200 dark:bg-neutral-700">
              <div 
                className={cn(
                  "h-full bg-gradient-to-r transition-all duration-300",
                  levelGradients[level]
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        
        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              levelColors[level]
            )}>
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
            <span className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
              <Clock className="h-3 w-3" />
              {duration}
            </span>
            {progress !== undefined && (
              <span className="flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-400 ml-auto">
                <BarChart className="h-3 w-3" />
                {progress}%
              </span>
            )}
          </div>
          
          <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2">
            {description}
          </p>
        </div>

        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
          levelGradients[level]
        )} />
      </button>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={id}
        lessonId="lesson-1"
        contentType={contentType}
        contentUrl={contentUrl}
      />
    </>
  );
} 