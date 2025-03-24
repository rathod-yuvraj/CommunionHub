import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventsHero } from "@/components/events/events-hero";
import { EventCard } from "@/components/events/event-card";
import { AddEventModal } from "@/components/events/add-event-modal";
import { Event } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });
  
  // Filter events based on the active category
  const filteredEvents = activeCategory === "all" 
    ? events 
    : events?.filter(event => event.category === activeCategory);
  
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <EventsHero />
      
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters and Add New Button */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold font-sans mb-4 md:mb-0">Upcoming Events</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors ${activeCategory === "all" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-white"}`}
                  onClick={() => handleCategoryClick("all")}
                >
                  All
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors ${activeCategory === "religious" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-white"}`}
                  onClick={() => handleCategoryClick("religious")}
                >
                  Religious
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors ${activeCategory === "social" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-white"}`}
                  onClick={() => handleCategoryClick("social")}
                >
                  Social
                </button>
                <button 
                  className={`px-4 py-2 rounded-full text-sm font-medium font-sans transition-colors ${activeCategory === "charity" ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-primary-light hover:text-white"}`}
                  onClick={() => handleCategoryClick("charity")}
                >
                  Charity
                </button>
              </div>
              <motion.button 
                className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-4 rounded-lg shadow transition hover:-translate-y-1 font-sans flex items-center"
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add New Event
              </motion.button>
            </div>
          </div>

          {/* Event List */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">Error loading events. Please try again later.</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              <AnimatePresence>
                {filteredEvents && filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <motion.div 
                    className="col-span-3 text-center py-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-gray-500">No events found in this category. Why not add one?</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
      
      <AddEventModal isOpen={isModalOpen} onClose={closeModal} />
    </motion.div>
  );
}
