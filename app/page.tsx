// app/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';
import styles from './page.module.css';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={`${styles.hero} py-5`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className={styles.heroTitle}>
                Get Your Perfect Haircut,  Whenever You Want
              </h1>
              <p className={`${styles.heroSubtitle} lead text-muted mb-4`}>
                Book appointments with professional barbers near you.  No waiting, no hassle.
              </p>
              <div className="d-flex gap-3">
                {!isAuthenticated ? (
                  <>
                    <Link href={ROUTES.SIGNUP} className="btn btn-primary btn-lg">
                      Get Started
                    </Link>
                    <Link href={ROUTES.LOGIN} className="btn btn-outline-primary btn-lg">
                      Login
                    </Link>
                  </>
                ) : (
                  <Link href={ROUTES.CUSTOMER_SEARCH} className="btn btn-primary btn-lg">
                    Find Barbers <FaArrowRight className="ms-2" />
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.heroImage}>
                <div className={styles.imagePlaceholder}>
                  ✂️
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`${styles.features} py-5 bg-light`}>
        <div className="container">
          <h2 className="text-center mb-5">Why Choose BarberBooking?</h2>
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`${styles.featureCard} card h-100 border-0`}>
                <div className={styles.featureIcon}>
                  <FaCalendarAlt />
                </div>
                <h5 className="card-title">Easy Booking</h5>
                <p className="card-text text-muted">
                  Book your appointment in just a few clicks
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`${styles.featureCard} card h-100 border-0`}>
                <div className={styles.featureIcon}>
                  <FaMapMarkerAlt />
                </div>
                <h5 className="card-title">Find Nearby</h5>
                <p className="card-text text-muted">
                  Discover barbers near you with real-time availability
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`${styles.featureCard} card h-100 border-0`}>
                <div className={styles.featureIcon}>
                  <FaStar />
                </div>
                <h5 className="card-title">Top Rated</h5>
                <p className="card-text text-muted">
                  Read reviews and ratings from verified customers
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 mb-4">
              <div className={`${styles.featureCard} card h-100 border-0`}>
                <div className={styles.featureIcon}>
                  ⏰
                </div>
                <h5 className="card-title">No Waiting</h5>
                <p className="card-text text-muted">
                  Get your time slot and arrive on time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`${styles.howItWorks} py-5`}>
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-0 text-center">
              <div className={styles.stepNumber}>1</div>
              <h5>Sign Up</h5>
              <p className="text-muted">
                Create an account as a customer or barber
              </p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0 text-center">
              <div className={styles.stepNumber}>2</div>
              <h5>Search & Browse</h5>
              <p className="text-muted">
                Find barbers near you and view their profiles
              </p>
            </div>
            <div className="col-md-4 text-center">
              <div className={styles.stepNumber}>3</div>
              <h5>Book & Relax</h5>
              <p className="text-muted">
                Book an appointment and get your perfect haircut
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.cta} py-5 text-white text-center`}>
        <div className="container">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">Join thousands of satisfied customers and professionals</p>
          <Link href={ROUTES.SIGNUP} className="btn btn-light btn-lg">
            Create Your Account Today {isAuthenticated && '✓'}
          </Link>
        </div>
      </section>
    </div>
  );
}
