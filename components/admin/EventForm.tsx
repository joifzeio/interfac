import React, { useState, useEffect } from 'react';
import { Event, EventInput, useUploadFlyer } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const CITIES = [
  { id: 'paris', name: 'Paris' },
  { id: 'lille', name: 'Lille' },
  { id: 'nantes', name: 'Nantes' },
  { id: 'rennes', name: 'Rennes' },
  { id: 'poitiers', name: 'Poitiers' },
  { id: 'tours', name: 'Tours' },
  { id: 'limoges', name: 'Limoges' },
  { id: 'clermont-ferrand', name: 'Clermont-Ferrand' },
  { id: 'angers', name: 'Angers' },
  { id: 'dijon', name: 'Dijon' },
  { id: 'orleans', name: 'Orléans' },
  { id: 'rouen', name: 'Rouen' },
  { id: 'besancon', name: 'Besançon' },
];

interface EventFormProps {
  event?: Event | null;
  onSubmit: (data: EventInput) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSubmit, onClose, isSubmitting }) => {
  const uploadFlyer = useUploadFlyer();

  const [formData, setFormData] = useState<EventInput>({
    city_id: '',
    city_name: '',
    date_display: '',
    iso_date: '',
    status: 'available',
    venue: '',
    address: '',
    ticket_url: '',
    billetweb_id: '',
    flyer_url: '',
    is_past: false,
  });

  const [flyerPreview, setFlyerPreview] = useState<string | null>(null);

  useEffect(() => {
    if (event) {
      setFormData({
        city_id: event.city_id,
        city_name: event.city_name,
        date_display: event.date_display,
        iso_date: event.iso_date.slice(0, 16),
        status: event.status,
        venue: event.venue || '',
        address: event.address || '',
        ticket_url: event.ticket_url || '',
        billetweb_id: event.billetweb_id || '',
        flyer_url: event.flyer_url || '',
        is_past: event.is_past,
      });
      setFlyerPreview(event.flyer_url);
    }
  }, [event]);

  const handleCityChange = (cityId: string) => {
    const city = CITIES.find(c => c.id === cityId);
    if (city) {
      setFormData(prev => ({
        ...prev,
        city_id: city.id,
        city_name: city.name,
      }));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setFlyerPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    const url = await uploadFlyer.mutateAsync(file);
    setFormData(prev => ({ ...prev, flyer_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const removeFlyer = () => {
    setFlyerPreview(null);
    setFormData(prev => ({ ...prev, flyer_url: '' }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground">
            {event ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* City Selection */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-foreground">City</Label>
              <Select value={formData.city_id} onValueChange={handleCityChange}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map(city => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-foreground">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'available' | 'sold-out' | 'soon') =>
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold-out">Sold Out</SelectItem>
                  <SelectItem value="soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Display */}
          <div className="space-y-2">
            <Label htmlFor="date_display" className="text-foreground">Date Display Text</Label>
            <Input
              id="date_display"
              placeholder="e.g., Jeudi 29 Janvier"
              value={formData.date_display}
              onChange={(e) => setFormData(prev => ({ ...prev, date_display: e.target.value }))}
              className="bg-input border-border text-foreground"
            />
          </div>

          {/* ISO Date */}
          <div className="space-y-2">
            <Label htmlFor="iso_date" className="text-foreground">Event Date & Time</Label>
            <Input
              id="iso_date"
              type="datetime-local"
              value={formData.iso_date}
              onChange={(e) => setFormData(prev => ({ ...prev, iso_date: e.target.value }))}
              className="bg-input border-border text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Venue */}
            <div className="space-y-2">
              <Label htmlFor="venue" className="text-foreground">Venue</Label>
              <Input
                id="venue"
                placeholder="e.g., Le Terminal"
                value={formData.venue}
                onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-foreground">Address</Label>
              <Input
                id="address"
                placeholder="e.g., 28 Quai Perrache"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="bg-input border-border text-foreground"
              />
            </div>
          </div>

          {/* Billetweb Event ID */}
          <div className="space-y-2">
            <Label htmlFor="billetweb_id" className="text-foreground">Billetweb Event ID</Label>
            <div className="flex items-center">
              <span className="bg-input border border-border border-r-0 p-2 text-muted-foreground text-sm font-mono select-none rounded-l-md">
                billetweb.fr/
              </span>
              <Input
                id="billetweb_id"
                placeholder="my-event-slug"
                value={formData.billetweb_id}
                onChange={(e) => setFormData(prev => ({ ...prev, billetweb_id: e.target.value }))}
                className="bg-input border-border text-foreground rounded-l-none"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">Paste ONLY the end of the link (e.g., 'post-partiels2').</p>
          </div>

          {/* Flyer Upload */}
          <div className="space-y-2">
            <Label className="text-foreground">Event Flyer</Label>
            {flyerPreview ? (
              <div className="relative inline-block">
                <img
                  src={flyerPreview}
                  alt="Flyer preview"
                  className="w-48 h-auto rounded-lg border border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 w-6 h-6"
                  onClick={removeFlyer}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {uploadFlyer.isPending ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload flyer</span>
                  </>
                )}
              </label>
            )}
          </div>

          {/* Is Past Event Toggle */}
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <Label className="text-foreground">Mark as Past Event</Label>
              <p className="text-sm text-muted-foreground">
                Past events will appear in the archives section
              </p>
            </div>
            <Switch
              checked={formData.is_past}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_past: checked }))}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || uploadFlyer.isPending}>
              {isSubmitting ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
