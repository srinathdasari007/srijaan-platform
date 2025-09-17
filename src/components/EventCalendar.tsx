import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCalendar = () => {
  const events = [
    {
      title: 'Digital Design Masterclass',
      date: '2024-03-25',
      status: 'upcoming',
      description: 'Learn advanced digital design techniques'
    },
    {
      title: 'UI/UX Workshop',
      date: '2024-04-10',
      status: 'upcoming',
      description: 'Hands-on workshop on user interface design'
    },
    {
      title: 'Brand Strategy Seminar',
      date: '2024-04-15',
      status: 'upcoming',
      description: 'Strategic approach to brand development'
    }
  ];

  return (
    <section id="workshops" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-purple mb-4">Upcoming Workshops</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our expert-led workshops and enhance your creative skills
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent hover:border-brand-purple transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Calendar className="text-brand-purple mr-2" />
                <span className="text-gray-600">{event.date}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <Link 
                to="/workshops"
                className="bg-brand-purple text-white px-6 py-2 rounded-full hover:bg-brand-magenta transition-colors duration-300 inline-block"
              >
                Register Now
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/workshops"
            className="inline-block bg-transparent border-2 border-brand-purple text-brand-purple px-8 py-3 rounded-full hover:bg-brand-purple hover:text-white transition-all duration-300"
          >
            View All Workshops
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;