import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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

        // Test login credentials
        const testUsers = [
          {
            id: 'admin-1',
            email: 'admin@petuniverse.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMIN',
            avatar: null
          },
          {
            id: 'owner-1',
            email: 'owner@test.com',
            password: 'owner123',
            firstName: 'Sarah',
            lastName: 'Johnson',
            role: 'CUSTOMER',
            avatar: null
          },
          {
            id: 'provider-1',
            email: 'provider@test.com',
            password: 'provider123',
            firstName: 'Dr. Michael',
            lastName: 'Brown',
            role: 'SERVICE_PROVIDER',
            avatar: null
          }
        ]

        // Check test users first
        const testUser = testUsers.find(user =>
          user.email === credentials.email && user.password === credentials.password
        )

        if (testUser) {
          return {
            id: testUser.id,
            email: testUser.email,
            name: `${testUser.firstName} ${testUser.lastName}`,
            image: testUser.avatar,
            role: testUser.role
          }
        }

        // Then check database users
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          return null
        }

        // In a real implementation, you would verify the password here
        // For now, we'll just check if the user exists
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
    signUp: '/auth/signup',
  }
}