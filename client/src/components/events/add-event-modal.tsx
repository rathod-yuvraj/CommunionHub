import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertEventSchema } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Extend the event schema with more specific validation
const addEventSchema = insertEventSchema.extend({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format" }),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Time must be in HH:MM format" }),
  location: z.string().min(3, { message: "Location is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(["religious", "social", "charity"], { 
    errorMap: () => ({ message: "Please select a valid category" }) 
  }),
});

type FormData = z.infer<typeof addEventSchema>;

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEventModal({ isOpen, onClose }: AddEventModalProps) {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: '',
      date: new Date().toISOString().split('T')[0], // Today's date as default
      time: '12:00',
      location: '',
      description: '',
      category: 'social',
    }
  });

  const addEventMutation = useMutation({
    mutationFn: async (newEvent: FormData) => {
      const response = await apiRequest('POST', '/api/events', newEvent);
      return response.json();
    },
    onSuccess: () => {
      // Invalidate events query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      toast({
        title: "Success!",
        description: "Your event has been added successfully.",
        variant: "default",
      });
      reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add event: ${error.message}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormData) => {
    addEventMutation.mutate(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold font-sans">Add New Event</h3>
                <button 
                  className="text-gray-700 hover:text-gray-900"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 mb-1 font-sans">Event Title</label>
                  <input 
                    type="text" 
                    id="event-title" 
                    className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-sans`}
                    placeholder="Enter event title" 
                    {...register('title')}
                  />
                  {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-1 font-sans">Event Date</label>
                  <input 
                    type="date" 
                    id="event-date" 
                    className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-sans`}
                    {...register('date')}
                  />
                  {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 mb-1 font-sans">Event Time</label>
                  <input 
                    type="time" 
                    id="event-time" 
                    className={`w-full px-3 py-2 border ${errors.time ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-sans`}
                    {...register('time')}
                  />
                  {errors.time && <p className="mt-1 text-xs text-red-500">{errors.time.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 mb-1 font-sans">Location</label>
                  <input 
                    type="text" 
                    id="event-location" 
                    className={`w-full px-3 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-sans`}
                    placeholder="Enter location" 
                    {...register('location')}
                  />
                  {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
                </div>
                <div className="mb-4">
                  <label htmlFor="event-category" className="block text-sm font-medium text-gray-700 mb-1 font-sans">Category</label>
                  <select 
                    id="event-category" 
                    className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-sans`}
                    {...register('category')}
                  >
                    <option value="religious">Religious</option>
                    <option value="social">Social</option>
                    <option value="charity">Charity</option>
                  </select>
                  {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="event-description" className="block text-sm font-medium text-gray-700 mb-1 font-sans">Description</label>
                  <textarea 
                    id="event-description" 
                    rows={3} 
                    className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-sans`}
                    placeholder="Enter event description" 
                    {...register('description')}
                  ></textarea>
                  {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                </div>
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md mr-3 font-sans"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md font-sans"
                    disabled={addEventMutation.isPending}
                  >
                    {addEventMutation.isPending ? 'Adding...' : 'Add Event'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
