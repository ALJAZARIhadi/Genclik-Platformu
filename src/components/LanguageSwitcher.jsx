import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  // دالة تغيير اللغة
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('appLang', lng); // حفظ الخيار في الذاكرة
    
    // تغيير اتجاه الموقع: إذا كانت عربي نجعله من اليمين لليسار
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  // التأكد من الاتجاه عند فتح الموقع أول مرة
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div style={styles.container}>
      <button 
        onClick={() => changeLanguage('tr')} 
        style={i18n.language === 'tr' ? styles.activeBtn : styles.btn}
      >
        🇹🇷 TR
      </button>
      <button 
        onClick={() => changeLanguage('ar')} 
        style={i18n.language === 'ar' ? styles.activeBtn : styles.btn}
      >
        🇸🇦 AR
      </button>
      <button 
        onClick={() => changeLanguage('en')} 
        style={i18n.language === 'en' ? styles.activeBtn : styles.btn}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px' },
  btn: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', transition: 'all 0.2s' },
  activeBtn: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #3498db', backgroundColor: '#e8f4f8', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(52,152,219,0.2)' }
};

export default LanguageSwitcher;