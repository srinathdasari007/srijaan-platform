import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-purple text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">SRIJAAN</h3>
            <p className="text-gray-300">
              Empowering creativity through comprehensive multimedia solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Portfolio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              <li>
                <a 
                  href="/employee/dashboard" 
                  className="text-brand-cyan hover:text-white transition-colors duration-300"
                >
                  Employee Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Training</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Recruitment</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Branding</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Design</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/srijaan.creative" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-cyan transition-colors duration-300"
              >
                <Facebook />
              </a>
              <a 
                href="https://twitter.com/srijaan_design" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-cyan transition-colors duration-300"
              >
                <Twitter />
              </a>
              <a 
                href="https://instagram.com/srijaan.creative" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-cyan transition-colors duration-300"
              >
                <Instagram />
              </a>
              <a 
                href="https://linkedin.com/company/srijaan-creative" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-brand-cyan transition-colors duration-300"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} SRIJAAN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;