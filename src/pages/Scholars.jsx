import React from 'react';
import { useNavigate } from 'react-router-dom';

// قاعدة بيانات محلية (مؤقتة) للعلماء
export const scholarsData = [
  {
    id: 1,
    name: "İbn-i Sina",
    title: "Tıbbın Babası",
    period: "980 - 1037",
    shortDesc: "Tıp, felsefe ve bilim alanında dünyayı etkileyen devasa eserler bıraktı.",
    fullDesc: "Batı'da 'Avicenna' olarak bilinen İbn-i Sina, Orta Çağ modern biliminin kurucularından kabul edilir. En ünlü eseri 'El-Kanun fi't-Tıb' (Tıbbın Kanunu), Avrupa üniversitelerinde asırlarca temel ders kitabı olarak okutulmuştur.",
    achievements: [
      "Tıbbın Kanunu kitabını yazdı.",
      "Hastalıkların bulaşıcı doğasını keşfetti.",
      "Felsefe, astronomi ve kimya alanında 200'den fazla eser verdi."
    ],
    icon: "🩺",
    color: "#3498db"
  },
  {
    id: 2,
    name: "El-Harezmi",
    title: "Cebirin Kurucusu",
    period: "780 - 850",
    shortDesc: "Matematik, astronomi ve coğrafya alanında çığır açan bir dehadır.",
    fullDesc: "Matematikte 'Sıfır' (0) rakamını ilk kullanan ve Cebir biliminin kurucusu olan büyük İslam alimidir. 'Algoritma' kelimesi, onun isminin Avrupa dillerindeki telaffuzundan (Algoritmi) gelmektedir.",
    achievements: [
      "Cebir (Algebra) bilimini kurdu.",
      "Hint-Arap rakam sistemini (0-9) dünyaya tanıttı.",
      "Güneş saatleri ve usturlab üzerine çalışmalar yaptı."
    ],
    icon: "📐",
    color: "#2ecc71"
  },
  {
    id: 3,
    name: "Cezeri",
    title: "Robotik ve Sibernetiğin Babası",
    period: "1136 - 1206",
    shortDesc: "Mekanik mühendisliği ve otomasyon alanında ilk adımları atan dahi.",
    fullDesc: "El-Cezeri, su saatleri, otomatik makineler ve şifreli kilitler gibi dönemi için inanılmaz icatlara imza atmıştır. Artuklu Sarayı'nda başmühendis olarak çalışmış ve Leonardo da Vinci'ye ilham kaynağı olmuştur.",
    achievements: [
      "İlk insansı robot (otomat) tasarımlarını yaptı.",
      "Filli Su Saati'ni icat etti.",
      "Mekanik Hareket Mühendisliği kitabını yazdı."
    ],
    icon: "⚙️",
    color: "#e67e22"
  }
];

function Scholars() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>⬅ Geri Dön</button>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>📚 İslam Alimleri ve Öncüleri</h2>
      </div>

      <p style={styles.subtitle}>Geçmişimizi aydınlatan yıldızları keşfet.</p>

      <div style={styles.grid}>
        {scholarsData.map((scholar) => (
          <div key={scholar.id} style={styles.card}>
            <div style={{ ...styles.iconBox, backgroundColor: scholar.color + '20', color: scholar.color }}>
              {scholar.icon}
            </div>
            <h3 style={styles.cardName}>{scholar.name}</h3>
            <p style={styles.cardTitle}>{scholar.title}</p>
            <p style={styles.cardDesc}>{scholar.shortDesc}</p>
            
            {/* هنا نرسل بيانات العالم بالكامل إلى صفحة التفاصيل عبر state */}
            <button 
              onClick={() => navigate(`/scholar/${scholar.id}`, { state: scholar })} 
              style={{ ...styles.actionBtn, backgroundColor: scholar.color }}
            >
              Keşfet (تعرف)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '900px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' },
  backBtn: { padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1', fontWeight: 'bold' },
  subtitle: { color: '#7f8c8d', marginBottom: '30px', fontSize: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#fff', borderRadius: '15px', padding: '25px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee', transition: 'transform 0.3s' },
  iconBox: { fontSize: '40px', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 15px' },
  cardName: { fontSize: '20px', color: '#2c3e50', margin: '0 0 5px 0' },
  cardTitle: { fontSize: '14px', color: '#7f8c8d', margin: '0 0 15px 0', fontStyle: 'italic' },
  cardDesc: { fontSize: '14px', color: '#555', marginBottom: '20px', minHeight: '60px' },
  actionBtn: { width: '100%', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px', transition: 'opacity 0.2s' }
};

export default Scholars;