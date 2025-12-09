'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Building2,
  MapPin,
  Clock,
  FileText,
  Shield,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  User
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

interface ComplianceRequirement {
  documentType: string
  label: string
  description: string
  isRequired: boolean
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
    'ALABAMA': ['Birmingham', 'Montgomery', 'Mobile', 'Huntsville'],
    'ALASKA': ['Anchorage', 'Juneau', 'Fairbanks'],
    'ARIZONA': ['Phoenix', 'Tucson', 'Mesa', 'Chandler'],
    'ARKANSAS': ['Little Rock', 'Fort Smith', 'Fayetteville'],
    'CALIFORNIA': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'COLORADO': ['Denver', 'Colorado Springs', 'Aurora'],
    'CONNECTICUT': ['Bridgeport', 'New Haven', 'Stamford'],
    'DELAWARE': ['Wilmington', 'Dover', 'Newark'],
    'FLORIDA': ['Miami', 'Tampa', 'Orlando', 'Jacksonville'],
    'GEORGIA': ['Atlanta', 'Augusta', 'Savannah'],
    'HAWAII': ['Honolulu', 'Pearl City', 'Kailua'],
    'IDAHO': ['Boise', 'Nampa', 'Pocatello'],
    'ILLINOIS': ['Chicago', 'Springfield', 'Peoria'],
    'INDIANA': ['Indianapolis', 'Fort Wayne', 'Evansville'],
    'IOWA': ['Des Moines', 'Cedar Rapids', 'Davenport'],
    'KANSAS': ['Kansas City', 'Wichita', 'Topeka'],
    'KENTUCKY': ['Louisville', 'Lexington', 'Bowling Green'],
    'LOUISIANA': ['New Orleans', 'Baton Rouge', 'Shreveport'],
    'MAINE': ['Portland', 'Lewiston', 'Bangor'],
    'MARYLAND': ['Baltimore', 'Frederick', 'Rockville'],
    'MASSACHUSETTS': ['Boston', 'Worcester', 'Springfield'],
    'MICHIGAN': ['Detroit', 'Grand Rapids', 'Warren'],
    'MINNESOTA': ['Minneapolis', 'St. Paul', 'Rochester'],
    'MISSISSIPPI': ['Jackson', 'Gulfport', 'Biloxi'],
    'MISSOURI': ['Kansas City', 'St. Louis', 'Springfield'],
    'MONTANA': ['Billings', 'Missoula', 'Great Falls'],
    'NEBRASKA': ['Omaha', 'Lincoln', 'Bellevue'],
    'NEVADA': ['Las Vegas', 'Henderson', 'North Las Vegas'],
    'NEW_HAMPSHIRE': ['Manchester', 'Nashua', 'Concord'],
    'NEW_JERSEY': ['Newark', 'Jersey City', 'Paterson'],
    'NEW_MEXICO': ['Albuquerque', 'Las Cruces', 'Santa Fe'],
    'NEW_YORK': ['New York City', 'Buffalo', 'Rochester'],
    'NORTH_CAROLINA': ['Charlotte', 'Raleigh', 'Greensboro'],
    'NORTH_DAKOTA': ['Bismarck', 'Fargo', 'Grand Forks'],
    'OHIO': ['Columbus', 'Cleveland', 'Cincinnati'],
    'OKLAHOMA': ['Oklahoma City', 'Tulsa', 'Norman'],
    'OREGON': ['Portland', 'Eugene', 'Salem'],
    'PENNSYLVANIA': ['Philadelphia', 'Pittsburgh', 'Allentown'],
    'RHODE_ISLAND': ['Providence', 'Warwick', 'Cranston'],
    'SOUTH_CAROLINA': ['Charleston', 'Columbia', 'Greenville'],
    'SOUTH_DAKOTA': ['Sioux Falls', 'Rapid City', 'Aberdeen'],
    'TENNESSEE': ['Nashville', 'Memphis', 'Knoxville'],
    'TEXAS': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'UTAH': ['Salt Lake City', 'Provo', 'Ogden'],
    'VERMONT': ['Montpelier', 'Burlington', 'Rutland'],
    'VIRGINIA': ['Richmond', 'Virginia Beach', 'Arlington'],
    'WASHINGTON': ['Seattle', 'Spokane', 'Tacoma'],
    'WEST_VIRGINIA': ['Charleston', 'Huntington', 'Parkersburg'],
    'WISCONSIN': ['Milwaukee', 'Madison', 'Green Bay'],
    'WYOMING': ['Cheyenne', 'Casper', 'Laramie']
  },
  UK: {
    'LONDON': ['Central London', 'North London', 'South London', 'East London', 'West London'],
    'MANCHESTER': ['Central Manchester', 'North Manchester', 'South Manchester'],
    'BIRMINGHAM': ['Central Birmingham', 'East Birmingham', 'West Birmingham'],
    'LEEDS': ['Central Leeds', 'North Leeds', 'South Leeds'],
    'GLASGOW': ['City Centre', 'North Glasgow', 'South Glasgow'],
    'BRISTOL': ['City Centre', 'North Bristol', 'South Bristol'],
    'EDINBURGH': ['City Centre', 'North Edinburgh', 'South Edinburgh'],
    'LIVERPOOL': ['City Centre', 'North Liverpool', 'South Liverpool'],
    'CARDIFF': ['City Centre', 'North Cardiff', 'South Cardiff'],
    'BELFAST': ['City Centre', 'North Belfast', 'South Belfast']
  },
  CANADA: {
    'ONTARIO': ['Toronto', 'Ottawa', 'Hamilton', 'London'],
    'QUEBEC': ['Montreal', 'Quebec City', 'Gatineau', 'Laval'],
    'BRITISH_COLUMBIA': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'],
    'ALBERTA': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    'MANITOBA': ['Winnipeg', 'Brandon', 'Thompson'],
    'SASKATCHEWAN': ['Saskatoon', 'Regina', 'Prince Albert'],
    'NOVA_SCOTIA': ['Halifax', 'Cape Breton', 'Sydney'],
    'NEW_BRUNSWICK': ['Saint John', 'Moncton', 'Fredericton'],
    'NEWFOUNDLAND_LABRADOR': ['St. Johns', 'Corner Brook', 'Gander'],
    'PRINCE_EDWARD_ISLAND': ['Charlottetown', 'Summerside'],
    'NORTHWEST_TERRITORIES': ['Yellowknife', 'Hay River'],
    'YUKON': ['Whitehorse', 'Dawson City'],
    'NUNAVUT': ['Iqaluit', 'Rankin Inlet']
  }
}

