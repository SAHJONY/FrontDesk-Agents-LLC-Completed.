import React from 'react';

const Testimonials = () => {
  const testimonials = [
    { name: 'Sarah Johnson', role: 'CEO, Luxury Hotels Group', img: '/images/testimonial-ceo.jpg' },
    { name: 'Michael Chen', role: 'Managing Partner, Chen & Associates', img: '/images/testimonial-lawyer.jpg' },
    { name: 'Dr. Emily Rodriguez', role: 'Medical Director, HealthFirst', img: '/images/testimonial-doctor.jpg' },
  ];

  return (
    <section className="testimonials-section">
      <h2>Trusted by Industry Leaders</h2>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testimonial-card">
            <img src={t.img} alt={t.name} className="avatar" />
            <p>"{t.name} transformed our process..."</p>
            <h4>{t.name}</h4>
            <span>{t.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
