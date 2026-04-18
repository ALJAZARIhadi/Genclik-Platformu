import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Scholars() {
  const [scholarsData, setScholarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/scholars');
        setScholarsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setLoading(false);
      }
    };
    fetchScholars();
  }, []);

  const goToDetails = (scholar) => {
    navigate('/scholar-details', { state: scholar });
  };

  if (loading) return <div style={styles.loading}>Yükleniyor...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>İslam Bilim İnsanları</h1>
        <p style={styles.subtitle}>Tarihin akışını değiştiren dehalar</p>
      </header>

      <div style={styles.grid}>
        {scholarsData.map((scholar) => (
          <div key={scholar.id} style={styles.card}>
            {/* قسم الصورة */}
            <div style={styles.imageContainer}>
              <img src={scholar.image} alt={scholar.nameTr} style={styles.cardImage} />
            </div>

            {/* محتوى الكرت */}
            <div style={styles.cardContent}>
              <h2 style={styles.scholarName}>{scholar.nameTr}</h2>
              <p style={styles.scholarTitle}>{scholar.titleTr}</p>
              
              {/* التخصصات كبصمات صغيرة */}
              <div style={styles.tagsWrapper}>
                {scholar.tagsTr && scholar.tagsTr.split(',').slice(0, 2).map((tag, i) => (
                  <span key={i} style={styles.tagBadge}>{tag.trim()}</span>
                ))}
              </div>

              <button onClick={() => goToDetails(scholar)} style={styles.detailsBtn}>
                Detayları Gör
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '50px 20px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Segoe UI', Roboto, sans-serif" },
  header: { textAlign: 'center', marginBottom: '50px' },
  mainTitle: { fontSize: '38px', color: '#2c3e50', fontWeight: '800', marginBottom: '10px' },
  subtitle: { fontSize: '18px', color: '#7f8c8d', fontStyle: 'italic' },
  loading: { textAlign: 'center', marginTop: '100px', fontSize: '20px', color: '#34495e' },
  
  // شبكة الكروت
  grid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '30px', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },

  // تصميم الكرت الفردي
  card: { 
    backgroundColor: '#fff', 
    borderRadius: '15px', 
    overflow: 'hidden', 
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)', 
    transition: 'transform 0.3s ease, boxShadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #eee'
  },
  
  imageContainer: { width: '100%', height: '200px', overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' },
  
  cardContent: { padding: '20px', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' },
  scholarName: { fontSize: '22px', color: '#333', margin: '10px 0 5px 0', fontWeight: '700' },
  scholarTitle: { fontSize: '14px', color: '#27ae60', fontWeight: '600', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' },
  
  tagsWrapper: { display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '20px', flexWrap: 'wrap' },
  tagBadge: { backgroundColor: '#f0f2f5', color: '#555', padding: '4px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: '500' },

  detailsBtn: { 
    marginTop: 'auto',
    padding: '12px', 
    backgroundColor: '#2c3e50', 
    color: '#fff', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    fontSize: '14px', 
    transition: 'background 0.3s' 
  }
};

export default Scholars;