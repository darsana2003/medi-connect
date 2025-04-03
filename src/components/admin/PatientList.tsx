'use client'

// Update imports
import { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { FaSearch, FaEdit, FaEye } from 'react-icons/fa'
// Add setDoc to imports
import { collection, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'

interface Patient {
  id: string
  fullName: string
  age: number
  gender: string
  contactNumber: string
  email: string
  lastVisit: string
  department: string
  doctorName: string
  address: string
  medicalHistory: string
  status: 'Active' | 'Inactive' | 'Blocked'
  nextVisit: string
  appointmentStatus: string
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editPatient, setEditPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)

  // Replace localStorage logic with Firestore fetch
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsRef = collection(db, 'patients')
        const snapshot = await getDocs(patientsRef)
        const patientsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Patient[]
        setPatients(patientsList)
      } catch (error) {
        console.error('Error fetching patients:', error)
        toast.error('Failed to load patients')
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [])

  // Remove localStorage event listener useEffect as it's no longer needed

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    (patient.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (patient.doctorName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (patient.department?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (patient.status?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsViewModalOpen(true)
  }

  const handleEdit = (patient: Patient) => {
    setEditPatient({ ...patient })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = async () => {
    if (editPatient) {
      try {
        const patientRef = doc(db, 'patients', editPatient.id)
        const patientData = {
          fullName: editPatient.fullName || '',
          age: editPatient.age || 0,
          gender: editPatient.gender || 'Other',
          contactNumber: editPatient.contactNumber || '',
          email: editPatient.email || '',
          address: editPatient.address || '',
          department: editPatient.department || '',
          doctorName: editPatient.doctorName || '',
          medicalHistory: editPatient.medicalHistory || '',
          status: editPatient.status || 'Active',
          lastVisit: editPatient.lastVisit || new Date().toISOString(),
          nextVisit: editPatient.nextVisit || '',
          appointmentStatus: editPatient.appointmentStatus || 'Scheduled'
        }

        // Use updateDoc instead of setDoc to only update existing documents
        await updateDoc(patientRef, patientData)

        // Update local state and close modal
        setPatients(patients.map(p => p.id === editPatient.id ? editPatient : p))
        setIsEditModalOpen(false)
        toast.success('Patient details updated successfully')
        
        // Refresh the patient list
        const patientsRef = collection(db, 'patients')
        const snapshot = await getDocs(patientsRef)
        const patientsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Patient[]
        setPatients(patientsList)
      } catch (error) {
        console.error('Error updating patient:', error)
        toast.error('Failed to update patient details')
      }
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Patient Lists</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.lastVisit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{patient.doctorName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(patient)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-100 px-2 py-1 rounded"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-green-600 hover:text-green-900 bg-green-100 px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Patient Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Patient ID</p>
                <p className="font-medium">{selectedPatient.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{selectedPatient.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{selectedPatient.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{selectedPatient.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{selectedPatient.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{selectedPatient.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{selectedPatient.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Visit</p>
                <p className="font-medium">{selectedPatient.lastVisit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{selectedPatient.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{selectedPatient.doctorName}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Medical History</p>
                <p className="font-medium">{selectedPatient.medicalHistory}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedPatient.status === 'Active' ? 'bg-green-100 text-green-800' :
                  selectedPatient.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {selectedPatient.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editPatient && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Edit Patient</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editPatient.fullName}
                  onChange={(e) => setEditPatient({ ...editPatient, fullName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={editPatient.age}
                  onChange={(e) => setEditPatient({ ...editPatient, age: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={editPatient.gender}
                  onChange={(e) => setEditPatient({ ...editPatient, gender: e.target.value })}
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
                  type="text"
                  value={editPatient.contactNumber}
                  onChange={(e) => setEditPatient({ ...editPatient, contactNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editPatient.email}
                  onChange={(e) => setEditPatient({ ...editPatient, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={editPatient.address}
                  onChange={(e) => setEditPatient({ ...editPatient, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  value={editPatient.department}
                  onChange={(e) => setEditPatient({ ...editPatient, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
                <input
                  type="text"
                  value={editPatient.doctorName}
                  onChange={(e) => setEditPatient({ ...editPatient, doctorName: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Medical History</label>
                <textarea
                  value={editPatient.medicalHistory}
                  onChange={(e) => setEditPatient({ ...editPatient, medicalHistory: e.target.value })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editPatient.status}
                  onChange={(e) => setEditPatient({ ...editPatient, status: e.target.value as 'Active' | 'Inactive' | 'Blocked' })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-[#0D6C7E] text-white rounded-md hover:bg-[#0A5A6B]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}