import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Miras Platformu 🌟</h2>
        <p style={styles.subtitle}>Bugün hangi alanda kendini geliştirmek istersin?</p>
      </div>

      <div style={styles.grid}>
        {/* القسم الأول: القرآن الكريم */}
        <div 
          className="hover-card" 
          style={{ ...styles.card, borderTop: '5px solid #2ecc71' }} 
          onClick={() => navigate('/quran-tracker')}
        >
          <div style={{ ...styles.iconBox, backgroundColor: '#eafaf1', color: '#27ae60' }}>📖</div>
          <h3 style={styles.cardTitle}>Kur'an-ı Kerim</h3>
          <p style={styles.cardDesc}>Günlük okuma ve ezber takibi.</p>
        </div>

        {/* القسم الثاني: الرياضة */}
        <div 
          className="hover-card" 
          style={{ ...styles.card, borderTop: '5px solid #e74c3c' }} 
          onClick={() => navigate('/sports-tracker')}
        >
          <div style={{ ...styles.iconBox, backgroundColor: '#fdedec', color: '#c0392b' }}>🏋️‍♂️</div>
          <h3 style={styles.cardTitle}>Spor ve Sağlık</h3>
          <p style={styles.cardDesc}>Fiziksel aktivitelerini kaydet.</p>
        </div>

        {/* القسم الثالث: العلماء */}
        <div 
          className="hover-card" 
          style={{ ...styles.card, borderTop: '5px solid #9b59b6' }} 
          onClick={() => navigate('/scholars')}
        >
          <div style={{ ...styles.iconBox, backgroundColor: '#f5eef8', color: '#8e44ad' }}>🧠</div>
          <h3 style={styles.cardTitle}>Alimlerimiz</h3>
          <p style={styles.cardDesc}>İslam alimlerinin ilham verici hayatları.</p>
        </div>

        {/* القسم الرابع: التقويم الأكاديمي */}
        <div 
          className="hover-card" 
          style={{ ...styles.card, borderTop: '5px solid #3498db' }} 
          onClick={() => navigate('/academic-tracker')}
        >
          <div style={{ ...styles.iconBox, backgroundColor: '#ebf5fb', color: '#2980b9' }}>🎓</div>
          <h3 style={styles.cardTitle}>Akademik Koç</h3>
          <p style={styles.cardDesc}>Sınavlarını, ödevlerini ve zamanını yönet.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center'
  },
  header: {
    marginBottom: '40px'
  },
  title: {
    fontSize: '32px',
    color: 'var(--text-main)', // متصل بالوضع الليلي
    marginBottom: '10px',
    transition: 'color 0.3s ease'
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-sub)', // متصل بالوضع الليلي
    transition: 'color 0.3s ease'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', // تقسيم الشاشة لمربعين (2x2)
    gap: '25px',
  },
  card: {
    backgroundColor: 'var(--card-bg)', // متصل بالوضع الليلي
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px var(--shadow)', // متصل بالوضع الليلي
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    transition: 'background-color 0.3s ease, border 0.3s ease'
  },
  iconBox: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '35px',
    marginBottom: '15px'
  },
  cardTitle: {
    margin: '0 0 10px 0',
    color: 'var(--text-main)', // متصل بالوضع الليلي
    fontSize: '22px',
    fontWeight: 'bold',
    transition: 'color 0.3s ease'
  },
  cardDesc: {
    margin: '0',
    color: 'var(--text-sub)', // متصل بالوضع الليلي
    fontSize: '15px',
    transition: 'color 0.3s ease'
  }
};

export default MainMenu;