export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
  error: Error | null
  isAuthenticated: boolean
} 