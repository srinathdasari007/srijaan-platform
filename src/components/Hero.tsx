import React from 'react';
import { GraduationCap, Users, Briefcase } from 'lucide-react';

const Hero = () => {
  return (
    <div id="hero" className="pt-16 min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-tl from-[#2a0b52]/80 via-[#3a0d70]/95 to-[#4A148C]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4')] bg-cover bg-center"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
            <span className="inline-block">Empowering</span>{' '}
            <span className="block animate-gradient-text bg-clip-text text-transparent">
              Creative Journey
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/80">
            <span className="highlight-text highlight-1">Transforming creative minds</span>,{' '}
            <span className="highlight-text highlight-2">Empowering professionals</span>,{' '}
            <span className="highlight-text highlight-3">Innovating design solutions</span>.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <ServiceCard
              icon={<GraduationCap size={36} />}
              title="Expert Training"
              description="Industry-focused training programs for creative enthusiasts."
              gradient="from-[#f68620] to-[#ffad05]"
            />
            <ServiceCard
              icon={<Users size={36} />}
              title="Elite Staffing"
              description="Connecting exceptional creative talent with leading companies in the industry."
              gradient="from-[#0066cc] to-[#00ffff]"
            />
            <ServiceCard
              icon={<Briefcase size={36} />}
              title="Effective Designs"
              description="Comprehensive multimedia solutions tailored to elevate your brand presence."
              gradient="from-[#800080] to-[#ff00ff]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, gradient }) => (
  <div className="group relative pt-8">
    {/* Icon container positioned at the top */}
    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
      <div className={`p-3 rounded-full bg-gradient-to-tl ${gradient} shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12`}>
        <div className="text-white">
          {icon}
        </div>
      </div>
    </div>

    {/* Card content */}
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-tl ${gradient} transform transition-all duration-500 h-full group-hover:scale-105`}>
      <div className="glass-effect backdrop-blur-sm rounded-xl px-4 py-6 pt-10 h-full transition-all duration-500 group-hover:bg-black/20">
        <h3 className="text-xl font-bold mb-2 text-white transform transition-transform duration-500 group-hover:translate-y-[-4px]">
          {title}
        </h3>
        <p className="text-sm text-white/90 leading-relaxed line-clamp-2 transform transition-transform duration-500 group-hover:translate-y-[-2px]">
          {description}
        </p>
      </div>
    </div>
  </div>
);

export default Hero;