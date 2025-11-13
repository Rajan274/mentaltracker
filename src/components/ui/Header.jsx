import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/personal-dashboard', icon: 'BarChart3' },
    { label: 'Calendar', path: '/calendar-view', icon: 'Calendar' },
    { label: 'Journal', path: '/journal-entries', icon: 'BookOpen' },
  ];

  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsUserMenuOpen(false);
    navigate('/user-login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileMenuRef?.current && !mobileMenuRef?.current?.contains(event?.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const Logo = () => (
    <Link to={isAuthenticated() ? '/personal-dashboard' : '/landing-page'} className="nav-logo">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="Brain" size={20} color="white" strokeWidth={2.5} />
        </div>
        <span className="font-heading font-semibold text-xl text-primary">MindTracker</span>
      </div>
    </Link>
  );

  const NavigationMenu = () => (
    <nav className="nav-menu">
      {navigationItems?.map((item) => (
        <Link
          key={item?.path}
          to={item?.path}
          className={`nav-item ${isActiveRoute(item?.path) ? 'active' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <Icon name={item?.icon} size={16} />
            <span>{item?.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );

  const UserMenu = () => (
    <div className="nav-user-menu" ref={userMenuRef}>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleUserMenu}
          className="flex items-center space-x-2 p-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
          <Icon name="ChevronDown" size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isUserMenuOpen && (
          <div className="user-menu-dropdown animate-gentle-fade-in">
            <Link
              to="/personal-dashboard"
              className="user-menu-item"
              onClick={closeUserMenu}
            >
              <Icon name="User" size={16} className="mr-2" />
              Profile
            </Link>
            <Link
              to="/settings"
              className="user-menu-item"
              onClick={closeUserMenu}
            >
              <Icon name="Settings" size={16} className="mr-2" />
              Settings
            </Link>
            <div className="user-menu-separator" />
            <button
              onClick={handleLogout}
              className="user-menu-item w-full text-left text-error hover:bg-error/10"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const MobileMenu = () => (
    <>
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay animate-gentle-fade-in" onClick={closeMobileMenu} />
      )}
      <div
        ref={mobileMenuRef}
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : 'closed'}`}
      >
        <div className="mobile-nav-content">
          <div className="flex items-center justify-between mb-6">
            <div className="nav-logo">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Brain" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="font-heading font-semibold text-xl text-primary">MindTracker</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeMobileMenu}
              className="p-2"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <nav className="space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`mobile-nav-item ${isActiveRoute(item?.path) ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="border-t border-border mt-6 pt-6 space-y-2">
            <Link
              to="/settings"
              className="mobile-nav-item"
              onClick={closeMobileMenu}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Settings" size={18} />
                <span>Settings</span>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="mobile-nav-item w-full text-left text-error hover:bg-error/10"
            >
              <div className="flex items-center space-x-3">
                <Icon name="LogOut" size={18} />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (!isAuthenticated()) {
    return (
      <header className="nav-header">
        <div className="nav-container">
          <Logo />
          <div className="flex items-center space-x-4">
            <Link to="/user-login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/user-registration">
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="nav-header">
      <div className="nav-container">
        <Logo />
        <NavigationMenu />
        <div className="flex items-center space-x-2">
          <UserMenu />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="nav-mobile-toggle"
          >
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>
      <MobileMenu />
    </header>
  );
};

export default Header;