import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Home as HomeIcon } from 'lucide-react';
import logo from '../assets/logo/IITM_LOGO.png';

// --- Structured Navigation Data Configuration ---
const NAVIGATION_DATA = [
  {
    title: 'About',
    path: '/about',
    groups: [
      { heading: null, links: [{ label: 'Overview', to: '/about/overview' }, { label: 'Message From Head', to: '/about/message-from-head' }, { label: 'Achievements', to: '/about/achievements' }, { label: 'Rankings', to: '/about/rankings' }, { label: 'Facilities & Equipment', to: '/about/facilities-equipment' }, { label: 'History', to: '/about/history' }] },
      { heading: 'Administration', links: [{ label: 'Advisory Board', to: '/about/advisory-board' }, { label: 'Committees', to: '/about/committees' }, { label: 'Annual Reports', to: '/about/annual-reports' }] },
      { heading: 'IITM Specific', links: [{ label: 'Industry Partnerships', to: '/about/industry-partnerships' }, { label: 'Research Park Link', to: '/about/research-park-link' }] }
    ]
  },
  {
    title: 'Academics',
    path: '/academics',
    groups: [
      { heading: 'Undergraduate', links: [{ label: 'BS+MS Dual Degree', to: '/academics/undergraduate/bs-ms-dual' }, { label: 'Curriculum', to: '/academics/undergraduate/curriculum' }, { label: 'Course Structure', to: '/academics/undergraduate/course-structure' }, { label: 'Minor in Chemistry', to: '/academics/undergraduate/minor' }] },
      { heading: 'Postgraduate', links: [{ label: 'MSc Program', to: '/academics/postgraduate/msc' }, { label: 'PhD Program', to: '/academics/postgraduate/phd' }] },
      { heading: 'Courses', links: [{ label: 'Core Courses', to: '/academics/courses/core' }, { label: 'Elective Courses', to: '/academics/courses/elective' }, { label: 'Lab Courses', to: '/academics/courses/lab' }, { label: 'Course Catalog', to: '/academics/courses/catalog' }] },
      { heading: 'Resources', links: [{ label: 'Academic Calendar', to: '/academics/calendar' }, { label: 'Timetable', to: '/academics/timetable' }, { label: 'Regulations', to: '/academics/regulations' }] }
    ]
  },
  {
    title: 'Research',
    path: '/research',
    groups: [
      { heading: 'Overview & Output', links: [{ label: 'Publications', to: '/research/publications' }, { label: 'Patents', to: '/research/patents' }, { label: 'Funded Projects', to: '/research/facilities' }, { label: 'Research Facilities', to: '/research/facilities' }, { label: 'Industry Collaboration', to: '/research/industry-collaboration' }] },
      { heading: 'Research Areas', links: [{ label: 'Inorganic', to: '/research/areas/inorganic' }, { label: 'Organic', to: '/research/areas/organic' }, { label: 'Physical', to: '/research/areas/physical' }, { label: 'Theoretical', to: '/research/areas/theoretical' }, { label: 'Materials Chemistry', to: '/research/areas/materials' }] },
      { heading: 'Specialized Fields', links: [{ label: 'Catalysis', to: '/research/areas/catalysis' }, { label: 'Energy Storage', to: '/research/areas/energy-storage' }, { label: 'Computational Chemistry', to: '/research/areas/computational' }, { label: 'Nanoscience', to: '/research/areas/nanoscience' }] },
      { heading: 'Centers', links: [{ label: 'Energy Center', to: '/research/centers/energy' }, { label: 'Materials Center', to: '/research/centers/materials' }, { label: 'Sustainability Center', to: '/research/centers/sustainability' }] }
    ]
  },
  {
    title: 'People',
    path: '/people',
    groups: [
      { heading: 'Faculty', links: [{ label: 'Faculty Directory', to: '/people' }] },
      { heading: 'Staff & Postdocs', links: [{ label: 'Staff', to: '/people/staff' }, { label: 'Postdocs', to: '/people/postdocs' }] },
      { heading: 'Students', links: [{ label: 'BS Students', to: '/people/students/bs' }, { label: 'MSc Students', to: '/people/students/msc' }, { label: 'PhD Students', to: '/people/students/phd' }, { label: 'Project Students', to: '/people/students/project' }] },
      { heading: 'Alumni', links: [{ label: 'Alumni Directory', to: '/people/alumni' }] }
    ]
  },
  {
    title: 'Admissions',
    path: '/admissions',
    groups: [
      { heading: 'Programs', links: [{ label: 'BS Admission', to: '/admissions/bs' }, { label: 'MSc Admission', to: '/admissions/msc' }, { label: 'PhD Admission', to: '/admissions/phd' }, { label: 'International Admission', to: '/admissions/international' }] },
      { heading: 'Information', links: [{ label: 'FAQ', to: '/admissions/faq' }, { label: 'Brochure', to: '/admissions/brochure' }] }
    ]
  },
  {
    title: 'Explore',
    path: '/explore',
    groups: [
      { heading: 'Seminars & Events', links: [{ label: 'Upcoming', to: '/seminars/upcoming' }, { label: 'Past', to: '/seminars/past' }, { label: 'Distinguished Lectures', to: '/seminars/distinguished' }] },
      { heading: 'Facilities', links: [{ label: 'Teaching Labs', to: '/facilities/teaching-labs' }, { label: 'Research Labs', to: '/facilities/research-labs' }] },
      { heading: 'Placements & Outreach', links: [{ label: 'Placement Statistics', to: '/placements/statistics' }, { label: 'Internships', to: '/placements/internships' }, { label: 'School Programs', to: '/outreach/school-programs' }, { label: 'Workshops', to: '/outreach/workshops' }] },
      { heading: 'Contact', links: [{ label: 'Contact Us', to: '/contact/contact-us' }] }
    ]
  }
];

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const timeoutRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin';
    if (role === 'faculty') return '/faculty-dashboard';
    if (role === 'student') return '/student-dashboard';
    return '/login';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
    // Use React state/routing instead of full reload where possible
    window.location.reload();
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setOpenMobileAccordion(null);
  }, [location]);

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  // --- Mobile Accordion Component ---
  const MobileAccordion = ({ navItem }) => {
    const isOpen = openMobileAccordion === navItem.title;
    return (
      <div className="border-b border-white/10">
        <button
          onClick={() => setOpenMobileAccordion(isOpen ? null : navItem.title)}
          className="w-full flex items-center justify-between py-4 px-6 text-left text-slate-800 font-semibold focus:outline-none hover:bg-slate-50 transition-colors"
        >
          {navItem.title}
          <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`} />
          </div>
        </button>
        <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <div className="px-6 space-y-6 pb-6 pt-2 bg-slate-50/50">
              {navItem.path &&
                <Link to={navItem.path} className="inline-flex items-center text-orange-600 font-semibold text-sm hover:text-orange-700 transition-colors group">
                  {navItem.title} Overview
                  <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
                </Link>
              }
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {navItem.groups.map((group, index) => (
                  <div key={index} className="space-y-3">
                    {group.heading && <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group.heading}</div>}
                    <ul className="space-y-3">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link to={link.to} className="block text-slate-600 outline-none hover:text-orange-600 transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav
      style={{ zIndex: 99999 }}
      className={`fixed w-full top-0 transition-all duration-500 will-change-transform ${isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)] border-b border-white/50 py-1'
        : 'bg-white backdrop-blur-md border-b border-black/5 py-3'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-14' : 'h-16'}`}>

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-4 group focus:outline-none relative outline-none z-50">
            <div className="relative overflow-hidden rounded-full drop-shadow-sm">
              <img
                src={logo}
                alt="IIT Madras Chemistry Department"
                className={`w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105 ${isScrolled ? 'h-[40px]' : 'h-[48px]'}`}
              />
            </div>
            <div className="flex-col justify-center hidden sm:flex transition-all duration-300">
              <span className="text-[17px] font-bold text-slate-800 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                Department of Chemistry
              </span>
              <span className="text-[12px] font-bold text-slate-500 leading-tight tracking-[0.1em] uppercase mt-0.5">
                IIT Madras
              </span>
            </div>
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="lg:hidden relative p-2 text-slate-600 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500/50 z-50"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>

          {/* Desktop Links & Auth Container */}
          <div className="hidden lg:flex lg:items-center h-full gap-1 xl:gap-2">

            <Link
              to="/"
              aria-label="Home"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-orange-600 hover:bg-orange-50/50 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <HomeIcon size={18} strokeWidth={2.5} />
            </Link>

            {/* Main Navigation Items */}
            <div className="flex items-center h-full">
              {NAVIGATION_DATA.map((navItem, index) => {
                const isActive = activeDropdown === navItem.title;

                // Smarter alignment to prevent wide menus from going off screen
                let alignmentClass = 'left-1/2 -translate-x-1/2 origin-top'; // Default to center for middle items (Academics, Research, People)
                if (index === 0) {
                  alignmentClass = 'left-0 origin-top-left'; // About is flush left
                } else if (index >= NAVIGATION_DATA.length - 2) {
                  alignmentClass = 'right-0 origin-top-right'; // Admissions, Explore are flush right
                }

                return (
                  <div
                    key={navItem.title}
                    className="h-full relative flex items-center"
                    onMouseEnter={() => handleMouseEnter(navItem.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Nav Item Button */}
                    <button
                      className={`relative h-10 px-3 xl:px-4 rounded-full flex items-center text-[14px] font-semibold transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 ${isActive
                          ? 'text-orange-700 bg-orange-50/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                        }`}
                    >
                      {navItem.title}
                      <ChevronDown
                        size={13}
                        strokeWidth={2.5}
                        className={`ml-1.5 transition-transform duration-300 ease-in-out ${isActive ? 'rotate-180 text-orange-600' : 'text-slate-400'
                          }`}
                      />
                    </button>

                    {/* Dropdown Mega Menu */}
                    <div
                      className={`absolute top-[calc(100%+0.5rem)] ${alignmentClass} bg-white/95 backdrop-blur-2xl border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] rounded-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-max max-w-[95vw] lg:max-w-[85vw] xl:max-w-none p-2 ${isActive
                          ? 'opacity-100 visible scale-100 translate-y-0'
                          : 'opacity-0 invisible scale-95 pointer-events-none -translate-y-2'
                        }`}
                      style={{ zIndex: 100000 }}
                    >
                      <div className="flex flex-wrap md:flex-nowrap p-5 lg:p-6 gap-x-8 lg:gap-x-12 gap-y-6 lg:gap-y-8 bg-white/50 rounded-xl relative">
                        {navItem.groups.map((group, groupIndex) => (
                          <div key={groupIndex} className="flex flex-col gap-3 min-w-[140px] lg:min-w-[160px] relative z-10">
                            {group.heading &&
                              <div className="text-[11px] font-bold text-slate-400/80 uppercase tracking-[0.15em] mb-1 lg:mb-2 flex items-center gap-2">
                                {group.heading}
                              </div>
                            }
                            <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
                              {group.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link
                                    to={link.to}
                                    className="group block relative text-slate-600 text-[13px] lg:text-[14px] font-medium transition-all duration-200 py-1.5 px-3 -mx-3 rounded-lg hover:bg-orange-50/50 hover:text-orange-700 focus:outline-none focus:bg-orange-50/80"
                                  >
                                    {link.label}
                                    {/* Hover underline effect */}
                                    <span className="absolute bottom-1.5 left-3 w-0 h-[1px] bg-orange-400 transition-all duration-300 group-hover:w-[calc(100%-1.5rem)] opacity-0 group-hover:opacity-100"></span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Dropdown Footer Area */}
                      {navItem.path && (
                        <div className="bg-slate-50/80 mt-2 rounded-xl px-5 lg:px-6 py-4 flex items-center justify-between group cursor-pointer" onClick={() => navigate(navItem.path)}>
                          <p className="text-xs text-slate-500 font-medium max-w-[200px]">Explore more about our {navItem.title.toLowerCase()} initiatives.</p>
                          <div className="flex items-center gap-2 text-[12px] lg:text-[13px] font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                            View All
                            <div className="bg-white shadow-sm h-6 w-6 rounded-full flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                              <span aria-hidden="true" className="text-[10px]">&rarr;</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-6 w-[1px] bg-slate-200 mx-1 lg:mx-3"></div>

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-3">
              {token ? (
                <>
                  <div className="flex flex-col items-end mr-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Welcome</span>
                    <span className="text-[12px] font-bold text-slate-700 capitalize border-b border-slate-200 pb-0.5">{role}</span>
                  </div>
                  <Link
                    to={getDashboardLink()}
                    className="relative px-4 py-2 text-[13px] font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800/20 whitespace-nowrap overflow-hidden group"
                  >
                    <span className="relative z-10">Dashboard</span>
                    <div className="absolute inset-0 h-full w-full custom-gradient-bg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 group"
                    title="Logout"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="relative overflow-hidden px-5 py-2 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-orange-600 to-[#c2410c] hover:from-orange-500 hover:to-orange-700 shadow-[0_4px_14px_0_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.23)] hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                >
                  Portal Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {/* Adding a portal or ensuring it sits above everything */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100000] lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-[360px] bg-white shadow-2xl flex flex-col h-full overflow-hidden animate-slide-in-right">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-white/95 backdrop-blur-sm z-10 relative">
              <span className="text-slate-800 font-bold uppercase tracking-[0.15em] text-xs">Navigation Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-all focus:outline-none"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto w-full bg-white flex flex-col relative z-0 hide-scrollbar">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 text-slate-800 font-bold py-5 px-6 border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <HomeIcon size={18} className="text-orange-500" />
                Home
              </Link>

              <div className="flex-1">
                {NAVIGATION_DATA.map((navItem) => <MobileAccordion key={navItem.title} navItem={navItem} />)}
              </div>

              {/* Mobile Footer Auth Section */}
              <div className="p-6 mt-auto bg-slate-50 border-t border-slate-100 relative">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                {token ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-lg uppercase shadow-inner">
                        {role.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Logged in as</p>
                        <p className="text-sm font-bold text-slate-800 capitalize">{role}</p>
                      </div>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center bg-slate-800 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-900 transition-colors shadow-sm"
                    >
                      Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold py-3 px-4 rounded-xl transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-600 to-[#c2410c] text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_14px_0_rgba(234,88,12,0.39)] hover:shadow-[0_6px_20px_rgba(234,88,12,0.23)] hover:-translate-y-0.5 transition-all"
                  >
                    <span>Secure Portal Login</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;