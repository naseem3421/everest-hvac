import React from 'react';
import { caseStudies } from '../data';
import { Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

export default function CaseStudies() {
  return (
    <div className="case-studies-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Engineering Case Studies</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Proven Financial and Functional Outcomes Across South India</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {caseStudies.map((cs) => (
              <div key={cs.id} className="card" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--bg-steel)', paddingBottom: '15px', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-orange)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {cs.industry} Solutions
                    </span>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '5px' }}>{cs.title}</h2>
                  </div>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ padding: '10px 20px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '6px', textAlign: 'center' }}>
                      <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800 }}>{cs.savings}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Efficiency Gain</span>
                    </div>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '30px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>1. Challenge</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '20px' }}>{cs.challenge}</p>

                    <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>2. Engineering Design & Solution</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '20px' }}>{cs.solution}</p>

                    <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: 'var(--primary-dark)' }}>3. Installation & Execution</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{cs.execution}</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--bg-light)', padding: '30px', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '15px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <TrendingUp color="var(--accent-orange)" size={20} /> Measurable Outcomes
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
                      <div style={{ backgroundColor: 'var(--white)', padding: '15px', borderRadius: '6px', borderLeft: '4px solid var(--success)' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Operational Outcome</span>
                        <p style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{cs.result}</p>
                      </div>
                      <div style={{ backgroundColor: 'var(--white)', padding: '15px', borderRadius: '6px', borderLeft: '4px solid var(--accent-orange)' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Financial Return</span>
                        <p style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{cs.outcome}</p>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', marginBottom: '8px' }}>Client Feedback</h4>
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                      "{cs.feedback}"
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
