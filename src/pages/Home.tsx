import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Stats from '../components/Stats';
import Portfolio from '../components/Portfolio';
import EventCalendar from '../components/EventCalendar';
import PartnerBrands from '../components/PartnerBrands';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <PartnerBrands />
      <EventCalendar />
      <Contact />
    </>
  );
}

export default Home;