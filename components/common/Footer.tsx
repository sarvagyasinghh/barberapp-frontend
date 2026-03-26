// components/common/Footer.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${styles.footer} bg-dark text-white mt-5 pt-5`}>
      <div className="container">
        <div className="row mb-4">
          {/* About */}
          <div className="col-md-4 mb-3">
            <h5>BarberBooking</h5>
            <p className="text-muted">
              Easy online booking for quality barber services near you. Connect with professional barbers instantly.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link href="/" className="text-muted text-decoration-none">Home</Link></li>
              <li><Link href="/search" className="text-muted text-decoration-none">Find Barbers</Link></li>
              <li><Link href="#" className="text-muted text-decoration-none">About Us</Link></li>
              <li><Link href="#" className="text-muted text-decoration-none">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-2 mb-3">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-muted text-decoration-none">Help Center</Link></li>
              <li><Link href="#" className="text-muted text-decoration-none">FAQ</Link></li>
              <li><Link href="#" className="text-muted text-decoration-none">Privacy</Link></li>
              <li><Link href="#" className="text-muted text-decoration-none">Terms</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h6>Get In Touch</h6>
            <p className="text-muted small">
              📍 123 Business Street, City, State<br/>
              📞 1-800-BARBER-1<br/>
              ✉️ support@barberbooking.com
            </p>
          </div>
        </div>

        <hr className="bg-secondary" />

        {/* Bottom */}
        <div className={`text-center text-muted py-3 ${styles.bottomFooter}`}>
          <p className="mb-0">
            © {year} BarberBooking. All rights reserved. | Designed with ❤️ for barbers and customers
          </p>
        </div>
      </div>
    </footer>
  );
}
