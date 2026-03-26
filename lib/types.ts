// lib/types.ts

export type UserRole = 'customer' | 'barber';

export interface User {
  _id: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Customer extends User {
  firstName?: string;
  lastName?: string;
  address?: string;
  profileImage?: string;
  savedBarbers?: string[];
}

export interface Barber extends User {
  shopName: string;
  address: string;
  bio?: string;
  profileImage?: string;
  location?: {
    type: string;
    coordinates: [number, number];  // [longitude, latitude]
  };
  workingHours?: WorkingHours;
  services?: Service[];
  rating: number;
  reviewCount: number;
  status: 'active' | 'inactive';
}

export interface WorkingHours {
  [key: string]: { start: string; end: string };
}

export interface Service {
  _id: string;
  barberId: string;
  serviceName: string;
  description?: string;
  duration: number;
  price: number;
  isActive: boolean;
  createdAt: string;
}

export interface TimeSlot {
  _id: string;
  barberId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface Booking {
  _id: string;
  customerId: string | Customer;
  barberId: string | Barber;
  serviceId: string | Service;
  timeSlotId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';
  notes?: string;
  cancelReason?: string;
  rejectionReason?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  relatedBookingId?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Rating {
  _id: string;
  bookingId: string;
  customerId: string;
  barberId: string;
  rating: number;
  review?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}
