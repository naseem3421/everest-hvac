import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Contact Our Engineering Offices</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Get in Touch with our Commercial HVAC Consultants</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid-2">
            <div>
              <h2 style={{ marginBottom: '25px' }}>Headquarters & Regional Contacts</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <MapPin size={24} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Chennai Office (HQ)</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                      Everest Air Conditioning Company<br />
                      28/81, Millers Road, Kilpauk,<br />
                      Chennai - 600 010, Tamil Nadu, India.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <Phone size={24} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Phone Lines</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                      Mobile/WhatsApp: +91 93383 01234
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <Mail size={24} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Corporate Email</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                      everestac.in@gmail.com
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                  <Clock size={24} color="var(--accent-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Business Hours</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                      Monday - Saturday: 10:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Hotline Alert */}
              <div style={{ backgroundColor: 'rgba(238,108,77,0.1)', borderLeft: '4px solid var(--accent-orange)', padding: '20px', borderRadius: '6px' }}>
                <h4 style={{ color: 'var(--accent-orange)', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <ShieldAlert size={20} /> 24/7 AMC Emergency Dispatch
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                  If you hold an active Premium AMC SLA and are experiencing a plant breakdown, contact our critical hotline at <strong>+91 98400 99999</strong> for immediate engineering mobilization.
                </p>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="card">
              <h3 style={{ marginBottom: '20px' }}>Send an Inquiry</h3>
              {submitted ? (
                <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
                  <h4>Inquiry Sent Successfully</h4>
                  <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>Our technical design head will contact you within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" className="form-control" placeholder="e.g. Apex Builders" required />
                  </div>
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input type="text" className="form-control" placeholder="e.g. Ramesh Kumar" required />
                  </div>
                  <div className="form-group font-2">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div>
                        <label>Phone Number</label>
                        <input type="tel" className="form-control" placeholder="e.g. +91 98765 43210" required />
                      </div>
                      <div>
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="e.g. ramesh@company.com" required />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Message / Requirements</label>
                    <textarea className="form-control" rows="4" placeholder="Briefly describe your project requirements..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Technical Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Styled Interactive Mock Map */}
      <section style={{ height: '350px', backgroundColor: 'var(--bg-steel)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.25, background: 'radial-gradient(circle, var(--primary-medium) 10%, transparent 11%)', backgroundSize: '12px 12px' }} />
        <div className="card text-center" style={{ zIndex: 1, maxWidth: '400px', padding: '25px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Everest Headquarters</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '15px' }}>28/81, Millers Road, Kilpauk, Chennai - 600 010, Tamil Nadu, India</p>
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            Open Google Maps
          </a>
        </div>
      </section>
    </div>
  );
}
