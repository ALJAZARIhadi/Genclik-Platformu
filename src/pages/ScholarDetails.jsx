import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScholarDetails() {
  const { state } = useLocation(); // استلام البيانات المرسلة من صفحة البطاقات
  const navigate = useNavigate();

  // إذا تم فتح الصفحة مباشرة بدون بيانات، نرجعه للقائمة
  if (!state) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Bilgi bulunamadı!</h2>
        <button onClick={() => navigate('/scholars')} style={{ padding: '10px' }}>Geri Dön</button>
      </div>
    );
  }

  const scholar = state;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/scholars')} style={styles.backBtn}>⬅ Alimler Listesine Dön</button>

      <div style={styles.heroCard}>
        <div style={{ ...styles.bigIcon, backgroundColor: scholar.color + '20', color: scholar.color }}>
          {scholar.icon}
        </div>
        <div style={styles.heroInfo}>
          <h1 style={styles.name}>{scholar.name}</h1>
          <h3 style={styles.title}>{scholar.title}</h3>
          <span style={styles.period}>⏳ Yaşadığı Dönem: {scholar.period}</span>
        </div>
      </div>

      <div style={styles.contentBox}>
        <h2 style={{ color: scholar.color, borderBottom: `2px solid ${scholar.color}40`, paddingBottom: '10px' }}>Hayatı ve Katkıları</h2>
        <p style={styles.paragraph}>{scholar.fullDesc}</p>
      </div>

      <div style={styles.contentBox}>
        <h2 style={{ color: scholar.color, borderBottom: `2px solid ${scholar.color}40`, paddingBottom: '10px' }}>💡 Başlıca Başarıları</h2>
        <ul style={styles.list}>
          {scholar.achievements.map((item, index) => (
            <li key={index} style={styles.listItem}>
              <span style={{ color: scholar.color, marginRight: '10px' }}>✔</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  backBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1', fontWeight: 'bold', marginBottom: '20px' },
  heroCard: { display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' },
  bigIcon: { fontSize: '70px', width: '120px', height: '120px', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  name: { margin: '0 0 5px 0', fontSize: '32px', color: '#2c3e50' },
  title: { margin: '0 0 15px 0', fontSize: '18px', color: '#7f8c8d', fontWeight: 'normal' },
  period: { display: 'inline-block', backgroundColor: '#f4f6f6', padding: '5px 15px', borderRadius: '20px', fontSize: '14px', color: '#555', fontWeight: 'bold' },
  contentBox: { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px' },
  paragraph: { lineHeight: '1.8', color: '#444', fontSize: '16px' },
  list: { listStyleType: 'none', padding: 0 },
  listItem: { fontSize: '16px', color: '#444', marginBottom: '15px', display: 'flex', alignItems: 'flex-start', lineHeight: '1.5', padding: '10px', backgroundColor: '#f9fbfd', borderRadius: '8px' }
};

export default ScholarDetails;