import React, { useState } from 'react';
import { Calendar, CheckCircle, FileText } from 'lucide-react';

export default function Booking() {
  const [submittedInspection, setSubmittedInspection] = useState(false);

  const handleInspectionSubmit = (e) => {
    e.preventDefault();
    setSubmittedInspection(e);
  };

  return (
    <div className="booking-page">
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '60px 0', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--white)', fontSize: '2.5rem' }}>Book B2B Site Inspection</h1>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>Schedule a Professional Technical Assessment by our Senior HVAC Engineers</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container" style={{ maxWidth: '750px' }}>
          <div className="card">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid var(--bg-steel)', paddingBottom: '15px' }}>
              <Calendar color="var(--accent-orange)" size={24} />
              <h2 style={{ fontSize: '1.4rem' }}>Request Commercial Site Inspection</h2>
            </div>

            {submittedInspection ? (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
                <CheckCircle size={48} style={{ marginBottom: '15px' }} />
                <h3>Site Inspection Request Received</h3>
                <p style={{ marginTop: '10px', fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                  Our engineering coordination desk will contact you to verify coordinates and lock the inspection calendar slot.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInspectionSubmit}>
                <div className="grid-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label>Company Name *</label>
                    <input type="text" className="form-control" placeholder="e.g. Apex Biotech Ltd" required />
                  </div>
                  <div className="form-group">
                    <label>Contact Person *</label>
                    <input type="text" className="form-control" placeholder="e.g. Dr. A. K. Bose" required />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label>Corporate Email *</label>
                    <input type="email" className="form-control" placeholder="e.g. bose@apexbiotech.com" required />
                  </div>
                  <div className="form-group">
                    <label>Contact Number *</label>
                    <input type="tel" className="form-control" placeholder="e.g. +91 94440 98765" required />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label>Project Site Location *</label>
                    <input type="text" className="form-control" placeholder="e.g. OMR, Chennai" required />
                  </div>
                  <div className="form-group">
                    <label>Project Sector *</label>
                    <select className="form-control" required defaultValue="">
                      <option value="" disabled>Select sector...</option>
                      <option value="Hospital">Hospital / Healthcare</option>
                      <option value="IT Park">IT Park / Office Block</option>
                      <option value="Manufacturing">Manufacturing Plant</option>
                      <option value="Warehouse">Cold Storage / Warehouse</option>
                      <option value="Hotel">Hotel / Restaurant</option>
                      <option value="Education">Educational Institution</option>
                    </select>
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label>Estimated Area (in Sq. Ft.)</label>
                    <input type="number" className="form-control" placeholder="e.g. 50000" />
                  </div>
                  <div className="form-group">
                    <label>Approx. Required Tonnage (TR)</label>
                    <input type="text" className="form-control" placeholder="e.g. 250 TR" />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label>Preferred Inspection Date *</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Existing System Status</label>
                    <select className="form-control">
                      <option>New Construction (Greenfield)</option>
                      <option>Renovation / Expansion</option>
                      <option>Complete Retrofit / System replacement</option>
                      <option>AMC / Maintenance Audit only</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Brief Project Description / Scope *</label>
                  <textarea className="form-control" rows="4" placeholder="Mention key design codes or special concerns like humidity level, fresh-air volume requirements..." required></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.05rem' }}>
                  Confirm Inspection Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
