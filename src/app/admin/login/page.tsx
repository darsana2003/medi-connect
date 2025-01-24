'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import Toast from '@/components/Toast'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/lib/firebase/config'

export default function AdminLogin() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospitalName: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(formData.email, formData.password, 'admin')
      
      // Verify user exists in web_admin_users collection
      const userDoc = await getDoc(doc(db, 'web_admin_users', auth.currentUser!.uid))
      if (!userDoc.exists()) {
        throw new Error('Admin account not found')
      }
      
      setToast({
        message: 'Login successful! Redirecting...',
        type: 'success'
      })
      
      setTimeout(() => {
        router.replace('/admin/dashboard')
      }, 1500)
    } catch (error: any) {
      setToast({
        message: error.message || 'Failed to login',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Image
            src="/LOGO_NO_BG.png"
            alt="MediConnect Logo"
            width={100}
            height={100}
            priority
            className="object-contain"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Admin Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">
                Hospital Name
              </label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D6C7E] hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E]"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm">
              <Link href="/admin/forgot-password" className="text-[#0D6C7E] hover:text-[#0A5A6B]">
                Forgot password?
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/admin/register" className="text-[#0D6C7E] hover:text-[#0A5A6B]">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 