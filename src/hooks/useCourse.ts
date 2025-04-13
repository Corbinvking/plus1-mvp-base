'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'

interface Course {
  id: string
  title: string
  description: string
  thumbnail_url: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  instructor_id: string
}

interface Lesson {
  id: string
  course_id: string
  title: string
  description: string
  order_index: number
  duration: string
  video_url: string
  pdf_url: string
}

export function useCourse(courseId?: string) {
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return

    async function fetchCourse() {
      try {
        // Fetch course details
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single()

        if (courseError) throw courseError
        if (!courseData) throw new Error('Course not found')

        setCourse(courseData)

        // Fetch course lessons
        const { data: lessonData, error: lessonError } = await supabase
          .from('course_lessons')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true })

        if (lessonError) throw lessonError
        setLessons(lessonData || [])

      } catch (err) {
        console.error('Error fetching course:', err)
        setError(err instanceof Error ? err.message : 'Failed to load course')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const enrollInCourse = async () => {
    if (!user || !courseId) return

    try {
      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId
        })

      if (error) throw error
      return true
    } catch (err) {
      console.error('Error enrolling in course:', err)
      setError(err instanceof Error ? err.message : 'Failed to enroll in course')
      return false
    }
  }

  const updateLessonProgress = async (lessonId: string, progress: number) => {
    if (!user || !courseId) return

    try {
      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          progress,
          completed: progress >= 90
        })

      if (error) throw error
      return true
    } catch (err) {
      console.error('Error updating lesson progress:', err)
      return false
    }
  }

  return {
    course,
    lessons,
    loading,
    error,
    enrollInCourse,
    updateLessonProgress
  }
} 