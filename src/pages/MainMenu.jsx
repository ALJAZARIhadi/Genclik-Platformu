import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();
  // جلب اسم المستخدم من الذاكرة
  const userName = localStorage.getItem('userName') || 'Öğrenci'; 

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.clear(); // مسح بيانات الدخول
    navigate('/'); // العودة لصفحة تسجيل الدخول
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>Hoş Geldin, {userName}! 👋</h2>
          <p style={{ margin: '5px 0 0 0', color: '#7f8c8d' }}>Bugün kendini geliştirmek için ne yapmak istersin?</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>Çıkış Yap</button>
      </div>

      <div style={styles.menuGrid}>
        
        {/* 1. قسم القرآن الكريم */}
        <div style={styles.card} onClick={() => navigate('/quran-tracker')}>
          <div style={styles.iconBgQuran}>📖</div>
          <h3 style={styles.cardTitle}>Kur'an-ı Kerim</h3>
          <p style={styles.desc}>Ezber ve tekrar durumunu takip et, kalbini nurlandır.</p>
        </div>

        {/* 2. قسم الرياضة (الجديد) 🏃‍♂️ */}
        <div style={styles.card} onClick={() => navigate('/sports-tracker')}>
          <div style={styles.iconBgSports}>🏋️‍♂️</div>
          <h3 style={styles.cardTitle}>Spor & Hareket</h3>
          <p style={styles.desc}>Sağlam kafa sağlam vücutta bulunur. Günlük hedeflerini tamamla!</p>
        </div>

        {/* 3. قسم السيرة (كمثال للأقسام القادمة) */}
        <div style={{ ...styles.card, opacity: 0.6, cursor: 'not-allowed' }}>
          <div style={styles.iconBgDisabled}>🕌</div>
          <h3 style={styles.cardTitle}>Siyer (Yakında)</h3>
          <p style={styles.desc}>Peygamberimizin hayatı ve ahlakı.</p>
        </div>

        {/* 4. قسم العلماء (الجديد) 💡 */}
        <div style={styles.card} onClick={() => navigate('/scholars')}>
          <div style={{...styles.iconBgSports, backgroundColor: '#fef5e7'}}>🧠</div>
          <h3 style={styles.cardTitle}>İslam Alimleri</h3>
          <p style={styles.desc}>Tarihimize yön veren bilim öncülerini yakından tanı.</p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: { padding: '30px', maxWidth: '900px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' },
  logoutBtn: { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
  menuGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px' },
  card: { backgroundColor: '#fff', padding: '30px 20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s, box-shadow 0.2s', border: '1px solid #f0f0f0' },
  cardTitle: { color: '#2c3e50', marginBottom: '10px', fontSize: '18px' },
  iconBgQuran: { fontSize: '45px', backgroundColor: '#e8f8f5', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', margin: '0 auto 15px auto' },
  iconBgSports: { fontSize: '45px', backgroundColor: '#ebf5fb', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', margin: '0 auto 15px auto' },
  iconBgDisabled: { fontSize: '45px', backgroundColor: '#f4f6f6', width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', margin: '0 auto 15px auto', filter: 'grayscale(100%)' },
  desc: { color: '#7f8c8d', fontSize: '13px', margin: 0, lineHeight: '1.5' }
};

export default MainMenu;