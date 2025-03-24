import { HeroSection } from "@/components/home/hero-section";
import { WelcomeSection } from "@/components/home/welcome-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { CallToAction } from "@/components/home/call-to-action";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <WelcomeSection />
      <TestimonialSection />
      <CallToAction />
    </motion.div>
  );
}
