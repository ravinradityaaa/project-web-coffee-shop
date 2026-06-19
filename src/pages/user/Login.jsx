import React, { useState } from 'react'; // Tambahkan useState

const Login = ({ setRole }) => {
  // 1. Definisikan state untuk menampung inputan
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginProcess = () => {
    if (email === 'admin' && password === '123') {
      // 2. Ubah pemanggilan fungsinya
      setRole('admin'); 
    } else if (email !== '' && password !== '') {
      setRole('user');
    } else {
      alert('Tolong isi email dan password terlebih dahulu!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-amber-900">
            Coffee Wae
          </h2>
          <p className="text-gray-500 mt-2">Masuk ke akun kofimu</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* INPUT EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com"
              value={email} // Hubungkan dengan state
              onChange={(e) => setEmail(e.target.value)} // Update state saat diketik
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* INPUT PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password} // Hubungkan dengan state
              onChange={(e) => setPassword(e.target.value)} // Update state saat diketik
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* TOMBOL LOGIN */}
          <button 
            onClick={handleLoginProcess} // Panggil fungsi logic di atas
            className="w-full mt-4 bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Masuk Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;