'use client'

import { useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let mounted = true

    // One-time auth check on mount
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!mounted) return

        if (session?.user) {
          setState(prev => ({
            ...prev,
            user: session.user,
            session,
            loading: false,
          }))
        } else {
          setState(prev => ({ ...prev, loading: false }))
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setState(prev => ({ ...prev, loading: false }))
      }
    }

    checkAuth()

    // Simple auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      if (event === 'SIGNED_IN' && session) {
        setState(prev => ({
          ...prev,
          user: session.user,
          session,
          loading: false,
        }))
        router.push('/dashboard')
      }

      if (event === 'SIGNED_OUT') {
        setState(prev => ({
          ...prev,
          user: null,
          session: null,
          loading: false,
        }))
        router.push('/login')
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to sign out',
      }))
    }
  }

  return {
    user: state.session?.user ?? null,
    session: state.session,
    loading: state.loading,
    error: state.error,
    signOut,
    isAuthenticated: !!state.session?.user,
  }
} 