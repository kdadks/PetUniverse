'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Clock,
  Award,
  Upload,
  Save,
  ArrowLeft,
  Plus,
  X,
  Image as ImageIcon,
  Video,
  Trash2
} from 'lucide-react'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName: string
  bio: string
  location: string
  experience: string
  specialties: string[]
  certifications: string[]
  businessHours: {
    [key: string]: { open: string; close: string; closed: boolean }
  }
  gallery: string[]
  videos: { id: string; title: string; url: string; thumbnail: string }[]
}

export default function ProviderProfileManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    bio: '',
    location: '',
    experience: '',
    specialties: [''],
    certifications: [''],
    businessHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '15:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    gallery: [],
    videos: []
  })

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: User },
    { id: 'business', label: 'Business Details', icon: Building2 },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'media', label: 'Gallery & Videos', icon: ImageIcon },
    { id: 'credentials', label: 'Credentials', icon: Award }
  ]

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status])

  const fetchProfile = async () => {
    try {
      // Mock data - replace with actual API
      setProfileData({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah@pawsomestudio.com',
        phone: '(555) 123-4567',
        businessName: 'Pawsome Grooming Studio',
        bio: 'Passionate pet groomer with over 8 years of experience specializing in all breeds.',
        location: 'Downtown Pet District, New York, NY',
        experience: '8 years of professional pet grooming',
        specialties: ['Long-haired breeds', 'Sensitive skin care', 'Show dog preparation'],
        certifications: ['Certified Master Groomer', 'Pet First Aid Certified'],
        businessHours: {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '10:00', close: '16:00', closed: false },
          sunday: { open: '', close: '', closed: true }
        },
        gallery: [
          'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
          'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400'
        ],
        videos: [
          {
            id: '1',
            title: 'Golden Retriever Full Grooming',
            url: 'https://youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400'
          }
        ]
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // Filter out empty specialties and certifications
      const cleanedData = {
        ...profileData,
        specialties: profileData.specialties.filter((s) => s.trim() !== ''),
        certifications: profileData.certifications.filter((c) => c.trim() !== '')
      }

      // API call to update profile
      console.log('Saving profile:', cleanedData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile')
    } finally {
      setIsSaving(false)
    }
  }

  const addSpecialty = () => {
    setProfileData({ ...profileData, specialties: [...profileData.specialties, ''] })
  }

  const updateSpecialty = (index: number, value: string) => {
    const newSpecialties = [...profileData.specialties]
    newSpecialties[index] = value
    setProfileData({ ...profileData, specialties: newSpecialties })
  }

  const removeSpecialty = (index: number) => {
    setProfileData({
      ...profileData,
      specialties: profileData.specialties.filter((_, i) => i !== index)
    })
  }

  const addCertification = () => {
    setProfileData({ ...profileData, certifications: [...profileData.certifications, ''] })
  }

  const updateCertification = (index: number, value: string) => {
    const newCertifications = [...profileData.certifications]
    newCertifications[index] = value
    setProfileData({ ...profileData, certifications: newCertifications })
  }

  const removeCertification = (index: number) => {
    setProfileData({
      ...profileData,
      certifications: profileData.certifications.filter((_, i) => i !== index)
    })
  }

  const updateBusinessHours = (day: string, field: string, value: string | boolean) => {
    setProfileData({
      ...profileData,
      businessHours: {
        ...profileData.businessHours,
        [day]: {
          ...profileData.businessHours[day],
          [field]: value
        }
      }
    })
  }

  const removeImage = (index: number) => {
    setProfileData({
      ...profileData,
      gallery: profileData.gallery.filter((_, i) => i !== index)
    })
  }

  const removeVideo = (id: string) => {
    setProfileData({
      ...profileData,
      videos: profileData.videos.filter((v) => v.id !== id)
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/provider/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Manage Profile
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 hover:bg-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 mb-6"
          >
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({ ...profileData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    placeholder="City, State, Country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {/* Business Details Tab */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Details</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.businessName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, businessName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    value={profileData.experience}
                    onChange={(e) =>
                      setProfileData({ ...profileData, experience: e.target.value })
                    }
                    placeholder="e.g., 8 years of professional pet grooming"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    placeholder="Tell customers about yourself and your business..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Specialties
                    </label>
                    <button
                      type="button"
                      onClick={addSpecialty}
                      className="text-teal-600 hover:text-teal-800 text-sm flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {profileData.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={specialty}
                          onChange={(e) => updateSpecialty(index, e.target.value)}
                          placeholder="e.g., Long-haired breeds"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        {profileData.specialties.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSpecialty(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Business Hours Tab */}
            {activeTab === 'hours' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Hours</h2>

                <div className="space-y-4">
                  {Object.entries(profileData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-32">
                        <span className="font-medium text-gray-700 capitalize">{day}</span>
                      </div>

                      <input
                        type="checkbox"
                        checked={!hours.closed}
                        onChange={(e) => updateBusinessHours(day, 'closed', !e.target.checked)}
                        className="w-4 h-4 text-teal-600"
                      />

                      {!hours.closed ? (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                          />
                        </>
                      ) : (
                        <span className="text-gray-400">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery & Videos</h2>

                {/* Images */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Photo Gallery
                    </label>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-teal-600 hover:text-teal-800"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Photos</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {profileData.gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-teal-500 transition-colors"
                    >
                      <Plus className="h-8 w-8 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Videos */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">Videos</label>
                    <button
                      type="button"
                      className="flex items-center space-x-2 text-teal-600 hover:text-teal-800"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Video</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {profileData.videos.map((video) => (
                      <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-32 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{video.title}</h4>
                          <p className="text-sm text-gray-500">{video.url}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVideo(video.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Credentials</h2>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Certifications
                    </label>
                    <button
                      type="button"
                      onClick={addCertification}
                      className="text-teal-600 hover:text-teal-800 text-sm flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add</span>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={cert}
                          onChange={(e) => updateCertification(index, e.target.value)}
                          placeholder="e.g., Certified Master Groomer"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        {profileData.certifications.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCertification(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
            >
              <Save className="h-5 w-5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
