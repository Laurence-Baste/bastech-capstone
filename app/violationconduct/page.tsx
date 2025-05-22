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
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

const demoRows = [
  {
    id: '23-261763',
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@my.jru.edu',
    violation: 'Cheating',
    degree: 'Major',
    sanction: 'Suspension',
    document: 'doc1.pdf',
    date: '2024-05-01',
  },
  {
    id: '23-261764',
    name: 'Maria Santos',
    email: 'maria.santos@my.jru.edu',
    violation: 'Dress Code',
    degree: 'Minor',
    sanction: 'Warning',
    document: 'doc2.pdf',
    date: '2024-05-03',
  },
  {
    id: '23-261765',
    name: 'Jose Rizal',
    email: 'jose.rizal@my.jru.edu',
    violation: 'Disrespect',
    degree: 'Major',
    sanction: 'Community Svc',
    document: 'doc3.pdf',
    date: '2024-05-05',
  },
];

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

export default function ViolationConduct() {
  return (
    <div className="h-screen flex bg-[#F5F5F5]">
      {/* Header - fixed and full width */}
      <header className="w-full h-20 bg-white border-b flex items-center justify-between px-8 fixed top-0 left-0 z-30">
        <div className="text-xl font-semibold text-[#1A2B4C]">Violation and Conduct Record</div>
        <div className="relative flex items-center gap-2 ml-0">
          <Image src="/defaultprofile.png" alt="Profile" width={40} height={40} className="rounded-full" />
          <span className="font-semibold text-[#1A2B4C]">LAURENCE BASTE</span>
          <DropdownProfile />
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex-1 flex pt-20">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r flex flex-col items-center py-6">
          <Image src="/jrulogo.png" alt="JRU Logo" width={80} height={80} className="mb-6" />
          <nav className="flex flex-col gap-2 w-full px-4 mt-8">
            <Link href="/dashboard" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100">
                <Image src="/dashboardicon.png" alt="Dashboard" width={24} height={24} /> Dashboard
              </a>
            </Link>
            <Link href="/attendancereport" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100">
                <Image src="/attendanceicon.png" alt="Attendance Report" width={24} height={24} /> Attendance Report
              </a>
            </Link>
            <Link href="/violationconduct" legacyBehavior>
              <a className="flex items-center gap-2 px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500">
                <Image src="/conducticon.png" alt="Violation and Conduct" width={32} height={32} /> Violation and Conduct
              </a>
            </Link>
          </nav>
        </aside>

        {/* Main Content and Chart */}
        <div className="flex-1 flex flex-row gap-4 p-4">
          {/* Table Section */}
          <div className="flex-1 bg-white rounded-xl border border-blue-300 p-4 overflow-auto">
            <h2 className="text-2xl font-serif font-semibold text-center mb-2">Violation and Conduct Record</h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1">ID No.</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Violation</th>
                  <th className="border px-2 py-1">Degree</th>
                  <th className="border px-2 py-1">Sanction</th>
                  <th className="border px-2 py-1">Document</th>
                  <th className="border px-2 py-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {demoRows.map((row, idx) => (
                  <tr key={row.id} className="border-b h-10">
                    <td className="border px-2 py-1 text-center">{idx + 1}</td>
                    <td className="border px-2 py-1 text-center">{row.id}</td>
                    <td className="border px-2 py-1">{row.name}</td>
                    <td className="border px-2 py-1">{row.email}</td>
                    <td className="border px-2 py-1">{row.violation}</td>
                    <td className="border px-2 py-1">{row.degree}</td>
                    <td className="border px-2 py-1">{row.sanction}</td>
                    <td className="border px-2 py-1">{row.document}</td>
                    <td className="border px-2 py-1">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Chart Section */}
          <div className="w-96 bg-white rounded-xl border border-blue-300 p-4 flex flex-col items-center">
            <div className="text-base font-semibold mb-2">No. of Recorded Violations</div>
            <div className="w-full h-64">
              <Bar data={violationsData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 