import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-5 md:mb-6"
          >
            Готовы начать работать в комфортном пространстве?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 90,
              damping: 14,
            }}
            viewport={{ once: true }}
            className="text-lg text-blue-100 mb-8 md:mb-10"
          >
            Присоединяйтесь к сообществу профессионалов и найдите идеальное
            рабочее пространство, которое подойдет именно вам. Первый день
            бесплатно для новых клиентов!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 110,
              damping: 10,
            }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-4"
          >
            <Link
              to="/book"
              className="bg-red-500 hover:bg-red-600 transition-transform duration-300 transform hover:scale-105 text-white rounded-full px-6 py-3 md:px-8 md:py-4 text-lg font-semibold shadow-md text-center"
            >
              Забронировать место
            </Link>
            <Link
              to="/quiz"
              className="text-white text-lg underline underline-offset-4 hover:opacity-80 transition-opacity duration-300 text-center"
            >
              Подобрать индивидуально
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
