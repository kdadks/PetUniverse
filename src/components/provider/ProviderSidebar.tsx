'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Package,
  Users,
  Star,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  LogOut,
  User,
  MessageSquare,
  DollarSign,
  Clock
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/provider/dashboard',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'Bookings',
    href: '/provider/dashboard/bookings',
    icon: Calendar,
    badge: 'pending'
  },
  {
    title: 'My Services',
    href: '/provider/dashboard/services',
    icon: Package,
    badge: null
  },
  {
    title: 'Clients',
    href: '/provider/dashboard/clients',
    icon: Users,
    badge: null
  },
  {
    title: 'Reviews',
    href: '/provider/dashboard/reviews',
    icon: Star,
    badge: null
  },
  {
    title: 'Earnings',
    href: '/provider/dashboard/earnings',
    icon: DollarSign,
    badge: null
  },
  {
    title: 'Schedule',
    href: '/provider/dashboard/schedule',
    icon: Clock,
    badge: null
  },
  {
    title: 'Messages',
    href: '/provider/dashboard/messages',
    icon: MessageSquare,
    badge: null
  },
  {
    title: 'Analytics',
    href: '/provider/dashboard/analytics',
    icon: TrendingUp,
    badge: null
  },
  {
    title: 'Profile',
    href: '/provider/dashboard/profile',
    icon: User,
    badge: null
  },
  {
    title: 'Settings',
    href: '/provider/dashboard/settings',
    icon: Settings,
    badge: null
  }
]

export default function ProviderSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { data: session } = useSession()

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ redirect: false })
    router.push('/provider/login')
    router.refresh()
  }

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 bottom-0 bg-gradient-to-b from-slate-900 via-teal-900 to-slate-900 border-r border-white/10 overflow-hidden z-40"
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Logo/Branding */}
      <div className="px-4 py-6 border-b border-white/10">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">P4Pet Provider</h2>
              <p className="text-gray-400 text-xs">Service Portal</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pt-4 pb-20">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/provider/dashboard' && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative",
                  isActive
                    ? "bg-gradient-to-r from-teal-500/20 to-emerald-600/20 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeProviderTab"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-600/20 rounded-xl border border-teal-500/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {/* Icon */}
                <div className={cn(
                  "relative z-10 flex-shrink-0 transition-transform duration-300",
                  isActive && "scale-110"
                )}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Label */}
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative z-10 flex-1 flex items-center justify-between"
                  >
                    <span className="font-medium text-sm">{item.title}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>
                )}

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
                    {item.title}
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500/20 text-orange-300 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* User Profile & Sign Out */}
      <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 border-t border-white/10 backdrop-blur-sm">
        {!isCollapsed ? (
          <div className="p-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-2 bg-white/5 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session?.user?.name || session?.user?.email?.split('@')[0] || 'Provider'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  Service Provider
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningOut ? (
                <div className="h-5 w-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="font-medium text-sm">{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {/* Collapsed User Avatar */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Collapsed Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex justify-center p-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group relative disabled:opacity-50 disabled:cursor-not-allowed"
              title="Sign Out"
            >
              {isSigningOut ? (
                <div className="h-5 w-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
              )}

              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
                {isSigningOut ? 'Signing Out...' : 'Sign Out'}
              </div>
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  )
}
