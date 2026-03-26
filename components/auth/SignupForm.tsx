// components/auth/SignupForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { USER_ROLES } from '@/lib/constants';
import styles from './AuthForms.module.css';

type UserRole = 'customer' | 'barber';

export default function SignupForm() {
  const [role, setRole] = useState<UserRole>(USER_ROLES.CUSTOMER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const validateForm = (): boolean => {
    if (!email || !password || !phone) {
      setError('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, phone, role);
      router.push(role === USER_ROLES.CUSTOMER ? '/customer/dashboard' : '/barber/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <h2 className="mb-2 text-center">Create Account</h2>
        <p className="text-muted text-center mb-4">Join us to book or offer barber services</p>

        {/* Role Selector Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${role === USER_ROLES.CUSTOMER ? styles.active : ''}`}
            onClick={() => setRole(USER_ROLES.CUSTOMER)}
          >
            👤 Customer
          </button>
          <button
            className={`${styles.tabButton} ${role === USER_ROLES.BARBER ? styles.active : ''}`}
            onClick={() => setRole(USER_ROLES.BARBER)}
          >
            ✂️ Barber
          </button>
        </div>

        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
              type="button"
              className="btn-close"
              onClick={() => setError('')}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.icon} />
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <div className={styles.inputGroup}>
              <FaPhone className={styles.icon} />
              <input
                type="tel"
                className="form-control"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <div className={styles.inputGroup}>
              <FaLock className={styles.icon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={loading}
            />
            <label className="form-check-label" htmlFor="agreeTerms">
              I agree to the{' '}
              <a href="#" className="text-decoration-none">Terms & Conditions</a> and{' '}
              <a href="#" className="text-decoration-none">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-primary w-100 mb-3 ${styles.submitBtn}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-muted">
          Already have an account?{' '}
          <a href="/login" className="fw-bold">Login here</a>
        </p>
      </div>
    </div>
  );
}
