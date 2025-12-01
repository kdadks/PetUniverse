import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // If no token, allow access (pages will handle their own auth redirects)
    if (!token) {
      return NextResponse.next()
    }

    // Check if authenticated user is trying to access admin routes
    if (path.startsWith('/admin')) {
      if (token.role !== 'ADMIN') {
        // Redirect to appropriate dashboard based on role
        if (token.role === 'SERVICE_PROVIDER') {
          return NextResponse.redirect(new URL('/provider/dashboard', req.url))
        }
        if (token.role === 'CUSTOMER') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Check if authenticated user is trying to access provider routes
    if (path.startsWith('/provider/dashboard')) {
      if (token.role !== 'SERVICE_PROVIDER') {
        // Redirect to appropriate dashboard based on role
        if (token.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        if (token.role === 'CUSTOMER') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Check if authenticated user is trying to access customer dashboard
    if (path.startsWith('/dashboard')) {
      if (token.role !== 'CUSTOMER') {
        // Redirect to appropriate dashboard based on role
        if (token.role === 'SERVICE_PROVIDER') {
          return NextResponse.redirect(new URL('/provider/dashboard', req.url))
        }
        if (token.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true, // Allow all requests, middleware function handles logic
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/provider/dashboard/:path*', '/dashboard/:path*'],
}
