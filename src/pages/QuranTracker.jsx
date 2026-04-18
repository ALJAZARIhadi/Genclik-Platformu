import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function QuranTracker() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pageStatuses, setPageStatuses] = useState({});
  const [expandedJuz, setExpandedJuz] = useState(null);
  const userId = localStorage.getItem('userId');

  // --- 1. جلب البيانات عند فتح الصفحة ---
  useEffect(() => {
    if (userId && userId !== "undefined") {
      fetch(`http://localhost:5000/api/auth/get-quran/${userId}`)
        .then(res => res.json())
        .then(data => {
          const savedData = {};
          if (Array.isArray(data)) {
              data.forEach(item => {
                const pageNum = item.page_number || item.item_number; 
                if (pageNum) {
                    savedData[pageNum] = item.status;
                }
              });
              setPageStatuses(savedData);
          }
        })
        .catch(err => console.error("❌ خطأ في الجلب:", err));
    }
  }, [userId]);

  // --- 2. دالة الإرسال للسيرفر ---
  const syncWithServer = (itemsArray) => {
    if (!userId || userId === "undefined") {
        alert("الرجاء تسجيل الدخول أولاً!");
        return;
    }
    fetch('http://localhost:5000/api/auth/save-quran', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, items: itemsArray })
    })
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

  // --- 4. حفظ جزء كامل ---
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

  // === حسابات الإحصائيات العامة للدونات ===
  const totalPages = 600; 
  const memorizedCount = Object.values(pageStatuses).filter(s => s === 'memorized').length;
  const reviewCount = Object.values(pageStatuses).filter(s => s === 'review').length;
  const totalProgressCount = memorizedCount + reviewCount;
  
  const memPercent = (memorizedCount / totalPages) * 100;
  const revPercent = (reviewCount / totalPages) * 100;
  const totalPercent = (totalProgressCount / totalPages) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/menu')} style={styles.backBtn}> {t('back_btn')} </button>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>📖 Kur'an-ı Kerim Takibi</h2>
      </div>

      <div style={styles.statsCard}>
        <div style={{
          ...styles.donut,
          background: `conic-gradient(#2ecc71 0% ${memPercent}%, #f39c12 ${memPercent}% ${memPercent + revPercent}%, #e0e0e0 ${memPercent + revPercent}% 100%)`
        }}>
          <div style={styles.donutInner}>
            <h2 style={{ margin: 0, color: '#2c3e50' }}>%{Math.round(totalPercent)}</h2>
            <small style={{ color: '#7f8c8d' }}>Toplam</small>
          </div>
        </div>
        <div style={styles.legend}>
          <div style={{ color: '#2ecc71' }}>● Ezberlendi ({memorizedCount})</div>
          <div style={{ color: '#f39c12' }}>● Tekrar Edilmeli ({reviewCount})</div>
        </div>
      </div>

      <div style={styles.juzGrid}>
        {Array.from({ length: 30 }, (_, i) => i + 1).map(juzNum => {
          
          // --- حسابات خاصة بكل جزء للحفظ والمراجعة ---
          const startPage = (juzNum - 1) * 20 + 1;
          const endPage = juzNum * 20;
          let memInJuz = 0;
          let revInJuz = 0;
          
          for (let p = startPage; p <= endPage; p++) {
            if (pageStatuses[p] === 'memorized') memInJuz++;
            else if (pageStatuses[p] === 'review') revInJuz++;
          }
          
          const memPct = (memInJuz / 20) * 100;
          const revPct = (revInJuz / 20) * 100;
          const isFull = (memInJuz + revInJuz) === 20;

          return (
            <div key={juzNum} style={{
              ...styles.juzWrapper, 
              borderColor: isFull ? '#2ecc71' : ((memInJuz + revInJuz) > 0 ? '#3498db' : '#eee'),
            }}>
              
              <div style={styles.juzHeader} onClick={() => setExpandedJuz(expandedJuz === juzNum ? null : juzNum)}>
                <div style={styles.juzHeaderTop}>
                  <b style={{ color: '#2c3e50', fontSize: '16px' }}>{juzNum}. Cüz</b>
                  <span>{expandedJuz === juzNum ? '🔼' : '🔽'}</span>
                </div>
                
                {/* شريط التقدم المطور: يعرض اللونين معاً */}
                <div style={styles.miniProgressBg}>
                  <div style={{ ...styles.miniProgressFill, width: `${memPct}%`, backgroundColor: '#2ecc71' }}></div>
                  <div style={{ ...styles.miniProgressFill, width: `${revPct}%`, backgroundColor: '#f39c12' }}></div>
                </div>

                <div style={styles.miniProgressText}>
                  <span style={{color: '#27ae60'}}>{memInJuz}✔</span> 
                  <span style={{margin: '0 5px', color: '#ccc'}}>|</span>
                  <span style={{color: '#e67e22'}}>{revInJuz}🔄</span>
                </div>
              </div>

              {expandedJuz === juzNum && (
                <div style={styles.juzContent}>
                  <div style={styles.actionRow}>
                    <button onClick={() => markWholeJuz(juzNum, 'memorized')} style={styles.actionGreen}>{t('mark_all')}</button>
                    <button onClick={() => markWholeJuz(juzNum, 'none')} style={styles.actionGray}>{t('reset')}</button>
                  </div>
                  <div style={styles.pagesGrid}>
                    {Array.from({ length: 20 }, (_, i) => (juzNum - 1) * 20 + i + 1).map(pageNum => {
                      const status = pageStatuses[pageNum] || 'none';
                      return (
                        <div key={pageNum} onClick={() => togglePageStatus(pageNum)} style={{ 
                            ...styles.pageBox, 
                            backgroundColor: status === 'memorized' ? '#2ecc71' : status === 'review' ? '#f39c12' : '#eee', 
                            color: status === 'none' ? '#333' : '#fff' 
                        }}>
                          {pageNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
  backBtn: { padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1', fontWeight: 'bold' },
  statsCard: { display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '25px' },
  donut: { width: '120px', height: '120px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  donutInner: { width: '85px', height: '85px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  legend: { display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px' },
  juzGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' },
  juzWrapper: { borderRadius: '12px', border: '2px solid', transition: 'all 0.3s ease', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  juzHeader: { padding: '15px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' },
  juzHeaderTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  
  // شريط التقدم الصغير أصبح Flex ليحتوي على اللونين
  miniProgressBg: { height: '8px', backgroundColor: '#ecf0f1', borderRadius: '4px', overflow: 'hidden', width: '100%', display: 'flex' },
  miniProgressFill: { height: '100%', transition: 'width 0.5s ease' },
  
  miniProgressText: { fontSize: '12px', textAlign: 'right', fontWeight: 'bold' },
  juzContent: { padding: '15px', borderTop: '1px solid #eee', backgroundColor: '#fafafa' },
  actionRow: { display: 'flex', gap: '10px', marginBottom: '15px' },
  actionGreen: { flex: 1, padding: '8px', backgroundColor: '#e8f8f5', color: '#16a085', border: '1px solid #1abc9c', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  actionGray: { flex: 1, padding: '8px', backgroundColor: '#fff', color: '#7f8c8d', border: '1px solid #bdc3c7', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' },
  pagesGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' },
  pageBox: { height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'transform 0.1s', userSelect: 'none' }
};

export default QuranTracker;