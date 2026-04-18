import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// استيراد المكون الذي برمجناه سابقاً
// import LanguageSwitcher from '../components/LanguageSwitcher'; 

function Profile() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // --- بيانات وهمية (Dummy Data) ---
  const user = {
    name: "ALJAZARIhadi",
    email: "hadikezzhe@gmail.com",
    level: 5,
    xp: 750,
    nextLevelXp: 1000,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hadi", // رمز تعبيري عشوائي أنيق
    stats: {
      streak: 12,
      quranPages: 145,
      calories: 3200
    },
    badges: [
      { id: 1, icon: "🔥", titleAr: "مثابر", titleTr: "Azimli", earned: true },
      { id: 2, icon: "📖", titleAr: "قارئ نهم", titleTr: "Okuyucu", earned: true },
      { id: 3, icon: "💪", titleAr: "وحش الرياضة", titleTr: "Spor Canavarı", earned: false },
      { id: 4, icon: "🌅", titleAr: "صلاة الفجر", titleTr: "Sabah Namazı", earned: true },
    ]
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{...styles.container, direction: isRTL ? 'rtl' : 'ltr'}}>
      
      {/* 1. رأس الصفحة (Header & Avatar) */}
      <div style={styles.headerCard}>
        <div style={styles.topActions}>
          <button onClick={() => navigate('/menu')} style={styles.iconBtn}>⬅</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>{isRTL ? 'خروج' : 'Çıkış'}</button>
        </div>

        <div style={styles.profileMain}>
          <img src={user.avatar} alt="Avatar" style={styles.avatar} />
          <h2 style={styles.userName}>{user.name}</h2>
          <div style={styles.levelBadge}>{isRTL ? `المستوى ${user.level}` : `Seviye ${user.level}`}</div>
          
          {/* شريط الخبرة XP */}
          <div style={styles.xpContainer}>
            <div style={{...styles.xpBar, width: `${(user.xp / user.nextLevelXp) * 100}%`}}></div>
            <span style={styles.xpText}>{user.xp} / {user.nextLevelXp} XP</span>
          </div>
        </div>
      </div>

      {/* 2. لوحة الإحصائيات (Stats) */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>🔥</span>
          <span style={styles.statValue}>{user.stats.streak}</span>
          <span style={styles.statLabel}>{isRTL ? 'أيام الالتزام' : 'Günlük Seri'}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>📖</span>
          <span style={styles.statValue}>{user.stats.quranPages}</span>
          <span style={styles.statLabel}>{isRTL ? 'صفحة قرآن' : 'Kur\'an Sayfa'}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statIcon}>⚡</span>
          <span style={styles.statValue}>{user.stats.calories}</span>
          <span style={styles.statLabel}>{isRTL ? 'سعرة محروقة' : 'Kalori'}</span>
        </div>
      </div>

      {/* 3. قسم الأوسمة (Badges) */}
      <h3 style={styles.sectionTitle}>{isRTL ? '🏆 الأوسمة المحققة' : '🏆 Kazanılan Başarılar'}</h3>
      <div style={styles.badgesGrid}>
        {user.badges.map(badge => (
          <div key={badge.id} style={{...styles.badgeCard, opacity: badge.earned ? 1 : 0.4}}>
            <div style={styles.badgeIcon}>{badge.icon}</div>
            <div style={styles.badgeTitle}>{isRTL ? badge.titleAr : badge.titleTr}</div>
          </div>
        ))}
      </div>

      {/* 4. الإعدادات (Settings) */}
      <div style={styles.settingsSection}>
        <div style={styles.settingItem}>
           <span>{isRTL ? 'اللغة' : 'Dil'}</span>
           {/* <LanguageSwitcher /> */}
           <span>{i18n.language.toUpperCase()}</span>
        </div>
        <div style={styles.settingItem}>
           <span>{isRTL ? 'تنبيهات اليوم' : 'Günlük Bildirimler'}</span>
           <input type="checkbox" defaultChecked />
        </div>
      </div>

    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '500px', margin: 'auto', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' },
  
  // تصميم الكارت العلوي
  headerCard: { 
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)', 
    borderRadius: '25px', padding: '20px', color: '#fff', marginBottom: '25px', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' 
  },
  topActions: { display: 'flex', justifyContent: 'space-between' },
  iconBtn: { background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '5px 12px', borderRadius: '10px', cursor: 'pointer' },
  logoutBtn: { background: '#e74c3c', border: 'none', color: '#fff', padding: '5px 12px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer' },
  
  profileMain: { marginTop: '10px' },
  avatar: { width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#fff', border: '4px solid #3498db', marginBottom: '10px' },
  userName: { margin: '5px 0', fontSize: '22px' },
  levelBadge: { display: 'inline-block', backgroundColor: '#f1c40f', color: '#2c3e50', padding: '2px 15px', borderRadius: '15px', fontWeight: 'bold', fontSize: '13px' },
  
  xpContainer: { width: '80%', height: '12px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '10px', margin: '20px auto 10px auto', position: 'relative' },
  xpBar: { height: '100%', backgroundColor: '#2ecc71', borderRadius: '10px', transition: 'width 1s ease-in-out' },
  xpText: { position: 'absolute', top: '15px', left: '50%', transform: 'translateX(-50%)', fontSize: '11px', opacity: 0.8 },

  // الإحصائيات
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '25px' },
  statCard: { backgroundColor: '#fff', padding: '15px 5px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  statIcon: { fontSize: '20px', display: 'block' },
  statValue: { fontSize: '18px', fontWeight: 'bold', display: 'block', margin: '5px 0', color: '#2c3e50' },
  statLabel: { fontSize: '11px', color: '#7f8c8d' },

  // الأوسمة
  sectionTitle: { fontSize: '18px', color: '#2c3e50', marginBottom: '15px' },
  badgesGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '30px' },
  badgeCard: { backgroundColor: '#fff', padding: '10px 5px', borderRadius: '12px', textAlign: 'center', border: '1px solid #eee' },
  badgeIcon: { fontSize: '24px' },
  badgeTitle: { fontSize: '10px', marginTop: '5px', fontWeight: 'bold' },

  // الإعدادات
  settingsSection: { backgroundColor: '#fff', borderRadius: '20px', padding: '10px' },
  settingItem: { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #f1f1f1', color: '#2c3e50', fontWeight: 'bold', fontSize: '14px' }
};

export default Profile;