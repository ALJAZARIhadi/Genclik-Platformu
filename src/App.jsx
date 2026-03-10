import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // استيراد الصفحة الجديدة
import Register from './pages/Register'; // استيراد صفحة التسجيل الجديدة
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* مسار الصفحة الجديدة */}
        <Route path="/register" element={<Register />} /> {/* مسار صفحة التسجيل */}
      </Routes>
    </Router>
  );
}

export default App;