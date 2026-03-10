import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // لعرض الأخطاء أو النجاح
  const [isSuccess, setIsSuccess] = useState(false); // لمعرفة لون الرسالة (أحمر أم أخضر)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage("✅ " + data.message + " Yönlendiriliyorsunuz...");
        // الانتظار ثانيتين لكي يقرأ المستخدم رسالة النجاح ثم ننقله لصفحة الدخول
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setIsSuccess(false);
        setMessage("❌ " + (data.message || 'Kayıt başarısız!'));
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Sunucuya bağlanılamadı!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Yeni Hesap Oluştur</h2>
        <p style={styles.subtitle}>MİRAS platformuna katılın</p>

        {/* مربع عرض الرسائل (أخضر للنجاح، أحمر للخطأ) */}
        {message && (
          <div style={{ ...styles.messageBox, backgroundColor: isSuccess ? '#d4edda' : '#ffdddd', color: isSuccess ? '#155724' : '#d8000c' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Ad Soyad" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            style={styles.input} 
            required 
          />
          <input 
            type="email" 
            placeholder="E-posta adresiniz" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={styles.input} 
            required 
          />
          <input 
            type="password" 
            placeholder="Şifreniz" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={styles.input} 
            required 
          />
          <button type="submit" style={styles.button}>Kayıt Ol</button>
        </form>

        <div style={styles.footer}>
          Zaten hesabınız var mı? <Link to="/" style={styles.link}>Giriş Yapın</Link>
        </div>
      </div>
    </div>
  );
}

// === نفس التنسيقات الأنيقة ===
const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    backgroundColor: '#f4f7f6', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    backgroundColor: 'white', padding: '40px', borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center'
  },
  title: { margin: '0 0 10px 0', color: '#2c3e50' },
  subtitle: { margin: '0 0 20px 0', color: '#7f8c8d', fontSize: '14px' },
  messageBox: { padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px', fontWeight: 'bold' },
  input: {
    width: '90%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc',
    borderRadius: '5px', fontSize: '16px', outline: 'none'
  },
  button: {
    width: '97%', padding: '12px', backgroundColor: '#2ecc71', // لون أخضر يعبر عن التسجيل
    color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
  },
  footer: { marginTop: '25px', fontSize: '14px', color: '#7f8c8d' },
  link: { color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;