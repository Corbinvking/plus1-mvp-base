'use client'

import { useState, useEffect } from 'react'
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

export function useProgress() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProgress = async (lessonId: string, progress: number) => {
    if (!user) return

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

      if (error) throw error
    } catch (err) {
      console.error('Error updating progress:', err)
      setError(err instanceof Error ? err.message : 'Failed to update progress')
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

  return {
    updateProgress,
    getLessonProgress,
    getCourseProgress,
    loading,
    error
  }
} 