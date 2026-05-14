import { useState } from 'react';

export default function Register({ isDarkMode, onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    console.log("Mendaftar:", formData);
    onNavigate('login');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <div className={`relative overflow-hidden rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] transition-all duration-700 
        ${isDarkMode ? 'bg-[#1A1A1B]/90' : 'bg-white/95'} backdrop-blur-2xl border border-white/20`}>
        
        {/* Dekorasi Background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#A67C52]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#A67C52]/10 rounded-full blur-3xl"></div>

        <div className="relative p-12 md:p-20">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[#A67C52] font-black text-[10px] uppercase tracking-[0.6em] mb-4 inline-block">
              Start Your Journey
            </span>
            <h2 className={`text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-none
              ${isDarkMode ? 'text-white' : 'text-[#1A1A1B]'}`}>
              BUAT <span className="text-[#A67C52]">AKUN</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Nama Lengkap */}
              <div className="relative border-b-2 border-current/10 focus-within:border-[#A67C52] transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Nama Lengkap</p>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent py-2 outline-none font-bold text-lg italic"
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              {/* Email */}
              <div className="relative border-b-2 border-current/10 focus-within:border-[#A67C52] transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Email Address</p>
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent py-2 outline-none font-bold text-lg italic"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Password */}
              <div className="relative border-b-2 border-current/10 focus-within:border-[#A67C52] transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Password</p>
                <input 
                  type="password" 
                  required
                  className="w-full bg-transparent py-2 outline-none font-bold text-lg italic"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              {/* Confirm Password */}
              <div className="relative border-b-2 border-current/10 focus-within:border-[#A67C52] transition-colors">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Ulangi Password</p>
                <input 
                  type="password" 
                  required
                  className="w-full bg-transparent py-2 outline-none font-bold text-lg italic"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-6 py-6 rounded-full font-black bg-[#A67C52] text-white hover:bg-[#1A1A1B] hover:scale-[1.02] active:scale-95 transition-all duration-500 shadow-[0_20px_40px_rgba(166,124,82,0.3)] uppercase tracking-[0.2em] text-sm"
            >
              Daftar Sekarang
            </button>
          </form>

          {/* Footer */}
          <div className="mt-16 text-center border-t border-current/5 pt-10">
            <p className="text-sm opacity-50 font-medium italic mb-4 text-current">Sudah punya akun Kopi Wae?</p>
            <button 
              onClick={() => onNavigate('login')}
              className={`text-xs font-black uppercase tracking-[0.3em] pb-1 border-b-2 border-[#A67C52] hover:text-[#A67C52] transition-all
                ${isDarkMode ? 'text-white' : 'text-[#1A1A1B]'}`}
            >
              Login di Sini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}