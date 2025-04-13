import { NextResponse } from 'next/server'
import { signOut } from '@/lib/supabase'

export async function GET() {
  try {
    const { error } = await signOut()
    if (error) throw error
    
    // Redirect to login page after successful logout
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
  } catch (error) {
    console.error('Logout error:', error)
    // If there's an error, still try to redirect to login
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'))
  }
} 