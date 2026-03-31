import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
  const [streak, setStreak] = useState(0);
  const [isHijri, setIsHijri] = useState(false); // حالة التاريخ (ميلادي أو هجري)

  // تبديل الثيم
  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // حساب الستريك
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    let currentStreak = parseInt(localStorage.getItem('streak') || '0');

    if (lastVisit !== today) {
      if (lastVisit) {
        const lastVisitDate = new Date(lastVisit);
        const todayDate = new Date(today);
        const diffTime = Math.abs(todayDate - lastVisitDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak += 1;
        } else if (diffDays > 1) {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      localStorage.setItem('lastVisit', today);
      localStorage.setItem('streak', currentStreak.toString());
      setStreak(currentStreak);
    } else {
      setStreak(currentStreak);
    }
  }, []);

  // تجهيز التواريخ
  const today = new Date();
  
  // التاريخ الميلادي (مثال: 31 Mart 2026 Salı)
  const miladiDate = new Intl.DateTimeFormat('tr-TR', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric',
    weekday: 'short'
  }).format(today);

  // التاريخ الهجري (التقويم الإسلامي باللغة التركية)
  const hicriDate = new Intl.DateTimeFormat('tr-TR-u-ca-islamic', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(today).replace('AH', '').trim(); // إزالة حرف AH الذي يظهر أحياناً

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/menu')}>Miras ✨</div>
      
      <div style={styles.rightSection}>
        
        {/* زر التاريخ التفاعلي */}
        <div 
          style={styles.dateBox} 
          onClick={() => setIsHijri(!isHijri)}
          title="Tarihi değiştir (Miladi / Hicri)"
        >
          {isHijri ? `🌙 ${hicriDate}` : `📅 ${miladiDate}`}
        </div>

        {/* عرض أيقونة الحماس (الستريك) */}
        <div style={styles.streakBox} title="Günlük Serin!">
          🔥 {streak}
        </div>

        <button onClick={() => navigate('/menu')} style={styles.linkBtn}>Ana Sayfa</button>
        <button onClick={() => setIsDark(!isDark)} style={styles.themeBtn}>
          {isDark ? '☀️ Aydınlık' : '🌙 Karanlık'}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: 'var(--card-bg)',
    boxShadow: '0 2px 10px var(--shadow)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    transition: 'background-color 0.3s ease'
  },
  logo: { 
    fontSize: '22px', 
    fontWeight: 'bold', 
    color: '#27ae60', 
    cursor: 'pointer' 
  },
  rightSection: { 
    display: 'flex', 
    gap: '15px', 
    alignItems: 'center' 
  },
  dateBox: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--text-main)',
    backgroundColor: 'var(--bg-color)',
    padding: '6px 15px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.3s ease'
  },
  streakBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#e67e22',
    backgroundColor: '#fef5e7',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid #fad7a1',
    cursor: 'default'
  },
  linkBtn: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    color: 'var(--text-main)', 
    fontWeight: '600',
    transition: 'color 0.3s ease'
  },
  themeBtn: {
    padding: '6px 15px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-color)',
    color: 'var(--text-main)',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  }
};

export default Navbar;