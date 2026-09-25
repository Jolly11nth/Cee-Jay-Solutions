import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/7535ace456a9f320447d48a22d84f808f8f2d798.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({
  currentPage,
  onNavigate,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "consultation", label: "Consultation" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigate("home")}
            onDoubleClick={() => handleNavigate("admin")}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 mr-3">
                <img
                  src={logo}
                  alt="Cee Jay IT Solutions Logo"
                  className="w-full h-full object-contain scale-[3] translate-x-5"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-3 py-2 transition-all duration-200 ${
                  currentPage === item.id
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-700 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavigate("consultation")}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Get Started
              </button>
              {/* Admin access - hidden by default, access via double-click on logo */}
              <button
                onClick={() => handleNavigate("admin")}
                className="text-xs text-gray-400 hover:text-emerald-600 transition-colors duration-200 opacity-0 hover:opacity-100"
                title="Admin Access"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-left px-4 py-3 transition-colors duration-200 ${
                    currentPage === item.id
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigate("consultation")}
                className="mx-4 mt-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}