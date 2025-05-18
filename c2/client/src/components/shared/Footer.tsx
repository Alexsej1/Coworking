// Footer.jsx
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-4 md:mb-6">CAPSULE</h3>
            <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
              Современные коворкинг-пространства для комфортной работы и
              продуктивного взаимодействия.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6">Локации</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  to="/locations/center"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Центр города
                </Link>
              </li>
              <li>
                <Link
                  to="/locations/business"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Бизнес-квартал
                </Link>
              </li>
              <li>
                <Link
                  to="/locations/techpark"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Технопарк
                </Link>
              </li>
              <li>
                <Link
                  to="/locations"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Все локации
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6">Услуги</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link
                  to="/services/workspace"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Рабочие места
                </Link>
              </li>
              <li>
                <Link
                  to="/services/private-office"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Приватные офисы
                </Link>
              </li>
              <li>
                <Link
                  to="/services/meeting-rooms"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Переговорные
                </Link>
              </li>
              <li>
                <Link
                  to="/services/events"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  Мероприятия
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 md:mb-6">Контакты</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-400 text-sm md:text-base">
                  +375 (11) 123-45-67
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <a
                  href="mailto:info@capsule.com"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm md:text-base"
                >
                  info@capsule.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400 text-sm md:text-base">
                  ул. Октябрьская, 10, Минск, Беларусь
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-2 md:mb-0">
            © {new Date().getFullYear()} CAPSULE. Все права защищены.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              Политика конфиденциальности
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-white transition-colors duration-300"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
