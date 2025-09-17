import React from 'react';
import { Palette, UserCheck, GraduationCap, Building2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Building2 className="text-brand-magenta" size={40} />,
      title: 'Designing',
      description: 'Creative design solutions across digital and print media',
      link: '/services/designing'
    },
    {
      icon: <UserCheck className="text-brand-cyan" size={40} />,
      title: 'Staffing',
      description: 'Connecting creative talent with industry-leading opportunities',
      link: '/services/recruitment'
    },
    {
      icon: <GraduationCap className="text-brand-yellow" size={40} />,
      title: 'Training',
      description: 'Professional development programs for creative excellence',
      link: '/services/training'
    },
    {
      icon: <Palette className="text-brand-purple" size={40} />,
      title: 'Branding',
      description: 'Strategic brand development and identity design for lasting impact',
      link: '/services/branding'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-purple mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to meet your creative and professional needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-brand-purple"
            >
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a 
                href={service.link}
                className="inline-block text-brand-purple font-semibold hover:text-brand-magenta transition-colors duration-300"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;