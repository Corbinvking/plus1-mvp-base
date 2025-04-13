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
      pathname.includes('/api/') ||
      pathname.includes('/course-thumbnails/')) {
    return NextResponse.next()
  }

  try {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // Try to get session without making a new request if possible
    const { data: { session }, error } = await supabase.auth.getSession()

    // Handle rate limits gracefully - let the request through
    if (error?.status === 429) {
      console.warn('Rate limit hit, allowing request:', pathname)
      return res
    }

    // If JWT is invalid but we have a refresh token, let the request through
    // The client-side auth will handle refresh if needed
    if (error?.message?.includes('JWT')) {
      const refreshToken = req.cookies.get('sb-refresh-token')
      if (refreshToken) {
        console.warn('JWT expired but have refresh token, allowing request:', pathname)
        return res
      }
    }

    // Only redirect to login if we're sure there's no session
    if (!session && !error) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, let the request through - better than blocking navigation
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
} 