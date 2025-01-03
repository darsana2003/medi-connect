'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LogoutPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Clear any stored authentication data
    localStorage.removeItem('doctorName')
    localStorage.removeItem('doctorId')
    localStorage.removeItem('hospitalName')

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    // Redirect to login page after 5 seconds
    const timer = setTimeout(() => {
      router.replace('/doctors/login')
    }, 5000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdownInterval)
    }
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          <div className="w-24 h-24 mx-auto mb-6">
            <Image
              src="/medib.jpg"
              alt="MediConnect Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <svg 
                className="w-8 h-8 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-3xl font-bold text-green-600 mb-3">
                Logout Successful!
              </h2>
              <p className="text-green-700 text-lg">
                You have been safely logged out of your account
              </p>
            </div>

            <p className="text-[#04282E] font-medium text-lg">
              Redirecting to login page in {countdown} seconds...
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 border-4 border-[#0D6C7E] border-t-transparent rounded-full animate-spin"></div>
          </div>

          <div className="text-sm text-gray-500">
            If you are not redirected, {' '}
            <button 
              onClick={() => router.replace('/doctors/login')}
              className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
            >
              click here
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 