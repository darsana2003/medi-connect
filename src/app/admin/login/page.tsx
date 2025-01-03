'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminLogin() {
  const router = useRouter()
  const [adminId, setAdminId] = useState('')
  const [password, setPassword] = useState('')
  const [hospitalName, setHospitalName] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!adminId || !password || !hospitalName) {
      setError('Please fill in all fields')
      return
    }

    // In production, this should be replaced with actual authentication
    if (adminId === 'ADMIN123' && password === 'admin123') {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid admin ID or password')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#0D6C7E] mb-2">Admin Login</h1>
          <p className="text-gray-600">Please enter your credentials</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                Hospital Name
              </label>
              <input
                type="text"
                id="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                placeholder="Enter your hospital name"
                required
              />
            </div>

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
                placeholder="Enter your Admin ID (e.g., ADMIN123)"
                required
              />
            <p className="mt-1 text-sm text-gray-500">Example ID: ADMIN123</p>
            </div>

            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500">Example password: admin123</p>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center whitespace-pre-line">
              {error}
            </div>
          )}

            <button
              type="submit"
            className="w-full bg-[#0D6C7E] text-white py-2 px-4 rounded-md hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:ring-offset-2"
            >
              Login
            </button>
          </form>

        <div className="mt-4 text-center">
          <Link href="/admin/forgot-password" className="text-[#0D6C7E] hover:underline">
              Forgot password?
          </Link>
        </div>

        <div className="mt-4 text-center">
          <span className="text-gray-600">New admin? </span>
          <Link href="/admin/register" className="text-[#0D6C7E] hover:underline">
                Create an account
          </Link>
        </div>
      </div>
    </main>
  )
} 