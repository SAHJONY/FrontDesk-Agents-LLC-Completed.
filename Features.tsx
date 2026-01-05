import React from 'react';

const Features = () => {
  const features = [
    { title: 'AI Voice Agents', img: '/images/feature-voice.jpg' },
    { title: 'Smart Messaging', img: '/images/feature-messaging.jpg' },
    { title: 'Real-time Analytics', img: '/images/feature-analytics.jpg' },
  ];

  return (
    <section className="features-section">
      <h2>Everything You Need to Scale Your Business</h2>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card">
            <img src={f.img} alt={f.title} />
            <h3>{f.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
