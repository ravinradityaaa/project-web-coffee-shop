import React from 'react';
import UserLayout from '../../layouts/UserLayout'; // Pastikan path ini benar (naik 2 level ke folder layouts)

const Home = () => {
  return (
    <UserLayout>
      {/* Semua konten di dalam sini akan berada di bawah Header */}
      <div className="p-8">
        <h1 className="text-2xl font-bold">Halaman Utama Pelanggan</h1>
        <button className="mt-4 text-red-500">Logout</button>
      </div>
    </UserLayout>
  );
};

export default Home;
