'use client'

import { createContext, useContext, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

interface Progress {
  id: string
  user_id: string
  lesson_id: string
  progress: number
  completed: boolean
  last_accessed: string
}

interface ProgressResult {
  error?: {
    status?: number
    message?: string
  }
}

interface ProgressContextType {
  updateProgress: (lessonId: string, progress: number) => Promise<ProgressResult>
  getLessonProgress: (lessonId: string) => Promise<Progress | null>
  getCourseProgress: (courseId: string) => Promise<number>
  loading: boolean
  error: string | null
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  // For MVP, we'll just console.log progress updates
  const updateProgress = async (lessonId: string, progress: number): Promise<ProgressResult> => {
    console.log(`Progress update - Lesson: ${lessonId}, Progress: ${progress}%`)
    return {}
  }

  const getLessonProgress = async (lessonId: string): Promise<Progress | null> => {
    return null
  }

  const getCourseProgress = async (courseId: string): Promise<number> => {
    return 0
  }

  return (
    <ProgressContext.Provider
      value={{
        updateProgress,
        getLessonProgress,
        getCourseProgress,
        loading: false,
        error: null,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
} 