'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ProviderLayout from '@/components/provider/ProviderLayout'
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
  Plus,
  X,
  FileText,
  Shield,
  Eye,
  Download,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Document {
  id: string
  type: string
  name: string
  file: File | null
  url?: string
  status: 'pending' | 'uploaded' | 'verified'
  isRequired: boolean
}

interface ProfileData {
  // Basic Info
  firstName: string
  lastName: string
  email: string
  businessName: string
  businessType: string
  description: string
  specializations: string
  licenseNumber: string

  // Location Info
  country: string
  state: string
  city: string
  addressLine1: string
  addressLine2: string
  landmark: string
  postalCode: string
  gstNumber: string
  taxId: string

  // Business Hours
  businessHours: {
    [key: string]: { open: string; close: string; closed: boolean }
  }

  // Service Area
  serviceArea: {
    radius: number
    cities: string
    description: string
  }

  // Contact POC
  pocName: string
  pocEmail: string
  pocPhone: string

  // Documents
  documents: Document[]

  // Policies
  policies: {
    cancellation: string
    refund: string
    terms: string
  }
}

// ISO States and Cities Data
const ISO_DATA: Record<string, Record<string, string[]>> = {
  INDIA: {
    'ANDHRA_PRADESH': ['Visakhapatnam', 'Vijayawada', 'Nellore', 'Tirupati', 'Kurnool'],
    'ARUNACHAL_PRADESH': ['Itanagar', 'Naharlagun', 'Pasighat', 'Tezpur'],
    'ASSAM': ['Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon', 'Tinsukia'],
    'BIHAR': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
    'CHHATTISGARH': ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Jagdalpur'],
    'DELHI': ['New Delhi', 'Delhi Cantonment', 'North Delhi', 'South Delhi'],
    'GOA': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
    'GUJARAT': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Junagadh'],
    'HARYANA': ['Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat'],
    'HIMACHAL_PRADESH': ['Shimla', 'Solan', 'Mandi', 'Kangra', 'Kullu'],
    'JHARKHAND': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Giridih', 'Bokaro'],
    'KARNATAKA': ['Bangalore', 'Mysore', 'Mangalore', 'Hubballi', 'Belgaum'],
    'KERALA': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Alappuzha'],
    'MADHYA_PRADESH': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain'],
    'MAHARASHTRA': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'MANIPUR': ['Imphal', 'Churachandpur', 'Thoubal'],
    'MEGHALAYA': ['Shillong', 'Tura', 'Nongstoin'],
    'MIZORAM': ['Aizawl', 'Lunglei', 'Saiha'],
    'NAGALAND': ['Kohima', 'Dimapur', 'Mokokchung'],
    'ODISHA': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Balasore'],
    'PUNJAB': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala'],
    'RAJASTHAN': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
    'SIKKIM': ['Gangtok', 'Namchi', 'Geyzing'],
    'TAMIL_NADU': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruppur'],
    'TELANGANA': ['Hyderabad', 'Secunderabad', 'Warangal', 'Nizamabad'],
    'TRIPURA': ['Agartala', 'Udaipur', 'Dharmanagar'],
    'UTTAR_PRADESH': ['Lucknow', 'Kanpur', 'Varanasi', 'Allahabad', 'Meerut'],
    'UTTARAKHAND': ['Dehradun', 'Haridwar', 'Nainital', 'Garhwal'],
    'WEST_BENGAL': ['Kolkata', 'Darjeeling', 'Siliguri', 'Asansol', 'Durgapur']
  },
  USA: {
    'CALIFORNIA': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'TEXAS': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'FLORIDA': ['Miami', 'Tampa', 'Orlando', 'Jacksonville'],
    'NEW_YORK': ['New York', 'Buffalo', 'Rochester', 'Albany']
  },
  UK: {
    'ENGLAND': ['London', 'Manchester', 'Birmingham', 'Leeds'],
    'SCOTLAND': ['Edinburgh', 'Glasgow', 'Aberdeen'],
    'WALES': ['Cardiff', 'Swansea', 'Newport'],
    'NORTHERN_IRELAND': ['Belfast', 'Derry']
  },
  CANADA: {
    'ONTARIO': ['Toronto', 'Ottawa', 'Hamilton'],
    'QUEBEC': ['Montreal', 'Quebec City', 'Gatineau'],
    'BRITISH_COLUMBIA': ['Vancouver', 'Victoria', 'Surrey'],
    'ALBERTA': ['Calgary', 'Edmonton', 'Red Deer']
  }
}

