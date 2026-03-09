import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Giriş yapılıyor:", email);
    // هنا لاحقاً سنربط مع الـ Controller في الـ Backend
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>MİRAS - Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="E-posta" 
            style={inputStyle} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            style={inputStyle} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={loginButtonStyle}>Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}

const containerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' };
const cardStyle = { padding: '30px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '10px' };
const loginButtonStyle = { width: '100%', padding: '10px', backgroundColor: '#27ae60', color: 'white', border: 'none', cursor: 'pointer' };

export default Login;