// src/layouts/UserLayout.jsx
import React from 'react';

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header akan muncul di semua halaman yang memakai layout ini */}
      <header className="bg-[#1a1a1a] text-white py-4 px-8 flex items-center justify-between border-b border-[#333]">
        <div className="flex items-center gap-3">
          <div className="text-amber-700 text-3xl">☕</div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">THE DAILY BREW</h1>
            <p className="text-[10px] tracking-[0.2em] text-gray-400">COFFEE & ROASTERS</p>
          </div>
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <a href="#" className="border-b-2 border-amber-600 pb-1">OUR STORY</a>
          <a href="#" className="hover:text-amber-600 transition">MENU</a>
          <a href="#" className="hover:text-amber-600 transition">SHOP ONLINE</a>
          <a href="#" className="hover:text-amber-600 transition">LOCATIONS</a>
          <a href="#" className="hover:text-amber-600 transition">JOURNAL</a>
        </nav>

        <div className="flex items-center gap-6">
          <button>🔍</button>
          <button>📍</button>
          <button className="relative">🛒<span className="absolute -top-2 -right-2 bg-amber-700 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span></button>
          <button className="bg-[#a87a55] px-6 py-2 rounded-full text-sm font-semibold">ORDER NOW</button>
        </div>
      </header>

      {/* Bagian ini adalah tempat Home.jsx akan masuk */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;