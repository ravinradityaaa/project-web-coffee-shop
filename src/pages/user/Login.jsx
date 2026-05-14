import React from 'react';

const Login = ({ onLogin }) => {
  return (
   
    <div className="min-h-screen flex items-center justify-center bg-stone-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        
        {/* BAGIAN JUDUL */}
        <div className="text-center mb-6">
          {/* text-3xl (ukuran teks besar), font-bold (tebal), text-amber-900 (warna coklat kopi tua) */}
          <h2 className="text-3xl font-bold text-amber-900">
            Coffee Wae
          </h2>
          {/* text-gray-500 (teks abu-abu), mt-2 (margin atas ukuran 2) */}
          <p className="text-gray-500 mt-2">Masuk ke akun pelangganmu</p>
        </div>

        {/* BAGIAN FORM (Bungkus inputan pakai flex ke bawah/column) */}
        <div className="flex flex-col gap-4">
          
          {/* INPUT EMAIL */}
          <div>
            {/* text-sm (teks kecil), font-semibold (agak tebal), text-gray-700 */}
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com"
            
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* INPUT PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* TOMBOL LOGIN */}
          <button 
            /* Karena di App.jsx kamu butuh onLogin buat ubah role ke 'user', kita panggil fungsinya di sini */
            onClick={() => onLogin('user')}
          
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