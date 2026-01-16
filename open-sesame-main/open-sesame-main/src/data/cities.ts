import { City } from '@/types';

export const RAW_CITIES: City[] = [
  { 
    id: 'paris', 
    name: 'Paris', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'lille', 
    name: 'Lille', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'nantes', 
    name: 'Nantes', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'rennes', 
    name: 'Rennes', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'poitiers', 
    name: 'Poitiers', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'tours', 
    name: 'Tours', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'limoges', 
    name: 'Limoges', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'clermont-ferrand', 
    name: 'Clermont-Ferrand', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'angers', 
    name: 'Angers', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'dijon', 
    name: 'Dijon', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'orleans', 
    name: 'Orléans', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'rouen', 
    name: 'Rouen', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  },
  { 
    id: 'besancon', 
    name: 'Besançon', 
    dateDisplay: 'Date TBA', 
    isoDate: '2026-12-31T00:00:00', 
    status: 'soon',
  }
];

export const isEventPast = (isoDate: string) => {
  const eventTime = new Date(isoDate).getTime();
  const twoDaysAfter = eventTime + (2 * 24 * 60 * 60 * 1000);
  return Date.now() > twoDaysAfter;
};
