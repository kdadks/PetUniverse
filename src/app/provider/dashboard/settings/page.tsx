'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
import {
  Settings,
  User,
  Bell,
  Lock,
  CreditCard,
  Mail,
  Globe,
  Moon,
  Sun,
  Shield,
  Smartphone,
  Check,
  ChevronRight,
  Camera,
  Save
} from 'lucide-react'

interface NotificationSettings {
  emailBookings: boolean
  emailMessages: boolean
  emailReviews: boolean
  emailMarketing: boolean
  pushBookings: boolean
  pushMessages: boolean
  pushReviews: boolean
  smsBookings: boolean
}

interface PrivacySettings {
  profileVisible: boolean
  showRating: boolean
  showReviews: boolean
  allowMessages: boolean
}

export default function SettingsPage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<string>('profile')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    businessName: 'Happy Paws Pet Care',
    email: session?.user?.email || 'provider@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Pet Street, San Francisco, CA 94102',
    bio: 'Professional pet care provider with 5+ years of experience. Specializing in dog grooming, training, and pet sitting services.',
    website: 'www.happypawspetcare.com'
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailBookings: true,
    emailMessages: true,
    emailReviews: true,
    emailMarketing: false,
    pushBookings: true,
    pushMessages: true,
    pushReviews: false,
    smsBookings: true
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisible: true,
    showRating: true,
    showReviews: true,
    allowMessages: true
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock }
  ]

  return (
    <ProviderLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Settings className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                    activeTab === tab.id ? 'bg-teal-50 border-l-4 border-teal-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-teal-600' : 'text-gray-500'}`} />
                    <span className={`font-medium ${activeTab === tab.id ? 'text-teal-600' : 'text-gray-700'}`}>
                      {tab.label}
                    </span>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${activeTab === tab.id ? 'text-teal-600' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <div className="mt-4 bg-white/80 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon className="h-5 w-5 text-gray-600" /> : <Sun className="h-5 w-5 text-yellow-500" />}
                  <span className="font-medium text-gray-700">Dark Mode</span>
                </div>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-teal-500' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
            >
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                  
                  {/* Avatar */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold">
                        HP
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                        <Camera className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{profileData.businessName}</h3>
                      <p className="text-gray-600">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      <input
                        type="text"
                        value={profileData.businessName}
                        onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700 flex items-center space-x-2">
                      <Mail className="h-5 w-5" />
                      <span>Email Notifications</span>
                    </h3>
                    {[
                      { key: 'emailBookings', label: 'New booking requests' },
                      { key: 'emailMessages', label: 'New messages from clients' },
                      { key: 'emailReviews', label: 'New reviews' },
                      { key: 'emailMarketing', label: 'Marketing and promotions' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{item.label}</span>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof NotificationSettings] })}
                          className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof NotificationSettings] ? 'bg-teal-500' : 'bg-gray-300'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${notifications[item.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700 flex items-center space-x-2">
                      <Smartphone className="h-5 w-5" />
                      <span>Push Notifications</span>
                    </h3>
                    {[
                      { key: 'pushBookings', label: 'New booking requests' },
                      { key: 'pushMessages', label: 'New messages' },
                      { key: 'pushReviews', label: 'New reviews' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{item.label}</span>
                        <button
                          onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof NotificationSettings] })}
                          className={`w-12 h-6 rounded-full transition-colors ${notifications[item.key as keyof NotificationSettings] ? 'bg-teal-500' : 'bg-gray-300'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${notifications[item.key as keyof NotificationSettings] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'profileVisible', label: 'Make profile visible to public', description: 'Allow potential clients to find and view your profile' },
                      { key: 'showRating', label: 'Display rating on profile', description: 'Show your average rating to visitors' },
                      { key: 'showReviews', label: 'Display reviews on profile', description: 'Show client reviews on your profile page' },
                      { key: 'allowMessages', label: 'Allow direct messages', description: 'Let clients message you directly' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setPrivacy({ ...privacy, [item.key]: !privacy[item.key as keyof PrivacySettings] })}
                          className={`w-12 h-6 rounded-full transition-colors ${privacy[item.key as keyof PrivacySettings] ? 'bg-teal-500' : 'bg-gray-300'}`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${privacy[item.key as keyof PrivacySettings] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Settings</h2>
                  
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <CreditCard className="h-8 w-8" />
                      <span className="text-sm opacity-80">Primary Account</span>
                    </div>
                    <p className="text-lg font-medium">Bank Account •••• 4567</p>
                    <p className="text-sm opacity-80">Chase Bank</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Payout Schedule</p>
                        <p className="text-sm text-gray-500">Receive payouts every week</p>
                      </div>
                      <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                        <option>Weekly</option>
                        <option>Bi-weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>

                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-600 transition-colors">
                    + Add Payment Method
                  </button>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Password</p>
                          <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                        </div>
                        <button className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Active Sessions</p>
                          <p className="text-sm text-gray-500">Manage your active login sessions</p>
                        </div>
                        <button className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          View Sessions
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="text-red-600 hover:text-red-800 font-medium">
                      Delete Account
                    </button>
                    <p className="text-sm text-gray-500 mt-1">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProviderLayout>
  )
}
