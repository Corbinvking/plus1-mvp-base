'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AuthContextType {
  user: any
  loading: boolean
  error: Error | null
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, error } = useAuth()

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
} 