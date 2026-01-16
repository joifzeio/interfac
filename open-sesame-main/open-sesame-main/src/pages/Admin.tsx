import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent, Event, EventInput } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LogOut, ArrowLeft, Calendar, Archive, MapPin } from 'lucide-react';
import EventForm from '@/components/admin/EventForm';
import EventCard from '@/components/admin/EventCard';
import TourForm from '@/components/admin/TourForm';
import { toast } from 'sonner';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const { data: upcomingEvents, isLoading: loadingUpcoming } = useEvents(false);
  const { data: pastEvents, isLoading: loadingPast } = useEvents(true);
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTourFormOpen, setIsTourFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!isLoading && user && !isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleCreateEvent = async (data: EventInput) => {
    await createEvent.mutateAsync(data);
    setIsFormOpen(false);
  };

  const handleCreateTourEvents = async (events: EventInput[]) => {
    for (const event of events) {
      await createEvent.mutateAsync(event);
    }
    setIsTourFormOpen(false);
    toast.success(`${events.length} events created successfully`);
  };

  const handleUpdateEvent = async (data: EventInput) => {
    if (editingEvent) {
      await updateEvent.mutateAsync({ id: editingEvent.id, ...data });
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      await deleteEvent.mutateAsync(id);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Back to site</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-bold text-foreground">Event Management</h2>
          <div className="flex gap-2">
            <Button onClick={() => setIsTourFormOpen(true)} variant="outline" className="gap-2">
              <MapPin className="w-4 h-4" />
              Add Tour
            </Button>
            <Button onClick={() => setIsFormOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Event Form Modal */}
        {isFormOpen && (
          <EventForm
            event={editingEvent}
            onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
            onClose={handleCloseForm}
            isSubmitting={createEvent.isPending || updateEvent.isPending}
          />
        )}

        {/* Tour Form Modal */}
        {isTourFormOpen && (
          <TourForm
            onSubmit={handleCreateTourEvents}
            onClose={() => setIsTourFormOpen(false)}
            isSubmitting={createEvent.isPending}
          />
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <Archive className="w-4 h-4" />
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {loadingUpcoming ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : upcomingEvents && upcomingEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEdit}
                    onDelete={handleDeleteEvent}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No upcoming events</p>
                  <Button onClick={() => setIsFormOpen(true)} className="mt-4">
                    Create your first event
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {loadingPast ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              </div>
            ) : pastEvents && pastEvents.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onEdit={handleEdit}
                    onDelete={handleDeleteEvent}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="py-12 text-center">
                  <Archive className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No past events</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
