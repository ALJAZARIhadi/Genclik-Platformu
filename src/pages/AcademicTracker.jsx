import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function AcademicTracker() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // مرجع (Ref) لليوم الحالي عشان نعمل Scroll تلقائي له
  const todayRef = useRef(null);

  // --- حالات المهام ---
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', type: 'study', date: '', priority: 'normal' });

  // --- حالات مؤقت التركيز (Pomodoro) ---
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 دقيقة
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // --- حالات الجدول الأسبوعي ---
  const [schedule, setSchedule] = useState([]);
  const [newDers, setNewDers] = useState({ subject: '', day: 'Pazartesi', start: '', end: '', room: '' });
  
  // حالة لإظهار أو إخفاء فورم إضافة الجدول
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const days = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const daysMapping = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const todayIndex = new Date().getDay();
  const todayName = daysMapping[todayIndex];

  // التمرير التلقائي لليوم الحالي
  useEffect(() => {
    if (todayRef.current) {
      // بعد تحميل الجدول بمدة قصيرة، نقوم بتمرير الشاشة لليوم الحالي
      setTimeout(() => {
        todayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }, 300);
    }
  }, [schedule]);

  // جلب المهام عند تحميل الصفحة
  const fetchTasks = () => {
    if (userId) {
      fetch(`http://localhost:5000/api/auth/get-tasks/${userId}`)
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => console.error("Görevleri getirme hatası:", err));
    }
  };

  useEffect(() => { fetchTasks(); }, [userId]);

  // منطق مؤقت التركيز
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert(isBreak ? "Mola bitti! Çalışmaya dönme vakti 🚀" : "Harika çalıştın! 5 dakika mola ver ☕");
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setIsActive(false); setTimeLeft(25 * 60); setIsBreak(false); };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // دالة حساب الأيام المتبقية
  const getDaysLeft = (dateString) => {
    if (!dateString) return null;
    const diffTime = new Date(dateString) - new Date();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `⏳ ${diffDays} gün kaldı`;
    if (diffDays === 0) return `🔥 Bugün!`;
    return `⚠️ Süresi geçti`;
  };

  // إضافة مهمة جديدة (تم تحسين الكود لمعرفة سبب الخطأ)
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    fetch('http://localhost:5000/api/auth/add-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        title: newTask.title, 
        taskType: newTask.type, 
        dueDate: newTask.date || null, 
        priority: newTask.priority 
      })
    })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.message || 'Sunucu hatası (خطأ في السيرفر)');
      }
      return res.json();
    })
    .then(() => {
      fetchTasks();
      setNewTask({ title: '', type: 'study', date: '', priority: 'normal' });
    })
    .catch(err => {
      console.error("Görev eklerken hata oluştu:", err);
      alert("Hata: " + err.message + "\nالرجاء تصوير هذا الخطأ وإرساله لحله!");
    });
  };

  // تغيير حالة المهمة (تمت / لم تتم)
  const toggleTask = (id, currentStatus) => {
    fetch('http://localhost:5000/api/auth/toggle-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: id, isCompleted: !currentStatus })
    }).then(() => fetchTasks());
  };

  // حذف مهمة
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/api/auth/delete-task/${id}`, { method: 'DELETE' })
      .then(() => fetchTasks());
  };

  // دالة جلب الجدول
  const fetchSchedule = () => {
    fetch(`http://localhost:5000/api/auth/get-schedule/${userId}`)
      .then(res => res.json())
      .then(data => setSchedule(data))
      .catch(err => console.error("Programı getirme hatası:", err));
  };

  useEffect(() => { fetchSchedule(); }, [userId]);

  const addDers = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/auth/add-schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...newDers })
    }).then(() => {
      fetchSchedule();
      setNewDers({ subject: '', day: 'Pazartesi', start: '', end: '', room: '' });
      setShowScheduleForm(false); // إغلاق الفورم بعد الإضافة بنجاح
    });
  };

  const deleteDers = (id) => {
    fetch(`http://localhost:5000/api/auth/delete-schedule/${id}`, { method: 'DELETE' })
      .then(() => fetchSchedule());
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/menu')} style={styles.backBtn}>⬅ Geri Dön</button>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>🎓 Akademik Koç</h2>
      </div>

      {/* قسم إدخال الجدول الأسبوعي مع زر الإظهار/الإخفاء */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: showScheduleForm ? '2px solid #27ae60' : 'none', paddingBottom: showScheduleForm ? '10px' : '0' }}>
          <h3 style={{ margin: 0 }}>🗓️ Haftalık Program</h3>
          <button 
            onClick={() => setShowScheduleForm(!showScheduleForm)} 
            style={{...styles.btn, backgroundColor: showScheduleForm ? '#e74c3c' : '#27ae60', padding: '8px 12px', fontSize: '12px'}}>
            {showScheduleForm ? 'İptal ❌' : 'Program Düzenle ⚙️'}
          </button>
        </div>
        
        {showScheduleForm && (
          <form onSubmit={addDers} style={{...styles.formGrid, marginTop: '15px'}}>
            <input type="text" placeholder="Ders Adı" value={newDers.subject} onChange={e => setNewDers({...newDers, subject: e.target.value})} style={styles.input} required />
            <input type="text" placeholder="Derslik / Oda (Örn: A-101)" value={newDers.room} onChange={e => setNewDers({...newDers, room: e.target.value})} style={styles.input} />
            
            <select value={newDers.day} onChange={e => setNewDers({...newDers, day: e.target.value})} style={styles.input}>
              {days.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="time" title="Başlangıç" value={newDers.start} onChange={e => setNewDers({...newDers, start: e.target.value})} style={styles.input} required />
              <input type="time" title="Bitiş" value={newDers.end} onChange={e => setNewDers({...newDers, end: e.target.value})} style={styles.input} required />
            </div>
            
            <button type="submit" style={styles.addDersBtn}>Programa Ekle</button>
          </form>
        )}
      </div>

      {/* عرض الجدول بطريقة ذكية مع التركيز على اليوم */}
      <div style={styles.scheduleGrid}>
        {days.map(day => {
          const isToday = todayName === day;
          
          // حساب يوم غد
          const tomorrowIndex = (todayIndex + 1) % 7;
          const isTomorrow = daysMapping[tomorrowIndex] === day;

          return (
            <div 
              key={day} 
              ref={isToday ? todayRef : null} /* تفعيل المرجع هنا لليوم الحالي فقط */
              style={{ 
                ...styles.dayCol, 
                backgroundColor: isToday ? '#fafff9' : isTomorrow ? '#fffcf0' : '#fff',
                border: isToday ? '2px solid #27ae60' : '1px solid #eee'
              }}>
              <div style={{ 
                ...styles.dayHeader, 
                backgroundColor: isToday ? '#27ae60' : isTomorrow ? '#f39c12' : '#f8f9fa', 
                color: isToday || isTomorrow ? '#fff' : '#2c3e50' 
              }}>
                {day} 
                {isToday && <span style={styles.badge}> (Bugün)</span>}
                {isTomorrow && <span style={styles.badge}> (Yarın)</span>}
              </div>
              
              <div style={styles.dersList}>
                {schedule.filter(s => s.day_of_week === day).map(item => (
                  <div key={item.id} style={styles.dersCard}>
                    <div style={styles.dersTime}>{item.start_time.slice(0,5)} - {item.end_time.slice(0,5)}</div>
                    <div style={styles.dersSubject}>{item.subject_name}</div>
                    {item.classroom && <div style={styles.dersRoom}>📍 {item.classroom}</div>}
                    <button onClick={() => deleteDers(item.id)} style={styles.miniDeleteBtn}>Sil</button>
                  </div>
                ))}
                {schedule.filter(s => s.day_of_week === day).length === 0 && (
                  <div style={styles.emptyText}>Ders yok</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* قسم مؤقت التركيز */}
      <div style={{ ...styles.card, backgroundColor: isBreak ? '#e8f8f5' : '#ebf5fb', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#34495e' }}>{isBreak ? '☕ Mola Zamanı' : '🧠 Derin Odaklanma (Pomodoro)'}</h3>
        <div style={{ fontSize: '48px', fontWeight: 'bold', color: isBreak ? '#1abc9c' : '#2980b9', margin: '15px 0' }}>
          {formatTime(timeLeft)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={toggleTimer} style={{ ...styles.btn, backgroundColor: isActive ? '#e74c3c' : '#2ecc71' }}>
            {isActive ? '⏸ Duraklat' : '▶ Başlat'}
          </button>
          <button onClick={resetTimer} style={{ ...styles.btn, backgroundColor: '#95a5a6' }}>🔄 Sıfırla</button>
        </div>
      </div>

      {/* قسم إضافة المهام */}
      <form onSubmit={addTask} style={styles.card}>
        <h3 style={{ marginTop: 0 }}>➕ Yeni Görev Ekle</h3>
        <div style={styles.inputGroup}>
          <input type="text" placeholder="Görev veya Sınav Adı..." value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} style={styles.input} required />
          <select value={newTask.type} onChange={(e) => setNewTask({...newTask, type: e.target.value})} style={styles.input}>
            <option value="study">📚 Ders Çalışma</option>
            <option value="homework">📝 Ödev</option>
            <option value="exam">⚠️ Sınav</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <input type="date" value={newTask.date} onChange={(e) => setNewTask({...newTask, date: e.target.value})} style={styles.input} />
          <select value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})} style={styles.input}>
            <option value="normal">🟢 Normal Öncelik</option>
            <option value="high">🔴 Yüksek Öncelik (Acil)</option>
          </select>
          <button type="submit" style={{ ...styles.btn, backgroundColor: '#3498db', width: '100%' }}>Ekle</button>
        </div>
      </form>

      {/* قائمة المهام */}
      <h3 style={{ color: '#34495e' }}>📋 Görevlerin ve Sınavların:</h3>
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{ ...styles.taskCard, borderLeft: task.priority === 'high' ? '5px solid #e74c3c' : '5px solid #3498db', opacity: task.is_completed ? 0.6 : 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input type="checkbox" checked={task.is_completed} onChange={() => toggleTask(task.id, task.is_completed)} style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', textDecoration: task.is_completed ? 'line-through' : 'none', color: task.priority === 'high' ? '#c0392b' : '#2c3e50' }}>
                  {task.task_type === 'exam' ? '⚠️ ' : task.task_type === 'homework' ? '📝 ' : '📚 '}
                  {task.title}
                </div>
                {task.due_date && <div style={{ fontSize: '13px', color: '#e67e22', marginTop: '5px', fontWeight: 'bold' }}>{getDaysLeft(task.due_date)}</div>}
              </div>
            </div>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteBtn}>❌</button>
          </div>
        ))}
        {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Henüz görev eklemedin. Harika bir gün planlamaya başla! 🚀</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '700px', margin: 'auto', fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif' },
  header: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' },
  backBtn: { padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#ecf0f1', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px', border: '1px solid #f0f0f0' },
  btn: { padding: '10px 20px', borderRadius: '8px', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' },
  inputGroup: { display: 'flex', gap: '10px', marginBottom: '10px' },
  input: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
  taskCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px 20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', marginBottom: '10px' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', opacity: 0.7 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  addDersBtn: { gridColumn: 'span 2', padding: '10px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  
  scheduleGrid: { 
    display: 'flex', 
    gap: '15px', 
    overflowX: 'auto',
    padding: '10px 0',
    minHeight: '300px',
    scrollBehavior: 'smooth' // لحركة التمرير الناعمة
  },
  
  dayCol: { 
    minWidth: '160px', 
    flex: 1, 
    borderRadius: '12px', 
    border: '1px solid #eee', 
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column'
  },
  badge: {
    fontSize: '10px',
    marginLeft: '5px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '2px 5px',
    borderRadius: '4px',
    textTransform: 'uppercase'
  },
  
  dayHeader: { 
    textAlign: 'center', 
    padding: '10px', 
    fontWeight: 'bold', 
    borderRadius: '12px 12px 0 0',
    fontSize: '14px'
  },
  
  dersList: { padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' },
  
  dersCard: { 
    backgroundColor: '#fff', 
    padding: '10px', 
    borderRadius: '8px', 
    border: '1px solid #f0f0f0', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    position: 'relative'
  },
  
  dersTime: { fontSize: '11px', color: '#27ae60', fontWeight: 'bold' },
  dersSubject: { fontSize: '14px', fontWeight: '600', color: '#2c3e50', margin: '3px 0' },
  dersRoom: { fontSize: '12px', color: '#7f8c8d', fontStyle: 'italic' },
  
  miniDeleteBtn: { fontSize: '10px', color: '#e74c3c', border: 'none', background: 'none', cursor: 'pointer', padding: 0, marginTop: '5px' },
  emptyText: { textAlign: 'center', fontSize: '12px', color: '#bdc3c7', marginTop: '20px' }
};

export default AcademicTracker;