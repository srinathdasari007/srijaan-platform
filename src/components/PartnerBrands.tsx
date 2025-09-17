import React from 'react';

const PartnerBrands = () => {
  const partners = [
    {
      name: 'Brandinc',
      service: 'Brand positioning for Individuals to corporates',
      logo: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/partnerlogos//Brandinc%20Logo.jpg'
    },
    {
      name: 'SlateArts',
      service: 'Storyboard & Publicity Designs for Film Industry',
      logo: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/partnerlogos//SlateArts.jpg'
    },
    {
      name: 'XMarcom',
      service: 'Lead Generative Digital Marketing Hub',
      logo: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/partnerlogos//Xmarcomm.jpg'
    },
    {
      name: 'Video Creatures',
      service: 'Video Production studio for Vloggers & Youtubers',
      logo: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/partnerlogos//VideoCreatures%20Logo.jpg',
      scale: 0.90
    }
  ];

  return (
    <section id="partner-brands" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-purple mb-4">Partner Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver comprehensive solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="w-full h-24 object-contain mb-3"
                style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
              />
              <h3 className="text-lg font-semibold mb-1">{partner.name}</h3>
              <p className="text-gray-600 text-sm">{partner.service}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;