// StatsSection.jsx
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 15, label: "Локаций", suffix: "+" },
  { value: 250, label: "Рабочих мест", suffix: "+" },
  { value: 5000, label: "Довольных клиентов", suffix: "+" },
  { value: 98, label: "Процент удовлетворенности", suffix: "%" }
];

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const countingRef = useRef(false);

  useEffect(() => {
    if (isInView && !countingRef.current) {
      countingRef.current = true;
      let start = 0;
      const step = end / (duration / 16); // Update every ~16ms for smooth animation

      const counter = setInterval(() => {
        start += step;
        if (start > end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">CAPSULE в цифрах</h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
            Мы постоянно растем и развиваемся, чтобы предоставить вам лучший опыт коворкинга
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-1 md:mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-blue-100 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;