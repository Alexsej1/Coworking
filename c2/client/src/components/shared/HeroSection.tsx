
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-black text-white min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/95 z-0"></div>

      <div className="w-full px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6"
          >
            НАЙДИ ПРОСТРАНСТВО
            <br />
            ДЛЯ СЕБЯ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto"
          >
            Найдите идеальное место для работы рядом с домом или в новом районе.
            Укажите свои предпочтения, и мы подберем коворкинги, которые вам
            подходят.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 80,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/quiz"
              className="bg-red-500 hover:bg-red-600 transition-transform duration-300 transform hover:scale-105 text-white rounded-full px-6 py-3 md:px-8 md:py-4 text-lg font-semibold"
            >
              Забронировать место
            </Link>
            <Link
              to="/map"
              className="text-white text-lg underline underline-offset-4 hover:opacity-80 transition-opacity duration-300"
            >
              Подобрать индивидуально
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 md:mt-16 text-gray-300"
          >
            <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-8">
              {[
                "Быстрый поиск.",
                "Умные рекомендации.",
                "Коворкинг под твой ритм.",
              ].map((text, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
                  className="flex flex-col items-center md:items-start"
                >
                  <span className="font-medium text-sm md:text-base">{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;