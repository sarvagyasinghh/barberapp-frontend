// app/(auth)/login/page.tsx
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - BarberBooking',
  description: 'Login to your BarberBooking account',
};

export default function LoginPage() {
  return (
    <div className="container-fluid mt-5">
      <LoginForm />
    </div>
  );
}
