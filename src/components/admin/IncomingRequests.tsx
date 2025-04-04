/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  // getDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import type { Patient } from "../../types/patient";
import { getAuth } from "firebase/auth";

// Mock data for patient requests - reduced to 4 patients
// const patientRequests = [
//   {
//     id: "1",
//     patientName: "Ganga K",
//     requestDate: "2023-11-15",
//     status: "Pending",
//     email: "ganga.k@example.com",
//     phone: "+91 9876543210",
//     doctor: "Dr. Radha Krishnan",
//   },
//   {
//     id: "2",
//     patientName: "Kavya Biju",
//     requestDate: "2023-11-14",
//     status: "Pending",
//     email: "kavya.biju@example.com",
//     phone: "+91 9876543211",
//     doctor: "Dr. Pillar S",
//   },
//   {
//     id: "3",
//     patientName: "Menon Sree",
//     requestDate: "2023-11-13",
//     status: "Approved",
//     email: "menon.sree@example.com",
//     phone: "+91 9876543212",
//     doctor: "Dr. Manmathan K",
//   },
//   {
//     id: "4",
//     patientName: "Ashok Kumar",
//     requestDate: "2023-11-12",
//     status: "Rejected",
//     email: "ashok.kumar@example.com",
//     phone: "+91 9876543213",
//     doctor: "Dr. Aleena Biju",
//   },
// ];

// // Department and doctors data
// const departmentDoctors = {
//   Cardiology: ["Dr. Radha Krishnan", "Dr. Thomas T"],
//   Pediatrics: ["Dr. Lovely Raj", "Dr. Aleena Biju"],
//   Orthopedics: ["Dr. Pillar S", "Dr. Manmathan K"],
//   General: ["Dr. Alpha M", "Dr. Beta K"],
// };

// // Function to add patient to PatientList
// const addToPatientList = (patient: any) => {
//   // Get existing patients from localStorage or initialize empty array
//   const existingPatients = JSON.parse(
//     localStorage.getItem("patientList") || "[]"
//   );

//   // Create new patient object with complete information
//   const newPatient = {
//     id: `P${existingPatients.length + 1}`,
//     name: patient.patientName,
//     email: patient.email,
//     phone: patient.phone,
//     doctorName: patient.doctor,
//     department: patient.department,
//     lastVisit: patient.requestDate,
//     nextVisit: "",
//     age: patient.age || "",
//     gender: patient.gender || "",
//     bloodGroup: "",
//     address: "",
//     medicalHistory: "",
//     status: "Active",
//     appointmentStatus: "Scheduled",
//   };

//   // Add new patient to the beginning of the list
//   const updatedPatients = [newPatient, ...existingPatients];

//   // Save to localStorage
//   localStorage.setItem("patientList", JSON.stringify(updatedPatients));

//   // Dispatch a custom event to notify PatientList component
//   const event = new CustomEvent("patientListUpdated", {
//     detail: { newPatient },
//   });
//   window.dispatchEvent(event);
// };

