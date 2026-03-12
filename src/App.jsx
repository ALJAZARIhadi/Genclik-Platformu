import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // استيراد الصفحة الجديدة
import Register from './pages/Register'; // استيراد صفحة التسجيل الجديدة
import QuranTracker from './pages/QuranTracker'; // استيراد صفحة تتبع القرآن
import SportsTracker from './Frontend/SportsTracker'; // استيراد صفحة تتبع الرياضة
import ScholarDetails from './pages/ScholarDetails'; // استيراد صفحة تفاصيل العلماء
import Scholars from './pages/Scholars'; // استيراد صفحة قائمة العلماء

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* مسار الصفحة الجديدة */}
        <Route path="/register" element={<Register />} /> {/* مسار صفحة التسجيل */}
        <Route path="/quran-tracker" element={<QuranTracker />} /> {/* مسار صفحة تتبع القرآن */}
        <Route path="/sports-tracker" element={<SportsTracker />} />
        <Route path="/scholars" element={<Scholars />} />
        <Route path="/scholar/:id" element={<ScholarDetails />} />
      </Routes>
    </Router>
  );
}

export default App;