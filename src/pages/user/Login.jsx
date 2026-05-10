import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      onLogin('admin');
    } else if (username === 'user' && password === '123') {
      onLogin('user');
    } else {
      alert('Username atau Password salah!');
    }
  };

  return (
    // Menggunakan Primary Cream (#F5F5DC) sebagai latar belakang utama
    <div className="min-h-screen flex items-center justify-center bg-primary-cream px-4">
      
      {/* Card dengan aksen Border Accent Gold (#A67C52) */}
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border-t-8 border-accent-gold">
        
        <div className="text-center">
          {/* Ikon menggunakan Accent Gold (#A67C52) */}
          <div className="mx-auto h-16 w-16 bg-accent-gold rounded-full mb-4 flex items-center justify-center shadow-md">
             <span className="text-white text-3xl">☕</span>
          </div>
          {/* Teks menggunakan Primary Dark (#1A1A1B) */}
          <h2 className="text-3xl font-bold text-primary-dark tracking-tight">
            Kopi Wae
          </h2>
          <p className="mt-2 text-sm text-secondary-dark/70">
            Selamat datang kembali! Silakan masuk ke akun Anda.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-secondary-dark uppercase tracking-wider ml-1 mb-1">
                Username
              </label>
              <input 
                type="text" 
                required
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none"
                placeholder="Masukkan username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-secondary-dark uppercase tracking-wider ml-1 mb-1">
                Password
              </label>
              <input 
                type="password" 
                required
                className="block w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all outline-none"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Tombol menggunakan Accent Gold (#A67C52) dan Hover Gold (#8E6A45) */}
          <button 
            type="submit" 
            className="w-full py-4 rounded-xl text-white bg-accent-gold hover:bg-hover-gold font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98]"
          >
            Masuk Sekarang
          </button>
        </form>
        
        <p className="text-center text-xs text-secondary-dark/50 mt-6 font-medium">
          © 2026 Kopi Wae. All rights reserved.
        </p>
      </div>
    </div>
  );
}