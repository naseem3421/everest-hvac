import React from 'react';
import { solutions, productCatalog } from '../data';

export default function Solutions({ setLandingKey, setPage }) {
  return (
    <div className="solutions-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Our HVAC Solutions & Services</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Custom Turnkey Designs and High-Tonnage Piping Systems</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>Engineering Solutions</h2>
            <p className="section-subtitle">High-tonnage custom project executions for industrial and commercial sectors.</p>
          </div>
          <div className="grid-3" style={{ marginBottom: '60px' }}>
            {solutions.map((sol) => (
              <div key={sol.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>{sol.name}</h2>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}>{sol.desc}</p>
                  
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--accent-orange)', marginBottom: '10px' }}>Core Highlights</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '25px', fontSize: '0.85rem' }}>
                    {sol.highlights.map((h, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--accent-orange)' }}>✔</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => { setLandingKey(sol.id); setPage('landing'); }} 
                  className="btn btn-secondary" 
                  style={{ width: '100%', marginTop: 'auto' }}
                >
                  View Solution Page
                </button>
              </div>
            ))}
          </div>

          {/* Products & Services Catalog */}
          <div className="section-title-wrap">
            <h2>Products & Equipment Catalog</h2>
            <p className="section-subtitle">We supply, install, maintain, and repair a complete range of commercial cooling and refrigeration systems.</p>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            {/* 1. Installation */}
            <div className="card" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>🔧 Installation Services</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                {productCatalog.installations.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', color: 'var(--text-light)' }}>
                    <span style={{ color: 'var(--accent-orange)' }}>⚡</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Maintenance */}
            <div className="card" style={{ borderLeft: '4px solid var(--primary-medium)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>⚙️ Maintenance Services</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                {productCatalog.maintenance.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', color: 'var(--text-light)' }}>
                    <span style={{ color: 'var(--primary-medium)' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Repairing */}
            <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>🛠️ Repairing Services</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                {productCatalog.repairing.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', color: 'var(--text-light)' }}>
                    <span style={{ color: 'var(--success)' }}>✔</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Air Conditioners */}
            <div className="card" style={{ gridColumn: 'span 2 / span 2', borderLeft: '4px solid var(--primary-dark)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>🏢 Air Conditioning Equipment</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.9rem' }}>
                {productCatalog.airConditioners.map((item, i) => (
                  <div key={i} style={{ color: 'var(--text-light)' }}>
                    ❄️ {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Cold Rooms & Coolers */}
            <div className="card" style={{ borderLeft: '4px solid var(--primary-dark)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>❄️ Cold Rooms & Ice Machines</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                {productCatalog.coldRooms.map((item, i) => <li key={i}>📦 {item}</li>)}
                {productCatalog.coldCoolers.map((item, i) => <li key={i}>🥤 {item}</li>)}
                {productCatalog.iceMachines.map((item, i) => <li key={i}>🧊 {item}</li>)}
                {productCatalog.purifiers.map((item, i) => <li key={i}>💧 {item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

