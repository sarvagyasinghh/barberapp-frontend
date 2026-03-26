// components/common/Navbar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { FaHome, FaSearch, FaBell, FaUser, FaMoon, FaSun, FaMenu, FaTimes } from 'react-icons/fa';
import { ROUTES, USER_ROLES } from '@/lib/constants';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        {/* Logo */}
        <Link href="/" className={`navbar-brand fw-bold ${styles.brand}`}>
          <span className={styles.logoIcon}>✂️</span> BarberBooking
        </Link>

        {/* Theme Toggle */}
        <button
          className={`btn btn-sm ${styles.themeToggle}`}
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="btn btn-sm d-lg-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaMenu />}
        </button>

        {/* Navbar Content */}
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            {isAuthenticated && user ? (
              <>
                {/* Customer Routes */}
                {user.role === USER_ROLES.CUSTOMER && (
                  <>
                    <li className="nav-item">
                      <Link href={ROUTES.CUSTOMER_SEARCH} className="nav-link">
                        <FaSearch className="me-1" /> Search Barbers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={ROUTES.CUSTOMER_BOOKINGS} className="nav-link">
                        My Bookings
                      </Link>
                    </li>
                  </>
                )}

                {/* Barber Routes */}
                {user.role === USER_ROLES.BARBER && (
                  <>
                    <li className="nav-item">
                      <Link href={ROUTES.BARBER_DASHBOARD} className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={ROUTES.BARBER_APPOINTMENTS} className="nav-link">
                        Appointments
                      </Link>
                    </li>
                  </>
                )}

                {/* Notifications */}
                <li className="nav-item">
                  <Link href={ROUTES.CUSTOMER_NOTIFICATIONS} className="nav-link position-relative">
                    <FaBell />
                    <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${styles.notificationBadge}`}>
                      2
                    </span>
                  </Link>
                </li>

                {/* User Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <FaUser /> {user.email.split('@')[0]}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link
                        href={
                          user.role === USER_ROLES.CUSTOMER
                            ? ROUTES.CUSTOMER_PROFILE
                            : ROUTES.BARBER_PROFILE
                        }
                        className="dropdown-item"
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item text-danger"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href={ROUTES.LOGIN} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={ROUTES.SIGNUP} className="btn btn-primary btn-sm ms-2">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
