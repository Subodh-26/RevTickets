// User Models
export interface User {
  id: number | string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  roles: string[];
  role?: 'customer' | 'admin'; // For backward compatibility
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  language: string;
  genres: string[];
  notifications: boolean;
}

export interface AuthResponse {
  token: string;
  tokenType?: string;
  user: User;
  expiresIn?: number;
}

export interface BackendApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: any;
}

export interface LoginRequest {
  emailOrPhone: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

// Movie Models
export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl?: string;
  trailerUrl?: string;
  duration: number; // in minutes
  releaseDate: Date;
  endDate?: Date;
  genre: string; // Backend sends comma-separated string
  genres?: string[]; // Optional parsed array for frontend use
  language: string;
  format: string; // Backend sends comma-separated string
  formats?: MovieFormat[]; // Optional parsed array for frontend use
  cast: string; // Backend sends comma-separated string
  castMembers?: CastMember[]; // Optional parsed array for frontend use
  director: string;
  rating: number;
  totalReviews?: number; // Backend field name
  totalRatings?: number; // Legacy field
  certification?: string; // Backend field name
  certificate?: string; // Legacy field - U, UA, A, S
  status: 'now_showing' | 'coming_soon' | 'ended' | 'NOW_SHOWING' | 'COMING_SOON' | 'ENDED';
  createdAt?: Date;
  updatedAt?: Date;
}

export type MovieFormat = '2D' | '3D' | 'IMAX' | '4DX' | 'DOLBY';

export interface CastMember {
  name: string;
  role: string;
  imageUrl?: string;
}

// Theater Models
export interface Theater {
  id: string;
  name: string;
  location: string;
  address: string;
  city: string;
  screens: Screen[];
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Screen {
  id: string;
  name: string;
  theaterId: string;
  seatLayout: SeatLayout;
  totalSeats: number;
  format: MovieFormat[];
}

export interface SeatLayout {
  rows: number;
  columns: number;
  categories: SeatCategory[];
  gaps: SeatGap[];
}

export interface SeatCategory {
  name: string;
  rows: number[];
  price: number;
  color: string;
}

export interface SeatGap {
  afterRow?: number;
  afterColumn?: number;
}

// Show Models
export interface Show {
  id: string | number;
  movieId: string | number;
  movieTitle?: string; // Backend returns this
  movie?: Movie;
  theaterId: string | number;
  theaterName?: string; // Backend returns this
  theater?: Theater;
  screenId: string | number;
  screenName?: string; // Backend returns this
  screen?: Screen;
  showDate: Date | string;
  startTime?: string; // Backend field name
  showTime?: string; // Legacy field
  endTime: string;
  format: string | MovieFormat; // Backend sends string
  language: string;
  basePrice: number;
  availableSeats: number;
  totalSeats?: number;
  status: 'scheduled' | 'filling_fast' | 'almost_full' | 'sold_out' | 'cancelled' | 'SCHEDULED' | 'FILLING_FAST' | 'ALMOST_FULL' | 'SOLD_OUT' | 'CANCELLED';
  priceMultipliers?: string; // Backend field
  createdAt?: Date;
  updatedAt?: Date;
}

// Seat Models
export interface Seat {
  id: string | number;
  seatRow?: string; // Backend field name
  row?: string; // Legacy field
  seatNumber?: number; // Backend field name
  number?: number; // Legacy field
  category: string;
  price: number;
  status: 'available' | 'selected' | 'booked' | 'blocked' | 'AVAILABLE' | 'SELECTED' | 'BOOKED' | 'BLOCKED';
}

export interface SeatSelection {
  showId: string;
  seats: Seat[];
  totalAmount: number;
}

// Booking Models
export interface Booking {
  id: string | number;
  bookingNumber: string;
  userId: string | number;
  showId?: string | number; // Legacy field
  showTime?: Show; // Backend field name (returns full ShowTimeResponse)
  show?: Show; // Legacy field
  seats: BookedSeat[];
  totalSeats: number;
  baseAmount: number;
  convenienceFee: number;
  taxes: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentId?: string;
  payment?: Payment;
  qrCode?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface BookedSeat {
  id?: string | number; // Backend returns this
  seatId?: string | number; // Legacy field for booking creation
  seatRow?: string; // Backend field name
  row?: string; // Legacy field
  seatNumber?: number; // Backend field name
  number?: number; // Legacy field
  category: string;
  price: number;
}

// Payment Models
export interface Payment {
  id: string | number;
  bookingId: string | number;
  userId?: string | number; // Not returned by backend
  amount: number;
  currency: string;
  method: string | PaymentMethod; // Backend returns string (enum name)
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'refund_processing' | 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED' | 'REFUND_PROCESSING';
  transactionId?: string;
  cardLast4?: string; // Backend field
  cardType?: string; // Backend field
  paymentDetails?: PaymentDetails;
  refundDetails?: RefundDetails;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export interface PaymentDetails {
  cardLast4?: string;
  cardType?: string;
  upiId?: string;
  bankName?: string;
  walletName?: string;
}

export interface RefundDetails {
  refundId: string;
  amount: number;
  reason: string;
  status: 'processing' | 'completed';
  initiatedAt: Date;
  completedAt?: Date;
}

// Review Models
export interface Review {
  id: string;
  movieId: string | number;
  userId: string | number;
  userName: string;
  userAvatar?: string; // Backend field
  rating: number;
  title?: string;
  content: string;
  likes?: number; // Legacy field
  likesCount?: number; // Backend field name
  dislikesCount?: number; // Backend field
  verified?: boolean; // Backend field
  isLiked?: boolean; // Legacy field
  likedByCurrentUser?: boolean; // Backend field name
  dislikedByCurrentUser?: boolean; // Backend field
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface CreateReviewRequest {
  movieId: string;
  rating: number;
  title?: string;
  content: string;
}

// Notification Models
export interface Notification {
  id: string;
  userId?: string; // Not returned by backend
  type: string | NotificationType; // Backend returns string (enum name)
  title: string;
  message: string;
  data?: Record<string, unknown>; // Legacy field
  metadata?: Record<string, any>; // Backend field name
  actionUrl?: string; // Backend field
  isRead?: boolean; // Legacy field
  read?: boolean; // Backend field name
  createdAt: Date | string;
}

export type NotificationType =
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'payment_success'
  | 'payment_failed'
  | 'refund_initiated'
  | 'refund_completed'
  | 'offer'
  | 'reminder';

// API Response Models
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Models
export interface MovieFilters {
  genres?: string[];
  languages?: string[];
  formats?: MovieFormat[];
  rating?: number;
  status?: 'now_showing' | 'coming_soon';
}

export interface ShowFilters {
  date?: Date;
  format?: MovieFormat;
  language?: string;
  priceRange?: { min: number; max: number };
}

// Report Models (Admin)
export interface BookingReport {
  date: string;
  bookings: number;
  revenue: number;
}

export interface MovieReport {
  movieId: string;
  movieTitle: string;
  totalBookings: number;
  totalRevenue: number;
  avgRating: number;
}

export interface RevenueReport {
  period: string;
  revenue: number;
  bookings: number;
  avgTicketPrice: number;
}
