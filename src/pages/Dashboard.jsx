import React from 'react';

function Dashboard() {
  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🎉 Hoş Geldin!</h1>
      <p>Burası MİRAS Platformu kontrol panelidir.</p>
      
      <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <div style={cardStyle}>📖 Kur'an Takibi</div>
        <div style={cardStyle}>📚 Kitap Okuma</div>
        <div style={cardStyle}>🏃 Spor Aktivitesi</div>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
  cursor: 'pointer'
};

export default Dashboard;