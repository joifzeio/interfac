export interface SlideData {
  id: number;
  image: string;
  title: string;
  tag: string;
  link: string;
}

export interface TicketEvent {
  id: number;
  title: string;
  date: string;
  venue: string;
  image: string;
  status: 'SELLING FAST' | 'SOLD OUT' | 'JUST ANNOUNCED';
  price?: string;
  description?: string;
  city?: string;
  tourId?: string; // Links event to a specific tour
  is_past?: boolean;
  address?: string;
  billetweb_id?: string;
  ticket_url?: string;
}

export interface NavLink {
  label: string;
  href: string;
  number: string;
  image: string;
  isExternal?: boolean; // Added to distinguish internal/external links
}

export interface EventData {
  id: number;
  image: string;
  title: string;
  date: string;
  link: string;
}

export interface ReleaseData {
  id: number;
  image: string;
  title: string;
  artist: string;
  link: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  flyer: string;
  cities: {
    cityName: string;
    date: string;
    venue: string;
    price: string;
    flyer: string; // Dynamic per city
    billetweb_id?: string;
  }[];
}