import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Users, CalendarDays, Shield, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SeasonSwitcher } from './SeasonSwitcher';
import './Layout.css';

export function Layout() {
  const location = useLocation();
  const { session, signOut } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home, public: true },
    { name: 'Teams', path: '/teams', icon: Users, public: true },
    { name: 'Schedule', path: '/schedule', icon: CalendarDays, public: true },
    { name: 'Admin', path: '/admin', icon: Shield, public: false },
  ];

  const visibleNavItems = navItems.filter(item => item.public || session);

  return (
    <div className="layout-container">
      {/* Desktop Sidebar / Mobile Bottom Nav */}
      <nav className="main-nav">
        <div className="nav-brand">
          <div className="brand-logo">⚽</div>
          <span className="brand-text">Kickers</span>
        </div>

        <div className="nav-season-wrapper">
          <SeasonSwitcher />
        </div>

        <ul className="nav-links">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <Icon className="nav-icon" size={24} />
                  <span className="nav-label">{item.name}</span>
                </Link>
              </li>
            );
          })}
          <li key="auth" className="auth-nav-item">
            {session ? (
              <button
                className="nav-link auth-btn"
                onClick={signOut}
              >
                <LogOut className="nav-icon" size={24} />
                <span className="nav-label">Sign Out</span>
              </button>
            ) : (
              <Link to="/login" className="nav-link">
                <LogIn className="nav-icon" size={24} />
                <span className="nav-label">Sign In</span>
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="mobile-header">
          <div className="flex-center" style={{ gap: '0.5rem' }}>
            <div className="brand-logo">⚽</div>
            <span className="brand-text">Kickers</span>
          </div>
          <SeasonSwitcher />
        </header>
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
