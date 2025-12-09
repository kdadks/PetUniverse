import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // If user is authenticated, redirect them away from login pages to their dashboard
    if (token) {
      // Redirect authenticated users away from login pages
      if (path === '/admin/login') {
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        // Non-admins trying to access admin login - redirect to their dashboard
        if (token.role === 'SERVICE_PROVIDER') {
          return NextResponse.redirect(new URL('/provider/dashboard', req.url))
        }
        if (token.role === 'CUSTOMER') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
      }

      if (path === '/provider/login') {
        if (token.role === 'SERVICE_PROVIDER') {
          return NextResponse.redirect(new URL('/provider/dashboard', req.url))
        }
        // Non-providers trying to access provider login - redirect to their dashboard
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        if (token.role === 'CUSTOMER') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
      }

      if (path === '/auth/signin') {
        // Redirect authenticated users to their appropriate dashboard
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url))
        }
        if (token.role === 'SERVICE_PROVIDER') {
          return NextResponse.redirect(new URL('/provider/dashboard', req.url))
        }
        if (token.role === 'CUSTOMER') {
          return NextResponse.redirect(new URL('/dashboard', req.url))
        }
      }
    }

    // If no token, redirect unauthenticated users to appropriate login pages
    if (!token) {
      // Redirect unauthenticated users trying to access admin routes
      if (path.startsWith('/admin') && path !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // Redirect unauthenticated users trying to access provider routes
      if (path.startsWith('/provider') && path !== '/provider/login' && path !== '/provider/onboarding') {
        return NextResponse.redirect(new URL('/provider/login', req.url))
      }

      // Redirect unauthenticated users trying to access customer dashboard
      if (path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }

      // Allow access to login pages and other public pages
      return NextResponse.next()
    }

    // Check if authenticated user is trying to access admin routes
    if (path.startsWith('/admin') && path !== '/admin/login') {
      if (token.role !== 'ADMIN' && token.role !== 'SUPER_ADMIN') {
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
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
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
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
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
  matcher: [
    '/admin/:path*',
    '/provider/:path*',
    '/dashboard/:path*',
    '/auth/signin'
  ],
}
