'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DoctorForgotPassword() {
  const router = useRouter()
  const [step, setStep] = useState<'verification' | 'otp' | 'newPassword'>('verification')
  const [formData, setFormData] = useState({
    doctorId: '',
    email: ''
  })
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!formData.doctorId || !formData.email) {
      setError('Please fill in all fields')
      return
    }

    // Example verification (replace with your actual verification logic)
    if (formData.doctorId === 'DOC123' && formData.email === 'doctor@example.com') {
      setMessage('Verification successful. OTP has been sent to your email.')
      setStep('otp')
    } else {
      setError('Invalid Doctor ID or email')
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (otp.length !== 6) {
      setError('OTP must be 6 digits')
      return
    }

    // Example OTP verification (replace with your actual verification)
    if (otp === '123456') {
      setStep('newPassword')
    } else {
      setError('Invalid OTP')
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Add your password update logic here
    router.push('/doctors/login')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
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
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Reset Password</h1>
          <p className="text-[#04282E] mt-2">Doctor Account Recovery</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
              {message}
            </div>
          )}

          {step === 'verification' && (
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-[#04282E]">
                  Doctor ID
                </label>
                <input
                  type="text"
                  id="doctorId"
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Enter your Doctor ID"
                  required
                />
                <p className="mt-1 text-xs text-[#ADADAD]">Example: DOC123</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#04282E]">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Enter your registered email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#0D6C7E] hover:bg-[#08505D] 
                         text-white rounded-lg transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Verify & Send OTP
              </button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-[#04282E]">
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                />
                <p className="mt-2 text-sm text-[#ADADAD]">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#0D6C7E] hover:bg-[#08505D] 
                         text-white rounded-lg transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Verify OTP
              </button>
            </form>
          )}

          {step === 'newPassword' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-[#04282E]">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#04282E]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#0D6C7E] hover:bg-[#08505D] 
                         text-white rounded-lg transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Reset Password
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <a 
              href="/doctors/login" 
              className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </main>
  )
} 