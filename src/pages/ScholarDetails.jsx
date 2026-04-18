import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScholarDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // إذا لم يجد بيانات (تحديث الصفحة يدوياً)
  if (!state) {
    return (
      <div style={styles.errorContainer}>
        <h2>Bilgi bulunamadı!</h2>
        <p>Lütfen ana sayfaya dönüp bir bilim insanı seçin.</p>
        <button onClick={() => navigate('/scholars')} style={styles.backBtn}>
          Ansiklopediye Dön
        </button>
      </div>
    );
  }

  const scholar = state;
  
  // تحويل التخصصات من نص (قادم من الداتابيز) إلى مصفوفة لعرضها بشكل جميل
  const tagsList = typeof scholar.tags === 'string' 
    ? scholar.tags.split(',').map(tag => tag.trim()) 
    : (scholar.tags || []);

  return (
    <div style={styles.container}>
      
      {/* زر العودة */}
      <button onClick={() => navigate('/scholars')} style={styles.backBtn}>
        ⬅ Ansiklopediye Dön
      </button>

      {/* القسم العلوي (البطاقة الشخصية) */}
      <div style={styles.heroSection}>
        <div style={styles.imageWrapper}>
          <img src={scholar.image} alt={scholar.name} style={styles.image} />
        </div>
        
        <div style={styles.heroInfo}>
          <h1 style={styles.name}>{scholar.name}</h1>
          <h2 style={styles.title}>{scholar.title}</h2>
          
          {/* التخصصات (Tags) */}
          <div style={styles.tagsContainer}>
            {tagsList.map((tag, idx) => (
              tag && <span key={idx} style={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* قسم السيرة (Biyografi) */}
      <div style={styles.bioSection}>
        <h3 style={styles.sectionTitle}>📖 Kısa Biyografi</h3>
        <span style={styles.quoteIcon}>❝</span>
        <p style={styles.bioText}>{scholar.bio}</p>
      </div>

    </div>
  );
}

const styles = {
  container: { padding: '40px 20px', maxWidth: '850px', margin: 'auto', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' },
  errorContainer: { textAlign: 'center', marginTop: '100px', fontFamily: 'Arial, sans-serif', color: '#2c3e50' },
  
  backBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#34495e', color: '#fff', fontWeight: 'bold', marginBottom: '30px', transition: '0.3s', fontSize: '15px' },
  
  heroSection: { display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px', flexWrap: 'wrap' },
  imageWrapper: { width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #3498db', flexShrink: 0, boxShadow: '0 5px 15px rgba(52, 152, 219, 0.3)' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  heroInfo: { flex: 1 },
  name: { margin: '0 0 8px 0', fontSize: '32px', color: '#2c3e50', fontWeight: 'bold' },
  title: { margin: '0 0 15px 0', fontSize: '18px', color: '#7f8c8d' },
  
  tagsContainer: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' },
  tag: { padding: '6px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', backgroundColor: '#e8f4f8', color: '#2980b9' },

  bioSection: { position: 'relative', backgroundColor: '#fff', padding: '40px 30px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  sectionTitle: { margin: '0 0 20px 0', color: '#2c3e50', fontSize: '22px', borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' },
  quoteIcon: { position: 'absolute', top: '70px', left: '20px', fontSize: '60px', color: '#ecf0f1', lineHeight: '1', zIndex: 0 },
  bioText: { margin: 0, fontSize: '17px', lineHeight: '1.8', color: '#34495e', position: 'relative', zIndex: 1 }
};

export default ScholarDetails;