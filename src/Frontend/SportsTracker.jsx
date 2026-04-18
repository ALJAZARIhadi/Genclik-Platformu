import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SportsTracker() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const userId = localStorage.getItem('userId');
  const isRTL = i18n.language === 'ar';

  // --- حالات التاريخ ---
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // --- حالات البيانات ---
  const [exercises, setExercises] = useState({});
  const [loading, setLoading] = useState(true);
  
  // --- حالات النافذة المنبثقة ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('cardio');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [goalValue, setGoalValue] = useState('');

  // مكتبة التمارين
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

  // دالة مساعدة للحصول على أيقونة التمرين من المكتبة
  const getExerciseDetails = (type) => {
    for (const cat in exerciseLibrary) {
      const found = exerciseLibrary[cat].items.find(i => i.id === type);
      if (found) return found;
    }
    return { icon: "🔥", title: type, color: '#34495e', bgColor: '#f1f2f6' };
  };

  // جلب البيانات عند تغيير التاريخ
  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/auth/get-sports/${userId}/${selectedDate}`)
        .then(res => res.json())
        .then(data => {
          const loaded = {};
          if (data && data.length > 0) {
            data.forEach(item => {
              const details = getExerciseDetails(item.exercise_type);
              loaded[item.exercise_type] = { 
                ...details,
                title: item.title || details.title, // استخدام العنوان المخصص من السيرفر إن وجد
                completed: item.is_completed === 1 || item.is_completed === true
              };
            });
          }
          setExercises(loaded);
          setLoading(false);
        }).catch(err => {
          console.error("Hata:", err);
          setLoading(false);
        });
    }
  }, [userId, selectedDate]);

  // تغيير حالة التمرين (تم / لم يتم)
  const toggleExercise = (type) => {
    const isNowCompleted = !exercises[type].completed;
    setExercises(prev => ({ ...prev, [type]: { ...prev[type], completed: isNowCompleted } }));
    
    fetch('http://localhost:5000/api/auth/save-sports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, date: selectedDate, exercises: [{ type, title: exercises[type].title, completed: isNowCompleted }] })
    });
  };
  // دالة حذف التمرين
  const deleteExercise = (type, e) => {
    e.stopPropagation(); // 🔴 مهم جداً: لمنع تفعيل النقر على الكارت نفسه (حتى لا يتغير إلى "تم")

    const confirmDelete = window.confirm(isRTL ? 'هل أنت متأكد من حذف هذا التمرين؟' : 'Bu egzersizi silmek istediğinize emin misiniz?');
    if (!confirmDelete) return;

    // 1. حذف التمرين من الواجهة فوراً
    setExercises(prev => {
      const updatedList = { ...prev };
      delete updatedList[type];
      return updatedList;
    });
    
    // 2. إرسال طلب الحذف للسيرفر
    fetch(`http://localhost:5000/api/auth/delete-sports/${userId}/${selectedDate}/${type}`, {
      method: 'DELETE'
    }).catch(err => console.error("Silme hatası:", err));
  };

  // التعامل مع النافذة المنبثقة
  const handleAddClick = (template) => {
    setSelectedTemplate(template);
    setGoalValue('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') closeModal();
  };

  const confirmAddition = () => {
    if (!goalValue) return alert(isRTL ? 'يرجى إدخال العدد!' : 'Lütfen hedef girin!');
    
    const unit = exerciseLibrary[activeCategory].unit;
    const finalTitle = `${goalValue} ${unit} ${selectedTemplate.title}`;
    
    const newExercise = { ...selectedTemplate, title: finalTitle, completed: false };
    
    setExercises(prev => ({
      ...prev,
      [selectedTemplate.id]: newExercise
    }));
    
    // حفظ التمرين الجديد فوراً في قاعدة البيانات
    fetch('http://localhost:5000/api/auth/save-sports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, date: selectedDate, exercises: [{ type: selectedTemplate.id, title: finalTitle, completed: false }] })
    });

    closeModal();
  };

  // دوال التنقل بين التواريخ
  const changeDate = (daysToAdd) => {
    const dateObj = new Date(selectedDate);
    dateObj.setDate(dateObj.getDate() + daysToAdd);
    setSelectedDate(dateObj.toISOString().split('T')[0]);
  };

  const formatDateString = (dateStr) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(isRTL ? 'ar-EG' : 'tr-TR', options);
  };

  const progressPercent = Object.keys(exercises).length > 0 
    ? (Object.values(exercises).filter(ex => ex.completed).length / Object.keys(exercises).length) * 100 
    : 0;

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div style={{...styles.container, direction: isRTL ? 'rtl' : 'ltr'}}>
      
      {/* Modal النافذة المنبثقة */}
      {isModalOpen && (
        <div id="modal-overlay" style={styles.modalOverlay} onClick={handleOverlayClick}>
          <div style={styles.modalContent}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
                <h3 style={{margin: 0, color: '#2c3e50'}}>{isRTL ? 'تخصيص التمرين' : 'Görevi Özelleştir'}</h3>
                <button onClick={closeModal} style={styles.closeIcon}>✖</button>
            </div>
            
            {!selectedTemplate ? (
              <>
                <div style={styles.categoryTabs}>
                  {Object.keys(exerciseLibrary).map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{...styles.tabBtn, backgroundColor: activeCategory === cat ? '#2c3e50' : '#f8f9fa', color: activeCategory === cat ? '#fff' : '#7f8c8d'}}>
                      {exerciseLibrary[cat].label}
                    </button>
                  ))}
                </div>
                <div style={styles.libraryGrid}>
                  {exerciseLibrary[activeCategory].items.map(item => (
                    <div key={item.id} style={{...styles.libraryCard, backgroundColor: item.bgColor, borderColor: item.color}} onClick={() => handleAddClick(item)}>
                      <div style={{fontSize: '28px', marginBottom: '5px'}}>{item.icon}</div>
                      <b style={{color: '#2c3e50', fontSize: '14px'}}>{item.title}</b>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={styles.setupContainer}>
                <div style={{fontSize: '40px', marginBottom: '10px'}}>{selectedTemplate.icon}</div>
                <p style={{color: '#7f8c8d'}}>{isRTL ? 'أدخل الهدف لـ' : 'Hedef girin:'} <b style={{color: '#2c3e50'}}>{selectedTemplate.title}</b></p>
                <input 
                  type="number" 
                  placeholder={exerciseLibrary[activeCategory].unit}
                  value={goalValue}
                  onChange={(e) => setGoalValue(e.target.value)}
                  style={styles.input}
                  autoFocus
                />
                <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                  <button onClick={confirmAddition} style={styles.confirmBtn}>{isRTL ? 'إضافة للتاريخ المحدد' : 'Programa Ekle'}</button>
                  <button onClick={() => setSelectedTemplate(null)} style={styles.cancelBtn}>{isRTL ? 'تراجع' : 'Geri'}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* واجهة العرض الرئيسية */}
      <div style={styles.header}>
        <button onClick={() => navigate('/menu')} style={styles.backBtn}>{isRTL ? '⬅ عودة' : '⬅ Geri'}</button>
        <h2 style={{margin: 0, color: '#2c3e50'}}>🏃‍♂️ {isRTL ? 'تتبع الرياضة' : 'Spor Takibi'}</h2>
      </div>

      {/* شريط التنقل بين التواريخ */}
      <div style={styles.dateNavigator}>
          <button onClick={() => changeDate(-1)} style={styles.dateBtn}>◀</button>
          <div style={styles.dateDisplay}>
              <span style={{fontSize: '16px', fontWeight: 'bold', color: '#2c3e50'}}>{formatDateString(selectedDate)}</span>
              {isToday && <span style={styles.todayBadge}>{isRTL ? 'اليوم' : 'Bugün'}</span>}
          </div>
          <button onClick={() => changeDate(1)} style={styles.dateBtn}>▶</button>
      </div>

      {/* بطاقة الإنجاز */}
      <div style={styles.dashboardCard}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
            <span style={{fontSize: '16px', fontWeight: 'bold'}}>{isRTL ? 'نسبة الإنجاز اليومي' : 'Günlük Tamamlama'}</span>
            <span style={{fontSize: '20px', fontWeight: 'bold', color: progressPercent === 100 ? '#f1c40f' : '#fff'}}>{Math.round(progressPercent)}%</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{...styles.progressBarFill, width: `${progressPercent}%`, backgroundColor: progressPercent === 100 ? '#f1c40f' : '#2ecc71'}}></div>
        </div>
      </div>

      <button onClick={() => setIsModalOpen(true)} style={styles.addBtn}>
          {isRTL ? '➕ إضافة تمرين جديد' : '➕ Yeni Egzersiz Ekle'}
      </button>

      {/* قائمة التمارين */}
      {loading ? (
          <div style={{textAlign: 'center', padding: '20px', color: '#7f8c8d'}}>{isRTL ? 'جاري التحميل...' : 'Yükleniyor...'}</div>
      ) : (
          <div style={styles.grid}>
            {Object.keys(exercises).length === 0 ? (
                <div style={styles.emptyState}>
                    <span style={{fontSize: '40px'}}>📭</span>
                    <p>{isRTL ? 'لا يوجد تمارين مسجلة في هذا اليوم.' : 'Bu tarihte kayıtlı egzersiz yok.'}</p>
                </div>
            ) : (
                Object.keys(exercises).map(type => (
                <div key={type} onClick={() => toggleExercise(type)} style={{...styles.taskCard, borderColor: exercises[type].completed ? '#2ecc71' : 'transparent', opacity: exercises[type].completed ? 0.8 : 1}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <div style={{...styles.iconWrapper, backgroundColor: exercises[type].bgColor}}>
                        {exercises[type].icon}
                    </div>
                    <span style={{fontWeight: 'bold', fontSize: '16px', color: exercises[type].completed ? '#7f8c8d' : '#2c3e50', textDecoration: exercises[type].completed ? 'line-through' : 'none'}}>
                        {exercises[type].title}
                    </span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    {/* زر الحذف */}
                    <button 
                        onClick={(e) => deleteExercise(type, e)}
                        style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '0', opacity: '0.7'}}
                        title={isRTL ? 'حذف التمرين' : 'Egzersizi Sil'}
                    >
                        🗑️
                    </button>
                    
                    {/* علامة الصح */}
                    <div style={{...styles.checkbox, backgroundColor: exercises[type].completed ? '#2ecc71' : '#f8f9fa', borderColor: exercises[type].completed ? '#2ecc71' : '#ddd'}}>
                        {exercises[type].completed && '✔'}
                    </div>
                </div>
                </div>
                ))
            )}
          </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' },
  backBtn: { padding: '8px 15px', borderRadius: '10px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1', color: '#2c3e50', fontWeight: 'bold', transition: '0.2s' },
  
  dateNavigator: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px' },
  dateBtn: { background: '#f8f9fa', border: 'none', padding: '10px 15px', borderRadius: '10px', cursor: 'pointer', color: '#2c3e50', transition: '0.2s' },
  dateDisplay: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
  todayBadge: { backgroundColor: '#e74c3c', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' },

  dashboardCard: { background: 'linear-gradient(135deg, #2c3e50, #34495e)', padding: '25px', borderRadius: '20px', color: '#fff', marginBottom: '20px', boxShadow: '0 8px 20px rgba(44, 62, 80, 0.3)' },
  progressBarBg: { height: '10px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '5px', overflow: 'hidden' },
  progressBarFill: { height: '100%', transition: 'width 0.5s ease-in-out, background-color 0.5s ease' },
  
  addBtn: { width: '100%', padding: '15px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '15px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)', transition: '0.2s' },
  
  grid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  taskCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: '#fff', borderRadius: '15px', border: '2px solid', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', transition: 'all 0.3s ease' },
  iconWrapper: { fontSize: '24px', width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px' },
  checkbox: { width: '28px', height: '28px', border: '2px solid', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', transition: '0.2s', fontSize: '14px' },
  emptyState: { textAlign: 'center', padding: '40px 20px', color: '#bdc3c7', backgroundColor: '#fff', borderRadius: '15px', border: '1px dashed #ddd' },
  
  // Modal Styles
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', padding: '30px', borderRadius: '25px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
  closeIcon: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#95a5a6' },
  categoryTabs: { display: 'flex', gap: '10px', marginBottom: '20px', backgroundColor: '#f8f9fa', padding: '5px', borderRadius: '12px' },
  tabBtn: { flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' },
  libraryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  libraryCard: { padding: '20px 10px', border: '2px solid transparent', borderRadius: '15px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' },
  setupContainer: { textAlign: 'center', padding: '10px 0' },
  input: { width: '100%', padding: '15px', borderRadius: '12px', border: '2px solid #ecf0f1', fontSize: '20px', textAlign: 'center', outline: 'none', color: '#2c3e50', fontWeight: 'bold', boxSizing: 'border-box' },
  confirmBtn: { flex: 2, padding: '12px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' },
  cancelBtn: { flex: 1, padding: '12px', backgroundColor: '#ecf0f1', color: '#7f8c8d', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }
};

export default SportsTracker;