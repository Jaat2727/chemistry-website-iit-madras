import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import Login from './pages/Login';                    
import AdminDashboard from './pages/AdminDashboard';  
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import Navbar from './components/Navigation';

// --- Page Imports ---
import About from './pages/About';
import Academics from './pages/Academics';
import Achievements from './pages/Achievements';
import BsAdmissions from './pages/BsAdmissions';
import Rankings from './pages/Rankings';
import FacilitiesEquipment from './pages/FacilitiesEquipment';
import History from './pages/History';
import AcademicCalendar from './pages/AcademicCalendar';
import TimeTable from './pages/TimeTable';
import Calendar from './pages/Calendar';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import FacultyList from './pages/FacultyList';
import FacultyProfile from './pages/FacultyProfile';
import MessageFromHead from './pages/MessageFromHead';
import NewsEvents from './pages/NewsEvents';
import Overview from './pages/Overview';
import Research from './pages/Research';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      
      {/* Our Secure Portal Navbar (It automatically hides on /login and /) */}
      <Navbar />

      <Routes>
        
        {/* ==========================================
            ZONE 1: PUBLIC WEBSITE (Uses Layout) 
            ========================================== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          
          {/* About Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/about/overview" element={<Overview />} />
          <Route path="/about/message-from-head" element={<MessageFromHead />} />
          <Route path="/about/achievements" element={<Achievements />} />
          <Route path="/about/rankings" element={<Rankings />} />
          <Route path="/about/history" element={<History />} />
          <Route path="/about/facilities-equipment" element={<FacilitiesEquipment />} />
          
          {/* Academics Routes */}
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/calendar" element={<Calendar />} />
          <Route path="/academics/academic-calendar" element={<AcademicCalendar />} />
          <Route path="/academics/timetable" element={<TimeTable />} />
          
          {/* Research Routes */}
          <Route path="/research" element={<Research />} />
          <Route path="/research/facilities" element={<Facilities />} />
          
          {/* People Routes */}
          <Route path="/people/faculty/:department" element={<FacultyList />} />
          <Route path="/people/faculty/profile/:id" element={<FacultyProfile />} />
          
          {/* Admissions */}
          <Route path="/admissions/bs" element={<BsAdmissions />} />
          
          {/* Other Routes */}
          <Route path="/news" element={<NewsEvents />} />
          <Route path="/contact" element={<Contact />} />

          {/* Catch-all for unbuilt pages */}
          <Route path="*" element={<Placeholder />} />
        </Route>

        {/* ==========================================
            ZONE 2: SECURE PORTAL (No Layout Wrapper!) 
            ========================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;

