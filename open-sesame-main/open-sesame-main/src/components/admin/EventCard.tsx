import React from 'react';
import { Event } from '@/hooks/useEvents';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  const statusColors = {
    available: 'bg-green-500/20 text-green-400 border-green-500/30',
    'sold-out': 'bg-red-500/20 text-red-400 border-red-500/30',
    soon: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  };

  const statusLabels = {
    available: 'Available',
    'sold-out': 'Sold Out',
    soon: 'Coming Soon',
  };

  return (
    <Card className="bg-card border-border overflow-hidden group hover:border-primary/50 transition-colors">
      {/* Flyer Image */}
      {event.flyer_url && (
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={event.flyer_url} 
            alt={`${event.city_name} event flyer`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        </div>
      )}

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">
              {event.city_name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Calendar className="w-3 h-3" />
              <span>{event.date_display}</span>
            </div>
          </div>
          <Badge className={statusColors[event.status]}>
            {statusLabels[event.status]}
          </Badge>
        </div>

        {event.venue && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
            <MapPin className="w-3 h-3" />
            <span>{event.venue}</span>
          </div>
        )}

        {event.address && (
          <p className="text-xs text-muted-foreground mb-3 ml-4">
            {event.address}
          </p>
        )}

        {event.ticket_url && (
          <a 
            href={event.ticket_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mb-3"
          >
            <ExternalLink className="w-3 h-3" />
            Ticket Link
          </a>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(event)}
          >
            <Pencil className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onDelete(event.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
