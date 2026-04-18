import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ScholarDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // إذا لم يجد بيانات (بسبب تحديث الصفحة يدوياً)، سيطلب منك العودة
  if (!state) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
        <h2>Bilgi bulunamadı! / لا توجد معلومات!</h2>
        <p>يرجى العودة للصفحة الرئيسية واختيار عالم.</p>
        <button onClick={() => navigate('/scholars')} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
          Geri Dön / عودة للموسوعة
        </button>
      </div>
    );
  }

  const scholar = state;
  const isRTL = scholar.isRTL;

  // وضعنا التصميم هنا ليتعرف على isRTL بدون أي تعليق للأكواد
  const styles = {
    container: { padding: '20px', maxWidth: '850px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, sans-serif', backgroundColor: '#fdf6e3', minHeight: '100vh' },
    backBtn: { padding: '10px 20px', borderRadius: '10px', border: '1px solid #d4af37', cursor: 'pointer', backgroundColor: '#fffcf5', color: '#5c4033', fontWeight: 'bold', marginBottom: '25px', transition: '0.3s' },
    
    heroSection: { display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#fffcf5', padding: '30px', borderRadius: '25px', boxShadow: '0 10px 30px rgba(92, 64, 51, 0.08)', marginBottom: '30px', flexWrap: 'wrap', border: '1px solid #e0d4b8' },
    imageWrapper: { width: '160px', height: '160px', borderRadius: '20px', overflow: 'hidden', border: '5px solid', flexShrink: 0, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' },
    image: { width: '100%', height: '100%', objectFit: 'cover' },
    heroInfo: { flex: 1 },
    name: { margin: '0 0 10px 0', fontSize: '36px', color: '#3e2723', fontWeight: '800' },
    title: { margin: '0 0 15px 0', fontSize: '20px', color: '#8d6e63', fontWeight: '600' },
    metaData: { display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' },
    badge: { backgroundColor: '#f4f1ea', padding: '8px 15px', borderRadius: '12px', fontSize: '14px', color: '#5c4033', fontWeight: 'bold', border: '1px solid #eaddc5' },
    tagsContainer: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    tag: { padding: '6px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' },

    bioSection: { position: 'relative', backgroundColor: '#fffcf5', padding: '40px 30px', borderRadius: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.03)', marginBottom: '30px', borderLeft: isRTL ? 'none' : '4px solid #d4af37', borderRight: isRTL ? '4px solid #d4af37' : 'none' },
    quoteIcon: { position: 'absolute', top: '10px', left: isRTL ? 'auto' : '20px', right: isRTL ? '20px' : 'auto', fontSize: '60px', opacity: '0.2', lineHeight: '1' },
    bioText: { margin: 0, fontSize: '18px', lineHeight: '1.8', color: '#4e342e', textAlign: 'justify', position: 'relative', zIndex: 1 },

    sectionTitle: { fontSize: '24px', color: '#3e2723', borderBottom: '3px solid', paddingBottom: '10px', marginBottom: '20px', display: 'inline-block' },

    achievementsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' },
    achievementCard: { backgroundColor: '#fffcf5', padding: '25px', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.04)', position: 'relative', borderTop: '5px solid' },
    achievementNumber: { position: 'absolute', top: '-15px', right: isRTL ? '20px' : 'auto', left: isRTL ? 'auto' : '20px', width: '30px', height: '30px', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', fontWeight: 'bold', fontSize: '14px' },
    achievementText: { margin: '10px 0 0 0', fontSize: '16px', color: '#4e342e', lineHeight: '1.6', fontWeight: '500' },

    mapContainer: { width: '100%', height: '350px', borderRadius: '25px', overflow: 'hidden', border: '2px solid #e0d4b8', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', backgroundColor: '#eaddc5' }
  };

  return (
    <div style={{...styles.container, direction: isRTL ? 'rtl' : 'ltr'}}>
      
      {/* زر العودة */}
      <button onClick={() => navigate('/scholars')} style={styles.backBtn}>
        {isRTL ? '⬅ العودة للموسوعة' : '⬅ Ansiklopediye Dön'}
      </button>

      {/* 1. القسم العلوي (البطاقة الشخصية) */}
      <div style={styles.heroSection}>
        <div style={{ ...styles.imageWrapper, borderColor: scholar.color }}>
          <img src={scholar.image} alt={scholar.name} style={styles.image} />
        </div>
        
        <div style={styles.heroInfo}>
          <h1 style={styles.name}>{scholar.name}</h1>
          <h2 style={styles.title}>{scholar.title}</h2>
          
          <div style={styles.metaData}>
            <span style={styles.badge}>⏳ {scholar.period}</span>
            <span style={styles.badge}>📍 {scholar.birthCity}</span>
          </div>

          {/* التخصصات (Tags) */}
          <div style={styles.tagsContainer}>
            {scholar.tags && scholar.tags.map((tag, idx) => (
              <span key={idx} style={{...styles.tag, backgroundColor: scholar.color + '20', color: scholar.color}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. قسم النبذة (بتصميم اقتباس) */}
      <div style={styles.bioSection}>
        <span style={{...styles.quoteIcon, color: scholar.color}}>❝</span>
        <p style={styles.bioText}>{scholar.fullDesc}</p>
      </div>

      {/* 3. الإنجازات (شبكة بطاقات عصرية) */}
      <h3 style={{...styles.sectionTitle, borderBottomColor: scholar.color}}>
        💡 {isRTL ? 'أبرز الإنجازات' : 'Başlıca Başarıları'}
      </h3>
      <div style={styles.achievementsGrid}>
        {scholar.achievements.map((item, index) => (
          <div key={index} style={{...styles.achievementCard, borderTopColor: scholar.color}}>
            <div style={{...styles.achievementNumber, backgroundColor: scholar.color}}>
              {index + 1}
            </div>
            <p style={styles.achievementText}>{item}</p>
          </div>
        ))}
      </div>

      {/* 4. قسم الخريطة (مسقط الرأس) */}
      {scholar.mapUrl && (
        <>
          <h3 style={{...styles.sectionTitle, borderBottomColor: scholar.color}}>
            🌍 {isRTL ? 'مسقط رأسه' : 'Doğum Yeri'} - {scholar.birthCity}
          </h3>
          <div style={styles.mapContainer}>
            <iframe 
              title="Birthplace Map"
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src={scholar.mapUrl}
              style={{ filter: 'grayscale(0.3) sepia(0.4)' }}
            ></iframe>
          </div>
        </>
      )}

    </div>
  );
}

export default ScholarDetails;