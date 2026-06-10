import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navigation';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';

// --- Page Imports ---
import About from './pages/About';
import Overview from './pages/Overview';
import MessageFromHead from './pages/MessageFromHead';
import Rankings from './pages/Rankings';
import FacilitiesEquipment from './pages/FacilitiesEquipment';
import History from './pages/History';
import Academics from './pages/Academics';
import AcademicCalendar from './pages/AcademicCalendar';
import TimeTable from './pages/TimeTable';
import Regulations from './pages/Regulations';
import Calendar from './pages/Calendar';
import Research from './pages/Research';
import Facilities from './pages/Facilities';
import FacultyList from './pages/FacultyList';
import FacultyProfile from './pages/FacultyProfile';
import NewsEvents from './pages/NewsEvents';
import BsAdmissions from './pages/BsAdmissions';
import Contact from './pages/Contact';
import StaffList from './pages/StaffList';
import BsStudentsList from './pages/BsStudentsList';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* Our Secure Portal Navbar (It automatically hides on /login and /student-dashboard) */}
      <Navbar />
      <Routes>
        {/* ==========================================
            ZONE 1: PUBLIC WEBSITE (Uses Layout)
            ========================================== */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          {/* About Routes */}
          <Route path="about" element={<About />} />
          <Route path="about/overview" element={<Overview />} />
          <Route path="about/message-from-head" element={<MessageFromHead />} />
          <Route path="about/achievements" element={<Placeholder />} />
          <Route path="about/rankings" element={<Rankings />} />
          <Route path="about/history" element={<History />} />
          <Route path="about/facilities-equipment" element={<FacilitiesEquipment />} />

          {/* Academics Routes */}
          <Route path="academics" element={<Academics />} />
          <Route path="academics/calendar" element={<Calendar />} />
          <Route path="academics/academic-calendar" element={<AcademicCalendar />} />
          <Route path="academics/timetable" element={<TimeTable />} />
          <Route path="academics/regulations" element={<Regulations />} />

          {/* Research Routes */}
          <Route path="research" element={<Research />} />
          <Route path="research/facilities" element={<Facilities />} />

          {/* People Routes */}
          <Route path="people" element={<FacultyList />} />
          <Route path="people/faculty" element={<FacultyList />} />
          <Route path="people/faculty/:slug" element={<FacultyProfile />} />
          <Route path="people/staff" element={<StaffList />} />
          <Route path="people/students/bs" element={<BsStudentsList />} />

          {/* Admissions Routes */}
          <Route path="admissions" element={<BsAdmissions />} />
          <Route path="admissions/bs" element={<BsAdmissions />} />

          {/* Explore / News */}
          <Route path="explore" element={<NewsEvents />} />
          <Route path="news" element={<NewsEvents />} />

          {/* Contact */}
          <Route path="contact" element={<Contact />} />
          <Route path="contact/contact-us" element={<Contact />} />

          {/* Catch-all */}
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
