"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import {
  getDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
  // Timestamp,
} from "firebase/firestore";

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  time: string;
  reason: string;
  status: "upcoming" | "completed" | "cancelled";
  date: Date;
}

interface DoctorInfo {
  name: string;
  hospital: string;
  specialization: string;
  email: string;
}

export default function DoctorDashboard() {
  const router = useRouter();
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: "",
    hospital: "",
    specialization: "",
    email: "",
  });
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/doctors/login");
        return;
      }

      const fetchDoctorData = async () => {
        try {
          setLoading(true);

          // Fetch doctor info
          const doctorDoc = await getDoc(doc(db, "doctors", user.uid));
          if (doctorDoc.exists()) {
            const data = doctorDoc.data();
            const doctorInfo = {
              name: data?.name || "",
              hospital: data?.hospital || "",
              specialization: data?.specialization || "",
              email: data?.email || "",
            };

            setDoctorInfo(doctorInfo);

            // After getting doctor info, fetch appointments
            await fetchPatientRequests(doctorInfo.name, doctorInfo.hospital);
          } else {
            console.error("Doctor document doesn't exist");
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDoctorData();
    });

    return () => unsubscribe();
  }, [router]);

  const fetchPatientRequests = async (
    doctorName: string,
    hospitalName: string
  ) => {
    try {
      console.log("Fetching patient requests for:", {
        doctorName,
        hospitalName,
      });

      if (!doctorName || !hospitalName) {
        console.error("Missing doctor name or hospital name");
        return;
      }

      // Query patientRequests collection
      const patientRequestsRef = collection(db, "patientRequests");

      // First try with exact doctorName match
      const requestsQuery = query(
        patientRequestsRef,
        where("doctorName", "==", doctorName)
      );

      const requestsSnapshot = await getDocs(requestsQuery);
      console.log(
        `Found ${requestsSnapshot.size} requests with doctor name match`
      );

      if (requestsSnapshot.empty) {
        // Try with hospital match if no results with doctor name
        const hospitalQuery = query(
          patientRequestsRef,
          where("hospitalName", "==", hospitalName)
        );

        const hospitalSnapshot = await getDocs(hospitalQuery);
        console.log(
          `Found ${hospitalSnapshot.size} requests with hospital match`
        );

        const appointments: Appointment[] = [];

        hospitalSnapshot.forEach((doc) => {
          const data = doc.data();

          // Convert request to appointment format
          appointments.push({
            id: doc.id,
            patientId: doc.id,
            patientName: data.patientName || data.name || "Unknown Patient",
            time: formatTime(
              data.requestDate ? new Date(data.requestDate) : new Date()
            ),
            reason: data.reason || "Consultation",
            status: "upcoming",
            date: data.requestDate ? new Date(data.requestDate) : new Date(),
          });
        });

        setTodayAppointments(appointments);
      } else {
        // Process doctor name matched requests
        const appointments: Appointment[] = [];

        requestsSnapshot.forEach((doc) => {
          const data = doc.data();

          appointments.push({
            id: doc.id,
            patientId: doc.id,
            patientName: data.patientName || data.name || "Unknown Patient",
            time: formatTime(
              data.requestDate ? new Date(data.requestDate) : new Date()
            ),
            reason: data.reason || "Consultation",
            status: "upcoming",
            date: data.requestDate ? new Date(data.requestDate) : new Date(),
          });
        });

        setTodayAppointments(appointments);
      }

      // If still no appointments found, make a more general query
      if (todayAppointments.length === 0) {
        console.log("No appointments found, trying general query");
        const allRequestsSnapshot = await getDocs(patientRequestsRef);

        const appointments: Appointment[] = [];

        allRequestsSnapshot.forEach((doc) => {
          const data = doc.data();

          // Include all patient requests as possible appointments
          appointments.push({
            id: doc.id,
            patientId: doc.id,
            patientName: data.patientName || data.name || "Unknown Patient",
            time: formatTime(
              data.requestDate ? new Date(data.requestDate) : new Date()
            ),
            reason: data.reason || "Consultation",
            status: "upcoming",
            date: data.requestDate ? new Date(data.requestDate) : new Date(),
          });
        });

        setTodayAppointments(appointments);
      }
    } catch (error) {
      console.error("Error fetching patient requests:", error);
    }
  };

  // Helper function to format time
  const formatTime = (timeOrDate: string | Date) => {
    if (typeof timeOrDate === "string") {
      // If it's already a formatted time string, return it
      if (
        timeOrDate.includes(":") &&
        (timeOrDate.includes("AM") || timeOrDate.includes("PM"))
      ) {
        return timeOrDate;
      }
      // Try to parse the string to date
      const parsedDate = new Date(timeOrDate);
      return parsedDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      // It's a Date object
      return timeOrDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/doctors/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewPatientRecords = (patientId: string) => {
    try {
      router.push(`/doctors/patient-records/${patientId}`);
    } catch (error) {
      console.error("Error navigating to patient records:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative w-[40px] h-[40px] flex-shrink-0">
                <Image
                  src="/medib.png"
                  alt="MediConnect Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0D6C7E]">
                  Welcome, {doctorInfo.name}
                </h1>
                <p className="text-[#04282E]">{doctorInfo.hospital}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="text-[#0D6C7E] hover:text-[#0A5A6A] font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E0E0] p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0D6C7E]">
              Welcome back, {doctorInfo.name}!
            </h2>
            <p className="text-[#04282E] mt-2">Today is {getCurrentDate()}</p>
            {doctorInfo.specialization && (
              <p className="text-[#04282E] mt-1">
                Department: {doctorInfo.specialization}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#0D6C7E] mb-4">
              Today&apos;s Appointments
            </h3>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-[#ADADAD]">Loading appointments...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white rounded-lg border border-[#E0E0E0] p-4 flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-medium text-[#04282E]">
                          {appointment.patientName}
                        </h4>
                        <p className="text-sm text-[#ADADAD]">
                          {appointment.reason}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-[#04282E] font-medium">
                          {appointment.time}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                        <button
                          onClick={() =>
                            viewPatientRecords(appointment.patientId)
                          }
                          className="text-[#0D6C7E] hover:text-[#08505D] font-medium flex items-center space-x-1"
                        >
                          <span>View Records</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#ADADAD] text-center py-8">
                    No appointments scheduled for today
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push("/doctors/monthly-appointments")}
              className="p-4 bg-[#0D6C7E] hover:bg-[#08505D] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Monthly Appointments</span>
            </button>
            <button
              onClick={() => router.push("/doctors/schedule")}
              className="p-4 bg-[#F4A261] hover:bg-[#E76F51] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Update Schedule</span>
            </button>
            <button
              onClick={() => router.push("/doctors/settings")}
              className="p-4 bg-[#04282E] hover:bg-[#031D22] text-white rounded-lg 
                       transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <span>Settings</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
