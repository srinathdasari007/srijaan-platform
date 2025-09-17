import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, CheckCircle, XCircle, Bell } from 'lucide-react';

const Workshops = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const workshops = [
    // Active Workshops
    {
      id: 1,
      title: 'Advanced UI/UX Design Masterclass',
      date: '2024-03-25',
      duration: '3 days',
      instructor: 'Sarah Johnson',
      participants: '15/20',
      price: '$599',
      status: 'active',
      description: 'Master advanced UI/UX design principles and tools used by industry leaders.',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Digital Marketing Strategy',
      date: '2024-03-28',
      duration: '2 days',
      instructor: 'Michael Chen',
      participants: '18/25',
      price: '$499',
      status: 'active',
      description: 'Learn to create and implement effective digital marketing strategies.',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'Motion Graphics Workshop',
      date: '2024-04-01',
      duration: '4 days',
      instructor: 'Emma Rodriguez',
      participants: '12/15',
      price: '$699',
      status: 'active',
      description: 'Create stunning motion graphics for digital platforms and video content.',
      image: 'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    
    // Upcoming Workshops
    {
      id: 4,
      title: 'Brand Strategy Masterclass',
      date: '2024-04-15',
      duration: '2 days',
      instructor: 'David Thompson',
      participants: '5/20',
      price: '$549',
      status: 'upcoming',
      description: 'Develop comprehensive brand strategies for modern businesses.',
      image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'Web Animation Workshop',
      date: '2024-04-20',
      duration: '3 days',
      instructor: 'Lisa Zhang',
      participants: '8/15',
      price: '$649',
      status: 'upcoming',
      description: 'Create engaging web animations using modern technologies.',
      image: 'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'Content Strategy Summit',
      date: '2024-05-01',
      duration: '2 days',
      instructor: 'James Wilson',
      participants: '10/30',
      price: '$499',
      status: 'upcoming',
      description: 'Master content strategy for digital platforms and social media.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    
    // Closed Workshops
    {
      id: 7,
      title: 'Photography Basics',
      date: '2024-02-15',
      duration: '2 days',
      instructor: 'Robert Brown',
      participants: '20/20',
      price: '$399',
      status: 'closed',
      description: 'Introduction to photography principles and techniques.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 8,
      title: 'Social Media Marketing',
      date: '2024-02-20',
      duration: '3 days',
      instructor: 'Anna Martinez',
      participants: '25/25',
      price: '$549',
      status: 'closed',
      description: 'Comprehensive social media marketing strategies and implementation.',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 9,
      title: 'Video Production Essentials',
      date: '2024-02-25',
      duration: '4 days',
      instructor: 'Chris Anderson',
      participants: '15/15',
      price: '$699',
      status: 'closed',
      description: 'Learn professional video production techniques and storytelling.',
      image: 'https://images.unsplash.com/photo-1585634917202-6f03b28fc6d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 10,
      title: 'Creative Writing Workshop',
      date: '2024-03-01',
      duration: '2 days',
      instructor: 'Emily White',
      participants: '20/20',
      price: '$399',
      status: 'closed',
      description: 'Develop creative writing skills for various content formats.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 11,
      title: 'Adobe Creative Suite Masterclass',
      date: '2024-03-05',
      duration: '5 days',
      instructor: 'Tom Parker',
      participants: '18/18',
      price: '$799',
      status: 'closed',
      description: 'Comprehensive training in Adobe Creative Suite applications.',
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 12,
      title: 'Digital Illustration Workshop',
      date: '2024-03-10',
      duration: '3 days',
      instructor: 'Sophie Lee',
      participants: '15/15',
      price: '$599',
      status: 'closed',
      description: 'Master digital illustration techniques and tools.',
      image: 'https://images.unsplash.com/photo-1551503766-ac63dfa6401c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    setSubscribeStatus('success');
    setEmail('');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
  };

  const renderWorkshopSection = (status: string) => {
    const filteredWorkshops = workshops.filter(workshop => workshop.status === status);
    
    if (filteredWorkshops.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-brand-purple mb-6 capitalize">
          {status} Workshops
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div 
              key={workshop.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <img 
                  src={workshop.image} 
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 ${getStatusColor(workshop.status)} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1`}>
                  {getStatusIcon(workshop.status)}
                  <span className="capitalize">{workshop.status}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{workshop.title}</h3>
                <p className="text-gray-600 mb-4">{workshop.description}</p>
                
                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{workshop.date} • {workshop.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{workshop.participants} participants</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-brand-purple">
                    ₹{workshop.price.replace('$', '')}
                  </span>
                  <button 
                    onClick={() => {
                      if (workshop.status !== 'closed') {
                        navigate('/checkout', { state: { workshop } });
                      }
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                      workshop.status === 'closed' 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-brand-purple text-white hover:bg-brand-magenta'
                    }`}
                    disabled={workshop.status === 'closed'}
                  >
                    {workshop.status === 'closed' ? 'Completed' : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SubscriptionCTA = () => (
    <div className="bg-brand-purple rounded-xl overflow-hidden shadow-xl my-8">
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block p-2 bg-white/10 rounded-full mb-4 group">
              <Bell className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">
              Stay Updated with New Workshops
            </h2>
            <p className="text-white/90 mb-6 text-sm md:text-base max-w-xl mx-auto">
              Subscribe to receive notifications about upcoming workshops and early bird discounts
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-brand-purple rounded-full font-medium hover:bg-brand-cyan hover:text-white transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
              {subscribeStatus === 'success' && (
                <p className="mt-2 text-brand-cyan text-sm">Successfully subscribed! 🎉</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-purple mb-4">Creative Workshops</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Elevate your creative journey through our expert-led workshops. From design and marketing to content creation, 
            discover comprehensive learning experiences crafted to transform your skills and advance your professional growth.
          </p>
        </div>

        {renderWorkshopSection('active')}
        <SubscriptionCTA />
        {renderWorkshopSection('upcoming')}
        {renderWorkshopSection('closed')}
      </div>
    </div>
  );
};

export default Workshops;