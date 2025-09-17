import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: number;
  clientName: string;
  company: string;
  position: string;
  image: string;
  logo: string;
  testimonial: string;
  results: string[];
  category: string;
}

const SuccessStories = () => {
  const stories: Story[] = [
    {
      id: 1,
      clientName: "Rajesh Kumar",
      company: "Columbus",
      position: "Head of Design",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//ColumbusBW.jpg",
      testimonial: "Working with Srijaan transformed our design team's capabilities. Their training programs were comprehensive and perfectly tailored to our needs.",
      results: [
        "40% increase in design team productivity",
        "Successfully launched 5 major brand campaigns",
        "Reduced design iteration time by 60%"
      ],
      category: "Training"
    },
    {
      id: 2,
      clientName: "Priya Sharma",
      company: "Cyient",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//CYIENTBW.jpg",
      testimonial: "Srijaan's recruitment services helped us build a world-class creative team. Their understanding of our needs was exceptional.",
      results: [
        "Hired 15 top-tier designers in 3 months",
        "Reduced recruitment time by 50%",
        "90% retention rate after one year"
      ],
      category: "Recruitment"
    },
    {
      id: 3,
      clientName: "Amit Patel",
      company: "Dr Reddys",
      position: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//DrReddysBW.jpg",
      testimonial: "The branding workshop by Srijaan completely changed how we approach our brand strategy. The results have been remarkable.",
      results: [
        "Brand recognition increased by 45%",
        "Social media engagement up by 150%",
        "Successfully rebranded 3 product lines"
      ],
      category: "Branding"
    },
    {
      id: 4,
      clientName: "Sarah Johnson",
      company: "Deloitte",
      position: "Design Lead",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//DeloitteBW.jpg",
      testimonial: "The creative training program exceeded our expectations. Our team's productivity has increased significantly.",
      results: [
        "30% improvement in team collaboration",
        "Reduced project delivery time by 40%",
        "Increased client satisfaction by 25%"
      ],
      category: "Training"
    },
    {
      id: 5,
      clientName: "Michael Chen",
      company: "Geodis",
      position: "Creative Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//GeodisBW.jpg",
      testimonial: "Srijaan's branding expertise helped us redefine our market presence. The results speak for themselves.",
      results: [
        "Market share increased by 35%",
        "Brand awareness up by 80%",
        "Customer engagement improved by 60%"
      ],
      category: "Branding"
    },
    {
      id: 6,
      clientName: "Lisa Rodriguez",
      company: "Yogee",
      position: "HR Director",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//YogeeBW.jpg",
      testimonial: "The recruitment process was seamless and efficient. We found exceptional talent that aligned perfectly with our needs.",
      results: [
        "Reduced hiring time by 60%",
        "95% candidate satisfaction rate",
        "Improved team retention by 40%"
      ],
      category: "Recruitment"
    },
    {
      id: 7,
      clientName: "David Thompson",
      company: "Columbus",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//ColumbusBW.jpg",
      testimonial: "The design training transformed our team's capabilities. We're now delivering projects faster and better.",
      results: [
        "50% increase in project efficiency",
        "Team productivity up by 40%",
        "Client satisfaction improved by 35%"
      ],
      category: "Training"
    },
    {
      id: 8,
      clientName: "Emma Wilson",
      company: "Cyient",
      position: "Marketing Director",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//CYIENTBW.jpg",
      testimonial: "Srijaan's branding workshop revolutionized our approach to market positioning.",
      results: [
        "Brand value increased by 45%",
        "Market presence improved by 70%",
        "Customer loyalty up by 55%"
      ],
      category: "Branding"
    },
    {
      id: 9,
      clientName: "James Lee",
      company: "Dr Reddys",
      position: "Talent Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//DrReddysBW.jpg",
      testimonial: "The recruitment solutions provided by Srijaan helped us build a stellar creative team.",
      results: [
        "Hired 20 top performers",
        "Reduced recruitment costs by 40%",
        "Team performance up by 55%"
      ],
      category: "Recruitment"
    },
    {
      id: 10,
      clientName: "Anna Martinez",
      company: "Deloitte",
      position: "Design Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//DeloitteBW.jpg",
      testimonial: "The creative training program has significantly improved our team's capabilities.",
      results: [
        "Project delivery time reduced by 35%",
        "Team efficiency increased by 45%",
        "Client satisfaction up by 40%"
      ],
      category: "Training"
    },
    {
      id: 11,
      clientName: "Robert Kim",
      company: "Geodis",
      position: "Creative Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//GeodisBW.jpg",
      testimonial: "Srijaan's branding expertise helped us achieve remarkable market growth.",
      results: [
        "Market share up by 40%",
        "Brand recognition increased by 65%",
        "Customer engagement improved by 50%"
      ],
      category: "Branding"
    },
    {
      id: 12,
      clientName: "Sophie Chen",
      company: "Yogee",
      position: "HR Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      logo: "https://kerrawrhpnttreyixtve.supabase.co/storage/v1/object/public/clientlogos//YogeeBW.jpg",
      testimonial: "The recruitment process was highly effective in finding the right talent for our team.",
      results: [
        "Reduced time-to-hire by 50%",
        "90% candidate success rate",
        "Team performance improved by 45%"
      ],
      category: "Recruitment"
    }
  ];

  const [selectedStory, setSelectedStory] = useState<Story | null>(stories[1]);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('stories-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-purple mb-4">Success Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped businesses transform their creative capabilities and achieve remarkable results
          </p>
        </div>

        <div className="relative">
          <button 
            onClick={() => scrollContainer('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-brand-purple p-2 rounded-full shadow-lg transform transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            id="stories-container"
            className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {stories.map((story) => (
              <div 
                key={story.id}
                className={`flex-none w-[300px] md:w-[350px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedStory?.id === story.id ? 'ring-2 ring-brand-purple' : ''
                }`}
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => setSelectedStory(selectedStory?.id === story.id ? null : story)}
              >
                <div className="relative h-48">
                  <img 
                    src={story.image} 
                    alt={story.clientName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-brand-purple">
                    {story.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 border border-gray-100 rounded-lg">
                      <img 
                        src={story.logo} 
                        alt={story.company}
                        className="w-12 h-auto object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.clientName}</h3>
                      <p className="text-sm text-gray-600">{story.position}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 line-clamp-3">"{story.testimonial}"</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scrollContainer('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-brand-purple p-2 rounded-full shadow-lg transform transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {selectedStory && (
          <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform">
            <div className="md:flex min-h-[500px]">
              <div className="md:w-1/2 relative">
                <img 
                  src={selectedStory.image} 
                  alt={selectedStory.clientName}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: `
                      linear-gradient(
                        to top,
                        rgba(0,0,0,0.85) 0%,
                        rgba(0,0,0,0.7) 25%,
                        rgba(0,0,0,0.4) 50%,
                        rgba(0,0,0,0.2) 75%,
                        rgba(0,0,0,0) 100%
                      )
                    `
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                    {selectedStory.category}
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl font-light italic leading-relaxed text-shadow-lg">
                    "{selectedStory.testimonial}"
                  </blockquote>
                </div>
              </div>

              <div className="md:w-1/2 p-8 flex flex-col">
                <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={selectedStory.logo} 
                      alt={selectedStory.company}
                      className="w-20 h-auto object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedStory.clientName}</h2>
                    <p className="text-gray-600">{selectedStory.position}</p>
                    <p className="text-brand-purple font-medium">{selectedStory.company}</p>
                  </div>
                </div>

                <div className="mt-8 flex-grow">
                  <h3 className="text-lg font-semibold mb-6 text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-1 bg-brand-purple rounded-full"></span>
                    Key Results
                  </h3>
                  <div className="space-y-4">
                    {selectedStory.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-purple font-semibold text-sm">
                            {(index + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                        <p className="text-gray-800 leading-tight">
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;