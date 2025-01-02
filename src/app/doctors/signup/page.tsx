'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type District = string[];

interface HospitalLocations {
  [state: string]: {
    [district: string]: string[];
  };
}

interface HospitalSelection {
  state: string;
  district: string;
  hospital: string;
  customHospital: string;
}

const hospitalsByLocation: HospitalLocations = {
  'Karnataka': {
    'Bangalore': ['Apollo Hospital, Bangalore', 'Manipal Hospital', 'Fortis Hospital', 'Other'],
    'Mysore': ['Apollo BGS Hospital', 'JSS Hospital', 'Other'],
    'Mangalore': ['KMC Hospital', 'AJ Hospital', 'Other'],
    'Hubli': ['KIMS Hospital', 'SDM Hospital', 'Other']
  },
  'Tamil Nadu': {
    'Chennai': ['Apollo Hospital, Chennai', 'Fortis Malar Hospital', 'Global Hospital', 'Other'],
    'Coimbatore': ['PSG Hospitals', 'Kovai Medical Center', 'Other'],
    'Madurai': ['Apollo Hospital, Madurai', 'Meenakshi Mission Hospital', 'Other'],
    'Salem': ['SKS Hospital', 'Manipal Hospital Salem', 'Other']
  },
  'Kerala': {
    'Thiruvananthapuram': ['KIMS Hospital', 'Ananthapuri Hospital', 'SK Hospital', 'Other'],
    'Kochi': ['Amrita Hospital', 'Lakeshore Hospital', 'Medical Trust Hospital', 'Other'],
    'Kozhikode': ['MIMS Hospital', 'Baby Memorial Hospital', 'IQRAA Hospital', 'Other'],
    'Thrissur': ['Jubilee Mission Hospital', 'West Fort Hospital', 'Elite Hospital', 'Other']
  }
}

