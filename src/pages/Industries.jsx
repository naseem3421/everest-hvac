import React from 'react';
import { HelpCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { industries } from '../data';

export default function Industries() {
  return (
    <div className="industries-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Industries We Serve</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Custom B2B HVAC Engineering Tailored to Your Sector</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {industries.map((ind) => (
              <div key={ind.id} id={ind.id} className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--bg-steel)', paddingBottom: '15px', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                  <h2 style={{ fontSize: '1.8rem' }}>{ind.name}</h2>
                  <span style={{ backgroundColor: 'rgba(238, 108, 77, 0.1)', color: 'var(--accent-orange)', padding: '6px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>
                    {ind.projectsCount}+ Projects Executed
                  </span>
                </div>

                <div className="grid-2" style={{ gap: '40px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', gap: '8px', alignItems: 'center', color: 'red' }}>
                      ⚠️ Industry Challenges
                    </h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {ind.challenges.map((c, idx) => (
                        <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.95rem', color: 'var(--text-light)' }}>
                          <span style={{ color: 'red', fontWeight: 700 }}>•</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--primary-dark)' }}>
                      ⚙️ Our Engineering Solution
                    </h3>
                    <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', marginBottom: '20px' }}>
                      {ind.solutions}
                    </p>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--success)' }}>
                      <CheckCircle size={18} color="var(--success)" /> Business Outcome & Benefits
                    </h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                      {ind.benefits}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
