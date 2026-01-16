import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Event {
  id: string;
  city_id: string;
  city_name: string;
  date_display: string;
  iso_date: string;
  status: 'available' | 'sold-out' | 'soon';
  venue: string | null;
  address: string | null;
  ticket_url: string | null;
  flyer_url: string | null;
  is_past: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventInput {
  city_id: string;
  city_name: string;
  date_display: string;
  iso_date: string;
  status: 'available' | 'sold-out' | 'soon';
  venue?: string;
  address?: string;
  ticket_url?: string;
  flyer_url?: string;
  is_past?: boolean;
}

export const useEvents = (isPast?: boolean) => {
  return useQuery({
    queryKey: ['events', isPast],
    queryFn: async () => {
      let query = supabase
        .from('events')
        .select('*')
        .order('iso_date', { ascending: true });
      
      if (isPast !== undefined) {
        query = query.eq('is_past', isPast);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Event[];
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (event: EventInput) => {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create event: ${error.message}`);
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...event }: Partial<Event> & { id: string }) => {
      const { data, error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update event: ${error.message}`);
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Event deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete event: ${error.message}`);
    },
  });
};

export const useUploadFlyer = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('flyers')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('flyers')
        .getPublicUrl(fileName);
      
      return publicUrl;
    },
    onError: (error: Error) => {
      toast.error(`Failed to upload flyer: ${error.message}`);
    },
  });
};
