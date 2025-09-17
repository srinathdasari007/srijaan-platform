import React from 'react';

const ClientLogos = () => {
  const placeholders = [
    {
      url: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//ColumbusBW.jpg',
      alt: 'Columbus'
    },
    {
      url: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//CYIENTBW.jpg',
      alt: 'Cyient'
    },
    {
      url: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//DeloitteBW.jpg',
      alt: 'Deloitte'
    },
    {
      url: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//GeodisBW.jpg',
      alt: 'Geodis'
    },
    {
      url: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//YogeeBW.jpg',
      alt: 'Yogee'
    }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-brand-purple mb-4">Trusted by Industry Leaders</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partnering with forward-thinking companies to deliver exceptional creative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {placeholders.map((logo, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={logo.url}
                alt={logo.alt}
                className="w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;