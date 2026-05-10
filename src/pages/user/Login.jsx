// src/pages/user/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logika Login Sederhana
    if (username === 'admin' && password === '123') {
      onLogin('admin');
    } else if (username === 'user' && password === '123') {
      onLogin('user');
    } else {
      alert('Username atau Password salah! (admin/123 atau user/123)');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Kopi Wae</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
}