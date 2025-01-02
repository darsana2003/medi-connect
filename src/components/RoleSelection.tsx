'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const RoleSelection = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && role) {
      router.push(`/${role.toLowerCase()}`)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setRole('Doctor')}
              className={`flex-1 py-3 px-4 rounded-lg border ${
                role === 'Doctor'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
              }`}
            >
              Doctor
            </button>
            
            <button
              type="button"
              onClick={() => setRole('Admin')}
              className={`flex-1 py-3 px-4 rounded-lg border ${
                role === 'Admin'
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!name || !role}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default RoleSelection 