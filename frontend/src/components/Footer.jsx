"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Github, Linkedin, Target } from "lucide-react";
import { Google } from "ol/source";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      animate="show"
      variants={container}
      className="w-full bg-black text-gray-200 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={item}>
          <a
            href="/"
            className="text-xl font-bold hover:text-white transition-colors"
          >
            Energon
          </a>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product Column */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-white font-semibold">Product</h3>
            <ul className="space-y-2">
              {["Login"].map((item) => (
                <li key={item}>
                  <Link
                    to="/auth"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-white font-semibold">Company</h3>
            <ul className="space-y-2">
              {["Map To Find"].map((item) => (
                <li key={item}>
                  <Link
                    to="/findenergy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resource Column */}
          <motion.div variants={item} className="space-y-4">
            <h3 className="text-white font-semibold">Resource</h3>
            <ul className="space-y-2">
              {["List Energy"].map((item) => (
                <li key={item}>
                  <Link
                    to="/form"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © 2025 Energon. All Rights Reserved.
          </p>

          <div className="flex space-x-6 mt-4 sm:mt-0">
            {[
              {
                icon: Facebook,
                href: "https://www.facebook.com/people/Energon/61572751180424/",
              },
              {
                icon: Instagram,
                href: "https://www.linkedin.com/company/energon-app/",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/company/energon-app/",
              },
              {
                icon: Github,
                href: "https://github.com/Mayankdev0923/Energon",
              },
            ].map(({ icon: Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">Social media</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
