"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, signInWithGoogle, getSession } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { AuthError } from '@supabase/supabase-js'
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check for error in URL
    const errorType = searchParams.get('error')
    if (errorType === 'auth-failed') {
      setError('Authentication failed. Please try again.')
    } else if (errorType === 'no-code') {
      setError('Invalid authentication code. Please try again.')
    }

    // Check for existing session
    const checkSession = async () => {
      const { session } = await getSession()
      if (session) {
        const from = searchParams.get('from') || '/dashboard'
        router.push(from)
      }
    }
    checkSession()
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { data, error } = await signIn(email, password)
      if (error) {
        console.error("Sign in error:", error)
        setError((error as AuthError).message || "Failed to sign in")
        setLoading(false)
        return
      }

      // Successfully logged in - the auth state listener will handle the redirect
      console.log("Successfully authenticated")
    } catch (err) {
      console.error("Sign in error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign in")
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setLoading(true)

    try {
      const { data, error } = await signInWithGoogle()
      if (error) {
        setError((error as AuthError).message || "Failed to sign in with Google")
        setLoading(false)
        return
      }
      
      // Don't set loading to false here as we're being redirected
    } catch (err) {
      console.error("Google sign in error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign in with Google")
      setLoading(false)
    }
  }

  return (
    <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative bg-gradient-to-b from-neutral-900 to-black">
      <div className="flex flex-col justify-center items-center w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] z-50">
        <Link 
          href="/"
          className="mb-4 text-white/80 hover:text-white flex items-center gap-2 transition-colors duration-200 group self-start"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Home
        </Link>
        <motion.div 
          className="w-full space-y-6 bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-white tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome Back
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-neutral-400 bg-[#000000]/50">Or continue with</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <motion.div
                  className="text-red-500 text-sm text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In with Email"}
              </Button>
            </form>

            <div className="text-center text-sm text-neutral-400">
              <div className="space-y-2">
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Forgot password?
                </a>
                <div className="pt-2">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 