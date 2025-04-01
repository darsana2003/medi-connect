'use client'

import { useState } from 'react'
import { FaCheck, FaTimes, FaUserPlus } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

// Mock data for patient requests - reduced to 4 patients
const patientRequests = [
  {
    id: '1',
    patientName: 'Ganga K',
    requestDate: '2023-11-15',
    status: 'Pending',
    email: 'ganga.k@example.com',
    phone: '+91 9876543210',
    doctor: 'Dr. Radha Krishnan'
  },
  {
    id: '2',
    patientName: 'Kavya Biju',
    requestDate: '2023-11-14',
    status: 'Pending',
    email: 'kavya.biju@example.com',
    phone: '+91 9876543211',
    doctor: 'Dr. Pillar S'
  },
  {
    id: '3',
    patientName: 'Menon Sree',
    requestDate: '2023-11-13',
    status: 'Approved',
    email: 'menon.sree@example.com',
    phone: '+91 9876543212',
    doctor: 'Dr. Manmathan K'
  },
  {
    id: '4',
    patientName: 'Ashok Kumar',
    requestDate: '2023-11-12',
    status: 'Rejected',
    email: 'ashok.kumar@example.com',
    phone: '+91 9876543213',
    doctor: 'Dr. Aleena Biju'
  }
]

// Department and doctors data
const departmentDoctors = {
  Cardiology: ['Dr. Radha Krishnan', 'Dr. Thomas T'],
  Pediatrics: ['Dr. Lovely Raj', 'Dr. Aleena Biju'],
  Orthopedics: ['Dr. Pillar S', 'Dr. Manmathan K'],
  General: ['Dr. Alpha M', 'Dr. Beta K']
}

// Function to add patient to PatientList
const addToPatientList = (patient: any) => {
  // Get existing patients from localStorage or initialize empty array
  const existingPatients = JSON.parse(localStorage.getItem('patientList') || '[]')

  // Create new patient object with complete information
  const newPatient = {
    id: `P${existingPatients.length + 1}`,
    name: patient.patientName,
    email: patient.email,
    phone: patient.phone,
    doctorName: patient.doctor,
    department: patient.department,
    lastVisit: patient.requestDate,
    nextVisit: '',
    age: patient.age || '',
    gender: patient.gender || '',
    bloodGroup: '',
    address: '',
    medicalHistory: '',
    status: 'Active',
    appointmentStatus: 'Scheduled'
  }

  // Add new patient to the beginning of the list
  const updatedPatients = [newPatient, ...existingPatients]

  // Save to localStorage
  localStorage.setItem('patientList', JSON.stringify(updatedPatients))

  // Dispatch a custom event to notify PatientList component
  const event = new CustomEvent('patientListUpdated', {
    detail: { newPatient }
  })
  window.dispatchEvent(event)
}

export default function IncomingRequests() {
  const [requests, setRequests] = useState(patientRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [newPatient, setNewPatient] = useState({
    patientName: '',
    aadharId: '',
    department: '',
    doctorName: '',
    email: '',
    contactNumber: '',
    age: '',
    gender: 'Male'
  })

  // Filter requests based on search term
  const filteredRequests = requests.filter(request =>
    request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle approve request
  const handleApprove = (id: string) => {
    const approvedRequest = requests.find(request => request.id === id)
    if (approvedRequest) {
      // Update request status
      setRequests(requests.map(request =>
        request.id === id ? { ...request, status: 'Approved' } : request
      ))

      // Add to patient list
      addToPatientList(approvedRequest)

      // Show success message
      toast.success('Patient request approved and automatically added to Patient List', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#FFFFFF'
        }
      })
    }
  }

  // Handle reject request
  const handleReject = (id: string) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: 'Rejected' } : request
    ))
    toast.error('Request rejected')
  }

  // Handle department change
  const handleDepartmentChange = (department: string) => {
    setNewPatient({
      ...newPatient,
      department,
      doctorName: '' // Reset doctor when department changes
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPatient.patientName || !newPatient.aadharId || !newPatient.department || !newPatient.doctorName) {
      toast.error('Please fill in all required fields')
      return
    }

    // Add to requests
    const newRequest = {
      id: (requests.length + 1).toString(),
      patientName: newPatient.patientName,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      email: newPatient.email,
      phone: newPatient.contactNumber,
      doctor: newPatient.doctorName,
      department: newPatient.department,
      age: newPatient.age,
      gender: newPatient.gender
    }
    setRequests([newRequest, ...requests])

    // Reset form and close modal
    setNewPatient({
      patientName: '',
      aadharId: '',
      department: '',
      doctorName: '',
      email: '',
      contactNumber: '',
      age: '',
      gender: 'Male'
    })
    setShowRegistrationModal(false)
    toast.success('Patient registration request submitted')
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Patient Requests</h2>
        <button
          onClick={() => setShowRegistrationModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6B] transition-colors"
        >
          <FaUserPlus className="h-5 w-5" />
          <span>New Patient Registration</span>
        </button>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">New Patient Registration</h3>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient Name*</label>
                <input
                  type="text"
                  value={newPatient.patientName}
                  onChange={(e) => setNewPatient({ ...newPatient, patientName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Aadhar ID*</label>
                <input
                  type="text"
                  value={newPatient.aadharId}
                  onChange={(e) => setNewPatient({ ...newPatient, aadharId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department*</label>
                <select
                  value={newPatient.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                  required
                >
                  <option value="">Select Department</option>
                  {Object.keys(departmentDoctors).map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor*</label>
                <select
                  value={newPatient.doctorName}
                  onChange={(e) => setNewPatient({ ...newPatient, doctorName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                  required
                  disabled={!newPatient.department}
                >
                  <option value="">Select Doctor</option>
                  {newPatient.department && departmentDoctors[newPatient.department].map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  value={newPatient.contactNumber}
                  onChange={(e) => setNewPatient({ ...newPatient, contactNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div className="col-span-2 flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6B]"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by patient name or status..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Patient Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Request Date</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-700">{request.patientName}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{request.requestDate}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.status === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : request.status === 'Rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {request.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  {request.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-2 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                        title="Approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        title="Reject"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {request.status !== 'Pending' && (
                    <span className="text-gray-500 text-xs italic">
                      {request.status === 'Approved' ? 'Approved' : 'Rejected'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No requests found</p>
        </div>
      )}
    </div>
  )
} 