import React from 'react';
import { amcPlans, amcProjects } from '../data';
import { ShieldCheck, Zap, Bell, CheckCircle, MapPin, Building2, Layers } from 'lucide-react';

export default function AMC({ setPage }) {
  return (
    <div className="amc-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <span style={{ 
            backgroundColor: 'rgba(238, 108, 77, 0.2)', 
            color: 'var(--accent-orange)', 
            border: '1px solid var(--accent-orange)',
            padding: '4px 14px', 
            borderRadius: '20px', 
            fontSize: '0.85rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            display: 'inline-block', 
            marginBottom: '15px' 
          }}>
            3,600+ TR Under Active Care
          </span>
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Commercial HVAC AMC Services</h1>
          <p style={{ opacity: 0.9, marginTop: '10px', maxWidth: '650px', margin: '10px auto 0 auto' }}>
            24/7 Guaranteed Uptime Contracts (SLA) & Preventive Maintenance for South India
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <h2>Preventive Care is Cheaper than Breakdown Losses</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '20px', lineHeight: '1.6' }}>
                Everest Air Conditioning Company handles B2B Annual Maintenance Contracts (AMC) with strict, legally backed service level agreements. We maintain central chiller loops, cooling towers, primary/secondary pumps, VRF inverter networks, double-skin AHUs, and large ventilation duct systems.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Zap size={20} color="var(--accent-orange)" />
                  <span style={{ fontWeight: 600 }}>Emergency Callout response under 2 hours (Premium plan)</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <ShieldCheck size={20} color="var(--accent-orange)" />
                  <span style={{ fontWeight: 600 }}>Periodic chemical coil descaling & electrical wiring safety checks</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Bell size={20} color="var(--accent-orange)" />
                  <span style={{ fontWeight: 600 }}>Digitized logs & monthly energy consumption reviews</span>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--white)', padding: '40px', borderRadius: '12px' }}>
              <h3 style={{ color: 'var(--white)', marginBottom: '15px' }}>AMC Inspection Checklist</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', opacity: 0.9 }}>
                <li>✅ Measure compressor winding insulation resistance.</li>
                <li>✅ Verify electrical contactor points and amp draws.</li>
                <li>✅ Clean condensate drain tray to prevent water overflows.</li>
                <li>✅ Verify refrigerant operating pressure levels.</li>
                <li>✅ Clean filter screens and chemical wash outdoor coils.</li>
                <li>✅ Test emergency fire damper interlock relay systems.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Active AMC Portfolio Highlights */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#0284C7', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              <ShieldCheck size={18} /> Active Maintenance Contracts
            </div>
            <h2>Trusted by Major AMC Clients Across South India</h2>
            <p className="section-subtitle">Managing over 3,600+ TR/HP of mission-critical institutional campuses, corporate banking headquarters, and industrial facilities.</p>
          </div>

          <div className="grid-3" style={{ gap: '22px' }}>
            {amcProjects.slice(0, 6).map((proj) => (
              <div 
                key={proj.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  padding: 0,
                  overflow: 'hidden',
                  borderTop: '4px solid #0284C7', 
                  backgroundColor: 'var(--white)',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                {/* Logo / Brand Header */}
                <div style={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '160px', 
                  overflow: 'hidden', 
                  backgroundColor: '#ffffff', 
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px 28px'
                }}>
                  <img 
                    src={proj.image} 
                    alt={proj.name}
                    loading="lazy"
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100px', 
                      width: 'auto', 
                      height: 'auto', 
                      objectFit: 'contain', 
                      transition: 'transform 0.3s ease' 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(2, 132, 199, 0.95)', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                    <ShieldCheck size={12} /> {proj.contractType}
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {proj.location}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{proj.name}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '15px' }}>{proj.description}</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--bg-steel)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                    <span>Managed Capacity:</span>
                    <strong style={{ color: '#0284C7', fontSize: '1.05rem' }}>{proj.capacity}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={() => setPage('projects')} className="btn btn-secondary" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              View All 17 AMC Clients & Projects →
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2>Select Your Service Plan</h2>
            <p className="section-subtitle">Choose the right level of coverage to match your operational risks and budget constraints.</p>
          </div>
          <div className="grid-3">
            {amcPlans.map((p, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: p.name.includes('Premium') ? '2px solid var(--accent-orange)' : 'none' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>{p.name}</h3>
                    {p.name.includes('Premium') && <span style={{ backgroundColor: 'var(--accent-orange)', color: 'var(--white)', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>CRITICAL</span>}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 700, display: 'block', marginBottom: '20px' }}>{p.level}</span>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', marginBottom: '30px' }}>
                    {p.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--success)' }}>✔</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => setPage('booking')} className="btn btn-secondary" style={{ width: '100%', backgroundColor: p.name.includes('Premium') ? 'var(--accent-orange)' : 'var(--primary-dark)', border: 'none', color: 'var(--white)' }}>
                  Request AMC Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
