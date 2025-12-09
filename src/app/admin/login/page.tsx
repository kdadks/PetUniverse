'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Lock, Mail, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid credentials')
        setIsLoading(false)
        return
      }

      // Verify the user is an admin
      const response = await fetch('/api/auth/session')
      const session = await response.json()

      if (!session?.user) {
        setError('Authentication failed')
        setIsLoading(false)
        return
      }

      if (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN') {
        // Sign out the user if they're not an admin
        await fetch('/api/auth/signout', { method: 'POST' })
        setError('Access denied. This login is only for administrators.')
        setIsLoading(false)
        return
      }

      // Redirect to admin dashboard
      router.push('/admin')
    } catch (error) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 -mt-16 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto h-16 w-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl"
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Administrator Login
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Secure access to system administration
          </p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8"
        >
          {/* Security Badge */}
          <div className="mb-6 flex items-center justify-center space-x-2 text-yellow-400">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-sm font-medium">Secure Admin Portal</span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 bg-white/5 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="admin@petuniverse.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 bg-white/5 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-300 bg-red-900/30 border border-red-500/50 rounded-lg p-3"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Sign in as Admin
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                All login attempts are monitored and logged for security purposes
              </p>
            </div>
          </form>

          {/* Customer Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-300">
              Not an administrator?{' '}
              <Link href="/auth/signin" className="font-medium text-teal-400 hover:text-teal-300 transition-colors duration-200">
                Customer Login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Test Account Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4"
        >
          <p className="text-xs text-red-300 text-center">
            <strong>Test Account:</strong> admin@petuniverse.com / password123
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 grid grid-cols-3 gap-2"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 text-center">
            <Lock className="h-4 w-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Encrypted</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 text-center">
            <Shield className="h-4 w-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Secure</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-2 text-center">
            <ShieldCheck className="h-4 w-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Protected</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
