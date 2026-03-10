import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // أضفنا Link للانتقال

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); // ذاكرة جديدة لحفظ رسائل الخطأ
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // مسح الأخطاء السابقة عند كل محاولة
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.user);
        navigate('/dashboard');
      } else {
        // إذا كان هناك خطأ (مثل كلمة مرور خاطئة)، نظهره في الشاشة
        setErrorMsg(data.message || 'Giriş başarısız!');
      }
    } catch (error) {
      setErrorMsg('Sunucuya bağlanılamadı! Lütfen internetinizi kontrol edin.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>MİRAS'a Hoş Geldiniz</h2>
        <p style={styles.subtitle}>Devam etmek için lütfen giriş yapın</p>

        {/* مربع عرض الأخطاء باللون الأحمر إن وجدت */}
        {errorMsg && <div style={styles.errorBox}>{errorMsg}</div>}

        <form onSubmit={handleLogin}>
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
          <button type="submit" style={styles.button}>Giriş Yap</button>
        </form>

        {/* هذا هو الرابط الذي طلبته! */}
        <div style={styles.footer}>
          Hesabınız yok mu? <Link to="/register" style={styles.link}>Hemen Kayıt Olun</Link>
        </div>
      </div>
    </div>
  );
}

// === قسم التنسيقات (التزبيط الشكلي) ===
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7f6', // لون خلفية رمادي فاتح مريح
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // ظل خفيف يعطي بروز للبطاقة
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: { margin: '0 0 10px 0', color: '#2c3e50' },
  subtitle: { margin: '0 0 20px 0', color: '#7f8c8d', fontSize: '14px' },
  errorBox: {
    backgroundColor: '#ffdddd',
    color: '#d8000c',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '14px'
  },
  input: {
    width: '90%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none'
  },
  button: {
    width: '97%',
    padding: '12px',
    backgroundColor: '#3498db', // أزرق احترافي
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  footer: {
    marginTop: '25px',
    fontSize: '14px',
    color: '#7f8c8d'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Login;