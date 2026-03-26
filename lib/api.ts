// lib/api.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export class APIClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor: Add JWT token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token') || localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: Handle auth errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid - clear auth
          Cookies.remove('token');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async signup(email: string, password: string, phone: string, role: string) {
    const { data } = await this.axiosInstance.post('/auth/signup', {
      email,
      password,
      phone,
      role,
    });
    return data;
  }

  async login(email: string, password: string) {
    const { data } = await this.axiosInstance.post('/auth/login', {
      email,
      password,
    });
    return data;
  }

  async logout() {
    await this.axiosInstance.post('/auth/logout');
  }

  // Barber endpoints
  async getBarber(id: string) {
    const { data } = await this.axiosInstance.get(`/barbers/${id}`);
    return data;
  }

  async updateBarberProfile(profile: any) {
    const { data } = await this.axiosInstance.post('/barbers/profile', profile);
    return data;
  }

  async getBarberServices(barberId?: string) {
    const { data } = await this.axiosInstance.get(
      barberId ? `/barbers/${barberId}/services` : '/barbers/services/list'
    );
    return data;
  }

  async addService(service: any) {
    const { data } = await this.axiosInstance.post('/barbers/services', service);
    return data;
  }

  async getAvailableSlots(barberId: string, date?: string, serviceId?: string) {
    const params = new URLSearchParams();
    if (date) params.append('date', date);
    if (serviceId) params.append('serviceId', serviceId);
    const { data } = await this.axiosInstance.get(`/barbers/availability/${barberId}?${params}`);
    return data;
  }

  async createTimeSlot(slot: any) {
    const { data } = await this.axiosInstance.post('/barbers/availability', slot);
    return data;
  }

  // Customer endpoints
  async getCustomerProfile() {
    const { data } = await this.axiosInstance.get('/customers/profile');
    return data;
  }

  async updateCustomerProfile(profile: any) {
    const { data } = await this.axiosInstance.put('/customers/profile', profile);
    return data;
  }

  async searchBarbers(params: {
    location?: string;
    service?: string;
    page?: number;
    limit?: number;
  }) {
    const { data } = await this.axiosInstance.get('/customers/search', { params });
    return data;
  }

  async getCustomerBookings(status?: string, page = 1, limit = 10) {
    const params: any = { page, limit };
    if (status) params.status = status;
    const { data } = await this.axiosInstance.get('/customers/bookings', { params });
    return data;
  }

  // Booking endpoints
  async createBooking(booking: any) {
    const { data } = await this.axiosInstance.post('/bookings', booking);
    return data;
  }

  async getBooking(id: string) {
    const { data } = await this.axiosInstance.get(`/bookings/${id}`);
    return data;
  }

  async cancelBooking(id: string, reason?: string) {
    const { data } = await this.axiosInstance.put(`/bookings/${id}/cancel`, { reason });
    return data;
  }

  async rescheduleBooking(id: string, reschedule: any) {
    const { data } = await this.axiosInstance.put(`/bookings/${id}/reschedule`, reschedule);
    return data;
  }

  // Notification endpoints
  async getNotifications(unreadOnly = false, page = 1, limit = 10) {
    const { data } = await this.axiosInstance.get('/notifications', {
      params: { unreadOnly, page, limit },
    });
    return data;
  }

  async markNotificationAsRead(id: string) {
    const { data } = await this.axiosInstance.put(`/notifications/${id}/read`);
    return data;
  }

  async deleteNotification(id: string) {
    const { data } = await this.axiosInstance.delete(`/notifications/${id}`);
    return data;
  }

  get client() {
    return this.axiosInstance;
  }
}

export const apiClient = new APIClient();