export default function IncomingRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [aadharId, setAadharId] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState<Partial<Patient> | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  // const [selectedRequestId, setSelectedRequestId] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const requestsCollection = collection(db, "patientRequests");
      const requestsSnapshot = await getDocs(requestsCollection);
      const requestsList = requestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsList);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
    }
  };

  const handlePatientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check users collection first using aadharId
      const usersRef = collection(db, "users");
      const userQuery = query(usersRef, where("adhaarNumber", "==", aadharId));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        // User exists in users collection
        const userData = userSnapshot.docs[0].data();

        // Store user data temporarily without saving to database
        setPatientData({
          ...userData,
          phone: userData.mobileNumber,
          aadharId: aadharId,
          registrationDate: new Date().toISOString(),
          status: "regular",
        });

        // Immediately trigger OTP send
        await handleSendOtp(userData.mobileNumber);

        setShowRegistrationModal(false);
      } else {
        toast.error("No user found with this Aadhar number");
      }
    } catch (error) {
      console.error("Error checking patient:", error);
      toast.error("Failed to check patient details");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (mobileNumber: string) => {
    try {
      setVerificationLoading(true);

      const response = await fetch("http://192.168.1.7:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${mobileNumber}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully");
        setShowOtpModal(true);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientData) return;

    try {
      setVerificationLoading(true);

      const response = await fetch("http://192.168.1.7:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${patientData.phone}`,
          otp: otpValue,
        }),
      });

      const data = await response.json();
      if (data.success) {
        try {
          // After successful verification, save to patientRequests and update hospital
          await savePatientData();
          toast.success("OTP verified and patient registration completed");
          setShowOtpModal(false);
          setOtpValue("");
          fetchRequests();
        } catch (saveError) {
          console.error("Error saving patient data:", saveError);
          toast.error("OTP verified but failed to register patient");
        }
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP");
    } finally {
      setVerificationLoading(false);
    }
  };

  const savePatientData = async () => {
    try {
      // Get current user (hospital admin)
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser || !patientData)
        throw new Error("No user logged in or patient data missing");

      // Get hospital data for the current admin
      const adminsRef = collection(db, "admins");
      const adminQuery = query(
        adminsRef,
        where("email", "==", currentUser.email)
      );
      const adminSnapshot = await getDocs(adminQuery);

      if (adminSnapshot.empty) {
        throw new Error("Admin not found");
      }

      const adminData = adminSnapshot.docs[0].data();
      const hospitalName = adminData.hospitalName;

      // Create patient name from available fields
      const patientName =
        patientData.name ||
        patientData.fullName ||
        (patientData.firstName && patientData.lastName
          ? `${patientData.firstName} ${patientData.lastName}`
          : "Unknown Patient");

      // Save to patientRequests with hospital info
      const incomingPatientsRef = collection(db, "patientRequests");
      const newRequest = await addDoc(incomingPatientsRef, {
        patientName: patientName,
        name: patientName,
        email: patientData.email || "",
        phone: patientData.phone || "",
        aadharId: patientData.aadharId || "",
        hospitalName: hospitalName,
        hospitalId: adminData.hospitalId || "",
        status: "Approved",
        requestDate: new Date().toISOString(),
        gender: patientData.gender || "",
        age: patientData.age || 0,
        address: patientData.address || "",
        registrationDate:
          patientData.registrationDate || new Date().toISOString(),
      });

      // Update hospital's patients map
      const hospitalRef = doc(db, "hospitals", hospitalName);
      const aadharIdToUse = patientData.aadharId || "";

      if (aadharIdToUse) {
        await updateDoc(hospitalRef, {
          [`patients.${aadharIdToUse}`]: {
            patientId: newRequest.id,
            name: patientName,
            aadharId: aadharIdToUse,
            registrationDate: new Date().toISOString(),
            status: "active",
          },
        });
      }

      return true;
    } catch (error) {
      console.error("Error saving patient data:", error);
      toast.error(
        `Failed to save patient data: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      throw error;
    }
  };

  // Handle reject request
  const handleReject = (id: string) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
    toast.error("Request rejected");
  };

  // Handle department change
  // const handleDepartmentChange = (department: string) => {
  //   setPatientData({
  //     ...patientData,
  //     department,
  //     doctorName: "", // Reset doctor when department changes
  //   });
  // };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !patientData?.name ||
      !patientData?.id ||
      !patientData?.department ||
      !patientData?.doctorName
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Add to requests
    const newRequest = {
      id: (requests.length + 1).toString(),
      patientName: patientData?.name || "",
      requestDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      email: patientData?.email || "",
      phone: patientData?.phone || "",
      doctor: patientData?.doctorName || "",
      department: patientData?.department || "",
      age: patientData?.age || "",
      gender: patientData?.gender || "",
    };
    setRequests([newRequest, ...requests]);

    // Reset form and close modal
    setPatientData({
      name: "",
      aadharId: "",
      department: "",
      doctorName: "",
      email: "",
      phone: "",
      age: 0,
      gender: "Male",
    });
    setShowRegistrationModal(false);
    toast.success("Patient registration request submitted");
  };

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
              <h3 className="text-xl font-bold text-black">
                New Patient Registration
              </h3>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="text-black hover:text-[#0D6C7E]"
              >
                ×
              </button>
            </div>

            {!patientData ? (
              <form onSubmit={handlePatientSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black">
                    Aadhar Number
                  </label>
                  <input
                    type="text"
                    value={aadharId}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 12);
                      setAadharId(value);
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                    placeholder="Enter 12-digit Aadhar number"
                    pattern="\d{12}"
                    maxLength={12}
                    title="Please enter a valid 12-digit Aadhar number"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Format: XXXX XXXX XXXX (12 digits)
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading || aadharId.length !== 12}
                  className="w-full bg-[#0D6C7E] text-white py-2 rounded-md hover:bg-[#0A5A6B] disabled:opacity-50"
                >
                  {loading ? "Checking..." : "Check Patient"}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0D6C7E]"
          value={""}
          onChange={(e) => {
            // TODO: Implement search functionality
            console.log("Search term changed:", e.target.value);
          }}
        />
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-black">
                Patient Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-black">
                Request Date
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-black">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-black">
                  {request.patientName}
                </td>
                <td className="py-3 px-4 text-sm text-black">
                  {request.requestDate}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      request.status === "Approved"
                        ? "bg-green-100 text-black"
                        : request.status === "Rejected"
                        ? "bg-red-100 text-black"
                        : "bg-yellow-100 text-black"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  {request.status === "Pending" && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-2 py-1 bg-red-100 text-black rounded hover:bg-red-200 transition-colors"
                        title="Reject"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {request.status !== "Pending" && (
                    <span className="text-black text-xs italic">
                      {request.status === "Approved" ? "Approved" : "Rejected"}
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
          <p className="text-black">No requests found</p>
        </div>
      )}

      {showOtpModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-black">Verify OTP</h3>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-black hover:text-[#0D6C7E]"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) =>
                    setOtpValue(e.target.value.replace(/\D/g, ""))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder-gray-500 focus:border-[#0D6C7E] focus:outline-none focus:ring-[#0D6C7E]"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={verificationLoading || otpValue.length !== 6}
                className="w-full bg-[#0D6C7E] text-white py-2 rounded-md hover:bg-[#0A5A6B] disabled:opacity-50"
              >
                {verificationLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
