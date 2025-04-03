'use client'

import { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'

interface Doctor {
  id: string
  name: string
  specialization: string
  experience: number
  contactNumber: string
  email: string
  availability: string
  address: string
  qualification: string
  status: 'Active' | 'On Leave' | 'Terminated'
}

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsCollection = collection(db, 'doctors')
        const doctorsSnapshot = await getDocs(doctorsCollection)
        
        const doctorsList = doctorsSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || '',
            specialization: data.specialization || '',
            experience: data.experience || 0,
            contactNumber: data.contactNumber || '',
            email: data.email || '',
            availability: data.availability || '',
            address: data.address || '',
            qualification: data.qualification || '',
            status: data.status || 'Active'
          } as Doctor
        })
        
        setDoctors(doctorsList)
      } catch (error) {
        console.error('Error fetching doctors:', error)
        toast.error('Failed to load doctors')
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null)

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsViewModalOpen(true)
  }

  const handleEdit = (doctor: Doctor) => {
    setEditDoctor({ ...doctor })
    setIsEditModalOpen(true)
  }

  const handleSaveEdit = async () => {
    if (editDoctor) {
      try {
        const doctorRef = doc(db, 'doctors', editDoctor.id);
        await updateDoc(doctorRef, {
          name: editDoctor.name,
          specialization: editDoctor.specialization,
          experience: editDoctor.experience,
          contactNumber: editDoctor.contactNumber,
          email: editDoctor.email,
          availability: editDoctor.availability,
          address: editDoctor.address,
          qualification: editDoctor.qualification,
          status: editDoctor.status
        });
  
        setDoctors(doctors.map(d => d.id === editDoctor.id ? editDoctor : d));
        setIsEditModalOpen(false);
        toast.success('Doctor details updated successfully');
        
        // Refresh the doctors list
        fetchDoctors();
      } catch (error) {
        console.error('Error updating doctor:', error);
        toast.error('Failed to update doctor details');
      }
    }
  };

  // Move fetchDoctors outside useEffect so it can be reused
  const fetchDoctors = async () => {
    try {
      const doctorsCollection = collection(db, 'doctors');
      const doctorsSnapshot = await getDocs(doctorsCollection);
      
      const doctorsList = doctorsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          specialization: data.specialization || '',
          experience: data.experience || 0,
          contactNumber: data.contactNumber || '',
          email: data.email || '',
          availability: data.availability || '',
          address: data.address || '',
          qualification: data.qualification || '',
          status: data.status || 'Active'
        } as Doctor;
      });
      
      setDoctors(doctorsList);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect to use the extracted fetchDoctors function
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Doctor Lists</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <p className="text-gray-500">Loading doctors...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <p className="text-gray-500">No doctors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Doctor Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Availability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{doctor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{doctor.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">{doctor.availability}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(doctor)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-100 px-2 py-1 rounded"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleEdit(doctor)}
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
      {isViewModalOpen && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-black">Doctor Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Doctor ID</p>
                <p className="font-medium text-black">{selectedDoctor.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-black">{selectedDoctor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-medium text-black">{selectedDoctor.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium text-black">{selectedDoctor.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Qualification</p>
                <p className="font-medium text-black">{selectedDoctor.qualification}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium text-black">{selectedDoctor.contactNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-black">{selectedDoctor.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-black">{selectedDoctor.address}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Availability</p>
                <p className="font-medium text-black">{selectedDoctor.availability}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedDoctor.status === 'Active' ? 'bg-green-100 text-green-800' :
                  selectedDoctor.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {selectedDoctor.status}
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
      {isEditModalOpen && editDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-black">Edit Doctor</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                  type="text"
                  value={editDoctor.name}
                  onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Specialization</label>
                <input
                  type="text"
                  value={editDoctor.specialization}
                  onChange={(e) => setEditDoctor({ ...editDoctor, specialization: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Experience (years)</label>
                <input
                  type="number"
                  value={editDoctor.experience}
                  onChange={(e) => setEditDoctor({ ...editDoctor, experience: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Qualification</label>
                <input
                  type="text"
                  value={editDoctor.qualification}
                  onChange={(e) => setEditDoctor({ ...editDoctor, qualification: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Contact Number</label>
                <input
                  type="text"
                  value={editDoctor.contactNumber}
                  onChange={(e) => setEditDoctor({ ...editDoctor, contactNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  value={editDoctor.email}
                  onChange={(e) => setEditDoctor({ ...editDoctor, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Address</label>
                <input
                  type="text"
                  value={editDoctor.address}
                  onChange={(e) => setEditDoctor({ ...editDoctor, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-black">Availability</label>
                <input
                  type="text"
                  value={editDoctor.availability}
                  onChange={(e) => setEditDoctor({ ...editDoctor, availability: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">Status</label>
                <select
                  value={editDoctor.status}
                  onChange={(e) => setEditDoctor({ ...editDoctor, status: e.target.value as 'Active' | 'On Leave' | 'Terminated' })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                >
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Terminated">Terminated</option>
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