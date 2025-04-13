import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from './database.types'

export const supabase = createClientComponentClient<Database>()

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          title?: string
        }
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          enrolled_at: string
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          enrolled_at?: string
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          enrolled_at?: string
          id?: string
          user_id?: string
        }
      }
      course_lessons: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          duration: string | null
          id: string
          order_index: number
          pdf_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          order_index: number
          pdf_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          order_index?: number
          pdf_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
      }
      courses: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration: string | null
          id: string
          instructor_id: string | null
          level: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          instructor_id?: string | null
          level?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          id?: string
          instructor_id?: string | null
          level?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
        }
      }
      lesson_progress: {
        Row: {
          completed: boolean
          created_at: string
          id: string
          last_accessed: string
          lesson_id: string
          progress: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          id?: string
          last_accessed?: string
          lesson_id: string
          progress?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          id?: string
          last_accessed?: string
          lesson_id?: string
          progress?: number
          updated_at?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
      }
      user_settings: {
        Row: {
          created_at: string
          email_notifications: boolean
          marketing_emails: boolean
          push_notifications: boolean
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean
          marketing_emails?: boolean
          push_notifications?: boolean
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email_notifications?: boolean
          marketing_emails?: boolean
          push_notifications?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Sign in error:', error)
    return { data: null, error }
  }
}

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      }
    })
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Google sign in error:', error)
    return { data: null, error }
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Sign up error:', error)
    return { data: null, error }
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error('Sign out error:', error)
    return { error }
  }
}

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return { user, error: null }
  } catch (error) {
    console.error('Get current user error:', error)
    return { user: null, error }
  }
}

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return { session, error: null }
  } catch (error) {
    console.error('Get session error:', error)
    return { session: null, error }
  }
} 