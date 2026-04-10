import React, { useEffect } from 'react';
import confetti from 'canvas-confetti'; // (اختياري) لو أردت إضافة قصاصات ورق ملونة لاحقاً

function StreakCelebration({ currentStreak, onClose }) {
  
  // إخفاء التأثير تلقائياً بعد 3 ثوانٍ
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={styles.overlay}>
      <div style={styles.content} className="animate-pop">
        
        {/* رقم +1 الطائر */}
        <div style={styles.plusOne} className="animate-float">+1</div>
        
        {/* أيقونة النار الكبيرة */}
        <div style={styles.fireIcon} className="animate-glow">🔥</div>
        
        {/* النص التحفيزي */}
        <h2 style={styles.title}>Harika!</h2>
        <p style={styles.subtitle}>
          Serini <strong>{currentStreak}</strong> güne çıkardın!
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // خلفية شفافة مظلمة لتركيز الانتباه
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // ليكون فوق كل شيء في الموقع
    backdropFilter: 'blur(5px)' // تغبيش الخلفية
  },
  content: {
    backgroundColor: 'var(--card-bg)',
    padding: '40px 60px',
    borderRadius: '30px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 20px 50px rgba(255, 152, 0, 0.3)'
  },
  fireIcon: {
    fontSize: '120px',
    lineHeight: '1',
    margin: '10px 0'
  },
  plusOne: {
    position: 'absolute',
    top: '10px',
    right: '40%',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#ff9800',
  },
  title: {
    fontSize: '32px',
    color: '#ff9800',
    margin: '10px 0 5px 0'
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-main)',
    margin: '0'
  }
};

export default StreakCelebration;
