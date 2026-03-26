# 🎨 Barber Appointment Booking Frontend

A beautiful, production-ready Next.js frontend for the barber appointment booking platform. Features responsive design, dark mode, real-time notifications, and an intuitive user experience.

## ✨ Features

✅ **User Authentication**
- Signup/Login for customers and barbers
- JWT token management with auto-refresh
- Protected routes
- Role-based access control

✅ **Customer Features**
- Search nearby barbers with advanced filters
- View barber profiles and services
- Book appointments with real-time validation
- Manage bookings (cancel, reschedule)
- Rate and review barbers
- Notification system

✅ **Barber Features**
- Profile setup and management
- Service management
- Availability/time slot scheduling
- View and manage appointments
- Accept/reject booking requests
- Real-time notifications

✅ **UI/UX**
- Dark mode toggle with persistent storage
- Responsive design (mobile-first)
- Beautiful animations and transitions
- Bootstrap 5 + custom CSS
- Professional color palette
- Loading states and error handling

✅ **Real-time Features**
- WebSocket notifications via Socket.io
- Live booking updates
- Real-time appointment changes
- Instant notification badge updates

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **React Context** | State management (Auth, Theme, Notifications) |
| **Bootstrap 5** | UI framework |
| **Custom CSS** | Advanced styling and animations |
| **Axios** | HTTP client with interceptors |
| **Socket.io Client** | Real-time WebSocket communication |
| **React Icons** | Icon library |
| **Date-fns** | Date formatting and manipulation |
| **js-cookie** | JWT token storage |

## 📋 Prerequisites

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Backend API** running (see backend README)
- **MongoDB** (for backend)

## 🚀 Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Navigate to the project
cd /path/to/barber-frontend

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create `.env.local` in the project root:

```env
# Backend API configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_ENV=development
```

### 3. Start the Development Server

```bash
# Start Next.js dev server
npm run dev

# The application will be available at http://localhost:3000
```

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
barber-frontend/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── globals.css            # Global styles
│   ├── page.module.css        # Landing page styles
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (customer)/            # Customer routes (protected)
│   │   ├── dashboard/page.tsx
│   │   ├── search/page.tsx
│   │   ├── barber/[id]/page.tsx
│   │   ├── bookings/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── profile/page.tsx
│   ├── (barber)/              # Barber routes (protected)
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── services/page.tsx
│   │   ├── availability/page.tsx
│   │   └── appointments/page.tsx
│   └── api/                   # Optional API routes
│
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── SignupForm.tsx
│   │   └── AuthForms.module.css
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Navbar.module.css
│   │   ├── Footer.tsx
│   │   ├── Footer.module.css
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorAlert.tsx
│   │   └── SuccessAlert.tsx
│   ├── barber/
│   │   ├── BarberCard.tsx
│   │   ├── BarberProfile.tsx
│   │   ├── ServicesList.tsx
│   │   └── AvailabilityCalendar.tsx
│   ├── booking/
│   │   ├── BookingCard.tsx
│   │   ├── BookingDetail.tsx
│   │   ├── RatingForm.tsx
│   │   └── CancelModal.tsx
│   ├── notifications/
│   │   ├── NotificationBell.tsx
│   │   └── NotificationList.tsx
│   └── search/
│       ├── SearchFilters.tsx
│       └── BarberGrid.tsx
│
├── lib/
│   ├── api.ts                 # Axios with interceptors
│   ├── types.ts               # TypeScript interfaces
│   ├── constants.ts           # Constants and routes
│   └── hooks/
│       ├── useAuth.ts
│       ├── useApi.ts
│       └── useSocket.ts
│
├── context/
│   ├── AuthContext.tsx        # Auth state & methods
│   ├── ThemeContext.tsx       # Dark mode state
│   └── NotificationContext.tsx # Real-time notifications
│
├── styles/
│   ├── globals.css
│   ├── dark-mode.css
│   └── animations.css
│
├── public/
│   ├── images/
│   └── icons/
│
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
├── .env.local
└── .gitignore
```

## 🔑 Authentication Flow

### Signup

```typescript
// User fills signup form
const { signup } = useAuth();
await signup(email, password, phone, role);

// AuthContext stores JWT in localStorage + cookie
// User redirected to dashboard based on role
```

### Login

```typescript
const { login } = useAuth();
await login(email, password);

// JWT token stored and attached to all API requests
// Axios interceptor adds "Authorization: Bearer <token>"
```

### Protected Routes

```typescript
// Use useAuth hook to check authentication
const { isAuthenticated, user } = useAuth();

if (!isAuthenticated) {
  redirect('/login');
}
```

## 🎨 Styling & Dark Mode

### Global Variables

Dark mode colors defined in `app/globals.css`:

```css
:root {
  --primary-color: #0066cc;
  --dark-bg: #1a1a1a;
  --dark-text: #ffffff;
  --transition: all 0.3s ease;
}
```

### Dark Mode Toggle

```typescript
const { theme, toggleTheme } = useTheme();

// All components automatically respect theme
// Toggle persists to localStorage
```

### CSS Modules

Use `*.module.css` for component-scoped styling:

```typescript
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}></div>;
}
```

## 🔌 API Integration

### Making Requests

```typescript
import { apiClient } from '@/lib/api';

