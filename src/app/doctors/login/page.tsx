'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function DoctorLogin() {
  const router = useRouter()
  const [doctorId, setDoctorId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic validation
    if (!doctorId || !password) {
      setError('Please fill in all fields')
      return
    }

    // Example doctor credentials (replace with your actual authentication logic)
    if (doctorId === 'DOC123' && password === 'password123') {
      router.push('/doctors/dashboard')
    } else {
      setError('Invalid doctor ID or password')
    }
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
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Doctor Login</h1>
          <p className="text-[#04282E] mt-2">Please enter your credentials</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="doctorId" className="block text-sm font-medium text-[#04282E]">
                Doctor ID
              </label>
              <input
                type="text"
                id="doctorId"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                         text-[#04282E] placeholder-[#ADADAD]"
                placeholder="Enter your Doctor ID (e.g., DOC123)"
                required
              />
              <p className="mt-1 text-xs text-[#ADADAD]">Example ID: DOC123</p>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#04282E]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                         text-[#04282E] placeholder-[#ADADAD]"
                placeholder="Enter your password"
                required
              />
              <p className="mt-1 text-xs text-[#ADADAD]">Example password: password123</p>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#0D6C7E] hover:bg-[#08505D] 
                       text-white rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <a 
              href="#" 
              className="text-sm text-[#F4A261] hover:text-[#E76F51] transition-colors duration-200"
            >
              Forgot password?
            </a>
            <div className="text-[#04282E]">
              <span>New doctor? </span>
              <a 
                href="/doctors/signup" 
                className="text-[#0D6C7E] hover:text-[#08505D] font-medium"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 