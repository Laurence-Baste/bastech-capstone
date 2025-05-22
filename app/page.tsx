'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get('error');
  const [showModal, setShowModal] = useState(!!error);

  const handleClose = () => {
    setShowModal(false);
    router.replace('/', { scroll: false }); // Remove error from URL
  };

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-[#1A2B4C] rounded-xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center border border-gray-200">
          <h1 className="text-3xl font-serif font-bold text-white mb-8">JRU SWIT</h1>
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="w-full flex items-center justify-center gap-3 bg-[#1A2B4C] text-white border-2 border-[#FFC72C] rounded px-6 py-3 font-semibold text-lg hover:bg-[#223a6a] transition-colors duration-200"
          >
            <Image
              src="/google-logo.png"
              alt="Google logo"
              width={24}
              height={24}
            />
            Sign In with Google
          </button>
        </div>
      </div>

      {/* Error Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold text-red-600 mb-4">Login Error</h2>
            <p className="text-gray-700 mb-4">
              {error === 'AccessDenied' 
                ? 'Access denied. Please use your JRU email account.'
                : 'An error occurred during login. Please try again.'}
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
} 