import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET 
      ? [GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })]
      : []
    ),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Test accounts (temporary until Supabase is implemented)
        const testAccounts = [
          {
            id: 'customer-1',
            email: 'customer@petuniverse.com',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            role: 'CUSTOMER',
            avatar: null
          },
          {
            id: 'provider-1',
            email: 'provider@petuniverse.com',
            password: 'password123',
            firstName: 'Sarah',
            lastName: 'Johnson',
            role: 'SERVICE_PROVIDER',
            avatar: null
          },
          {
            id: 'admin-1',
            email: 'admin@petuniverse.com',
            password: 'password123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            avatar: null
          }
        ]

        // Check test accounts
        const user = testAccounts.find(
          account => account.email === credentials.email && account.password === credentials.password
        )

        if (!user) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.avatar,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}