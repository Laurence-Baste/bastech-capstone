'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const resources = [
  { icon: 'canvasicon.png', url: 'http://jru.instructure.com/login/google' },
  { icon: 'libraryicon.png', url: 'http://library.jru.edu/' },
  { icon: 'onlinecounselling.png', url: 'https://jrc.edu.ph/jrucounseling' },
  { icon: 'ofc365icon.png', url: 'https://www.office.com/' },
  { icon: 'supporticon.png', url: 'https://jru.freshdesk.com/en/support/home' },
  { icon: 'onlineclinic.png', url: 'https://jrc.edu.ph/jruconsultation' },
  { icon: 'classroomfindericon.png', url: 'https://jrc.edu.ph/jruswit/classroomfinder.php' },
  { icon: 'documentrequest.png', url: 'https://jrc.edu.ph/jruswit/documentrequest.php' },
  { icon: 'FetcherReg.png', url: 'https://jrc.edu.ph/jruswit/fetcherenrollment.php' },
  { icon: 'LLCR2.png', url: 'https://jrc.edu.ph/jruswit/Learning_Commons/index.php' },
  { icon: 'jrizaph.png', url: 'http://joserizal.ph/' },
  { icon: 'dws5.png', url: 'https://docs.google.com/' },
];

const attendanceData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Referred Students',
      data: [75, 64, 49, 58, 35, 68],
      backgroundColor: '#0099bb',
      borderRadius: 4,
    },
  ],
};

const violationsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Recorded Violations',
      data: [56, 62, 36, 48, 43, 57],
      backgroundColor: '#0099bb',
      borderRadius: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 10 },
      grid: { color: '#e5e7eb' },
    },
    x: {
      grid: { color: '#e5e7eb' },
    },
  },
};

export default function Dashboard() {
  return (
    <div className="h-screen flex bg-[#F5F5F5]">
      {/* Header - fixed and full width */}
      <header className="w-full h-20 bg-white border-b flex items-center justify-between px-8 fixed top-0 left-0 z-30">
        <div className="text-xl font-semibold text-[#1A2B4C]">Dashboard</div>
        <div className="relative flex items-center gap-2 ml-0">
          <Image src="/defaultprofile.png" alt="Profile" width={40} height={40} className="rounded-full" />
          <span className="font-semibold text-[#1A2B4C]">LAURENCE BASTE</span>
          <DropdownProfile />
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex-1 flex pt-20 mr-80"> {/* pt-20 offsets for header height, mr-80 for notification panel */}
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r flex flex-col items-center py-6">
          <Image src="/jrulogo.png" alt="JRU Logo" width={80} height={80} className="mb-6" />
          <nav className="flex flex-col gap-2 w-full px-4 mt-8">
            <Link href="/dashboard" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500">
                <Image src="/dashboardicon.png" alt="Dashboard" width={24} height={24} /> Dashboard
              </a>
            </Link>
            <Link href="/attendancereport" legacyBehavior>
              <a className="flex items-center gap-2 px-5 py-2 rounded hover:bg-gray-100">
                <Image src="/attendanceicon.png" alt="Attendance Report" width={24} height={24} /> Attendance Report
              </a>
            </Link>
            <Link href="/violationconduct" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100">
                <Image src="/conducticon.png" alt="Violation and Conduct" width={32} height={32} /> Violation and Conduct
              </a>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col">
          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4 mt-3 w-full ml-7 mr-7 border border-blue-400">
            <Image src="/defaultprofile.png" alt="Profile" width={56} height={56} className="rounded-full" />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 text-[#1A2B4C] text-sm">
              <div><span className="font-semibold">Faculty Number:</span> 23-261763</div>
              <div><span className="font-semibold">Program:</span> None</div>
              <div><span className="font-semibold">Curriculum Version:</span> 1819</div>
            </div>
          </div>

          {/* Charts Section */}
          <section className="bg-white rounded-xl shadow p-6 mt-3 w-full ml-7 mr-7 flex flex-col md:flex-row gap-4 items-center justify-center border border-blue-400 mb-3">
            <div className="flex-1 flex flex-col items-center max-w-2xl">
              <div className="text-base font-semibold mb-2">Referred Students through Attendance</div>
              <div className="w-full h-72">
                <Bar data={attendanceData} options={chartOptions} />
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center max-w-2xl">
              <div className="text-base font-semibold mb-2">No. of Recorded Violations</div>
              <div className="w-full h-72">
                <Bar data={violationsData} options={chartOptions} />
              </div>
            </div>
          </section>

          {/* Resource Buttons Grid */}
          <section className="w-full mt-2">
            <div className="w-full ml-7 mr-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 bg-white rounded-xl p-6 shadow border border-blue-400 w-full">
                {resources.map((res, idx) => (
                  <a
                    key={idx}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-white rounded-lg shadow-[0_8px_32px_0_rgba(37,99,235,0.25)] border-2 border-blue-400 p-8 hover:shadow-[0_12px_40px_0_rgba(37,99,235,0.35)] hover:scale-105 transition min-h-[140px] min-w-[140px]"
                  >
                    <Image
                      src={`/${res.icon}`}
                      alt=""
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Notification Panel */}
      <aside className="w-80 bg-white border-l h-full flex flex-col fixed right-0 top-20 z-10 pt-0">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="font-semibold text-[#1A2B4C]">Notification</span>
          <span className="text-xs text-blue-600 cursor-pointer">View All &gt;</span>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 text-sm text-gray-700">
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-1">May 10, 2025</div>
            10 new students from the CSE department was added to student at-risk due to attendance.
            <div className="text-right text-xs text-gray-400 mt-1">System Log</div>
          </div>
          <div className="mb-6">
            <div className="text-xs text-gray-500 mb-1">May 10, 2025</div>
            New violation record from Student No. 23-124121 was logged.
            <div className="text-right text-xs text-gray-400 mt-1">System Log</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DropdownProfile() {
  const [open, setOpen] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (open) {
      fetch('/api/auth/csrf')
        .then(res => res.json())
        .then(data => setCsrfToken(data.csrfToken));
    }
  }, [open]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch (e) {
      // Ignore the JSON error
    }
    router.push('/');
  };

  return (
    <div className="relative">
      <button
        className="ml-1 focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open profile menu"
      >
        <svg className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
          <form method="POST" action="/api/auth/signout">
            <input type="hidden" name="csrfToken" value={csrfToken} />
            <input type="hidden" name="callbackUrl" value="/" />
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded block"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
} 