const BUSINESS_TYPES = ['GROOMING', 'VETERINARY', 'TRAINING', 'BOARDING', 'WALKING', 'OTHER']

const COUNTRY_PHONE_CODES: Record<string, { code: string; pattern: string }> = {
  INDIA: { code: '+91', pattern: '+91-XXXXX-XXXXX' },
  USA: { code: '+1', pattern: '+1-XXX-XXX-XXXX' },
  UK: { code: '+44', pattern: '+44-XXXX-XXXXXX' },
  CANADA: { code: '+1', pattern: '+1-XXX-XXX-XXXX' }
}

const formatPhoneNumber = (phone: string, country: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  const countryCode = COUNTRY_PHONE_CODES[country]?.code || '+1'
  const codeDigits = countryCode.replace('+', '')

  if (!cleaned) return ''

  if (country === 'INDIA') {
    if (cleaned.length >= 10) {
      const lastTen = cleaned.slice(-10)
      return `${countryCode}-${lastTen.slice(0, 5)}-${lastTen.slice(5)}`
    }
    return cleaned
  } else if (country === 'USA' || country === 'CANADA') {
    if (cleaned.length >= 10) {
      const lastTen = cleaned.slice(-10)
      return `${countryCode}-${lastTen.slice(0, 3)}-${lastTen.slice(3, 6)}-${lastTen.slice(6)}`
    }
    return cleaned
  } else if (country === 'UK') {
    if (cleaned.length >= 10) {
      const lastTen = cleaned.slice(-10)
      return `${countryCode}-${lastTen.slice(0, 4)}-${lastTen.slice(4)}`
    }
    return cleaned
  }

  return cleaned
}

