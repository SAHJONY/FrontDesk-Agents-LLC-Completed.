import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: 'url(/images/hero-main.jpg)' }}>
      <div className="container">
        <h1>Transform Your Front Office With AI Agents</h1>
        <p>24/7 autonomous infrastructure for lead qualification, customer service, and revenue operations.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Start Free Trial</button>
          <button className="btn-secondary">Watch Demo</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
