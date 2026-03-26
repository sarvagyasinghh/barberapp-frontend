// app/(auth)/signup/page.tsx
import React from 'react';
import SignupForm from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up - BarberBooking',
  description: 'Create a new BarberBooking account',
};

export default function SignupPage() {
  return (
    <div className="container-fluid mt-5">
      <SignupForm />
    </div>
  );
}
