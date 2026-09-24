import React from 'react';
import { seoLandingPages } from '../data';
import { ShieldCheck, Layers, HelpCircle, ArrowRight } from 'lucide-react';

export default function LandingPage({ landingKey, setPage }) {
  const pageData = seoLandingPages[landingKey] || seoLandingPages["commercial-hvac"];

  return (
    <div className="landing-page-view">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '80px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--accent-orange)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Specialized HVAC Solution</span>
          <h1 style={{ color: 'var(--white)', fontSize: '2.8rem', marginTop: '10px', marginBottom: '20px' }}>{pageData.heroHeading}</h1>
          <p style={{ opacity: 0.9, maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>{pageData.title}</p>
        </div>
      </section>

      {/* Problem & Challenge */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ gap: '40px' }}>
            <div className="card" style={{ borderLeft: '4px solid red' }}>
              <h3 style={{ color: 'red', marginBottom: '15px' }}>The Core Challenge</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '15px' }}><strong>Symptom:</strong> {pageData.problem}</p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}><strong>Operational Hurdles:</strong> {pageData.challenges}</p>
            </div>
            <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ color: 'var(--success)', marginBottom: '15px' }}>Our Engineering Solution</h3>
              <p style={{ color: 'var(--text-dark)', fontSize: '1rem', lineHeight: 1.6 }}>{pageData.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2>Our System Implementation Process</h2>
            <p className="section-subtitle">A systematic, phased timeline to guarantee zero execution leaks and optimum static pressure balances.</p>
          </div>
          <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {pageData.process.map((step, idx) => (
              <div key={idx} className="card text-center" style={{ padding: '20px', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '2rem', fontWeight: 800, color: 'var(--bg-steel)', lineHeight: 1 }}>
                  0{idx + 1}
                </span>
                <h4 style={{ fontSize: '1rem', marginTop: '20px' }}>{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding text-center">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '20px' }}>Need a High-Tonnage {pageData.title} Proposal?</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
              Our design managers will evaluate your architectural drawings and formulate a comprehensive energy efficiency study.
            </p>
            <button onClick={() => setPage('booking')} className="btn btn-primary" style={{ padding: '14px 34px' }}>
              Book Free Site Inspection <ArrowRight size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