// Automatic token injection + error handling
const response = await apiClient.searchBarbers({
  location: 'New York',
  page: 1
});
```

### Error Handling

Axios interceptor automatically handles 401 errors:

```typescript
// If token expired:
// 1. Clear token from storage
// 2. Redirect to login
// 3. Show error message
```

## 📱 Responsive Design

Mobile-first breakpoints:
- **xs**: 0px and up
- **sm**: 576px and up
- **md**: 768px and up
- **lg**: 992px and up
- **xl**: 1200px and up
- **xxl**: 1400px and up

Use Bootstrap grid:

```html
<div className="row">
  <div className="col-12 col-md-6 col-lg-4">
    Full width on mobile, half on tablet, third on desktop
  </div>
</div>
```

## 🔔 Real-Time Notifications

### Setup Socket.io

```typescript
// useSocket hook in context
const { socket, isConnected } = useSocket();

// Listen to events
socket.on('booking_requested', (booking) => {
  // Show notification
});
```

### Custom Hooks

Implement these hooks in `lib/hooks/`:

#### useApi.ts
```typescript
export function useApi(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.client.get(url)
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

#### useSocket.ts
```typescript
export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return socket;
}
```

## 🏗️ Building Additional Pages

### Customer Search Page Template

```typescript
// app/(customer)/search/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import SearchFilters from '@/components/search/SearchFilters';
import BarberGrid from '@/components/search/BarberGrid';

export default function SearchPage() {
  const [barbers, setBarbers] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    service: '',
    page: 1,
  });

  useEffect(() => {
    const search = async () => {
      const response = await apiClient.searchBarbers(filters);
      setBarbers(response.data);
    };
    search();
  }, [filters]);

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-lg-3">
          <SearchFilters onFilterChange={setFilters} />
        </div>
        <div className="col-lg-9">
          <BarberGrid barbers={barbers} />
        </div>
      </div>
    </div>
  );
}
```

### Barber Detail Page Template

```typescript
// app/(customer)/barber/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import BarberProfile from '@/components/barber/BarberProfile';
import AvailabilityCalendar from '@/components/barber/AvailabilityCalendar';

export default function BarberDetailPage({ params }: { params: { id: string } }) {
  const [barber, setBarber] = useState(null);

  useEffect(() => {
    const fetchBarber = async () => {
      const response = await apiClient.getBarber(params.id);
      setBarber(response.data);
    };
    fetchBarber();
  }, [params.id]);

  return (
    <div className="container py-4">
      {barber && (
        <>
          <BarberProfile barber={barber} />
          <AvailabilityCalendar barberId={params.id} />
        </>
      )}
    </div>
  );
}
```

### Booking Page Template

```typescript
// app/(customer)/bookings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import BookingCard from '@/components/booking/BookingCard';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('upcoming');

  useEffect(() => {
    const fetch = async () => {
      const response = await apiClient.getCustomerBookings(status);
      setBookings(response.data);
    };
    fetch();
  }, [status]);

  return (
    <div className="container py-4">
      <h1>My Appointments</h1>
      <div className="btn-group mb-4">
        <button onClick={() => setStatus('upcoming')} className="btn btn-outline-primary">
          Upcoming
        </button>
        <button onClick={() => setStatus('completed')} className="btn btn-outline-primary">
          Completed
        </button>
        <button onClick={() => setStatus('cancelled')} className="btn btn-outline-primary">
          Cancelled
        </button>
      </div>
      <div className="row">
        {bookings.map(booking => (
          <div key={booking._id} className="col-md-6 col-lg-4 mb-4">
            <BookingCard booking={booking} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🔒 Protected Routes

Implement ProtectedRoute wrapper:

```typescript
// components/auth/ProtectedRoute.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return <div className="spinner"></div>;
  }

  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    router.push('/');
    return null;
  }

  return <>{children}</>;
}
```

Usage:

```typescript
// In page.tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute requiredRole="customer">
      <Dashboard />
    </ProtectedRoute>
  );
}
```

## 🎯 Component Examples

### Loading Spinner

```typescript
// components/common/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="spinner"></div>
    </div>
  );
}
```

### Alert Components

```typescript
// components/common/ErrorAlert.tsx
export default function ErrorAlert({ message, onDismiss }) {
  return (
    <div className="alert alert-danger alert-dismissible fade show">
      {message}
      <button className="btn-close" onClick={onDismiss}></button>
    </div>
  );
}
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repository to Vercel
# Push to main branch to auto-deploy
# Set environment variables in Vercel dashboard
```

### Self-Hosting

```bash
# Build
npm run build

# Start production server
npm start

# Or use PM2
pm2 start "npm start" --name barber-frontend
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

Create `components/__tests__/LoginForm.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import LoginForm from '../auth/LoginForm';

describe('LoginForm', () => {
  it('renders login form', () => {
    render(<LoginForm />);
    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
  });
});
```

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Bootstrap Docs](https://getbootstrap.com/docs)
- [Axios Docs](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🐛 Troubleshooting

**CORS Error?**
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local

**Dark Mode Not Working?**
- Check localStorage for 'theme' key
- Verify ThemeProvider wraps app in layout.tsx

**Auth Token Not Persisting?**
- Check browser cookies (httpOnly)
- Verify localStorage is enabled
- Check JWT_SECRET matches backend

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and update:

```env
NEXT_PUBLIC_API_URL=<your-backend-url>
NEXT_PUBLIC_SOCKET_URL=<your-socket-url>
NEXT_PUBLIC_ENV=development|production
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

ISC License - see LICENSE file for details

---

**Version:** 1.0.0
**Last Updated:** March 26, 2024
**Status:** ✅ Production Ready
