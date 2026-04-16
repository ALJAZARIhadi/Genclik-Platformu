import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StreakCelebration from './StreakCelebration'; // 1. استيراد المكون

function Profile() {
  const navigate = useNavigate();
  // 2. حالة الستريك وحالة ظهور الاحتفال
  const [streak, setStreak] = useState(parseInt(localStorage.getItem('streak') || '1'));
  const [showCelebration, setShowCelebration] = useState(false);

  // دالة تُنفذ عند الضغط على زر إنهاء مهمة
  const handleTaskComplete = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('streak', newStreak); // تحديث الرقم في الذاكرة
    setShowCelebration(true); // إظهار الاحتفال!
  };

  const stats = { userName: "Miras Talebesi", quran: { memorized: 15, review: 8, total: 604 } };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      
      {/* 3. استدعاء مكون الاحتفال (سيظهر فقط إذا كانت الحالة true) */}
      {showCelebration && (
        <StreakCelebration 
          currentStreak={streak} 
          onClose={() => setShowCelebration(false)} 
        />
      )}

      {/* باقي تصميم البروفايل */}
      <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', backgroundColor: '#ddd', borderRadius: '50%', fontSize: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>👤</div>
        <h2 style={{ fontSize: '24px', color: 'var(--text-main)', margin: '0' }}>{stats.userName}</h2>
        <div style={{ marginTop: '10px', backgroundColor: '#fef5e7', color: '#e67e22', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>🔥 {streak} Günlük Seri</div>
      </div>

      {/* 4. زر التجربة (يمكنك نقله لاحقاً لصفحة حفظ القرآن) */}
      <button 
        onClick={handleTaskComplete}
        style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 5px 15px rgba(46, 204, 113, 0.4)' }}>
        ✅ Bugünkü Görevi Tamamla! (Test)
      </button>

    </div>
  );
}

export default Profile;