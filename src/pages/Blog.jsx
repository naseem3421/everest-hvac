import React, { useState } from 'react';
import { blogs } from '../data';
import { BookOpen, User, Clock } from 'lucide-react';

export default function Blog() {
  const [activeCat, setActiveCat] = useState('all');

  const categories = ['all', 'Engineering', 'Commercial HVAC', 'Maintenance'];

  const filteredBlogs = activeCat === 'all'
    ? blogs
    : blogs.filter(b => b.category === activeCat);

  return (
    <div className="blog-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Everest HVAC Technical Blog</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Expert Knowledge, Guides, & Regulatory Standards in Industrial Cooling</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* Categories Tab */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className="btn"
                style={{
                  padding: '8px 20px',
                  backgroundColor: activeCat === c ? 'var(--accent-orange)' : 'var(--bg-steel)',
                  color: activeCat === c ? 'var(--white)' : 'var(--text-dark)',
                  fontSize: '0.85rem'
                }}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filteredBlogs.map((b) => (
              <div key={b.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-orange)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    {b.category}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{b.title}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}>{b.excerpt}</p>
                  
                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.75rem', color: 'var(--text-light)', borderTop: '1px solid var(--bg-steel)', paddingTop: '15px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} /> <span>{b.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> <span>{b.readTime}</span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'var(--bg-light)', padding: '15px', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-dark)' }}>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '5px', color: 'var(--primary-dark)' }}>Technical Insight:</h4>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{b.content.substring(0, 150)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
