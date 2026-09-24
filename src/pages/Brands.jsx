import React from 'react';
import { brands } from '../data';

export default function Brands() {
  return (
    <div className="brands-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Authorized Brands & Dealerships</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Integrating Top-tier Global Engineering for Long-term Reliability</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>Authorized Systems Integration</h2>
            <p className="section-subtitle">We carry direct authorizations to procure, install, warrant, and maintain machines from top-tier brands.</p>
          </div>
          <div className="grid-3">
            {brands.map((b, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.4rem' }}>{b.name}</h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-steel)', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {b.country}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-orange)', marginBottom: '10px' }}>Primary Equipment</h4>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '15px' }}>{b.category}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--bg-steel)', paddingTop: '15px', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                  🔧 Fully authorized installation & AMC services.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
