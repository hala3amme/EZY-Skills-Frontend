import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CreateAccountPage from './pages/CreateAccountPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course/:id" element={<CourseDetailPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/register" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
