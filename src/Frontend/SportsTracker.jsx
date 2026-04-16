import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SportsTracker() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  
  // الحصول على تاريخ اليوم بصيغة YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  
  // قائمة التمارين الأساسية
  const initialExercises = {
    walking: { title: "🚶‍♂️ 5000 Adım Yürüyüş", completed: false, calories: 150 },
    pushups: { title: "🏋️‍♂️ 20 Şınav", completed: false, calories: 50 },
    situps: { title: "🧘‍♂️ 30 Mekik", completed: false, calories: 40 },
    water: { title: "💧 2 Litre Su İçmek", completed: false, calories: 0 }
  };

  const [exercises, setExercises] = useState(initialExercises);
  const [loading, setLoading] = useState(true);

  // جلب بيانات اليوم من السيرفر
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/auth/get-sports/${userId}/${today}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const updatedExercises = { ...initialExercises };
            data.forEach(item => {
              if (updatedExercises[item.exercise_type]) {
                updatedExercises[item.exercise_type].completed = item.is_completed === 1;
              }
            });
            setExercises(updatedExercises);
          }
          setLoading(false); // إيقاف التحميل بعد نجاح الجلب
        })
        .catch(err => {
          console.error("خطأ في جلب بيانات الرياضة:", err);
          setLoading(false); // إيقاف التحميل حتى لو حدث خطأ
        });
    } else {
      // 🚀 السطر السحري: إذا لم يكن هناك مستخدم مسجل، أوقف التحميل فوراً!
      setLoading(false);
    }
  }, [userId, today]);

  // دالة تغيير حالة التمرين وإرسالها للسيرفر
  const toggleExercise = (type) => {
    const isNowCompleted = !exercises[type].completed;
    
    // تحديث الواجهة فوراً
    const newExercises = { ...exercises, [type]: { ...exercises[type], completed: isNowCompleted } };
    setExercises(newExercises);

    // إرسال التحديث للسيرفر
    fetch('http://localhost:5000/api/auth/save-sports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        date: today, 
        exercises: [{ type: type, completed: isNowCompleted }] 
      })
    })
    .catch(err => console.error("خطأ في الحفظ:", err));
  };

  // حساب الإحصائيات
  const totalCompleted = Object.values(exercises).filter(ex => ex.completed).length;
  const totalExercises = Object.keys(exercises).length;
  const burnedCalories = Object.values(exercises).reduce((total, ex) => ex.completed ? total + ex.calories : total, 0);
  const progressPercent = (totalCompleted / totalExercises) * 100;

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Yükleniyor...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/menu')} style={styles.backBtn}>⬅ Geri Dön</button>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>🏃‍♂️ Günlük Spor Takibi</h2>
      </div>

      <div style={styles.dateBanner}>
        📅 <b>Bugünün Tarihi:</b> {new Date().toLocaleDateString('tr-TR')}
      </div>

      <div style={styles.statsCard}>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>{totalCompleted}/{totalExercises}</div>
          <div style={styles.statLabel}>Tamamlanan</div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>🔥 {burnedCalories}</div>
          <div style={styles.statLabel}>Yakılan Kalori</div>
        </div>
        <div style={styles.statBox}>
          <div style={styles.statNumber}>%{Math.round(progressPercent)}</div>
          <div style={styles.statLabel}>Günlük Hedef</div>
        </div>
      </div>

      <div style={styles.progressBarBg}>
        <div style={{...styles.progressBarFill, width: `${progressPercent}%`}}></div>
      </div>

      <h3 style={styles.subtitle}>🎯 Bugünkü Görevlerin:</h3>
      
      <div style={styles.list}>
        {Object.keys(exercises).map(type => (
          <div 
            key={type} 
            style={{...styles.taskCard, borderColor: exercises[type].completed ? '#2ecc71' : '#eee', backgroundColor: exercises[type].completed ? '#f0fdf4' : '#fff'}}
            onClick={() => toggleExercise(type)}
          >
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: exercises[type].completed ? '#27ae60' : '#2c3e50', textDecoration: exercises[type].completed ? 'line-through' : 'none' }}>
              {exercises[type].title}
            </div>
            <div style={styles.checkbox}>
              {exercises[type].completed ? '✅' : '⬜'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
  backBtn: { padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1', fontWeight: 'bold' },
  dateBanner: { backgroundColor: '#3498db', color: '#fff', padding: '15px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px', fontSize: '16px', boxShadow: '0 4px 6px rgba(52, 152, 219, 0.2)' },
  statsCard: { display: 'flex', justifyContent: 'space-between', backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '15px' },
  statBox: { textAlign: 'center', flex: 1 },
  statNumber: { fontSize: '24px', fontWeight: 'bold', color: '#e67e22', marginBottom: '5px' },
  statLabel: { color: '#7f8c8d', fontSize: '13px' },
  progressBarBg: { height: '10px', backgroundColor: '#ecf0f1', borderRadius: '5px', overflow: 'hidden', marginBottom: '30px' },
  progressBarFill: { height: '100%', backgroundColor: '#2ecc71', transition: 'width 0.5s ease' },
  subtitle: { color: '#34495e', marginBottom: '15px' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  taskCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderRadius: '12px', border: '2px solid', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' },
  checkbox: { fontSize: '24px' }
};

export default SportsTracker;