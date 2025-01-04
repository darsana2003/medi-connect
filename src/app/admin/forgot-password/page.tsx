'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your password reset logic here
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/mediconnect-logo.png"
            alt="MediConnect Logo"
            width={80}
            height={80}
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0D6C7E] focus:border-[#0D6C7E]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D6C7E] hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Send reset instructions
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link
                  href="/admin/login"
                  className="font-medium text-[#0D6C7E] hover:text-[#0A5A6B]"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 