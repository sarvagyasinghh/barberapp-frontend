// lib/constants.ts

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
  },
  BARBERS: {
    PROFILE: '/barbers/profile',
    GET: '/barbers',
    SERVICES: '/barbers/services',
    AVAILABILITY: '/barbers/availability',
    APPOINTMENTS: '/barbers/appointments',
  },
  CUSTOMERS: {
    PROFILE: '/customers/profile',
    SEARCH: '/customers/search',
    BOOKINGS: '/customers/bookings',
  },
  BOOKINGS: {
    CREATE: '/bookings',
    GET: '/bookings',
    CANCEL: '/bookings/:id/cancel',
    RESCHEDULE: '/bookings/:id/reschedule',
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    DELETE: '/notifications/:id',
  },
};

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export const USER_ROLES = {
  CUSTOMER: 'customer',
  BARBER: 'barber',
} as const;

export const NOTIFICATION_TYPES = {
  BOOKING_REQUESTED: 'booking_requested',
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_REJECTED: 'booking_rejected',
  BOOKING_CANCELLED: 'booking_cancelled',
  BOOKING_COMPLETED: 'booking_completed',
} as const;

// Working days of the week
export const WORKING_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

// Default working hours
export const DEFAULT_WORKING_HOURS = {
  monday: { start: '09:00', end: '18:00' },
  tuesday: { start: '09:00', end: '18:00' },
  wednesday: { start: '09:00', end: '18:00' },
  thursday: { start: '09:00', end: '18:00' },
  friday: { start: '09:00', end: '20:00' },
  saturday: { start: '10:00', end: '18:00' },
  sunday: { start: 'closed', end: 'closed' },
};

// Default pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Time slot duration (in minutes)
export const TIME_SLOT_DURATION = 30;

// Colors for dark/light mode
export const COLORS = {
  light: {
    background: '#ffffff',
    text: '#000000',
    border: '#ddd',
    primary: '#0066cc',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    border: '#444',
    primary: '#0080ff',
    success: '#32cd32',
    danger: '#ff4444',
    warning: '#ffd700',
    info: '#4db8ff',
  },
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CUSTOMER_DASHBOARD: '/customer/dashboard',
  CUSTOMER_SEARCH: '/customer/search',
  CUSTOMER_BOOKINGS: '/customer/bookings',
  CUSTOMER_NOTIFICATIONS: '/customer/notifications',
  CUSTOMER_PROFILE: '/customer/profile',
  BARBER_DASHBOARD: '/barber/dashboard',
  BARBER_PROFILE: '/barber/profile',
  BARBER_SERVICES: '/barber/services',
  BARBER_AVAILABILITY: '/barber/availability',
  BARBER_APPOINTMENTS: '/barber/appointments',
};
