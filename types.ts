
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  BARBER = 'BARBER',
  ADMIN = 'ADMIN'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

export enum ShopStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  CLOSED = 'CLOSED'
}

export type LanguageCode = 'en' | 'hi' | 'kn' | 'ta' | 'te';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
}

export interface ServiceMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description?: string;
  media?: ServiceMedia[];
}

export interface Review {
  id: string;
  shopId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isDeleted?: boolean;
}

export interface BarberOffer {
  id: string;
  text: string;
  color: string;
  expiresAt?: Date;
}

export interface BarberShop {
  id: string;
  name: string;
  ownerName: string;
  profilePhoto: string;
  coverPhoto: string;
  shopPhotos: string[];
  shopVideos: string[];
  portfolioPhotos: string[]; // Process images
  status: ShopStatus;
  rating: number;
  reviewCount: number;
  distance: number;
  isVerified: boolean;
  offersHomeService: boolean;
  services: Service[];
  highlights?: string[]; // The three descriptions requested by the user
  activeOffer?: BarberOffer;
  rankInArea: number;
  recentBookings: number;
  openingTime: string; // "09:00" format
  closingTime: string; // "21:00" format
  reviews: Review[];
  acceptedPayments: string[]; // ['UPI', 'Cash', 'Card']
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  labels: string[];
  isActive: boolean;
  billingStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export interface Appointment {
  id: string;
  shopId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AdminMessage {
  id: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: Date;
  status: 'unread' | 'read';
}