export default function DoctorSignup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    doctorId: '',
    aadhaarNo: '',
    specialization: '',
    numberOfHospitals: '1',
    password: '',
    confirmPassword: ''
  })

  // Array to store multiple hospital selections
  const [hospitalSelections, setHospitalSelections] = useState<HospitalSelection[]>([
    { state: '', district: '', hospital: '', customHospital: '' }
  ])

  // Handle number of hospitals change
  const handleNumberOfHospitalsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num = parseInt(e.target.value)
    setHospitalSelections(prev => {
      if (num > prev.length) {
        return [...prev, ...Array(num - prev.length).fill({ state: '', district: '', hospital: '', customHospital: '' })]
      }
      return prev.slice(0, num)
    })
    handleChange(e)
  }

  // Handle hospital selection changes
  const handleHospitalSelectionChange = (index: number, field: keyof HospitalSelection, value: string) => {
    setHospitalSelections(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      // Reset dependent fields
      if (field === 'state') {
        updated[index].district = ''
        updated[index].hospital = ''
        updated[index].customHospital = ''
      } else if (field === 'district') {
        updated[index].hospital = ''
        updated[index].customHospital = ''
      } else if (field === 'hospital' && value !== 'Other') {
        updated[index].customHospital = ''
      }
      return updated
    })
  }

  // Get districts for a state
  const getDistricts = (state: string): string[] => {
    return state ? Object.keys(hospitalsByLocation[state] || {}) : []
  }

  // Get hospitals for a district
  const getHospitals = (state: string, district: string): string[] => {
    return state && district ? hospitalsByLocation[state]?.[district] || [] : []
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.aadhaarNo.length !== 12) {
      setError('Aadhaar number must be 12 digits')
      return
    }

    if (formData.phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits')
      return
    }

    // Add your signup logic here
    console.log('Signup data:', formData)
    router.push('/doctors/login')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Validation for number-only fields
    if (name === 'aadhaarNo' || name === 'phoneNumber') {
      if (!/^\d*$/.test(value)) return // Only allow digits
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Extended specialization options
  const specializations = [
    'Anesthesiology',
    'Cardiology',
    'Cardiothoracic Surgery',
    'Dermatology',
    'Emergency Medicine',
    'Endocrinology',
    'ENT (Otolaryngology)',
    'Family Medicine',
    'Gastroenterology',
    'General Medicine',
    'General Surgery',
    'Geriatric Medicine',
    'Gynecology',
    'Hematology',
    'Internal Medicine',
    'Nephrology',
    'Neurology',
    'Neurosurgery',
    'Nuclear Medicine',
    'Obstetrics & Gynecology',
    'Oncology',
    'Ophthalmology',
    'Orthopedics',
    'Pediatrics',
    'Plastic Surgery',
    'Psychiatry',
    'Pulmonology',
    'Radiology',
    'Rheumatology',
    'Urology',
    'Vascular Surgery'
  ]

  const [error, setError] = useState('')

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4] py-8">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4">
            <Image
              src="/medib.jpg"
              alt="MediConnect Logo"
              width={128}
              height={128}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Doctor Sign Up</h1>
          <p className="text-[#04282E] mt-2">Create your doctor account</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#04282E]">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#04282E]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#04282E]">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={10}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Enter your 10-digit phone number"
              />
            </div>

            <div>
              <label htmlFor="doctorId" className="block text-sm font-medium text-[#04282E]">
                Doctor ID
              </label>
              <input
                type="text"
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Enter your doctor ID"
              />
            </div>

            <div>
              <label htmlFor="aadhaarNo" className="block text-sm font-medium text-[#04282E]">
                Aadhaar Number
              </label>
              <input
                type="text"
                id="aadhaarNo"
                name="aadhaarNo"
                value={formData.aadhaarNo}
                onChange={handleChange}
                maxLength={12}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Enter your 12-digit Aadhaar number"
              />
            </div>

            <div>
              <label htmlFor="specialization" className="block text-sm font-medium text-[#04282E]">
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                         text-[#04282E]"
                required
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="numberOfHospitals" className="block text-sm font-medium text-[#04282E]">
                Number of Hospitals
              </label>
              <select
                id="numberOfHospitals"
                name="numberOfHospitals"
                value={formData.numberOfHospitals}
                onChange={handleNumberOfHospitalsChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num} Hospital{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            {/* Hospital Selection Forms */}
            {hospitalSelections.map((selection, index) => (
              <div key={index} className="space-y-4 p-4 border border-[#E0E0E0] rounded-lg mt-4">
                <h3 className="font-medium text-[#04282E]">Hospital {index + 1}</h3>
                
                <div>
                  <label className="block text-sm font-medium text-[#04282E]">State</label>
                  <select
                    value={selection.state}
                    onChange={(e) => handleHospitalSelectionChange(index, 'state', e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    required
                  >
                    <option value="">Select State</option>
                    {Object.keys(hospitalsByLocation).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#04282E]">District</label>
                  <select
                    value={selection.district}
                    onChange={(e) => handleHospitalSelectionChange(index, 'district', e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    required
                    disabled={!selection.state}
                  >
                    <option value="">Select District</option>
                    {getDistricts(selection.state).map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#04282E]">Hospital</label>
                  <select
                    value={selection.hospital}
                    onChange={(e) => handleHospitalSelectionChange(index, 'hospital', e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                    required
                    disabled={!selection.district}
                  >
                    <option value="">Select Hospital</option>
                    {getHospitals(selection.state, selection.district).map(hospital => (
                      <option key={hospital} value={hospital}>{hospital}</option>
                    ))}
                  </select>
                </div>

                {selection.hospital === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-[#04282E]">Custom Hospital Name</label>
                    <input
                      type="text"
                      value={selection.customHospital}
                      onChange={(e) => handleHospitalSelectionChange(index, 'customHospital', e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                      placeholder="Enter hospital name"
                      required
                    />
                  </div>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#04282E]">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Create a password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#04282E]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#0D6C7E] hover:bg-[#08505D] 
                       text-white rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <div className="text-[#04282E]">
              <span>Already have an account? </span>
              <a 
                href="/doctors/login" 
                className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
              >
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 