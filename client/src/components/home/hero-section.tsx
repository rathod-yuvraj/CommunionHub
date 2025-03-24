import { useCallback } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [, navigate] = useLocation();
  
  const handleExploreEvents = useCallback(() => {
    navigate('/events');
  }, [navigate]);
  
  return (
    <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">Connecting People Across Faiths & Interests</h1>
          <p className="text-lg md:text-xl mb-8 font-sans opacity-90">Join our community of faith-based groups and individuals sharing events, resources, and supporting each other's journeys.</p>
          <motion.button 
            className="bg-secondary hover:bg-secondary-dark text-white font-medium py-3 px-8 rounded-lg shadow-lg transform transition hover:-translate-y-1 font-sans focus:outline-none focus:ring-2 focus:ring-secondary-light"
            onClick={handleExploreEvents}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Events
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
