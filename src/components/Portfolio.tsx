import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const stories = [
    {
      title: 'Brand Transformation',
      client: 'TechCorp Solutions',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Complete digital transformation and rebranding'
    },
    {
      title: 'Digital Campaign',
      client: 'EcoGreen Initiative',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Award-winning environmental awareness campaign'
    },
    {
      title: 'Training Success',
      client: 'Creative Academy',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Professional development program for 100+ designers'
    },
    {
      title: 'Recruitment Drive',
      client: 'Innovation Hub',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Successful placement of 50+ creative professionals'
    }
  ];

  const clientLogos = [
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
      url: 'https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//DrReddysBW.jpg',
      alt: 'Dr Reddys'
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
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-purple mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped businesses and professionals achieve their creative goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story, index) => (
            <div 
              key={index}
              className="group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-semibold mb-2 text-brand-purple">
                  {story.title}
                </h3>
                <p className="text-brand-magenta font-medium mb-2">{story.client}</p>
                <p className="text-gray-600">{story.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-purple mb-4">Trusted by Industry Leaders</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partnering with forward-thinking companies to deliver exceptional creative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {clientLogos.map((logo, index) => (
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

          <div className="text-center mt-12">
            <Link 
              to="/success-stories"
              className="inline-block bg-brand-purple text-white px-8 py-3 rounded-full hover:bg-brand-magenta transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Success Stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;