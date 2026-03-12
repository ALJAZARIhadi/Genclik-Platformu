import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function QuranTracker() {
  const navigate = useNavigate();
  const [pageStatuses, setPageStatuses] = useState({});
  const [expandedJuz, setExpandedJuz] = useState(null);
  const userId = localStorage.getItem('userId');

  // --- 1. جلب البيانات عند فتح الصفحة ---
  useEffect(() => {
    console.log("1. بدأ محاولة جلب البيانات للمستخدم:", userId);
    if (userId) {
      fetch(`http://localhost:5000/api/auth/get-quran/${userId}`)
        .then(res => res.json())
        .then(data => {
          console.log("2. البيانات وصلت من السيرفر:", data);
          const savedData = {};
          data.forEach(item => {
            savedData[item.item_number] = item.status;
          });
          setPageStatuses(savedData);
        })
        .catch(err => console.error("❌ خطأ في الجلب:", err));
    }
  }, [userId]);

  // --- 2. دالة الإرسال للسيرفر ---
  const syncWithServer = (itemsArray) => {
    console.log("4. محاولة إرسال البيانات...", itemsArray);
    fetch('http://localhost:5000/api/auth/save-quran', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items: itemsArray })
    })
    .then(res => res.json())
    .then(data => console.log("6. تم الحفظ بنجاح:", data))
    .catch(err => console.error("❌ خطأ في الإرسال:", err));
  };

  // --- 3. تغيير حالة الصفحة ---
  const togglePageStatus = (pageNum) => {
    const currentStatus = pageStatuses[pageNum] || 'none';
    let nextStatus = 'none';

    if (currentStatus === 'none') nextStatus = 'memorized';
    else if (currentStatus === 'memorized') nextStatus = 'review';
    else if (currentStatus === 'review') nextStatus = 'none';

    const newStatuses = { ...pageStatuses, [pageNum]: nextStatus };
    setPageStatuses(newStatuses);
    syncWithServer([{ type: 'page', number: pageNum, status: nextStatus }]);
  };

  // 4. حفظ جزء كامل
  const markWholeJuz = (juzNum, status) => {
    const newStatuses = { ...pageStatuses };
    const itemsToSync = [];
    const startPage = (juzNum - 1) * 20 + 1;
    const endPage = juzNum * 20;

    for (let p = startPage; p <= endPage; p++) {
      newStatuses[p] = status;
      itemsToSync.push({ type: 'page', number: p, status: status });
    }
    setPageStatuses(newStatuses);
    syncWithServer(itemsToSync);
  };

  // === حسابات الإحصائيات ===
  const totalPages = 600; 
  const memorizedCount = Object.values(pageStatuses).filter(s => s === 'memorized').length;
  const reviewCount = Object.values(pageStatuses).filter(s => s === 'review').length;
  const memPercent = (memorizedCount / totalPages) * 100;
  const revPercent = (reviewCount / totalPages) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>⬅ Geri Dön</button>
        <h2 style={{ margin: 0 }}>📖 Kur'an-ı Kerim Takibi</h2>
      </div>

      {/* المربع الأصفر لكشف الـ ID */}
      <div style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>
        رقم الطالب المسجل حالياً هو: {userId ? userId : '🚨 مفقود!'}
      </div>

      <div style={styles.statsCard}>
        <div style={{
          ...styles.donut,
          background: `conic-gradient(#2ecc71 0% ${memPercent}%, #f39c12 ${memPercent}% ${memPercent + revPercent}%, #e0e0e0 ${memPercent + revPercent}% 100%)`
        }}>
          <div style={styles.donutInner}>
            <h2 style={{ margin: 0, color: '#2ecc71' }}>%{Math.round(memPercent)}</h2>
            <small style={{ color: '#7f8c8d' }}>Hafızlık</small>
          </div>
        </div>
        <div style={styles.legend}>
          <div style={{ color: '#2ecc71' }}>● Ezberlendi ({memorizedCount})</div>
          <div style={{ color: '#f39c12' }}>● Tekrar Edilmeli ({reviewCount})</div>
        </div>
      </div>

      <div style={styles.juzList}>
        {Array.from({ length: 30 }, (_, i) => i + 1).map(juzNum => (
          <div key={juzNum} style={styles.juzWrapper}>
            <div style={styles.juzHeader} onClick={() => setExpandedJuz(expandedJuz === juzNum ? null : juzNum)}>
              <b>{juzNum}. Cüz</b>
              <span>{expandedJuz === juzNum ? '🔼' : '▶️'}</span>
            </div>
            {expandedJuz === juzNum && (
              <div style={styles.juzContent}>
                <div style={styles.actionRow}>
                  <button onClick={() => markWholeJuz(juzNum, 'memorized')} style={styles.actionGreen}>Hepsini Ezberledim</button>
                  <button onClick={() => markWholeJuz(juzNum, 'none')} style={styles.actionGray}>Sıfırla</button>
                </div>
                <div style={styles.pagesGrid}>
                  {Array.from({ length: 20 }, (_, i) => (juzNum - 1) * 20 + i + 1).map(pageNum => {
                    const status = pageStatuses[pageNum] || 'none';
                    return (
                      <div key={pageNum} onClick={() => togglePageStatus(pageNum)} style={{ ...styles.pageBox, backgroundColor: status === 'memorized' ? '#2ecc71' : status === 'review' ? '#f39c12' : '#eee', color: status === 'none' ? '#333' : '#fff' }}>
                        {pageNum}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '700px', margin: 'auto', fontFamily: 'sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
  backBtn: { padding: '8px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1' },
  statsCard: { display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '20px' },
  donut: { width: '140px', height: '140px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  donutInner: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  legend: { display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: 'bold' },
  juzList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  juzWrapper: { backgroundColor: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  juzHeader: { padding: '15px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: '#fdfdfd' },
  juzContent: { padding: '15px', borderTop: '1px solid #eee' },
  actionRow: { display: 'flex', gap: '10px', marginBottom: '15px' },
  actionGreen: { flex: 1, padding: '7px', backgroundColor: '#e8f8f5', color: '#16a085', border: '1px solid #1abc9c', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  actionGray: { flex: 1, padding: '7px', backgroundColor: '#f4f6f6', color: '#7f8c8d', border: '1px solid #bdc3c7', borderRadius: '5px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  pagesGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' },
  pageBox: { height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }
};

export default QuranTracker;