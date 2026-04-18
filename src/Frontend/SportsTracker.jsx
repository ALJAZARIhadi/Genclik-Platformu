import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SportsTracker() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const userId = localStorage.getItem('userId');
  const today = new Date().toISOString().split('T')[0];
  const isRTL = i18n.language === 'ar';

  const [exercises, setExercises] = useState({});
  const [loading, setLoading] = useState(true);
  
  // حالات النافذة المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('cardio');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // التمرين المختار قبل التثبيت
  const [goalValue, setGoalValue] = useState(''); // القيمة (عدات أو دقائق)

  const exerciseLibrary = {
    cardio: {
      label: isRTL ? 'كارديو (دقيقة/خطوة)' : 'Kardiyo (Dk/Adım)', icon: '🏃‍♂️', unit: isRTL ? 'دقيقة/خطوة' : 'Dk/Adım',
      items: [
        { id: 'walking', icon: "🚶‍♂️", title: isRTL ? 'مشي' : "Yürüyüş", color: '#27ae60', bgColor: '#e9f7ef' },
        { id: 'running', icon: "🏃‍♂️", title: isRTL ? 'جري' : "Koşu", color: '#27ae60', bgColor: '#e9f7ef' },
        { id: 'cycling', icon: "🚴‍♂️", title: isRTL ? 'دراجة' : "Bisiklet", color: '#27ae60', bgColor: '#e9f7ef' }
      ]
    },
    strength: {
      label: isRTL ? 'قوة (عدات)' : 'Güç (Tekrar)', icon: '🏋️‍♂️', unit: isRTL ? 'عدة' : 'Tekrar',
      items: [
        { id: 'pushups', icon: "🏋️‍♂️", title: isRTL ? 'ضغط' : "Şınav", color: '#e67e22', bgColor: '#fdf2e9' },
        { id: 'situps', icon: "🧗‍♂️", title: isRTL ? 'معدة' : "Mekik", color: '#e67e22', bgColor: '#fdf2e9' },
        { id: 'dumbbells', icon: "💪", title: isRTL ? 'رفع أثقال' : "Ağırlık", color: '#e67e22', bgColor: '#fdf2e9' }
      ]
    }
  };

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/auth/get-sports/${userId}/${today}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const loaded = {};
            data.forEach(item => {
                loaded[item.exercise_type] = { 
                    title: item.exercise_type, // هنا نحتاج لتطوير السيرفر ليخزن العنوان المخصص
                    completed: item.is_completed === 1,
                    icon: "🔥", color: '#34495e', bgColor: '#f1f2f6' 
                };
            });
            setExercises(loaded);
          }
          setLoading(false);
        }).catch(() => setLoading(false));
    }
  }, [userId, today]);

  const toggleExercise = (type) => {
    const isNowCompleted = !exercises[type].completed;
    setExercises(prev => ({ ...prev, [type]: { ...prev[type], completed: isNowCompleted } }));
    
    fetch('http://localhost:5000/api/auth/save-sports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, date: today, exercises: [{ type, completed: isNowCompleted }] })
    });
  };

  const handleAddClick = (template) => {
    setSelectedTemplate(template);
    setGoalValue(''); // تصفير القيمة عند اختيار تمرين جديد
  };

  const confirmAddition = () => {
    if (!goalValue) return alert(isRTL ? 'يرجى إدخال العدد!' : 'Lütfen hedef girin!');
    
    const unit = exerciseLibrary[activeCategory].unit;
    const finalTitle = `${goalValue} ${unit} ${selectedTemplate.title}`;
    
    setExercises(prev => ({
      ...prev,
      [selectedTemplate.id]: { ...selectedTemplate, title: finalTitle, completed: false }
    }));
    
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const progressPercent = Object.keys(exercises).length > 0 
    ? (Object.values(exercises).filter(ex => ex.completed).length / Object.keys(exercises).length) * 100 
    : 0;

  return (
    <div style={{...styles.container, direction: isRTL ? 'rtl' : 'ltr'}}>
      
      {/* Modal النافذة المنبثقة */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{marginTop: 0}}>{isRTL ? 'تخصيص التمرين' : 'Görevi Özelleştir'}</h3>
            
            {!selectedTemplate ? (
              <>
                <div style={styles.categoryTabs}>
                  {Object.keys(exerciseLibrary).map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{...styles.tabBtn, backgroundColor: activeCategory === cat ? '#2c3e50' : '#eee', color: activeCategory === cat ? '#fff' : '#333'}}>
                      {exerciseLibrary[cat].label}
                    </button>
                  ))}
                </div>
                <div style={styles.libraryGrid}>
                  {exerciseLibrary[activeCategory].items.map(item => (
                    <div key={item.id} style={styles.libraryCard} onClick={() => handleAddClick(item)}>
                      <div style={{fontSize: '24px'}}>{item.icon}</div>
                      <b>{item.title}</b>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={styles.setupContainer}>
                <p>{isRTL ? 'أدخل الهدف لـ' : 'Hedef girin:'} <b>{selectedTemplate.title}</b></p>
                <input 
                  type="number" 
                  placeholder={exerciseLibrary[activeCategory].unit}
                  value={goalValue}
                  onChange={(e) => setGoalValue(e.target.value)}
                  style={styles.input}
                  autoFocus
                />
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button onClick={confirmAddition} style={styles.confirmBtn}>{isRTL ? 'إضافة' : 'Ekle'}</button>
                  <button onClick={() => setSelectedTemplate(null)} style={styles.cancelBtn}>{isRTL ? 'إلغاء' : 'Vazgeç'}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* واجهة العرض الرئيسية */}
      <div style={styles.header}>
        <button onClick={() => navigate('/menu')} style={styles.backBtn}>{isRTL ? '⬅ عودة' : '⬅ Geri'}</button>
        <h2 style={{margin: 0}}>🏃‍♂️ {isRTL ? 'تمارين اليوم' : 'Günlük Spor'}</h2>
      </div>

      <div style={styles.dashboardCard}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{isRTL ? 'نسبة الإنجاز' : 'Tamamlama'}</span>
            <span>{Math.round(progressPercent)}%</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{...styles.progressBarFill, width: `${progressPercent}%`}}></div>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <button onClick={() => setIsModalOpen(true)} style={styles.addBtn}>{isRTL ? '➕ إضافة تمرين مخصص' : '➕ Yeni Egzersiz'}</button>
      </div>

      <div style={styles.grid}>
        {Object.keys(exercises).map(type => (
          <div key={type} onClick={() => toggleExercise(type)} style={{...styles.taskCard, borderColor: exercises[type].completed ? '#2ecc71' : '#eee'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <div style={styles.iconWrapper}>{exercises[type].icon}</div>
              <span style={{fontWeight: 'bold', textDecoration: exercises[type].completed ? 'line-through' : 'none'}}>
                {exercises[type].title}
              </span>
            </div>
            <div style={{...styles.checkbox, backgroundColor: exercises[type].completed ? '#2ecc71' : '#fff'}}>
              {exercises[type].completed && '✔'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' },
  backBtn: { padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer' },
  dashboardCard: { backgroundColor: '#2c3e50', padding: '20px', borderRadius: '15px', color: '#fff', marginBottom: '20px' },
  progressBarBg: { height: '8px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginTop: '10px' },
  progressBarFill: { height: '100%', backgroundColor: '#2ecc71', borderRadius: '4px', transition: '0.5s' },
  addBtn: { width: '100%', padding: '12px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  grid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  taskCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: '#fff', borderRadius: '12px', border: '2px solid', cursor: 'pointer' },
  iconWrapper: { fontSize: '20px' },
  checkbox: { width: '24px', height: '24px', border: '2px solid #ddd', borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' },
  
  // Modal Styles
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '25px', borderRadius: '20px', width: '90%', maxWidth: '400px' },
  categoryTabs: { display: 'flex', gap: '10px', marginBottom: '15px' },
  tabBtn: { flex: 1, padding: '8px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  libraryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  libraryCard: { padding: '15px', border: '1px solid #eee', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' },
  setupContainer: { textAlign: 'center' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '18px', textAlign: 'center' },
  confirmBtn: { flex: 2, padding: '10px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};

export default SportsTracker;