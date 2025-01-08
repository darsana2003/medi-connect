'use client'

import { useState } from 'react'

type Request = {
  id: string
  patientName: string
  requestDate: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

export default function IncomingRequests() {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 'REQ001',
      patientName: 'John Smith',
      requestDate: '2024-01-04',
      status: 'Pending'
    },
    {
      id: 'REQ002',
      patientName: 'Emily Johnson',
      requestDate: '2024-01-03',
      status: 'Approved'
    },
    {
      id: 'REQ003',
      patientName: 'Michael Brown',
      requestDate: '2024-01-03',
      status: 'Pending'
    }
  ])

  const handleApprove = (id: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Approved' } : request
      )
    )
  }

  const handleReject = (id: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Rejected' } : request
      )
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Incoming Requests
      </h2>

      {/* Table Header */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-500">
          <div>PATIENT NAME</div>
          <div>REQUEST DATE</div>
          <div>STATUS</div>
          <div>ACTIONS</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {requests.map((request) => (
          <div key={request.id} className="grid grid-cols-4 gap-4 px-6 py-4 items-center">
            <div className="text-sm font-medium text-gray-900">
              {request.patientName}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(request.requestDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'}`}>
                {request.status}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleApprove(request.id)}
                className={`px-3 py-1 text-sm rounded ${
                  request.status === 'Approved' ? 'bg-gray-400' : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={request.status === 'Approved'}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(request.id)}
                className={`px-3 py-1 text-sm rounded ${
                  request.status === 'Rejected' ? 'bg-gray-400' : 'bg-red-600 text-white hover:bg-red-700'
                }`}
                disabled={request.status === 'Rejected'}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 