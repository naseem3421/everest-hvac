import React from 'react';
import { localSEOData } from '../data';
import { MapPin, Phone, Calendar, CheckSquare } from 'lucide-react';

export default function LocalSEO({ cityKey, setPage }) {
  const cityData = localSEOData[cityKey] || localSEOData["chennai"];

  return (
    <div className="local-seo-view">
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '80px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--accent-orange)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>Regional HVAC Contracting Hub</span>
          <h1 style={{ color: 'var(--white)', fontSize: '2.8rem', marginTop: '10px', marginBottom: '20px' }}>
            Commercial HVAC Contractor in {cityData.city}
          </h1>
          <p style={{ opacity: 0.9, maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
            Delivering Industrial Cooling & Turnkey Ventilation Systems Across {cityData.city} and Environs.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '50px' }}>
            <div>
              <h2 style={{ marginBottom: '20px' }}>Everest HVAC Operations in {cityData.city}</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '20px' }}>
                {cityData.intro}
              </p>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Typical Project Types:</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                <li>🏢 Greenfield commercial buildings & multi-tier IT zones</li>
                <li>🏥 Multi-specialty hospitals demanding strict sterile zones (NABH)</li>
                <li>🏭 Heavy manufacturing plant ventilation & process chiller loops</li>
                <li>📦 PUF panel insulated logistics cold storage warehouses</li>
              </ul>
            </div>
            
            <div className="card" style={{ backgroundColor: 'var(--bg-steel)' }}>
              <h3 style={{ marginBottom: '15px' }}>Services Provided in {cityData.city}:</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {cityData.services.map((serv, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: 'var(--white)', padding: '12px 16px', borderRadius: '6px' }}>
                    <CheckSquare size={18} color="var(--accent-orange)" />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{serv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2>Our Operational Coverage in {cityData.city}</h2>
            <p className="section-subtitle">We deploy regional technician teams to ensure quick turnaround response times.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {cityData.coverage.map((area, idx) => (
              <span key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center', backgroundColor: 'var(--white)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, boxShadow: 'var(--shadow-sm)' }}>
                <MapPin size={14} color="var(--accent-orange)" /> {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Localized FAQ */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-title-wrap">
            <h2>Frequently Asked Questions for {cityData.city} Clients</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '10px' }}>What is the emergency technician response time in {cityData.city}?</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                Under our Premium 24x7 AMC contract, we maintain localized service cars in {cityData.city} to dispatch support and arrive within a guaranteed 2-hour window.
              </p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '10px' }}>Are your engineers familiar with local municipal building HVAC codes?</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                Yes. Our design team coordinates with local architectural consultants and is fully versed in municipal safety protocols, emergency smoke extraction standards, and fire safety compliance guidelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center" style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--white)' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--white)', marginBottom: '20px' }}>Ready to partner in {cityData.city}?</h2>
            <p style={{ opacity: 0.9, marginBottom: '30px' }}>
              Get a free technical audit and tonnage proposal from our local office.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={() => setPage('booking')} className="btn btn-primary">
                Book Site Inspection
              </button>
              <a href="tel:+914424350000" className="btn btn-outline">
                Call Helpline
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