const COMPLIANCE_RULES: Record<string, Record<string, ComplianceRequirement[]>> = {
  INDIA: {
    GROOMING: [
      { documentType: 'PAN_CARD', label: 'PAN Card', description: 'Permanent Account Number', isRequired: true },
      { documentType: 'GST_CERT', label: 'GST Certificate', description: 'GST Registration Certificate', isRequired: true },
      { documentType: 'BUSINESS_LICENSE', label: 'Business License', description: 'State Business License', isRequired: true },
      { documentType: 'ID_PROOF', label: 'ID Proof', description: 'Aadhar/Passport', isRequired: true },
      { documentType: 'ADDRESS_PROOF', label: 'Address Proof', description: 'Business Address Proof', isRequired: true },
    ],
    VETERINARY: [
      { documentType: 'PAN_CARD', label: 'PAN Card', description: 'Permanent Account Number', isRequired: true },
      { documentType: 'GST_CERT', label: 'GST Certificate', description: 'GST Registration Certificate', isRequired: true },
      { documentType: 'MEDICAL_LICENSE', label: 'Medical License', description: 'Veterinary Medical License', isRequired: true },
      { documentType: 'BUSINESS_LICENSE', label: 'Business License', description: 'State Business License', isRequired: true },
      { documentType: 'ID_PROOF', label: 'ID Proof', description: 'Aadhar/Passport', isRequired: true },
      { documentType: 'ADDRESS_PROOF', label: 'Address Proof', description: 'Business Address Proof', isRequired: true },
    ],
    DEFAULT: [
      { documentType: 'PAN_CARD', label: 'PAN Card', description: 'Permanent Account Number', isRequired: true },
      { documentType: 'ID_PROOF', label: 'ID Proof', description: 'Aadhar/Passport', isRequired: true },
      { documentType: 'ADDRESS_PROOF', label: 'Address Proof', description: 'Business Address Proof', isRequired: true },
      { documentType: 'BUSINESS_LICENSE', label: 'Business License', description: 'Optional Business License', isRequired: false },
    ]
  },
  USA: {
    GROOMING: [
      { documentType: 'EIN', label: 'EIN', description: 'Employer Identification Number', isRequired: true },
      { documentType: 'LICENSE', label: 'Business License', description: 'State/Local Business License', isRequired: true },
      { documentType: 'ID_PROOF', label: 'Government ID', description: 'Driver License or Passport', isRequired: true },
    ],
    VETERINARY: [
      { documentType: 'EIN', label: 'EIN', description: 'Employer Identification Number', isRequired: true },
      { documentType: 'VET_LICENSE', label: 'Veterinary License', description: 'State Veterinary License', isRequired: true },
      { documentType: 'LICENSE', label: 'Business License', description: 'State/Local Business License', isRequired: true },
      { documentType: 'ID_PROOF', label: 'Government ID', description: 'Driver License or Passport', isRequired: true },
    ],
    DEFAULT: [
      { documentType: 'EIN', label: 'EIN', description: 'Employer Identification Number', isRequired: true },
      { documentType: 'ID_PROOF', label: 'Government ID', description: 'Driver License or Passport', isRequired: true },
    ]
  },
  DEFAULT: {
    DEFAULT: [
      { documentType: 'ID_PROOF', label: 'ID Proof', description: 'Government Issued ID', isRequired: true },
      { documentType: 'ADDRESS_PROOF', label: 'Address Proof', description: 'Address Verification', isRequired: true },
    ]
  }
}

