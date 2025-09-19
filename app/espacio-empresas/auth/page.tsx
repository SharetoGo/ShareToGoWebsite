'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Header from '@/components/ui/header';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Handle Login
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/espacio-empresas');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center pt-32 px-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-50 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-center text-[#2a2c38]">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Para obtener toda la información sostenible de tu empresa, pide <Link href="/contratar-sharetogo" className="text-green-700 hover:underline font-semibold">aquí</Link> tu usuario y contraseña
            </p>
          </div>
          <form onSubmit={handleAuthAction} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full py-2 px-4 bg-[#2a2c38] text-white font-semibold rounded-md hover:bg-[#1a1c28] transition-colors">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}