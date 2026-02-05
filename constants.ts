
import { BarberShop, ShopStatus, Language, Review } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export const COLORS = {
  bg: '#F9FAFB',
  card: '#FFFFFF',
  border: '#F3F4F6',
  accent: '#2563EB',
  text: '#111827',
  muted: '#6B7280'
};

export const LOGO_SVG = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A855F7" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
  </defs>
  <!-- Main Bubble Shape -->
  <path d="M50 15 C70 15 85 30 85 50 C85 70 70 85 50 85 L35 90 L40 75 C25 70 15 55 15 45 C15 25 30 15 50 15Z" fill="url(#bubbleGrad)" />
  
  <!-- Scissors Icon -->
  <g stroke="white" stroke-width="4.5" stroke-linecap="round">
    <circle cx="42" cy="45" r="7" fill="none" />
    <circle cx="42" cy="58" r="7" fill="none" />
    <path d="M48 48 L70 65" />
    <path d="M48 55 L70 38" />
  </g>
  
  <!-- Sparkles -->
  <path d="M72 25 L75 20 L78 25 L75 30 Z" fill="white" />
  <path d="M82 35 L84 32 L86 35 L84 38 Z" fill="white" opacity="0.6" />
</svg>
`;

export const TRANSLATIONS: Record<string, any> = {
  en: {
    welcome: "Welcome to REPY",
    bookBtn: "Book Now",
    callBtn: "AI Call",
    chatBtn: "Chat",
    openingHours: "Open: {0} - {1}",
    recentBookings: "{0} bookings today",
  }
};

const MOCK_REVIEWS: Review[] = [
  { id: 'r1', shopId: '1', userName: 'Arjun Mehra', rating: 5, comment: "Best fade I've had in Delhi. AI booking was seamless!", date: '2 days ago' },
  { id: 'r2', shopId: '1', userName: 'Siddharth Singh', rating: 4, comment: "Professional service and very clean shop.", date: '1 week ago' },
  { id: 'r3', shopId: '1', userName: 'Karan Johar', rating: 5, comment: "Top notch styling. Recommended!", date: '2 weeks ago' },
];

export const MOCK_SHOPS: BarberShop[] = [
  {
    id: '1',
    name: 'Royal Elite Grooming',
    ownerName: 'Rahul Sharma',
    profilePhoto: 'https://images.unsplash.com/photo-1503910361347-ed0596136a5e?w=400',
    coverPhoto: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800',
    shopPhotos: [
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400',
      'https://images.unsplash.com/photo-1512690196236-d5a7139f403c?w=400'
    ],
    shopVideos: [],
    portfolioPhotos: [
      'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400',
      'https://images.unsplash.com/photo-1532710093739-9470acff878f?w=400'
    ],
    status: ShopStatus.AVAILABLE,
    rating: 4.9,
    reviewCount: 245,
    distance: 0.5,
    isVerified: true,
    offersHomeService: true,
    services: [
      { id: 's1', name: 'Elite Haircut', price: 300, durationMinutes: 45 },
      { id: 's2', name: 'Beard Sculpting', price: 150, durationMinutes: 20 },
      { id: 's3', name: 'Full Grooming', price: 800, durationMinutes: 90 }
    ],
    highlights: [
      "No. 1 Premium Studio in Delhi",
      "AI-Powered Automated Bookings",
      "100% Hygienic & Sanitized"
    ],
    rankInArea: 1,
    recentBookings: 52,
    openingTime: '09:00',
    closingTime: '21:00',
    isActive: true,
    billingStatus: 'PAID',
    acceptedPayments: ['UPI', 'Cash'],
    reviews: MOCK_REVIEWS,
    labels: ['Top Rated'],
    location: { lat: 28.6139, lng: 77.209, address: 'CP, New Delhi' }
  }
];
