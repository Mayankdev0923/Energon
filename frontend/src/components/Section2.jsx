import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    quote:
      "Harnessing renewable energy creates a sustainable future by reducing carbon emissions and combating climate change, ensuring cleaner air for generations to come.",
    company: "Environmental Impact: A Cleaner, Greener Future",
  },
  {
    quote:
      "Renewable energy lowers dependency on fossil fuels, boosting energy security while supporting local economies through green jobs and innovation.",
    company: "Energy Security: Reducing Dependence on Fossil Fuels",
  },
  {
    quote:
      "By embracing renewables, we unlock cost-effective solutions, reducing energy bills while promoting energy independence and a resilient grid.",
    company: "Economic Growth: Driving Innovation and Job Creation",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Section2() {
  return (
    <section className="bg-black min-h-screen p-8 md:p-12 lg:p-16 z-40 justify-center">
      <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12 items-center px-10">
        <div className="space-y-6">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-wider"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            THE POWER OF RENEWABLE ENERGY
          </motion.h2>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
            <img
              src="./recycle.jpg"
              alt="Abstract 3D shape"
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-2xl border border-gray-800 p-6 backdrop-blur-sm bg-black/50 transition-all duration-300 hover:scale-[1.02] hover:border-gray-600"
            >
              <p className="text-gray-300 mb-4">{testimonial.quote}</p>
              <p className="text-fuchsia-500 font-medium">
                — {testimonial.company}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
