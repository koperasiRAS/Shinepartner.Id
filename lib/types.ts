// Booking types
export interface Booking {
  id?: string;
  name: string;
  phone: string;
  service: string;
  package: string;
  event_date: string;
  location: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

// Portfolio types
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  media_url: string;
  thumbnail?: string;
}

// FAQ types
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

// Ecosystem Brand types
export interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Form types
export interface BookingFormData {
  name: string;
  phone: string;
  event_date: string;
  location: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
