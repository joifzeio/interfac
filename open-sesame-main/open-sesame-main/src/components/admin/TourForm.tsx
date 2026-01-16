import React, { useState } from 'react';
import { EventInput, useUploadFlyer } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { X, Image as ImageIcon, Plus, Trash2, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

interface TourGeneralInfo {
  title: string;
  description: string;
  tourFlyerUrl: string;
}

interface CityEventDetails {
  cityId: string;
  cityName: string;
  dateDisplay: string;
  isoDate: string;
  venue: string;
  address: string;
  ticketUrl: string;
  flyerUrl: string;
  status: 'available' | 'sold-out' | 'soon';
}

interface TourFormProps {
  onSubmit: (events: EventInput[]) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

const TourForm: React.FC<TourFormProps> = ({ onSubmit, onClose, isSubmitting }) => {
  const uploadFlyer = useUploadFlyer();
  const [step, setStep] = useState<1 | 2>(1);
  
  // Step 1: General tour info
  const [generalInfo, setGeneralInfo] = useState<TourGeneralInfo>({
    title: '',
    description: '',
    tourFlyerUrl: '',
  });
  const [tourFlyerPreview, setTourFlyerPreview] = useState<string | null>(null);
  
  // Step 2: City-specific details
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [cityDetails, setCityDetails] = useState<Record<string, CityEventDetails>>({});
  const [cityFlyerPreviews, setCityFlyerPreviews] = useState<Record<string, string>>({});

  // Handle tour flyer upload
  const handleTourFlyerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setTourFlyerPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    const url = await uploadFlyer.mutateAsync(file);
    setGeneralInfo(prev => ({ ...prev, tourFlyerUrl: url }));
  };

  const removeTourFlyer = () => {
    setTourFlyerPreview(null);
    setGeneralInfo(prev => ({ ...prev, tourFlyerUrl: '' }));
  };

  // Add city to tour
  const addCity = (cityId: string) => {
    if (selectedCities.includes(cityId)) return;
    
    const city = CITIES.find(c => c.id === cityId);
    if (!city) return;

    setSelectedCities(prev => [...prev, cityId]);
    setCityDetails(prev => ({
      ...prev,
      [cityId]: {
        cityId: city.id,
        cityName: city.name,
        dateDisplay: '',
        isoDate: '',
        venue: '',
        address: '',
        ticketUrl: '',
        flyerUrl: generalInfo.tourFlyerUrl, // Default to tour flyer
        status: 'available',
      }
    }));
    setCityFlyerPreviews(prev => ({
      ...prev,
      [cityId]: tourFlyerPreview || '',
    }));
  };

  // Remove city from tour
  const removeCity = (cityId: string) => {
    setSelectedCities(prev => prev.filter(id => id !== cityId));
    setCityDetails(prev => {
      const updated = { ...prev };
      delete updated[cityId];
      return updated;
    });
    setCityFlyerPreviews(prev => {
      const updated = { ...prev };
      delete updated[cityId];
      return updated;
    });
  };

  // Update city details
  const updateCityDetails = (cityId: string, field: keyof CityEventDetails, value: string) => {
    setCityDetails(prev => ({
      ...prev,
      [cityId]: {
        ...prev[cityId],
        [field]: value,
      }
    }));
  };

  // Handle city-specific flyer upload
  const handleCityFlyerUpload = async (cityId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCityFlyerPreviews(prev => ({
        ...prev,
        [cityId]: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);

    const url = await uploadFlyer.mutateAsync(file);
    updateCityDetails(cityId, 'flyerUrl', url);
  };

  const removeCityFlyer = (cityId: string) => {
    setCityFlyerPreviews(prev => ({
      ...prev,
      [cityId]: '',
    }));
    updateCityDetails(cityId, 'flyerUrl', '');
  };

  // Proceed to step 2
  const handleNextStep = () => {
    if (!generalInfo.title.trim()) {
      return;
    }
    setStep(2);
  };

  // Go back to step 1
  const handlePrevStep = () => {
    setStep(1);
  };

  // Submit all events
  const handleSubmit = async () => {
    const events: EventInput[] = selectedCities.map(cityId => {
      const details = cityDetails[cityId];
      return {
        city_id: details.cityId,
        city_name: details.cityName,
        date_display: details.dateDisplay || 'Date TBA',
        iso_date: details.isoDate || new Date().toISOString(),
        status: details.status,
        venue: details.venue,
        address: details.address,
        ticket_url: details.ticketUrl,
        flyer_url: details.flyerUrl || generalInfo.tourFlyerUrl,
        is_past: false,
      };
    });

    await onSubmit(events);
  };

  const availableCities = CITIES.filter(city => !selectedCities.includes(city.id));

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-xl text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {step === 1 ? 'Create Tour - General Info' : 'Create Tour - City Details'}
          </DialogTitle>
          <div className="flex gap-2 mt-2">
            <Badge variant={step === 1 ? 'default' : 'outline'}>Step 1: General Info</Badge>
            <Badge variant={step === 2 ? 'default' : 'outline'}>Step 2: City Details</Badge>
          </div>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            {/* Tour Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">Tour Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Summer Tour 2026"
                value={generalInfo.title}
                onChange={(e) => setGeneralInfo(prev => ({ ...prev, title: e.target.value }))}
                className="bg-input border-border text-foreground"
              />
            </div>

            {/* Tour Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-foreground">Tour Description</Label>
              <Textarea
                id="description"
                placeholder="Describe this tour..."
                value={generalInfo.description}
                onChange={(e) => setGeneralInfo(prev => ({ ...prev, description: e.target.value }))}
                className="bg-input border-border text-foreground min-h-[100px]"
              />
            </div>

            {/* Tour Flyer */}
            <div className="space-y-2">
              <Label className="text-foreground">Tour Flyer (Default for all cities)</Label>
              {tourFlyerPreview ? (
                <div className="relative inline-block">
                  <img 
                    src={tourFlyerPreview} 
                    alt="Tour flyer preview" 
                    className="w-48 h-auto rounded-lg border border-border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 w-6 h-6"
                    onClick={removeTourFlyer}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-48 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTourFlyerUpload}
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

            {/* City Selection */}
            <div className="space-y-4">
              <Label className="text-foreground">Select Cities for this Tour *</Label>
              
              <div className="flex gap-2">
                <Select onValueChange={addCity}>
                  <SelectTrigger className="bg-input border-border text-foreground flex-1">
                    <SelectValue placeholder="Add a city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map(city => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Selected Cities */}
              {selectedCities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCities.map(cityId => {
                    const city = CITIES.find(c => c.id === cityId);
                    return (
                      <Badge 
                        key={cityId} 
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1"
                      >
                        {city?.name}
                        <button
                          type="button"
                          onClick={() => removeCity(cityId)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}
              
              {selectedCities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Select at least one city to continue
                </p>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleNextStep}
                disabled={!generalInfo.title.trim() || selectedCities.length === 0}
                className="gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Fill in the details for each city. The tour flyer will be used if you don't upload a city-specific one.
            </p>

            {/* City Details */}
            <div className="space-y-6">
              {selectedCities.map((cityId, index) => {
                const details = cityDetails[cityId];
                const flyerPreview = cityFlyerPreviews[cityId];
                
                return (
                  <div 
                    key={cityId}
                    className="border border-border rounded-lg p-4 space-y-4 bg-secondary/20"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg text-foreground flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        {details.cityName}
                      </h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCity(cityId)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Date Display */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Date Display Text</Label>
                        <Input
                          placeholder="e.g., Jeudi 29 Janvier"
                          value={details.dateDisplay}
                          onChange={(e) => updateCityDetails(cityId, 'dateDisplay', e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>

                      {/* ISO Date */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Event Date & Time</Label>
                        <Input
                          type="datetime-local"
                          value={details.isoDate}
                          onChange={(e) => updateCityDetails(cityId, 'isoDate', e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Venue */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Venue</Label>
                        <Input
                          placeholder="e.g., Le Terminal"
                          value={details.venue}
                          onChange={(e) => updateCityDetails(cityId, 'venue', e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Address</Label>
                        <Input
                          placeholder="e.g., 28 Quai Perrache"
                          value={details.address}
                          onChange={(e) => updateCityDetails(cityId, 'address', e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Ticket URL */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Ticket URL</Label>
                        <Input
                          type="url"
                          placeholder="https://..."
                          value={details.ticketUrl}
                          onChange={(e) => updateCityDetails(cityId, 'ticketUrl', e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>

                      {/* Status */}
                      <div className="space-y-2">
                        <Label className="text-foreground">Status</Label>
                        <Select 
                          value={details.status} 
                          onValueChange={(value: 'available' | 'sold-out' | 'soon') => 
                            updateCityDetails(cityId, 'status', value)
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

                    {/* City-specific Flyer */}
                    <div className="space-y-2">
                      <Label className="text-foreground">City Flyer (Optional - overrides tour flyer)</Label>
                      {flyerPreview ? (
                        <div className="relative inline-block">
                          <img 
                            src={flyerPreview} 
                            alt={`${details.cityName} flyer`} 
                            className="w-32 h-auto rounded-lg border border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 w-5 h-5"
                            onClick={() => removeCityFlyer(cityId)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCityFlyerUpload(cityId, e)}
                            className="hidden"
                          />
                          <ImageIcon className="w-6 h-6 text-muted-foreground mb-1" />
                          <span className="text-xs text-muted-foreground">Upload</span>
                        </label>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handlePrevStep} className="gap-2">
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={handleSubmit}
                disabled={isSubmitting || uploadFlyer.isPending}
              >
                {isSubmitting ? 'Creating Events...' : `Create ${selectedCities.length} Events`}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TourForm;
