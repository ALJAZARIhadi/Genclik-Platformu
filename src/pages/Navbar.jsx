import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'dark');
  const [streak, setStreak] = useState(0);
  const [isHijri, setIsHijri] = useState(false);
  
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' },
    { code: 'en', flag: '🇬🇧', name: 'English' }
  ];

  // تحديد اللغة الحالية أو الافتراضية
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  // 🔴 هنا دمجنا الكود الخاص بك من LanguageSwitcher 🔴
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('appLang', code);
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = code;
    setIsLangOpen(false); // إغلاق القائمة بعد الاختيار
  };

  // التأكد من الاتجاه عند فتح الموقع أول مرة
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language || 'tr';
  }, [i18n.language]);

  // إغلاق قائمة اللغات عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        const diffDays = Math.ceil(Math.abs(todayDate - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) currentStreak += 1;
        else if (diffDays > 1) currentStreak = 1;
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

  const today = new Date();
  const miladiDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' }).format(today);
  const hicriDate = new Intl.DateTimeFormat('tr-TR-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(today).replace('AH', '').trim();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/menu')}>Miras ✨</div>
      
      <div style={styles.rightSection}>
        <div style={styles.dateBox} onClick={() => setIsHijri(!isHijri)}>
          {isHijri ? `🌙 ${hicriDate}` : `📅 ${miladiDate}`}
        </div>

        <div style={styles.streakBox}>🔥 {streak}</div>

        <button onClick={() => navigate('/menu')} style={styles.linkBtn}>Ana Sayfa</button>
        <button onClick={() => setIsDark(!isDark)} style={styles.themeBtn}>
          {isDark ? '☀️ Aydınlık' : '🌙 Karanlık'}
        </button>

        {/* 🌍 قائمة اللغات */}
        <div style={styles.dropdownContainer} ref={dropdownRef}>
          <button style={styles.flagButton} onClick={() => setIsLangOpen(!isLangOpen)}>
            {/* أضفنا fallback 🌐 لضمان ظهور شيء دائماً */}
            {currentLang?.flag || '🌐'}
          </button>

          {isLangOpen && (
            <div style={styles.dropdownMenu}>
              {languages.map((lang) => (
                <button 
                  key={lang.code} 
                  style={{
                    ...styles.dropdownItem, 
                    backgroundColor: i18n.language === lang.code ? 'var(--bg-color)' : 'transparent',
                    color: 'var(--text-main)'
                  }}
                  onClick={() => changeLanguage(lang.code)}
                >
                  <span style={{fontSize: '20px'}}>{lang.flag}</span>
                  <span style={{fontSize: '14px', fontWeight: 'bold'}}>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

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
  logo: { fontSize: '22px', fontWeight: 'bold', color: '#27ae60', cursor: 'pointer' },
  rightSection: { display: 'flex', gap: '15px', alignItems: 'center' },
  dateBox: { display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '600', color: 'var(--text-main)', backgroundColor: 'var(--bg-color)', padding: '6px 15px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', userSelect: 'none' },
  streakBox: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '16px', fontWeight: 'bold', color: '#e67e22', backgroundColor: '#fef5e7', padding: '6px 12px', borderRadius: '20px', border: '1px solid #fad7a1' },
  linkBtn: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontWeight: '600' },
  themeBtn: { padding: '6px 15px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)', fontWeight: '500' },
  
  // تنسيقات قائمة اللغات
  dropdownContainer: { position: 'relative' },
  flagButton: {
    backgroundColor: 'var(--bg-color)',
    border: '1px solid #ddd',
    borderRadius: '50%', 
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    cursor: 'pointer',
    padding: 0
  },
  dropdownMenu: {
    position: 'absolute',
    top: '120%', 
    right: '0', 
    backgroundColor: 'var(--card-bg)',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 5px 15px var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    minWidth: '130px',
    zIndex: 1001
  },
  dropdownItem: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }
};

export default Navbar;