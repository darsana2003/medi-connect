'use client'

import { useState, useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import type { Patient } from '../../types/patient'

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
  const [requests, setRequests] = useState<any[]>([])
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)
  const [patientData, setPatientData] = useState<Partial<Patient> | null>(null)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const requestsCollection = collection(db, 'patientRequests')
      const requestsSnapshot = await getDocs(requestsCollection)
      const requestsList = requestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setRequests(requestsList)
    } catch (error) {
      console.error('Error fetching requests:', error)
      toast.error('Failed to load requests')
    }
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check users collection first
      const usersRef = collection(db, 'users')
      const userQuery = query(usersRef, where('phone', '==', phoneNumber))
      const userSnapshot = await getDocs(userQuery)

      // Check patients collection
      const patientsRef = collection(db, 'patients')
      const patientQuery = query(patientsRef, where('phone', '==', phoneNumber))
      const patientSnapshot = await getDocs(patientQuery)

      if (!userSnapshot.empty) {
        // User exists in users collection
        const userData = userSnapshot.docs[0].data()
        
        // Add to incoming patients collection
        const incomingPatientsRef = collection(db, 'patientRequests')
        await addDoc(incomingPatientsRef, {
          ...userData,
          patientName: userData.fullName || '', // Changed from name to fullName
          phone: phoneNumber,
          requestDate: new Date().toISOString(),
          status: 'Pending'
        })

        if (!patientSnapshot.empty) {
          // User exists in both collections, merge the data
          const patientData = patientSnapshot.docs[0].data()
          setPatientData({
            ...userData,
            ...patientData,
            phone: phoneNumber,
            registrationDate: patientData.registrationDate || new Date().toISOString(),
            status: patientData.status || 'regular'
          })
        } else {
          // User exists only in users collection
          setPatientData({
            ...userData,
            phone: phoneNumber,
            registrationDate: new Date().toISOString(),
            status: 'regular'
          })
        }
        toast.success('User found and added to requests')
        setShowRegistrationModal(false)
        fetchRequests() // Refresh the requests list
      } else if (!patientSnapshot.empty) {
        // User exists only in patients collection
        const patientData = patientSnapshot.docs[0].data()
        setPatientData({
          ...patientData,
          phone: phoneNumber
        })
        toast.success('Patient found')
      } else {
        // New user
        setPatientData({
          phone: phoneNumber,
          registrationDate: new Date().toISOString(),
          status: 'regular'
        })
toast('New patient registration', { icon: 'ℹ️' })
      }
    } catch (error) {
      console.error('Error checking patient:', error)
      toast.error('Failed to check patient details')
    } finally {
      setLoading(false)
    }
  }

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientData) return

    try {
      // Generate hospital ID
      const hospitalId = `HC${new Date().getFullYear()}${Math.floor(Math.random() * 10000)}`

      // Create request in patientRequests collection
      const requestRef = await addDoc(collection(db, 'patientRequests'), {
        ...patientData,
        hospitalId,
        status: 'Pending',
        requestDate: new Date().toISOString()
      })

      toast.success('Patient registration request submitted')
      setShowRegistrationModal(false)
      fetchRequests()
    } catch (error) {
      console.error('Error submitting request:', error)
      toast.error('Failed to submit request')
    }
  }

  const handleApprove = async (requestId: string) => {
    try {
      const request = requests.find(r => r.id === requestId)
      if (!request) return

      // Add to patients collection
      await addDoc(collection(db, 'patients'), {
        ...request,
        status: 'regular',
        registrationDate: new Date().toISOString()
      })

      // Update request status
      const requestRef = doc(db, 'patientRequests', requestId)
      await updateDoc(requestRef, { status: 'Approved' })

      toast.success('Patient approved and added to system')
      fetchRequests()
    } catch (error) {
      console.error('Error approving patient:', error)
      toast.error('Failed to approve patient')
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
    setPatientData({
      ...patientData,
      department,
      doctorName: '' // Reset doctor when department changes
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientData?.name || !patientData?.id || !patientData?.department || !patientData?.doctorName) {
      toast.error('Please fill in all required fields')
      return
    }

    // Add to requests
    const newRequest = {
      id: (requests.length + 1).toString(),
      patientName: patientData?.name || '',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      email: patientData?.email || '',
      phone: patientData?.phone || '',
      doctor: patientData?.doctorName || '',
      department: patientData?.department || '',
      age: patientData?.age || '',
      gender: patientData?.gender || ''
    }
    setRequests([newRequest, ...requests])

    // Reset form and close modal
    setPatientData({
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

            {!patientData ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0D6C7E] text-white py-2 rounded-md"
                >
                  {loading ? 'Checking...' : 'Check Patient'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Render form fields based on patientData */}
                {/* ... existing form fields ... */}
              </form>
            )}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by patient name or status..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
          value={''}
          onChange={(e) => {
            // TODO: Implement search functionality
            console.log('Search term changed:', e.target.value)
          }}
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
            {requests.map((request) => (
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

      {requests.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">No requests found</p>
        </div>
      )}
    </div>
  )
}