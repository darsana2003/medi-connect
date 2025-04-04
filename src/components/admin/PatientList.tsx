/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// Update imports
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
// Add setDoc to imports
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { getAuth } from "firebase/auth";

interface Patient {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  requestDate: string;
  department: string;
  doctorName: string;
  address: string;
  medicalHistory: string;
  status: "Active" | "Inactive" | "Blocked";
  nextVisit: string;
  appointmentStatus: string;
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPatient, setEditPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(loading);

  // Add new state variables for hospital, departments and doctors
  // const [hospitalName, setHospitalName] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [fetchingHospitalData, setFetchingHospitalData] = useState(false);

  // Replace localStorage logic with Firestore fetch
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsRef = collection(db, "patientRequests");
        const snapshot = await getDocs(patientsRef);
        const patientsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Patient[];
        setPatients(patientsList);
      } catch (error) {
        console.error("Error fetching patients:", error);
        toast.error("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();

    // Fetch hospital information for the logged-in admin
    fetchHospitalForAdmin();
  }, []);

  // New function to fetch hospital for the current admin
  const fetchHospitalForAdmin = async () => {
    try {
      setFetchingHospitalData(true);
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        toast.error("You must be logged in");
        return;
      }

      // Get hospital for current admin
      const adminsRef = collection(db, "admins");
      const adminQuery = query(
        adminsRef,
        where("email", "==", currentUser.email)
      );
      const adminSnapshot = await getDocs(adminQuery);

      if (adminSnapshot.empty) {
        toast.error("Admin not found");
        return;
      }

      const adminData = adminSnapshot.docs[0].data();
      const hospital = adminData.hospitalName;
      // setHospitalName(hospital);

      // Fetch departments for this hospital
      await fetchDepartments(hospital);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    } finally {
      setFetchingHospitalData(false);
    }
  };

  // New function to fetch departments
  const fetchDepartments = async (hospital: string) => {
    try {
      const hospitalRef = doc(db, "hospitals", hospital);
      const hospitalDoc = await getDoc(hospitalRef);

      if (hospitalDoc.exists()) {
        const hospitalData = hospitalDoc.data();

        // Get departments
        const departmentsMap = hospitalData.departments || {};
        const departmentsArray = Object.keys(departmentsMap).map((id) => ({
          id,
          name: departmentsMap[id].name,
        }));
        setDepartments(departmentsArray);

        // Get doctors
        const doctorsMap = hospitalData.doctors || {};
        const doctorsArray = Object.keys(doctorsMap).map((id) => ({
          id,
          name: doctorsMap[id].name,
          specialization: doctorsMap[id].specialization,
        }));
        setDoctors(doctorsArray);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      (patient.patientName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (patient.doctorName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (patient.department?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (patient.status?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewModalOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setEditPatient({ ...patient });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (editPatient) {
      try {
        const patientRef = doc(db, "patientRequests", editPatient.id);
        const patientData = {
          patientName: editPatient.patientName || "",
          age: editPatient.age || 0,
          gender: editPatient.gender || "Other",
          phone: editPatient.phone || "",
          email: editPatient.email || "",
          address: editPatient.address || "",
          department: editPatient.department || "",
          doctorName: editPatient.doctorName || "",
          medicalHistory: editPatient.medicalHistory || "",
          status: editPatient.status || "Active",
          requestDate: editPatient.requestDate || new Date().toISOString(),
          nextVisit: editPatient.nextVisit || "",
          appointmentStatus: editPatient.appointmentStatus || "Scheduled",
        };

        await updateDoc(patientRef, patientData);

        setPatients(
          patients.map((p) => (p.id === editPatient.id ? editPatient : p))
        );
        setIsEditModalOpen(false);
        toast.success("Patient details updated successfully");

        // Refresh the patient list
        const patientsRef = collection(db, "patientRequests");
        const snapshot = await getDocs(patientsRef);
        const patientsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Patient[];
        setPatients(patientsList);
      } catch (error) {
        console.error("Error updating patient:", error);
        toast.error("Failed to update patient details");
      }
    }
  };

  // Filter doctors based on selected department
  const getDoctorsByDepartment = () => {
    if (!editPatient?.department) return doctors;
    return doctors.filter(
      (doctor) => doctor.specialization === editPatient.department
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Patient Lists</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0D6C7E] text-black placeholder-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-3 text-black" />
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <p className="text-black">No patients found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="text-black">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(patient)}
                        className="text-black hover:text-[#0D6C7E] bg-blue-100 px-2 py-1 rounded"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="text-black hover:text-[#0D6C7E] bg-green-100 px-2 py-1 rounded"
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
              <h3 className="text-xl font-bold text-black">Patient Details</h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-black hover:text-[#0D6C7E]"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-black">Patient ID</p>
                <p className="font-medium text-black">{selectedPatient.id}</p>
              </div>
              <div>
                <p className="text-sm text-black">Name</p>
                <p className="font-medium text-black">
                  {selectedPatient.patientName}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Age</p>
                <p className="font-medium text-black">{selectedPatient.age}</p>
              </div>
              <div>
                <p className="text-sm text-black">Gender</p>
                <p className="font-medium text-black">
                  {selectedPatient.gender}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Contact Number</p>
                <p className="font-medium text-black">
                  {selectedPatient.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Email</p>
                <p className="font-medium text-black">
                  {selectedPatient.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Address</p>
                <p className="font-medium text-black">
                  {selectedPatient.address}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Last Visit</p>
                <p className="font-medium text-black">
                  {selectedPatient.requestDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Department</p>
                <p className="font-medium text-black">
                  {selectedPatient.department}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Doctor</p>
                <p className="font-medium text-black">
                  {selectedPatient.doctorName}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-black">Medical History</p>
                <p className="font-medium text-black">
                  {selectedPatient.medicalHistory}
                </p>
              </div>
              <div>
                <p className="text-sm text-black">Status</p>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedPatient.status === "Active"
                      ? "bg-green-100 text-black"
                      : selectedPatient.status === "Inactive"
                      ? "bg-yellow-100 text-black"
                      : "bg-red-100 text-black"
                  }`}
                >
                  {selectedPatient.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
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
              <h3 className="text-xl font-bold text-black">Edit Patient</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-black hover:text-[#0D6C7E]"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  Name
                </label>
                <input
                  type="text"
                  value={editPatient.patientName}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      patientName: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Age
                </label>
                <input
                  type="number"
                  value={editPatient.age}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      age: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Gender
                </label>
                <select
                  value={editPatient.gender}
                  onChange={(e) =>
                    setEditPatient({ ...editPatient, gender: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Contact Number
                </label>
                <input
                  type="text"
                  value={editPatient.phone}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      phone: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  value={editPatient.email}
                  onChange={(e) =>
                    setEditPatient({ ...editPatient, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Address
                </label>
                <input
                  type="text"
                  value={editPatient.address}
                  onChange={(e) =>
                    setEditPatient({ ...editPatient, address: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Department
                </label>
                <select
                  value={editPatient.department}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      department: e.target.value,
                      doctorName: "", // Reset doctor when department changes
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                  disabled={fetchingHospitalData || departments.length === 0}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {fetchingHospitalData && (
                  <p className="mt-1 text-xs text-gray-500">
                    Loading departments...
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Doctor Name
                </label>
                <select
                  value={editPatient.doctorName}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      doctorName: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                  disabled={fetchingHospitalData || !editPatient.department}
                >
                  <option value="">Select Doctor</option>
                  {getDoctorsByDepartment().map((doctor) => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                {!editPatient.department && (
                  <p className="mt-1 text-xs text-gray-500">
                    Select a department first
                  </p>
                )}
                {fetchingHospitalData && editPatient.department && (
                  <p className="mt-1 text-xs text-gray-500">
                    Loading doctors...
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-black">
                  Medical History
                </label>
                <textarea
                  value={editPatient.medicalHistory}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      medicalHistory: e.target.value,
                    })
                  }
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Status
                </label>
                <select
                  value={editPatient.status}
                  onChange={(e) =>
                    setEditPatient({
                      ...editPatient,
                      status: e.target.value as
                        | "Active"
                        | "Inactive"
                        | "Blocked",
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E] text-black"
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
                className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300"
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
  );
}
