export interface City {
  id: string;
  name: string;
  dateDisplay: string;
  isoDate: string;
  status: 'available' | 'sold-out' | 'soon';
  venue?: string;
  address?: string;
  ticketUrl?: string;
  flyerUrl?: string;
}

export type TicketModalProps = {
  city: City | null;
  isOpen: boolean;
  onClose: () => void;
  onScrollToPast?: () => void;
};