export default function ProviderProfileManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [previewDoc, setPreviewDoc] = useState<{ type: string; name: string; url: string } | null>(null)

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    businessName: '',
    businessType: '',
    description: '',
    specializations: '',
    licenseNumber: '',
    country: 'INDIA',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    postalCode: '',
    gstNumber: '',
    taxId: '',
    businessHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '15:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },
    serviceArea: { radius: 10, cities: '', description: '' },
    pocName: '',
    pocEmail: '',
    pocPhone: '',
    documents: [],
    policies: { cancellation: '', refund: '', terms: '' }
  })

  const tabs = [
    { id: 'basic', label: 'Basic Information', icon: User },
    { id: 'business', label: 'Business Details', icon: Building2 },
    { id: 'location', label: 'Location & Address', icon: MapPin },
    { id: 'contact', label: 'Contact POC', icon: Phone },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'policies', label: 'Policies', icon: Shield }
  ]

  // Update available states when country changes
  useEffect(() => {
    const states = Object.keys(ISO_DATA[profileData.country] || {})
      .map(key => key.replace(/_/g, ' '))
      .sort()
    setAvailableStates(states)
    setProfileData(prev => ({ ...prev, state: '', city: '' }))
  }, [profileData.country])

  // Update available cities when state changes
  useEffect(() => {
    if (profileData.state && profileData.country) {
      const stateKey = profileData.state.replace(/ /g, '_').toUpperCase()
      const cities = ISO_DATA[profileData.country]?.[stateKey] || []
      setAvailableCities(cities)
      setProfileData(prev => ({ ...prev, city: '' }))
    }
  }, [profileData.state, profileData.country])

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
        businessName: 'Pawsome Grooming Studio',
        businessType: 'GROOMING',
        description: 'Professional pet grooming services with over 8 years of experience',
        specializations: 'Long-haired breeds, Sensitive skin care, Show dog preparation',
        licenseNumber: 'LIC-2024-001',
        country: 'INDIA',
        state: 'KARNATAKA',
        city: 'Bangalore',
        addressLine1: '123 MG Road, Suite 200',
        addressLine2: 'Tech Park Building',
        landmark: 'Near Metro Station',
        postalCode: '560034',
        gstNumber: '18ABCDE1234F1Z0',
        taxId: 'AAAPG1234G',
        businessHours: {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '10:00', close: '16:00', closed: false },
          sunday: { open: '', close: '', closed: true }
        },
        serviceArea: { radius: 10, cities: 'Bangalore, Whitefield', description: 'We serve across Bangalore metro area' },
        pocName: 'Sarah Johnson',
        pocEmail: 'sarah@pawsomestudio.com',
        pocPhone: '+91-98765-43210',
        documents: [
          { id: '1', type: 'PAN_CARD', name: 'PAN Card', file: null, url: 'https://via.placeholder.com/800x600?text=PAN+Card', status: 'verified', isRequired: true },
          { id: '2', type: 'GST_CERT', name: 'GST Certificate', file: null, url: 'https://via.placeholder.com/800x600?text=GST+Certificate', status: 'verified', isRequired: true },
          { id: '3', type: 'BUSINESS_LICENSE', name: 'Business License', file: null, url: 'https://via.placeholder.com/800x600?text=License', status: 'uploaded', isRequired: true }
        ],
        policies: {
          cancellation: 'Cancel up to 24 hours before appointment for full refund',
          refund: 'Full refund if cancelled 24 hours in advance',
          terms: 'We reserve the right to refuse service to aggressive animals'
        }
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
      console.log('Saving profile:', profileData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Error saving profile')
    } finally {
      setIsSaving(false)
    }
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

  if (isLoading) {
    return (
      <ProviderLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
        </div>
      </ProviderLayout>
    )
  }

  return (
    <ProviderLayout>
      <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 rounded-2xl -mx-6 -my-6 px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Manage Profile
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
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
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
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
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

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
              </div>
            )}

            {/* Business Details Tab */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={profileData.businessName}
                      onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      value={profileData.businessType}
                      onChange={(e) => setProfileData({ ...profileData, businessType: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Business Type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={profileData.description}
                    onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specializations
                  </label>
                  <textarea
                    value={profileData.specializations}
                    onChange={(e) => setProfileData({ ...profileData, specializations: e.target.value })}
                    rows={2}
                    placeholder="e.g., Long-haired breeds, Sensitive skin care"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={profileData.licenseNumber}
                    onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Location & Address Tab */}
            {activeTab === 'location' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location & Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="INDIA">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="CANADA">Canada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      value={profileData.state}
                      onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select State</option>
                      {availableStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <select
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select City</option>
                      {availableCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={profileData.postalCode}
                      onChange={(e) => setProfileData({ ...profileData, postalCode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    value={profileData.addressLine1}
                    onChange={(e) => setProfileData({ ...profileData, addressLine1: e.target.value })}
                    placeholder="e.g., 123 Main Street, Suite 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={profileData.addressLine2}
                    onChange={(e) => setProfileData({ ...profileData, addressLine2: e.target.value })}
                    placeholder="e.g., Building Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={profileData.landmark}
                    onChange={(e) => setProfileData({ ...profileData, landmark: e.target.value })}
                    placeholder="e.g., Near Metro Station"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax ID *
                    </label>
                    <input
                      type="text"
                      value={profileData.taxId}
                      onChange={(e) => setProfileData({ ...profileData, taxId: e.target.value })}
                      placeholder="e.g., AAAPG1234G"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST Number (if applicable)
                    </label>
                    <input
                      type="text"
                      value={profileData.gstNumber}
                      onChange={(e) => setProfileData({ ...profileData, gstNumber: e.target.value })}
                      placeholder="e.g., 18ABCDE1234F1Z0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact POC Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Point of Contact</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    POC Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.pocName}
                    onChange={(e) => setProfileData({ ...profileData, pocName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      POC Email *
                    </label>
                    <input
                      type="email"
                      value={profileData.pocEmail}
                      onChange={(e) => setProfileData({ ...profileData, pocEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      POC Phone ({profileData.country}) *
                    </label>
                    <input
                      type="tel"
                      value={profileData.pocPhone}
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value, profileData.country)
                        setProfileData({ ...profileData, pocPhone: formatted })
                      }}
                      placeholder={COUNTRY_PHONE_CODES[profileData.country]?.pattern || '+1-XXX-XXX-XXXX'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Business Hours Tab */}
            {activeTab === 'hours' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Hours & Service Area</h2>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h3>
                  <div className="space-y-4">
                    {Object.entries(profileData.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex items-center space-x-4">
                        <div className="w-24">
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

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Area</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Radius (km)
                      </label>
                      <input
                        type="number"
                        value={profileData.serviceArea.radius}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            serviceArea: { ...profileData.serviceArea, radius: parseInt(e.target.value) }
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Cities
                      </label>
                      <input
                        type="text"
                        value={profileData.serviceArea.cities}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            serviceArea: { ...profileData.serviceArea, cities: e.target.value }
                          })
                        }
                        placeholder="e.g., Bangalore, Whitefield"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Description
                    </label>
                    <textarea
                      value={profileData.serviceArea.description}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          serviceArea: { ...profileData.serviceArea, description: e.target.value }
                        })
                      }
                      rows={3}
                      placeholder="Describe your service area and coverage..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Documents</h2>

                <div className="space-y-3">
                  {profileData.documents.map((doc) => (
                    <div key={doc.type} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === 'verified' && (
                          <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        )}
                        {doc.status === 'uploaded' && (
                          <span className="flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                            <AlertCircle className="h-3 w-3" />
                            Uploaded
                          </span>
                        )}
                        {doc.url && (
                          <>
                            <button
                              type="button"
                              onClick={() => setPreviewDoc({ type: doc.type, name: doc.name, url: doc.url || '' })}
                              className="text-blue-600 hover:text-blue-700 transition-colors"
                              title="Preview document"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-600 hover:text-teal-700 transition-colors"
                              title="Download document"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600">
                    Documents are reviewed and verified by our admin team. You will be notified once they are approved.
                  </p>
                </div>
              </div>
            )}

            {/* Policies Tab */}
            {activeTab === 'policies' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Policies</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cancellation Policy
                  </label>
                  <textarea
                    value={profileData.policies.cancellation}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        policies: { ...profileData.policies, cancellation: e.target.value }
                      })
                    }
                    rows={4}
                    placeholder="Describe your cancellation policy..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Refund Policy
                  </label>
                  <textarea
                    value={profileData.policies.refund}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        policies: { ...profileData.policies, refund: e.target.value }
                      })
                    }
                    rows={4}
                    placeholder="Describe your refund policy..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    value={profileData.policies.terms}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        policies: { ...profileData.policies, terms: e.target.value }
                      })
                    }
                    rows={4}
                    placeholder="Describe your terms and conditions..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
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

        {/* Document Preview Modal */}
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold text-gray-900">{previewDoc.name}</p>
                    <p className="text-sm text-gray-500">{previewDoc.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto p-4 bg-gray-50 flex items-center justify-center">
                {previewDoc.url.toLowerCase().endsWith('.pdf') ? (
                  <iframe
                    src={previewDoc.url}
                    className="w-full h-full border-none rounded"
                    title={previewDoc.name}
                  />
                ) : previewDoc.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <div className="flex items-center justify-center">
                    <img
                      src={previewDoc.url}
                      alt={previewDoc.name}
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <FileText className="h-16 w-16 text-gray-300" />
                    <p className="text-gray-600">Preview not available for this file type</p>
                    <a
                      href={previewDoc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Download File
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-100">
                <a
                  href={previewDoc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </ProviderLayout>
  )
}
