import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full mr-2">
                  <rect width="40" height="40" rx="20" fill="#5E35B1" />
                  <path d="M20 10C14.5 10 10 14.5 10 20C10 25.5 14.5 30 20 30C25.5 30 30 25.5 30 20C30 14.5 25.5 10 20 10ZM20 15C21.7 15 23 16.3 23 18C23 19.7 21.7 21 20 21C18.3 21 17 19.7 17 18C17 16.3 18.3 15 20 15ZM20 28C17.5 28 15.3 26.9 14 25.2C14.1 22.8 17.5 21.5 20 21.5C22.5 21.5 25.9 22.8 26 25.2C24.7 26.9 22.5 28 20 28Z" fill="white" />
                </svg>
                <span className="text-xl font-semibold font-sans text-primary">CommunionHub</span>
              </a>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <a className={`nav-link font-sans font-medium text-neutral-700 hover:text-primary relative ${location === '/' ? 'after:w-full' : 'after:w-0'} after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300`}>
                Home
              </a>
            </Link>
            <Link href="/events">
              <a className={`nav-link font-sans font-medium text-neutral-700 hover:text-primary relative ${location === '/events' ? 'after:w-full' : 'after:w-0'} after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300`}>
                Events
              </a>
            </Link>
            <Link href="/about">
              <a className={`nav-link font-sans font-medium text-neutral-700 hover:text-primary relative ${location === '/about' ? 'after:w-full' : 'after:w-0'} after:content-[''] after:absolute after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-primary after:transition-all after:duration-300`}>
                About
              </a>
            </Link>
          </nav>
          <div className="md:hidden">
            <button 
              className="text-neutral-700 focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden pb-4" 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                <Link href="/">
                  <a className="px-2 py-1 text-neutral-700 hover:text-primary hover:bg-gray-50 rounded font-sans"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Home
                  </a>
                </Link>
                <Link href="/events">
                  <a className="px-2 py-1 text-neutral-700 hover:text-primary hover:bg-gray-50 rounded font-sans"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Events
                  </a>
                </Link>
                <Link href="/about">
                  <a className="px-2 py-1 text-neutral-700 hover:text-primary hover:bg-gray-50 rounded font-sans"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    About
                  </a>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
