import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 2 }}
      className="fixed w-full z-50 bg-white shadow-md py-2 transition-all duration-300"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide text-gray-900">
          CAPSULE
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <NavLink
              to=""
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              О нас
            </NavLink>
            <NavLink
              to=""
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              Цены
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              Блог
            </NavLink>
            <NavLink
              to=""
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-blue-600 font-medium"
                    : "text-gray-800 hover:text-blue-600"
                }`
              }
            >
              Контакты
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/sign-in"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors"
            >
              Войти
            </Link>
            <Link
              to="/sign-up"
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium transition-colors"
            >
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
