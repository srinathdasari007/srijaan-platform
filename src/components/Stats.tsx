import React, { useEffect, useRef } from 'react';

const Stats = () => {
  const stats = [
    { number: '1000+', label: 'Projects Completed', startNumber: 0, endNumber: 1000 },
    { number: '500+', label: 'Students Trained', startNumber: 0, endNumber: 500 },
    { number: '300+', label: 'Professionals Placed', startNumber: 0, endNumber: 300 },
    { number: '50+', label: 'Partner Companies', startNumber: 0, endNumber: 50 }
  ];

  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLDivElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            const index = numberRefs.current.indexOf(element);
            if (index !== -1) {
              const { startNumber, endNumber } = stats[index];
              animateNumber(element, startNumber, endNumber);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    numberRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const animateNumber = (element: HTMLDivElement, start: number, end: number) => {
    let current = start;
    const increment = Math.ceil((end - start) / 50);
    const duration = 1500;
    const stepTime = duration / Math.ceil((end - start) / increment);

    const updateNumber = () => {
      current = Math.min(current + increment, end);
      element.textContent = `${current}+`;

      if (current < end) {
        setTimeout(updateNumber, stepTime);
      }
    };

    updateNumber();
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-[#4A148C] rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl overflow-hidden relative group"
            >
              <div 
                ref={el => numberRefs.current[index] = el}
                className="text-4xl md:text-5xl font-bold mb-3 text-[#00FFFF] opacity-0 transform translate-y-4 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {stat.number}
              </div>
              <div className="text-white text-lg font-medium">
                {stat.label}
              </div>
              
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;