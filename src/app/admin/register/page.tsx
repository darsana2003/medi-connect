'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

export default function AdminRegistration() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    hospitalName: '',
    state: '',
    district: '',
    adminId: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      // Store additional admin data in Firestore
      await setDoc(doc(db, 'admins', userCredential.user.uid), {
        hospitalName: formData.hospitalName,
        state: formData.state,
        district: formData.district,
        adminId: formData.adminId,
        email: formData.email,
        role: "admin",
        createdAt: new Date().toISOString(),
      })

      router.push('/admin/login')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-40 h-40 relative"> {/* Container for the logo */}
            <Image
              src="/LOGO_NO_BG.png"
              alt="MediConnect Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-black">
          Admin Registration
        </h2>
        <p className="mt-2 text-center text-sm text-black">
          Create your MediConnect account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="hospitalName" className="block text-sm font-medium text-black">
                Hospital Name
              </label>
              <input
                id="hospitalName"
                name="hospitalName"
                type="text"
                required
                placeholder="Enter hospital name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-black">
                State
              </label>
              <select
                id="state"
                name="state"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            <div>
              <label htmlFor="district" className="block text-sm font-medium text-black">
                District
              </label>
              <select
                id="district"
                name="district"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              >
                <option value="">Select District</option>
                {formData.state === "Kerala" && (
                  <>
                    <option value="Alappuzha">Alappuzha</option>
                    <option value="Ernakulam">Ernakulam</option>
                    <option value="Idukki">Idukki</option>
                    <option value="Kannur">Kannur</option>
                    <option value="Kasaragod">Kasaragod</option>
                    <option value="Kollam">Kollam</option>
                    <option value="Kottayam">Kottayam</option>
                    <option value="Kozhikode">Kozhikode</option>
                    <option value="Malappuram">Malappuram</option>
                    <option value="Palakkad">Palakkad</option>
                    <option value="Pathanamthitta">Pathanamthitta</option>
                    <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Wayanad">Wayanad</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label htmlFor="adminId" className="block text-sm font-medium text-black">
                Admin ID
              </label>
              <input
                id="adminId"
                name="adminId"
                type="text"
                required
                placeholder="Enter Admin ID (e.g., ADMIN123)"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.adminId}
                onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Create a password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0D6C7E] hover:bg-[#0A5A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D6C7E] disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-black">
            Already have an account?{' '}
            <Link href="/admin/login" className="font-medium text-[#0D6C7E] hover:text-[#0A5A6B]">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 