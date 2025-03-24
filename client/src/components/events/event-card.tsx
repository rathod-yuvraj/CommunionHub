import { motion } from 'framer-motion';
import { Event } from '@shared/schema';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'religious':
        return 'bg-primary';
      case 'social':
        return 'bg-secondary';
      case 'charity':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryImage = (category: string) => {
    switch (category) {
      case 'religious':
        return 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
      case 'social':
        return 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
      case 'charity':
        return 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
      default:
        return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    }
  };

  // Format the date from YYYY-MM-DD to Month DD, YYYY
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="h-48 bg-primary-light relative">
        <img 
          src={getCategoryImage(event.category)} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-4 right-4 ${getCategoryColor(event.category)} text-white text-xs px-2 py-1 rounded font-sans`}>
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold font-sans mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-700 mb-3">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <span className="font-sans">{formatDate(event.date)} • {event.time}</span>
        </div>
        <div className="flex items-center text-gray-700 mb-4">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="font-sans">{event.location}</span>
        </div>
        <p className="text-gray-700 mb-4 font-sans">{event.description}</p>
        <button className="text-primary hover:text-primary-dark font-medium transition-colors font-sans flex items-center">
          Learn More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
