import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  community: string;
  image: string;
  testimonial: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah J.",
    community: "Christian Community",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80",
    testimonial: "CommunionHub has helped our church connect with other faith communities in ways we never thought possible. We've organized joint charity events and learned so much from each other."
  },
  {
    id: 2,
    name: "Ahmed M.",
    community: "Islamic Center",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80",
    testimonial: "Our community has found a wonderful platform for sharing our cultural events and inviting neighbors of all faiths. The response has been incredible and we've made lasting friendships."
  },
  {
    id: 3,
    name: "Rachel G.",
    community: "Jewish Youth Group",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=60&h=60&q=80",
    testimonial: "As a youth leader, I've used CommunionHub to find volunteer opportunities for our teens. It's been amazing to see them work alongside other faith communities and build understanding."
  }
];

export function TestimonialSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-semibold font-sans text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Community Voices
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <h4 className="font-sans font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-700">{testimonial.community}</p>
                </div>
              </div>
              <p className="font-sans text-gray-700">{testimonial.testimonial}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
