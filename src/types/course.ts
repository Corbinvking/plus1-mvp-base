export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Course {
  id: string
  title: string
  description: string | null
  thumbnail_url: string | null
  duration: string | null
  level: CourseLevel
  category: string | null
  instructor_id: string
  created_at: string
  updated_at: string
}

export interface CourseLesson {
  id: string
  course_id: string
  title: string
  description: string | null
  order_index: number
  duration: string | null
  video_url: string | null
  pdf_url: string | null
  created_at: string
  updated_at: string
}

export interface CourseEnrollment {
  id: string
  user_id: string
  course_id: string
  enrolled_at: string
  completed_at: string | null
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  progress: number
  completed: boolean
  last_accessed: string
  created_at: string
  updated_at: string
}

export interface CourseWithProgress extends Course {
  progress: number
  completed: boolean
  last_accessed: string | null
  total_lessons: number
  completed_lessons: number
}

export interface LessonWithProgress extends CourseLesson {
  progress: number
  completed: boolean
  last_accessed: string | null
} 