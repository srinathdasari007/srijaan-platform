import React from 'react';

const KnowledgeBank = () => {
  const blogs = [
    {
      title: 'The Future of Digital Design',
      excerpt: 'Exploring upcoming trends in digital design and creativity',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Mastering Creative Skills',
      excerpt: 'Essential skills for modern creative professionals',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const videos = [
    {
      title: 'Design Thinking Workshop',
      thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Creative Process Explained',
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section id="knowledge-bank" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-purple mb-4">Knowledge Bank</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Resources and insights to help you grow in your creative journey
          </p>
        </div>

        {/* Blogs */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">Latest Blogs</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <a 
                    href="#"
                    className="text-brand-purple font-semibold hover:text-brand-magenta"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Featured Videos</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-brand-purple ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold">{video.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBank;