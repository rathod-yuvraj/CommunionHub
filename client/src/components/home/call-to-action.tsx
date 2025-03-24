import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export function CallToAction() {
  const [, navigate] = useLocation();
  
  const handleExploreEvents = useCallback(() => {
    navigate('/events');
  }, [navigate]);
  
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl font-bold font-sans mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to Join Our Community?
        </motion.h2>
        <motion.p 
          className="text-lg mb-8 max-w-2xl mx-auto font-sans opacity-90"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Discover events, connect with diverse faith communities, and be part of building bridges across different beliefs and interests.
        </motion.p>
        <motion.button 
          className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-white"
          onClick={handleExploreEvents}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Events
        </motion.button>
      </div>
    </section>
  );
}
