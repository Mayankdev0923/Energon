import { motion } from "framer-motion";

export default function Section1() {
  return (
    <section className="bg-black min-h-[80vh] flex flex-col justify-between p-8 md:p-12 lg:p-8 z-40">
      <div className="grid lg:grid-cols-2 gap-8 items-center px-10">
        <div className="space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empowering Individuals: Decentralized Control and Profitability{" "}
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            By using our platform, users gain direct control over their energy
            transactions, allowing them to buy and sell energy seamlessly while
            earning from surplus power, all in a secure and decentralized
            ecosystem
          </motion.p>
        </div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-26%20144015-ECQQFovBtlpvEn3L25z8BIXaksGTvR.png"
            alt="Abstract 3D shape"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
