import Image from 'next/image';

interface DoctorSettings {
  availability: {
    workingHours: {
      start: string;
      end: string;
    };
    daysOff: string[];
    breakTime: {
      start: string;
      end: string;
    };
  };
  consultation: {
    duration: number;
    buffer: number;
    maxPatientsPerDay: number;
    virtualConsultation: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    appointmentReminders: boolean;
    reminderTime: number;
  };
  fees: {
    consultationFee: number;
    followUpFee: number;
    virtualConsultationFee: number;
    currency: string;
  };
}

const DoctorSettingsForm = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Image 
          src="/your-actual-logo-filename.png"  // Update this to match your actual filename
          alt="Doctor Logo"
          width={50}
          height={50}
          className="mr-4"
        />
        <h2 className="text-2xl font-semibold">Doctor Settings</h2>
      </div>
      
      {/* Availability Settings */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Availability</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Working Hours</label>
            <input type="time" className="form-input w-full" placeholder="Start time" />
            <input type="time" className="form-input w-full mt-2" placeholder="End time" />
          </div>
          <div>
            <label className="block mb-2">Days Off</label>
            <select multiple className="form-multiselect w-full">
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Break Time</label>
            <input type="time" className="form-input w-full" placeholder="Start time" />
            <input type="time" className="form-input w-full mt-2" placeholder="End time" />
          </div>
        </div>
      </section>

      {/* Consultation Settings */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Consultation Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Consultation Duration (minutes)</label>
            <input type="number" className="form-input w-full" />
          </div>
          <div>
            <label className="block mb-2">Buffer Time (minutes)</label>
            <input type="number" className="form-input w-full" />
          </div>
          <div>
            <label className="block mb-2">Max Patients Per Day</label>
            <input type="number" className="form-input w-full" />
          </div>
          <div>
            <label className="block mb-2">Virtual Consultation</label>
            <input type="checkbox" className="form-checkbox h-5 w-5" />
          </div>
        </div>
      </section>

      {/* Fee Settings */}
      <section className="mb-8">
        <h3 className="text-xl font-medium mb-4">Fee Structure</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Consultation Fee</label>
            <input type="number" className="form-input w-full" />
          </div>
          <div>
            <label className="block mb-2">Follow-up Fee</label>
            <input type="number" className="form-input w-full" />
          </div>
          <div>
            <label className="block mb-2">Virtual Consultation Fee</label>
            <input type="number" className="form-input w-full" />
          </div>
          <div>
            <label className="block mb-2">Currency</label>
            <select className="form-select w-full">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-[#0D6C7E] text-white px-6 py-2 rounded-md hover:bg-[#0A5A6A] transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  return (
    <div className="p-8 bg-[#F4F4F4] min-h-screen">
      <h1 className="text-3xl font-bold text-[#0D6C7E] mb-6">Doctor Settings</h1>
      <div className="mt-4">
        <DoctorSettingsForm />
      </div>
    </div>
  );
} 