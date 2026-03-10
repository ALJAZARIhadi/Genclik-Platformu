import React from 'react';

function Dashboard() {
  const role = localStorage.getItem('userRole'); // جلب الرتبة المحفوظة

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>MİRAS Kontrol Paneli</h1>
      <p>Hoş geldin! Rolün: <b>{role === 'admin' ? 'Yönetici' : 'Öğrenci'}</b></p>

      {role === 'admin' ? (
        /* واجهة الأدمن (المراقب) */
        <div style={adminSectionStyle}>
          <h2>👀 Gözlem Masası</h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <div style={cardStyle}>👥 Öğrenci Listesi</div>
            <div style={cardStyle}>📊 Genel Raporlar</div>
            <div style={cardStyle}>➕ Yeni Öğrenci Ekle</div>
          </div>
        </div>
      ) : (
        /* واجهة المستخدم (المنفذ للأنشطة) */
        <div style={userSectionStyle}>
          <h2>🎯 Aktivitelerim</h2>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <div style={cardStyle}>📖 Kur'an Takibi</div>
            <div style={cardStyle}>📚 Kitap Okuma</div>
            <div style={cardStyle}>🏋️ Spor</div>
          </div>
        </div>
      )}
    </div>
  );
}

// تنسيقات بسيطة
const cardStyle = { padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9', cursor: 'pointer' };
const adminSectionStyle = { marginTop: '30px', border: '2px solid #3498db', padding: '20px', borderRadius: '15px' };
const userSectionStyle = { marginTop: '30px', border: '2px solid #2ecc71', padding: '20px', borderRadius: '15px' };

export default Dashboard;