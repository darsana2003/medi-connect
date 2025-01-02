'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function ChangePassword() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (formData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    try {
      // Add your password update logic here
      setMessage('Password updated successfully')
      setTimeout(() => {
        router.push('/doctors/settings')
      }, 2000)
    } catch (err) {
      setError('Failed to update password')
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-[40px] h-[40px] flex-shrink-0">
                <Image
                  src="/medib.png"
                  alt="MediConnect Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl font-bold text-[#0D6C7E]">Change Password</h1>
            </div>
            
            <Link 
              href="/doctors/settings"
              className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
            >
              Back to Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {message && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              <p className="font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#04282E]">
                Current Password
              </label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#04282E]">
                New Password
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#04282E]">
                Confirm New Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-[#0D6C7E] text-white rounded-lg hover:bg-[#08505D]"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 