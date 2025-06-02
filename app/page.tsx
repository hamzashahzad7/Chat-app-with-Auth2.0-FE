'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function LandingPage() {
  const { data: session } = useSession();
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-extrabold leading-tight mb-4">
          Real-time Support Chat
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Join our live chat support system with seamless Google authentication.
        </p>
        {session
          ?
          <Link href="/chat" className='bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all cursor-pointer'>Go to Chatroom</Link>
          :
          <button
            onClick={() => signIn('google')}
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition-all cursor-pointer"
          >
            Sign in with Google
          </button>}
      </div>
    </main>
  );
}