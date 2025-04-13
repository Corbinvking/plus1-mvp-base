import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface AuthContextType {
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  } | null
  loading: boolean
  error: Error | null
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {auth.loading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : (
        children
      )}
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