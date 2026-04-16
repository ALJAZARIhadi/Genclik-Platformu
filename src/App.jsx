import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu'; 
import Register from './pages/Register'; 
import QuranTracker from './pages/QuranTracker'; 
import SportsTracker from './Frontend/SportsTracker'; // تأكد أن هذا المسار صحيح في مجلداتك
import ScholarDetails from './pages/ScholarDetails'; 
import Scholars from './pages/Scholars'; 
import AcademicTracker from './pages/AcademicTracker';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Profile from './pages/Profile';
import LanguageSwitcher from './components/LanguageSwitcher';
function App() {
  return (
    <Router>
      {/* 1. حاوية رئيسية تغطي كامل الشاشة */}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <LanguageSwitcher />
        <Navbar />
        
        {/* 2. حاوية المحتوى (flex: 1 تجعلها تتمدد وتدفع الفوتر للأسفل) */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Login />} />
            <Route path="/menu" element={<MainMenu />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/quran-tracker" element={<QuranTracker />} /> 
            <Route path="/sports-tracker" element={<SportsTracker />} />
            <Route path="/scholars" element={<Scholars />} />
            <Route path="/scholar/:id" element={<ScholarDetails />} />
            <Route path="/academic-tracker" element={<AcademicTracker />} />
            
            {/* 3. صائد الأخطاء: إذا كان الرابط غير موجود ستظهر هذه الرسالة بدلاً من الفراغ */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2 style={{ color: 'var(--text-main)' }}>🚫 عذراً، الصفحة غير موجودة!</h2>
              </div>
            } />
          </Routes>
        </div>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;