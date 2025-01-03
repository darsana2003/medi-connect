'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [adminId, setAdminId] = useState('')
  const [message, setMessage] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isOtpSent) {
      // First step: Verify admin and send OTP
      setMessage('OTP has been sent to your email address.')
      setIsOtpSent(true)
    } else {
      // Second step: Verify OTP
      if (otp) {
        // Add your OTP verification logic here
        setMessage('OTP verified successfully. You will receive further instructions on your email.')
      } else {
        setMessage('Please enter the OTP')
      }
    }
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
          <h1 className="text-2xl font-bold text-[#0D6C7E] mb-2">Reset Password</h1>
          <p className="text-gray-600">Admin Account Recovery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminId" className="block text-sm font-medium text-gray-700">
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              placeholder="Enter your Admin ID"
              required
              disabled={isOtpSent}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
              placeholder="Enter your email address"
              required
              disabled={isOtpSent}
            />
          </div>

          {isOtpSent && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                placeholder="Enter the OTP sent to your email"
                required
                maxLength={6}
              />
            </div>
          )}

          {message && (
            <div className={`text-sm text-center ${isOtpSent ? 'text-green-600' : 'text-blue-600'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0D6C7E] text-white py-2 px-4 rounded-md hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:ring-offset-2"
          >
            {isOtpSent ? 'Verify OTP' : 'Verify & Send OTP'}
          </button>
        </form>

        {isOtpSent && (
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setOtp('')
                setMessage('OTP has been resent to your email address.')
              }}
              className="text-[#0D6C7E] hover:underline text-sm"
            >
              Resend OTP
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-gray-600">Remember your password? </span>
          <Link href="/admin/login" className="text-[#0D6C7E] hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </main>
  )
} 