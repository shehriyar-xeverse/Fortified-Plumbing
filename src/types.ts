export type Page = 'home' | 'about' | 'services' | 'gallery' | 'contact';

export interface BookingInquiry {
  id: string;
  firstName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  serviceType: string;
  message: string;
  date: string;
  status: 'pending' | 'confirmed';
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  benefits: string[];
  process: string[];
  image: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Kitchen' | 'Bathroom' | 'Water System' | 'Custom Build' | 'Renovation';
  size: 'small' | 'medium' | 'large';
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}
