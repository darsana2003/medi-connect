'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Define state and district data
const stateDistrictData = {
  Kerala: [
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Ernakulam',
    'Thrissur',
    'Palakkad',
    'Malappuram',
    'Kozhikode',
    'Wayanad',
    'Kannur',
    'Kasaragod'
  ],
  Karnataka: [
    'Bengaluru',
    'Mysuru',
    'Mangaluru',
    'Hubli-Dharwad',
    'Belagavi',
    'Kalaburagi',
    'Davanagere',
    'Ballari',
    'Vijayapura',
    'Shivamogga'
  ],
  'Tamil Nadu': [
    'Chennai',
    'Coimbatore',
    'Madurai',
    'Salem',
    'Tiruchirappalli',
    'Tirunelveli',
    'Tiruppur',
    'Vellore',
    'Erode',
    'Thoothukkudi'
  ]
}

export default function AdminRegistration() {
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value
    setSelectedState(state)
    setSelectedDistrict('') // Reset district when state changes
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4">
            <Image
              src="/medib.jpg"
              alt="MediConnect Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-[#0D6C7E] mb-2">Admin Registration</h1>
          <p className="text-gray-600">Create your MediConnect account</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
              Hospital Name
            </label>
            <input
              type="text"
              id="hospitalName"
              name="hospitalName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              placeholder="Enter hospital name"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              required
            >
              <option value="">Select State</option>
              {Object.keys(stateDistrictData).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">
              District
            </label>
            <select
              id="district"
              name="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              required
              disabled={!selectedState}
            >
              <option value="">Select District</option>
              {selectedState &&
                stateDistrictData[selectedState as keyof typeof stateDistrictData].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              name="adminId"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              placeholder="Enter Admin ID (e.g., ADMIN123)"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0D6C7E] text-white py-2 px-4 rounded-md hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:ring-offset-2"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/admin/login" className="text-[#0D6C7E] hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </main>
  )
} 