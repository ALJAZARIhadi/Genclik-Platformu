import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainMenu from './pages/MainMenu'; // استيراد الصفحة الجديدة
import Register from './pages/Register'; // استيراد صفحة التسجيل الجديدة
import QuranTracker from './pages/QuranTracker'; // استيراد صفحة تتبع القرآن
import SportsTracker from './Frontend/SportsTracker'; // استيراد صفحة تتبع الرياضة
import ScholarDetails from './pages/ScholarDetails'; // استيراد صفحة تفاصيل العلماء
import Scholars from './pages/Scholars'; // استيراد صفحة قائمة العلماء
import AcademicTracker from './pages/AcademicTracker';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<MainMenu />} /> {/* مسار الصفحة الجديدة */}
        <Route path="/register" element={<Register />} /> {/* مسار صفحة التسجيل */}
        <Route path="/quran-tracker" element={<QuranTracker />} /> {/* مسار صفحة تتبع القرآن */}
        <Route path="/sports-tracker" element={<SportsTracker />} />
        <Route path="/scholars" element={<Scholars />} />
        <Route path="/scholar/:id" element={<ScholarDetails />} />
        <Route path="/academic-tracker" element={<AcademicTracker />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;