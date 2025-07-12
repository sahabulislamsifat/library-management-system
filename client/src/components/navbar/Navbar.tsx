import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Books", path: "/books" },
    { name: "Add Book", path: "/add-book" },
    { name: "Borrow Summary", path: "/borrow-summary" },
  ];

  return (
    <header className="sticky top-0 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-2xl z-10 border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-xl font-bold text-purple-700 dark:text-purple-400"
          >
            <img
              className="inline-block h-10 w-10 mr-2"
              src="https://img.icons8.com/?size=100&id=48152&format=png&color=000000"
              alt=""
            />
            Library
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-purple-600 dark:text-purple-400 underline"
                    : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-gray-800 px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400 underline"
                      : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
