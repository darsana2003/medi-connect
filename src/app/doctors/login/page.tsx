'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import Toast from '@/components/Toast'

export default function DoctorLogin() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospitalName: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(formData.email, formData.password, 'doctor')
      
      // Store hospital name in localStorage
      localStorage.setItem('hospitalName', formData.hospitalName)
      
      setToast({
        message: 'Login successful! Redirecting...',
        type: 'success'
      })

      setTimeout(() => {
        router.replace('/doctors/dashboard')
      }, 1500)
    } catch (error: any) {
      setToast({
        message: error.message || 'Failed to login',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F4F4F4]">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/medib.png"
            alt="MediConnect Logo"
            width={80}
            height={80}
            className="object-contain mb-4"
          />
          <h1 className="text-3xl font-bold text-[#0D6C7E]">Doctor Login</h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-[#E0E0E0]">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-[#04282E]">
                Hospital Name
              </label>
              <input
                type="text"
                id="hospitalName"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                         text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                placeholder="Enter your hospital name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#04282E]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                         text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#04282E]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="mt-1 block w-full px-4 py-3 border border-[#E0E0E0] rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] focus:border-[#0D6C7E]
                         text-[#04282E] placeholder:text-[#ADADAD] text-base font-medium"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-[#0D6C7E] hover:bg-[#08505D] 
                       text-white rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <a 
              href="/doctors/forgot-password"
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