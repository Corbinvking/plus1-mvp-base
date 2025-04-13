import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Only the most basic routes that don't need auth
const publicRoutes = ['/', '/login', '/signup', '/auth/callback']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  // Skip middleware for public routes and static assets
  if (publicRoutes.includes(pathname) || 
      pathname.includes('/_next/') ||
      pathname.includes('/api/')) {
    return NextResponse.next()
  }

  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const { data: { session } } = await supabase.auth.getSession()

    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
} 