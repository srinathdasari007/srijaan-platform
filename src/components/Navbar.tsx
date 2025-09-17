import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Services', href: 'services' },
    { name: 'Portfolio', href: 'portfolio' },
    { name: 'Brands', href: 'partner-brands' },
    { name: 'Workshops', href: 'workshops' },
    { name: 'Resources', href: 'knowledge-bank' },
    { 
      name: 'Contact',
      href: 'contact',
      icon: (
        <Mail 
          size={20} 
          className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
        />
      )
    }
  ];

  return (
    <nav className="bg-brand-purple/80 backdrop-blur-sm text-white fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.png" 
                alt="Srijaan Logo" 
                className="h-10 w-auto" 
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  className="hover:bg-brand-purple/90 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 hover:shadow-lg hover:shadow-brand-purple/20 group"
                  title={item.name}
                >
                  {item.icon || item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-brand-purple/90 focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.href}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-brand-purple/90 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;