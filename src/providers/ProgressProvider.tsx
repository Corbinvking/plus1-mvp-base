'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

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
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProgress = async (lessonId: string, progress: number): Promise<ProgressResult> => {
    if (!user) {
      return { error: { status: 401, message: 'Not authenticated' } }
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          progress,
          completed: progress >= 90,
          last_accessed: new Date().toISOString()
        })

      if (error) {
        return { error: { status: error.code === '429' ? 429 : 500, message: error.message } }
      }
      return {}
    } catch (err) {
      console.error('Error updating progress:', err)
      setError(err instanceof Error ? err.message : 'Failed to update progress')
      return { error: { status: 500, message: 'Internal error' } }
    } finally {
      setLoading(false)
    }
  }

  const getLessonProgress = async (lessonId: string): Promise<Progress | null> => {
    if (!user) return null

    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      console.error('Error fetching progress:', err)
      return null
    }
  }

  const getCourseProgress = async (courseId: string): Promise<number> => {
    if (!user) return 0

    try {
      // Get all lessons for the course
      const { data: lessons, error: lessonError } = await supabase
        .from('course_lessons')
        .select('id')
        .eq('course_id', courseId)

      if (lessonError) throw lessonError
      if (!lessons?.length) return 0

      // Get progress for all lessons
      const { data: progress, error: progressError } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', user.id)
        .in('lesson_id', lessons.map(l => l.id))

      if (progressError) throw progressError

      // Calculate overall progress
      const completedLessons = progress?.filter(p => p.completed)?.length ?? 0
      return Math.round((completedLessons / lessons.length) * 100)
    } catch (err) {
      console.error('Error calculating course progress:', err)
      return 0
    }
  }

  return (
    <ProgressContext.Provider
      value={{
        updateProgress,
        getLessonProgress,
        getCourseProgress,
        loading,
        error,
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