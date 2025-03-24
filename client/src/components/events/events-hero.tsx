import { motion } from 'framer-motion';

export function EventsHero() {
  return (
    <section className="bg-primary-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-white font-sans mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Community Events
        </motion.h1>
        <motion.p 
          className="text-lg text-white opacity-90 max-w-2xl mx-auto font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover and join events from diverse faith communities or create your own to share with others.
        </motion.p>
      </div>
    </section>
  );
}
