// FeaturesSection.jsx
import { motion } from "framer-motion";
import { Plane, CreditCard, User } from "lucide-react";

const features = [
  {
    icon: <Plane size={40} className="text-blue-600" />,
    title: "Гибкие пространства",
    description:
      "Будь вы индивидуальным предпринимателем, стартапом или устоявшимся предприятием, наши гибкие офисные решения отвечают вашим растущим потребностям.",
  },
  {
    icon: <CreditCard size={40} className="text-blue-600" />,
    title: "Прозрачное ценообразование",
    description:
      "Выберите план, который соответствует вашему бюджету и бизнес-целям, и ощутите ценность коворкинга премиум-класса без ущерба для бюджета.",
  },
  {
    icon: <User size={40} className="text-blue-600" />,
    title: "Индивидуальные планы",
    description:
      "Предпочитаете ли вы гибкость рабочего места или эксклюзивность частного офиса, Cowork предлагает индивидуальные решения для любого стиля работы.",
  },
];

const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-md p-6 md:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="mb-3 md:mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
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
            Наши преимущества
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы создаем идеальные условия для продуктивной работы и развития
            вашего бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
