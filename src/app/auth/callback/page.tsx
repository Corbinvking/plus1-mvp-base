'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth code from the URL
        const code = searchParams.get('code')
        
        // If there's no code, something went wrong
        if (!code) {
          console.error('No code in URL')
          router.push('/login?error=no-code')
          return
        }

        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        
        if (error) {
          console.error('Error exchanging code for session:', error.message)
          router.push('/login?error=auth-failed')
          return
        }

        // Get the redirect path or default to dashboard
        const from = searchParams.get('from') || '/dashboard'
        
        // Successful authentication
        router.push(from)
      } catch (error) {
        console.error('Error during auth callback:', error)
        router.push('/login?error=auth-failed')
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-neutral-900 to-black">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-4" />
        <p className="text-neutral-400">Completing sign in...</p>
      </div>
    </div>
  )
} 