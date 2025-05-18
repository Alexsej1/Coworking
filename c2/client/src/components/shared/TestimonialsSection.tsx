// TestimonialsSection.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Анна М.",
    position: "Фрилансер",
    content:
      "CAPSULE полностью изменил мой подход к работе. Гибкое пространство и комьюнити профессионалов помогли мне вывести бизнес на новый уровень.",
    rating: 5,
  },
  {
    id: 2,
    name: "Дмитрий К.",
    position: "CEO стартапа",
    content:
      "Мы выросли с 3 до 15 человек, и все это время CAPSULE адаптировался под наши меняющиеся потребности. Идеальное решение для растущих компаний.",
    rating: 5,
  },
  {
    id: 3,
    name: "Елена П.",
    position: "Арт-директор",
    content:
      "Атмосфера CAPSULE вдохновляет на творчество. Комфортные рабочие места, стильный дизайн и удобное расположение — все, что нужно креативной команде.",
    rating: 4,
  },
  {
    id: 4,
    name: "Максим О.",
    position: "Разработчик",
    content:
      "Шикарная инфраструктура и быстрый интернет. Идеальное место для удаленной работы, когда дома уже невыносимо сидеть.",
    rating: 5,
  },
  {
    id: 5,
    name: "София Л.",
    position: "Маркетолог",
    content:
      "Удобное расположение и отличные условия для проведения встреч с клиентами. Коворкинг стал неотъемлемой частью моего рабочего процесса.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - slidesToShow : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev >= testimonials.length - slidesToShow ? 0 : prev + 1
    );
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Что говорят наши клиенты
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Мы гордимся тем, что создаем пространства, которые вдохновляют на
            успех и помогают развивать бизнес
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  activeIndex * (100 / slidesToShow)
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className={`bg-white p-6 rounded-md shadow-sm flex-shrink-0 w-full md:w-1/2 lg:w-1/3`}
                >
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm md:text-base">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      {testimonial.position}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
