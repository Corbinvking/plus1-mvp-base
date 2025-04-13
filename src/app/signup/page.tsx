"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const { data, error } = await signUp(email, password)
      if (error) {
        setError(error.message || "Failed to sign up")
        return
      }
      
      // Show success message and redirect to login
      alert("Check your email to confirm your account!")
      router.push("/login")
    } catch (err) {
      console.error("Sign up error:", err)
      setError(err instanceof Error ? err.message : "Failed to sign up")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative bg-gradient-to-b from-neutral-900 to-black">
      <div className="flex flex-col justify-center items-center w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] z-50">
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
            Create Account
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
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

              <div className="space-y-2">
                <label className="text-sm text-neutral-300">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
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
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors duration-200">
                Sign in
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 