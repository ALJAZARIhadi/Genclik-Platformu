import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // إرسال البيانات للسيرفر (البحث عن الـ Controller)
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 " + data.message); // Giriş Başarılı!
        console.log("Kullanıcı bilgisi:", data.user);
      } else {
        alert("❌ " + data.message); // Hatalı giriş
      }
    } catch (error) {
      console.error("Bağlantı hatası:", error);
      alert("Sunucuya bağlanılamadı!");
    }
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