// Country Phone Code Mapping
const COUNTRY_PHONE_CODES: Record<string, string> = {
  INDIA: '+91',
  USA: '+1',
  UK: '+44',
  CANADA: '+1'
}

// Phone formatting function
const formatPhoneNumber = (phone: string, countryCode: string): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')
  
  if (countryCode === 'INDIA') {
    // India: +91-XXXXX-XXXXX (10 digits)
    if (digits.length === 10) {
      return `${COUNTRY_PHONE_CODES.INDIA}-${digits.slice(0, 5)}-${digits.slice(5)}`
    } else if (digits.length === 11 && digits.startsWith('91')) {
      return `${COUNTRY_PHONE_CODES.INDIA}-${digits.slice(2, 7)}-${digits.slice(7)}`
    }
  } else if (countryCode === 'USA' || countryCode === 'CANADA') {
    // USA/Canada: +1-XXX-XXX-XXXX (10 digits)
    if (digits.length === 10) {
      return `${COUNTRY_PHONE_CODES[countryCode]}-${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    } else if (digits.length === 11 && (digits.startsWith('1'))) {
      return `${COUNTRY_PHONE_CODES[countryCode]}-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`
    }
  } else if (countryCode === 'UK') {
    // UK: +44-XXXX-XXXXXX (10 digits)
    if (digits.length === 10) {
      return `${COUNTRY_PHONE_CODES.UK}-${digits.slice(0, 4)}-${digits.slice(4)}`
    } else if (digits.length === 11 && digits.startsWith('44')) {
      return `${COUNTRY_PHONE_CODES.UK}-${digits.slice(2, 6)}-${digits.slice(6)}`
    }
  }
  
  return phone // Return as-is if formatting doesn't apply
}

export default function ProviderOnboarding() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [requiredDocuments, setRequiredDocuments] = useState<ComplianceRequirement[]>([])
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])

  const [formData, setFormData] = useState({
    // Basic Info
    businessName: '',
    businessType: '',
    description: '',
    specializations: '',
    licenseNumber: '',

    // Location Info
    country: 'INDIA',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    postalCode: '',
    gstNumber: '',
    taxId: '',

    // Business Hours
    businessHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '15:00', closed: false },
      sunday: { open: '', close: '', closed: true }
    },

    // Service Area
    serviceArea: {
      radius: 10,
      cities: '',
      description: ''
    },

    // Contact POC
    pocName: '',
    pocEmail: '',
    pocPhone: '',

    // Documents
    documents: [] as Document[],

    // Policies
    policies: {
      cancellation: '',
      refund: '',
      terms: ''
    }
  })

  // Initialize required documents based on country and business type
  useEffect(() => {
    const complianceReqs = COMPLIANCE_RULES[formData.country]?.[formData.businessType] ||
                          COMPLIANCE_RULES[formData.country]?.DEFAULT ||
                          COMPLIANCE_RULES.DEFAULT.DEFAULT

    setRequiredDocuments(complianceReqs)

    // Initialize documents array
    const initDocs: Document[] = complianceReqs.map((req, idx) => ({
      id: `${req.documentType}-${idx}`,
      type: req.documentType,
      name: req.label,
      file: null,
      status: 'pending',
      isRequired: req.isRequired
    }))
    setFormData(prev => ({ ...prev, documents: initDocs }))
  }, [formData.country, formData.businessType])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // Update available states when country changes
  useEffect(() => {
    const states = Object.keys(ISO_DATA[formData.country] || {})
      .map(key => key.replace(/_/g, ' '))
      .sort()
    setAvailableStates(states)
    setFormData(prev => ({ ...prev, state: '', city: '' }))
    setAvailableCities([])
  }, [formData.country])

  // Update available cities when state changes
  useEffect(() => {
    if (formData.state && formData.country) {
      const stateKey = formData.state.replace(/ /g, '_').toUpperCase()
      const cities = ISO_DATA[formData.country]?.[stateKey] || []
      setAvailableCities(cities.sort())
      setFormData(prev => ({ ...prev, city: '' }))
    } else {
      setAvailableCities([])
    }
  }, [formData.state, formData.country])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNestedChange = (section: string, field: string, value: string | number) => {
    setFormData(prev => {
      const updated = JSON.parse(JSON.stringify(prev))
      if (section === 'serviceArea') {
        updated.serviceArea[field] = value
      } else if (section === 'policies') {
        updated.policies[field] = value
      }
      return updated
    })
  }

  const handleBusinessHoursChange = (day: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value
        }
      }
    }))
  }

  const handleFileUpload = (documentId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      setFormData(prev => ({
        ...prev,
        documents: prev.documents.map(doc =>
          doc.id === documentId
            ? { ...doc, file, url: reader.result as string, status: 'uploaded' }
            : doc
        )
      }))
    }
    reader.readAsDataURL(file)
  }

  const removeDocument = (documentId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map(doc =>
        doc.id === documentId
          ? { ...doc, file: null, url: undefined, status: 'pending' }
          : doc
      )
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const requiredDocs = formData.documents.filter(d => d.isRequired)
      const uploadedDocs = requiredDocs.filter(d => d.status === 'uploaded')

      if (uploadedDocs.length !== requiredDocs.length) {
        alert('Please upload all required documents')
        setIsLoading(false)
        return
      }

      const payload = {
        businessName: formData.businessName,
        businessType: formData.businessType,
        description: formData.description,
        specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
        licenseNumber: formData.licenseNumber,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        landmark: formData.landmark,
        postalCode: formData.postalCode,
        gstNumber: formData.gstNumber,
        taxId: formData.taxId,
        pocName: formData.pocName,
        pocEmail: formData.pocEmail,
        pocPhone: formatPhoneNumber(formData.pocPhone, formData.country),
        businessHours: formData.businessHours,
        serviceArea: formData.serviceArea,
        policies: formData.policies,
        documents: formData.documents.map(d => ({
          type: d.type,
          name: d.name,
          url: d.url,
          status: d.status
        }))
      }

      const response = await fetch('/api/service-providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        router.push('/provider/dashboard')
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to create service provider profile')
      }
    } catch (error) {
      console.error('Error creating provider profile:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.businessType
      case 2:
        return formData.country && formData.state && formData.city && formData.addressLine1
      case 3:
        return formData.pocName && formData.pocEmail && formData.pocPhone
      case 4:
        return true
      case 5:
        return formData.documents.filter(d => d.isRequired).every(d => d.status === 'uploaded')
      case 6:
        return true
      default:
        return true
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  const showGST = formData.country === 'INDIA'

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 -mt-16">
      <div className="bg-gradient-to-r from-teal-100/80 via-cyan-100/80 to-emerald-100/80 pt-28 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Become Every Pet Parent's Trusted Professional
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our network and connect with thousands of pet parents seeking your expertise
            </p>
          </motion.div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                {step < 6 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step < currentStep ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs md:text-sm text-gray-600 gap-2">
            <span>Business</span>
            <span>Location</span>
            <span>Contact</span>
            <span>Hours</span>
            <span>Documents</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Steps */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20"
        >
          {/* Step 1: Business Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Building2 className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Business Type</option>
                    <option value="GROOMING">Pet Grooming</option>
                    <option value="VETERINARY">Veterinary Services</option>
                    <option value="FOOD_SUPPLIER">Food Supplier</option>
                    <option value="ACCESSORY_SUPPLIER">Accessory Supplier</option>
                    <option value="BREEDER">Pet Breeder</option>
                    <option value="PET_SITTER">Pet Sitting</option>
                    <option value="TRAINER">Pet Training</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell pet owners about your business and services..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations
                </label>
                <input
                  type="text"
                  name="specializations"
                  value={formData.specializations}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Dog grooming, Cat care, Emergency services (comma-separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Number (if applicable)
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Professional license number"
                />
              </div>
            </div>
          )}

          {/* Step 2: Location & Compliance Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Business Location</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="INDIA">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="CANADA">Canada</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select State/Province</option>
                    {availableStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select City</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Address Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1 *</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Street address, building number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Suite, apartment, floor (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Nearby landmark for reference (e.g., Near Metro Station, Next to XYZ Mall)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID / TIN *</label>
                  <input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={formData.country === 'INDIA' ? 'PAN Card Number' : 'EIN/Tax ID'}
                  />
                </div>

                {showGST && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GST Number (if applicable)</label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="GST Registration Number"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Contact POC */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Person</h2>
              </div>

              <p className="text-gray-600">Primary point of contact for business communication</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="pocName"
                    value={formData.pocName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="pocEmail"
                    value={formData.pocEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="pocPhone"
                    value={formData.pocPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder={formData.country === 'INDIA' ? '10-digit number (e.g., 9876543210)' : formData.country === 'USA' || formData.country === 'CANADA' ? '10-digit number (e.g., 2125551234)' : '10-digit number (e.g., 2071838750)'}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Business Hours */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Business Hours & Service Area</h2>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="space-y-3">
                  {Object.entries(formData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-24 text-sm font-medium text-gray-700 capitalize">{day}</div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={hours.closed}
                          onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-600">Closed</span>
                      </label>
                      {!hours.closed && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Service Area</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Radius (km)</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={formData.serviceArea.radius}
                      onChange={(e) => handleNestedChange('serviceArea', 'radius', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cities Served</label>
                    <input
                      type="text"
                      value={formData.serviceArea.cities}
                      onChange={(e) => handleNestedChange('serviceArea', 'cities', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="City1, City2, City3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Document Upload */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Upload className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Compliance Documents</h2>
              </div>

              {formData.country && formData.businessType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-blue-800">
                    <AlertCircle className="inline h-4 w-4 mr-2" />
                    Required documents for {formData.country} - {formData.businessType}
                  </p>
                </div>
              )}

              <div className="space-y-6">
                {formData.documents.map((doc) => (
                  <div key={doc.id} className={`border-2 rounded-lg p-6 ${
                    doc.status === 'uploaded' ? 'border-green-300 bg-green-50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">{doc.type}</p>
                        {doc.isRequired && <span className="inline-block mt-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>}
                      </div>
                      {doc.status === 'uploaded' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </div>

                    {doc.url ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between bg-white p-4 rounded border border-gray-300">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{doc.file?.name}</p>
                            <p className="text-xs text-gray-500">{((doc.file?.size || 0) / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <div className="flex space-x-2">
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800">
                              <Eye className="h-4 w-4" />
                            </a>
                            <button onClick={() => removeDocument(doc.id)} className="text-red-600 hover:text-red-800">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 hover:bg-teal-50 transition-colors">
                        <input
                          type="file"
                          onChange={(e) => e.target.files && handleFileUpload(doc.id, e.target.files[0])}
                          className="hidden"
                          id={`file-${doc.id}`}
                        />
                        <label htmlFor={`file-${doc.id}`} className="cursor-pointer">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-6 w-6 text-teal-600" />
                <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
              </div>

              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Name:</strong> {formData.businessName}</div>
                  <div><strong>Type:</strong> {formData.businessType}</div>
                  <div><strong>Tax ID:</strong> {formData.taxId || 'N/A'}</div>
                  {showGST && <div><strong>GST:</strong> {formData.gstNumber || 'N/A'}</div>}
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Business Address</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Location:</strong> {formData.city}, {formData.state}, {formData.country}</div>
                  <div><strong>Address Line 1:</strong> {formData.addressLine1}</div>
                  {formData.addressLine2 && <div><strong>Address Line 2:</strong> {formData.addressLine2}</div>}
                  {formData.landmark && <div><strong>Landmark:</strong> {formData.landmark}</div>}
                  {formData.postalCode && <div><strong>Postal Code:</strong> {formData.postalCode}</div>}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>POC:</strong> {formData.pocName}</div>
                  <div><strong>Email:</strong> {formData.pocEmail}</div>
                  <div><strong>Phone:</strong> {formData.pocPhone}</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents Submitted</h3>
                <div className="space-y-2">
                  {formData.documents.map(doc => (
                    <div key={doc.id} className="flex items-center text-sm">
                      {doc.status === 'uploaded' ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
                      )}
                      <span>{doc.name} - {doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  <AlertCircle className="inline h-4 w-4 mr-1" />
                  Next Steps After Submission
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Your profile will be verified within 2-3 business days</li>
                  <li>• Documents will be reviewed for compliance</li>
                  <li>• You'll receive email confirmation once approved</li>
                  <li>• Start adding services and availability immediately after approval</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Previous
            </button>

            {currentStep < 6 ? (
              <button
                onClick={nextStep}
                disabled={!validateStep()}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:from-teal-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading || !formData.documents.filter(d => d.isRequired).every(d => d.status === 'uploaded')}
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}