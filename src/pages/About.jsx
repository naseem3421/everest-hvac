import React from 'react';
import { ShieldAlert, Cpu, Heart, CheckCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>About Everest Air Conditioning</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>34+ Years of Quality Engineering & Trust in South India</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 style={{ marginBottom: '20px' }}>Our History & Founders' Vision</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '15px' }}>
                Everest Air Conditioning Company was established in 1992 in Chennai, Tamil Nadu, by a group of passionate mechanical engineers. Recognising that commercial central AC systems were becoming a key driver for productivity in the IT boom, they dedicated the firm solely to B2B engineering.
              </p>
              <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
                Over the next three decades, Everest expanded from a small room office to multiple hubs across Bengaluru, Coimbatore, Madurai, and Pondicherry, completing over 500+ commercial HVAC projects.
              </p>
              <h3 style={{ marginBottom: '10px' }}>Founder Story</h3>
              <p style={{ color: 'var(--text-light)', fontStyle: 'italic' }}>
                "We set out with one core motto: B2B HVAC requires absolute thermal precision, not guess calculations. A hospital operating theater or a pharmaceutical processing plant cannot afford even a 0.5°C temperature fluctuation. That level of engineering is what we build." — Raghavan Narayanan, Co-Founder
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-steel)', padding: '40px', borderRadius: '12px' }}>
              <h3 style={{ marginBottom: '20px' }}>Why Choose Everest?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle color="var(--accent-orange)" size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Fully Licensed & Compliant</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>ISO 9001:2015, authorized dealership licenses, and strict safety codes.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle color="var(--accent-orange)" size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>In-House Designing Team</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Equipped with 3D BIM modeling tools to design and clear clash detections before onsite pipe layouts.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <CheckCircle color="var(--accent-orange)" size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Unmatched 24/7 AMC SLAs</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>Standby maintenance engineers ready to dispatch in under 2 hours in Chennai, Coimbatore, and Bangalore.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Team */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2>Our Engineering Leadership</h2>
            <p className="section-subtitle">A core team of certified thermal dynamicists, HVAC consultants, and execution managers.</p>
          </div>
          <div className="grid-3">
            <div className="card text-center">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>N. Raghavan</h3>
              <span style={{ color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Managing Director & Co-Founder</span>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '15px' }}>
                Over 35 years in commercial design, formerly with Voltas & Blue Star. Leads strategic client relations.
              </p>
            </div>
            <div className="card text-center">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>K. R. Raghavan</h3>
              <span style={{ color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>HVAC Design Lead</span>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '15px' }}>
                Specializes in fluid dynamics, ASHRAE heat load modeling, and 3D BIM piping simulations.
              </p>
            </div>
            <div className="card text-center">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '5px' }}>R. Loganathan</h3>
              <span style={{ color: 'var(--accent-orange)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>Head of AMC Services</span>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '15px' }}>
                Directs the dispatch of 150+ field service technicians and manages critical client SLA compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Certifications */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>Safety Standards & Certifications</h2>
            <p className="section-subtitle">Operating under world-class regulatory safety and management controls.</p>
          </div>
          <div className="grid-2">
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ padding: '15px', backgroundColor: 'rgba(238,108,77,0.1)', color: 'var(--accent-orange)', borderRadius: '8px', height: 'fit-content' }}>
                <ShieldAlert size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Zero Incident Safety Policy</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  Our site execution teams strictly adhere to personal protective equipment (PPE) codes, heights execution clearance, and hot works permits. We hold safety induction sessions for all staff before launching structural rigging.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ padding: '15px', backgroundColor: 'rgba(19,64,116,0.1)', color: 'var(--primary-medium)', borderRadius: '8px', height: 'fit-content' }}>
                <Cpu size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Quality Assurance</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                  Everest is ISO 9001:2015 certified. Every chiller piping, VRF joint brazing, and duct pressure leak test is logged, validated, and signed by our senior engineers before handing over the project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
