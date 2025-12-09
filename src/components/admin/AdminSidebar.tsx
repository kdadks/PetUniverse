'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShoppingBag,
  Package,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  UserCog,
  Store,
  TrendingUp
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    badge: null
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    badge: null
  },
  {
    title: 'Customer Management',
    href: '/admin/customers',
    icon: UserCog,
    badge: null
  },
  {
    title: 'Service Providers',
    href: '/admin/providers',
    icon: Briefcase,
    badge: 'pending'
  },
  {
    title: 'Services',
    href: '/admin/services',
    icon: ShieldCheck,
    badge: null
  },
  {
    title: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
    badge: null
  },
  {
    title: 'Marketplace',
    href: '/admin/marketplace',
    icon: Store,
    badge: null
  },
  {
    title: 'Inventory',
    href: '/admin/inventory',
    icon: Package,
    badge: null
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingBag,
    badge: null
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: TrendingUp,
    badge: null
  },
  {
    title: 'Reports',
    href: '/admin/reports',
    icon: FileText,
    badge: null
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    badge: null
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0, width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-16 bottom-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-white/10 overflow-hidden z-40"
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pt-4 pb-20">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative",
                  isActive
                    ? "bg-gradient-to-r from-red-500/20 to-pink-600/20 text-white shadow-lg"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-xl border border-red-500/30"
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
                      <span className="px-2 py-0.5 text-xs font-semibold bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
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
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">
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

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </motion.aside>
  )
}
