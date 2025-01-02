import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8 bg-[#F4F4F4] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0D6C7E] mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Settings Card */}
        <Link href="/admin/settings">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#0D6C7E]/10">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-2">Settings</h2>
            <p className="text-[#04282E] text-lg">Manage doctor settings and preferences</p>
          </div>
        </Link>

        {/* Patient Data Entry Card */}
        <Link href="/admin/patients/new">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#0D6C7E]/10">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-2">Patient Registration</h2>
            <p className="text-[#04282E] text-lg">Add new patient records</p>
          </div>
        </Link>

        {/* Appointments Card */}
        <Link href="/admin/appointments">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#0D6C7E]/10">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-2">Appointments</h2>
            <p className="text-[#04282E] text-lg">View and manage appointments</p>
          </div>
        </Link>

        {/* Patient List Card */}
        <Link href="/admin/patients">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#0D6C7E]/10">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-2">Patient Records</h2>
            <p className="text-[#04282E] text-lg">View and manage patient information</p>
          </div>
        </Link>

        {/* Reports Card */}
        <Link href="/admin/reports">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#0D6C7E]/10">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-2">Reports</h2>
            <p className="text-[#04282E] text-lg">Generate and view medical reports</p>
          </div>
        </Link>

        {/* Analytics Card */}
        <Link href="/admin/analytics">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#0D6C7E]/10">
            <h2 className="text-xl font-semibold text-[#0D6C7E] mb-2">Analytics</h2>
            <p className="text-[#04282E] text-lg">View practice statistics and insights</p>
          </div>
        </Link>
      </div>
    </div>
  );
}