'use client';

import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="bg-[#1A2B4C] rounded-xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center border border-gray-200">
            <p className="text-white text-center text-xl mb-8">
              Login Failed.<br />
              Credential doesn't match<br />
              with the records.
            </p>
            <button
              onClick={handleClose}
              className="px-8 py-2 border-2 border-[#FFC72C] text-[#FFC72C] rounded font-semibold text-lg hover:bg-[#FFC72C] hover:text-[#1A2B4C] transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </main>
  );
} 