import React, { useState } from 'react';
import { 
  Shield, CheckCircle, Award, Users, ArrowRight, Phone, 
  MapPin, Settings, HelpCircle, Star, Calendar, MessageSquare, Activity 
} from 'lucide-react';
import { industries, solutions, projects, ongoingProjects, completedProjects, caseStudies, brands } from '../data';

export default function Home({ setPage, setLandingKey, setCityKey }) {
  const [projectFilter, setProjectFilter] = useState('all');

  const filteredCompletedProjects = projectFilter === 'all'
    ? completedProjects
    : completedProjects.filter(p => p.industry === projectFilter);

  const doubleBrands = [...brands, ...brands]; // Double for infinite carousel scrolling

  return (
    <div className="homepage-view">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(rgba(11, 37, 69, 0.9), rgba(11, 37, 69, 0.9)), url("https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        padding: '120px 0 100px 0',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto' }}>
            <span style={{ 
              backgroundColor: 'var(--accent-orange)', 
              color: 'var(--white)', 
              padding: '6px 16px', 
              borderRadius: '20px', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '20px'
            }}>
              ISO 9001:2015 Certified HVAC Engineers
            </span>
            <h1 style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.15 }}>
              34+ Years of Commercial HVAC Excellence
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '40px', fontWeight: 400 }}>
              Designing, Installing & Maintaining High-Performance HVAC & Chiller Systems Across South India.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setPage('booking')} className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                Book Site Inspection
              </button>
              <a href="#company-profile" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-download-popup')); }} className="btn btn-outline" style={{ padding: '14px 34px', fontSize: '1rem' }}>
                Download Company Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Cards */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="grid-4" style={{ gap: '20px' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', backgroundColor: 'var(--white)' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(238, 108, 77, 0.1)', color: 'var(--accent-orange)' }}>
                <Award size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>34+</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500 }}>Years Experience</p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', backgroundColor: 'var(--white)' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(19, 64, 116, 0.1)', color: 'var(--primary-medium)' }}>
                <Settings size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>500+</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500 }}>Projects Completed</p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', backgroundColor: 'var(--white)' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>
                <Users size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>100+</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500 }}>Corporate Clients</p>
              </div>
            </div>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', backgroundColor: 'var(--white)' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(11, 37, 69, 0.1)', color: 'var(--primary-dark)' }}>
                <Shield size={32} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>24/7</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', fontWeight: 500 }}>AMC Service Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2">
            <div>
              <span style={{ color: 'var(--accent-orange)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.9rem' }}>Who We Are</span>
              <h2 style={{ fontSize: '2.5rem', marginTop: '10px', marginBottom: '20px' }}>South India's Most Trusted Commercial HVAC Engineers</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '20px', fontSize: '1.05rem' }}>
                Everest Air Conditioning Company has spent three decades executing high-tonnage central air conditioning, ventilation, VRF loops, and process refrigeration systems. We work as consulting engineers and direct mechanical contractors for multi-specialty hospitals, hotels, factories, IT hubs, and cold storage logistics.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} color="var(--success)" />
                  <span style={{ fontWeight: 600 }}>USFDA, NABH & ASHRAE standards compliance</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} color="var(--success)" />
                  <span style={{ fontWeight: 600 }}>In-house 3D CAD/BIM drawing coordination teams</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <CheckCircle size={18} color="var(--success)" />
                  <span style={{ fontWeight: 600 }}>Certified technicians for major brands like Daikin, Carrier & Trane</span>
                </div>
              </div>
              <button onClick={() => setPage('about')} className="btn btn-secondary">
                Read More About Us <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'var(--primary-dark)', padding: '40px', borderRadius: '12px', color: 'var(--white)' }}>
              <h3 style={{ color: 'var(--white)', marginBottom: '15px' }}>Our Mission</h3>
              <p style={{ opacity: 0.9, marginBottom: '25px', fontSize: '0.95rem' }}>
                To deliver sustainable, high-efficiency commercial indoor environments by combining cutting-edge fluid dynamics, HVAC engineering, and round-the-clock maintenance excellence.
              </p>
              <h3 style={{ color: 'var(--white)', marginBottom: '15px' }}>Our Core Values</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>⚡ <strong>Engineering Precision:</strong> Zero guesswork; standard calculations first.</li>
                <li>🛡️ <strong>Safety Leadership:</strong> Maintaining absolute zero-accident safety records.</li>
                <li>🌱 <strong>Environmental Care:</strong> Optimizing green cooling plants to reduce PUE.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2>Our 34+ Year Milestones</h2>
            <p className="section-subtitle">A journey of engineering excellence, starting as a small maintenance shop in Chennai to becoming a regional contracting force.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div style={{ borderLeft: '3px solid var(--primary-medium)', position: 'absolute', top: '10px', bottom: '10px', left: '16px' }} />
            
            <div style={{ display: 'flex', gap: '20px', position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '8px', top: '6px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--accent-orange)' }} />
              <div>
                <h4 style={{ color: 'var(--accent-orange)' }}>1992 — Foundation</h4>
                <p style={{ fontWeight: 600 }}>Founded in Chennai, Tamil Nadu</p>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Started providing B2B packaged AC maintenance services for commercial outlets in Chennai.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '8px', top: '6px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--primary-dark)' }} />
              <div>
                <h4 style={{ color: 'var(--primary-dark)' }}>2005 — Large-scale Turnkey Projects</h4>
                <p style={{ fontWeight: 600 }}>Ventured into Central Chiller Plants</p>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Successfully executed our first 500+ TR industrial piping and chiller plant in Sriperumbudur industrial belt.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '8px', top: '6px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--primary-dark)' }} />
              <div>
                <h4 style={{ color: 'var(--primary-dark)' }}>2015 — Regional Expansion & ISO Certification</h4>
                <p style={{ fontWeight: 600 }}>Expanding to South India</p>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Established branch offices in Bangalore and Coimbatore. Received ISO 9001:2015 certification for project management.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px', position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '8px', top: '6px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--primary-dark)' }} />
              <div>
                <h4 style={{ color: 'var(--primary-dark)' }}>2025 & Beyond — Smart Green Buildings</h4>
                <p style={{ fontWeight: 600 }}>IoT-linked Energy Analytics</p>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Integrating smart Building Management Systems (BMS) and Variable Flow systems to achieve LEED green building ratings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>Industries We Serve</h2>
            <p className="section-subtitle">Tailored commercial cooling designs optimized for specific operational regulations and thermal conditions.</p>
          </div>
          <div className="grid-3">
            {industries.map((ind) => (
              <div key={ind.id} className="card text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>{ind.name}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}>{ind.shortDesc}</p>
                </div>
                <button onClick={() => { setPage('industries'); }} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  View Challenges
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--white)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2 style={{ color: 'var(--white)' }}>Engineering HVAC Solutions</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>End-to-end B2B services from layout to execution and 24x7 support.</p>
          </div>
          <div className="grid-3">
            {solutions.map((sol) => (
              <div key={sol.id} className="card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'var(--white)', fontSize: '1.25rem', marginBottom: '15px' }}>{sol.name}</h3>
                <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '20px' }}>{sol.desc}</p>
                <button onClick={() => { setLandingKey(sol.id); setPage('landing'); }} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  View Solution Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling Brands Carousel */}
      <section className="brand-carousel-wrap">
        <h4 style={{ textAlign: 'center', marginBottom: '15px', color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Authorized Systems Partner for Leading Global Brands
        </h4>
        <div className="brand-carousel">
          {doubleBrands.map((b, index) => (
            <div key={index} className="brand-logo-card">
              <h4>{b.name}</h4>
              <span>{b.category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Dedicated Section: Ongoing Projects (Above Featured Projects) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span className="live-dot" />
              <span style={{ color: 'var(--accent-orange)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
                Live Sites Under Execution
              </span>
            </div>
            <h2>Ongoing Projects</h2>
            <p className="section-subtitle">Active high-tonnage HVAC installations, ducting networks, and chiller plants currently being engineered across South India.</p>
          </div>

          <div className="grid-3" style={{ gap: '25px' }}>
            {ongoingProjects.slice(0, 3).map((proj) => (
              <div 
                key={proj.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  padding: 0,
                  overflow: 'hidden',
                  borderTop: '4px solid var(--accent-orange)',
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
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(238, 108, 77, 0.95)', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                    <span className="live-dot-sm" /> Under Execution
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {proj.location}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{proj.name}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '15px', lineHeight: '1.5' }}>
                      {proj.description}
                    </p>

                    {/* Progress Indicator */}
                    <div style={{ backgroundColor: 'var(--bg-light)', padding: '10px 12px', borderRadius: '6px', marginBottom: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '5px' }}>
                        <span style={{ color: 'var(--primary-dark)' }}>Phase: {proj.currentPhase}</span>
                        <span style={{ color: 'var(--accent-orange)' }}>{proj.progress}</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-steel)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: proj.progress, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, var(--accent-orange) 0%, #F97316 100%)', 
                          borderRadius: '3px' 
                        }} />
                      </div>
                    </div>

                    <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-dark)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px', borderTop: '1px solid var(--bg-steel)', paddingTop: '12px' }}>
                      <li>⚙️ <strong>Capacity:</strong> {proj.capacity}</li>
                      <li>🏗️ <strong>Scope:</strong> {proj.scope}</li>
                      <li>🏢 <strong>Brand:</strong> {proj.brand}</li>
                    </ul>
                  </div>
                  <button onClick={() => setPage('projects')} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem', padding: '10px' }}>
                    Track Project Live →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '35px' }}>
            <button 
              onClick={() => setPage('projects')} 
              className="btn btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              View All {ongoingProjects.length} Ongoing Projects Portfolio <ArrowRight size={16} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
            </button>
          </div>
        </div>
      </section>

      {/* Filterable Featured Projects (Completed Installations) */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <span style={{ color: 'var(--success)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '1px' }}>
              Delivered Installations
            </span>
            <h2>Featured Projects</h2>
            <p className="section-subtitle">Real-world commercial installations delivering stable, efficient cooling across South India.</p>
          </div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            {['all', 'commercial-offices', 'factories', 'educational-institutions', 'hotels', 'it-parks', 'shopping-malls'].map(f => (
              <button 
                key={f}
                onClick={() => setProjectFilter(f)}
                className="btn"
                style={{
                  padding: '8px 18px',
                  fontSize: '0.85rem',
                  backgroundColor: projectFilter === f ? 'var(--accent-orange)' : 'var(--bg-steel)',
                  color: projectFilter === f ? 'var(--white)' : 'var(--text-dark)',
                  borderRadius: '20px'
                }}
              >
                {f === 'all' ? 'ALL' : f.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="grid-3" style={{ gap: '25px' }}>
            {filteredCompletedProjects.slice(0, 6).map(proj => (
              <div 
                key={proj.id} 
                className="card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  padding: 0,
                  overflow: 'hidden',
                  borderTop: '4px solid var(--primary-medium)',
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
                  <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'inline-flex', alignItems: 'center', gap: '3px', backgroundColor: 'rgba(16, 185, 129, 0.95)', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontWeight: 700, fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                    ✓ Delivered ({proj.year})
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {proj.location}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{proj.name}</h3>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '15px' }}>{proj.description}</p>
                    <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-dark)', display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px', borderTop: '1px solid var(--bg-steel)', paddingTop: '10px' }}>
                      <li>⚙️ <strong>Installed Capacity:</strong> <strong style={{ color: 'var(--accent-orange)' }}>{proj.capacity}</strong></li>
                      <li>🏗️ <strong>Scope:</strong> {proj.scope}</li>
                      <li>🏢 <strong>Brand:</strong> {proj.brand}</li>
                    </ul>
                  </div>
                  <button onClick={() => setPage('projects')} className="btn btn-secondary" style={{ width: '100%', fontSize: '0.85rem', padding: '10px' }}>
                    View Project Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Card */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <h2>Engineering Case Studies</h2>
            <p className="section-subtitle">Deep dive into custom installations, design hurdles, and measurable power savings.</p>
          </div>
          <div className="grid-2">
            {caseStudies.map(cs => (
              <div key={cs.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-orange)', textTransform: 'uppercase' }}>{cs.industry} Case Study</span>
                  <h3 style={{ fontSize: '1.4rem', margin: '8px 0 15px 0' }}>{cs.title}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '15px' }}><strong>Challenge:</strong> {cs.challenge}</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '20px' }}><strong>Result:</strong> {cs.result}</p>
                  <div style={{ display: 'flex', gap: '15px', backgroundColor: 'var(--bg-light)', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--success)' }}>{cs.savings}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Energy Reduction</span>
                    </div>
                    <div style={{ borderLeft: '1px solid var(--border)' }} />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{cs.outcome}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Direct Cost Benefit</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setPage('case-studies')} className="btn btn-secondary" style={{ width: '100%' }}>
                  Read Full Case Study
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title-wrap">
            <h2>What Facility Managers & Builders Say</h2>
            <p className="section-subtitle">Feedback from top construction companies, industrial giants, and hospitality leaders.</p>
          </div>
          <div className="grid-3">
            <div className="card">
              <div style={{ display: 'flex', gap: '5px', color: 'gold', marginBottom: '15px' }}>
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '20px' }}>
                "We hired Everest to design the central ventilation and clean rooms for our formulation block in Pondicherry. Their team was fully familiar with USFDA documentation and delivered the project within budget."
              </p>
              <h4 style={{ fontSize: '1rem' }}>M. S. Swaminathan</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Project Director, Aero Pharma</span>
            </div>

            <div className="card">
              <div style={{ display: 'flex', gap: '5px', color: 'gold', marginBottom: '15px' }}>
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '20px' }}>
                "Maintaining comfort and low sound levels was crucial for our luxury guest suites. Everest recommended and installed Daikin VRV systems that operate in near-silence. Truly a premium job!"
              </p>
              <h4 style={{ fontSize: '1rem' }}>R. Ananthakrishnan</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Chief Engineer, Grand Regency Hotel</span>
            </div>

            <div className="card">
              <div style={{ display: 'flex', gap: '5px', color: 'gold', marginBottom: '15px' }}>
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
                <Star size={18} fill="gold" />
              </div>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '20px' }}>
                "Everest holds our 24/7 AMC contract for Sigma Tech IT Park. Their response time to breakdown alerts has consistently stayed below 2 hours. Extremely reliable service."
              </p>
              <h4 style={{ fontSize: '1rem' }}>K. Gnanavel</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Facility Head, Sigma Group</span>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial HVAC FAQs */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-steel)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-title-wrap">
            <h2>Frequently Asked Questions</h2>
            <p className="section-subtitle">Answering common commercial HVAC design and AMC inquiries.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', fontSize: '1.05rem' }}>
                <HelpCircle size={18} color="var(--accent-orange)" /> How does Everest ensure energy savings during design?
              </h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', paddingLeft: '28px' }}>
                We utilize computer-aided load modeling based on solar path, wall insulation, and equipment load. By introducing Variable Speed Chillers and intelligent building management controllers, we reduce energy costs by up to 30%.
              </p>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', fontSize: '1.05rem' }}>
                <HelpCircle size={18} color="var(--accent-orange)" /> What are the response times under your Gold and Premium AMC packages?
              </h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', paddingLeft: '28px' }}>
                Our Gold plan guarantees support within 6 hours. For Premium critical environments (hospitals, manufacturing lines), we provide a strict 2-hour response SLA backed by our standby engineer team.
              </p>
            </div>

            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px', fontSize: '1.05rem' }}>
                <HelpCircle size={18} color="var(--accent-orange)" /> Can you retrofit legacy cooling plants without shutting down current operations?
              </h4>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', paddingLeft: '28px' }}>
                Yes. We coordinate phased execution, working during weekends and off-peak hours to install new pipe manifolds and chillers. We keep critical systems running to ensure zero B2B operational downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--white)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--white)', fontSize: '2.5rem', marginBottom: '20px' }}>Need a Commercial HVAC Partner?</h2>
            <p style={{ opacity: 0.9, marginBottom: '35px', fontSize: '1.1rem' }}>
              Let our senior engineering team audit your facility floor plan and deliver a high-tonnage energy efficiency cooling proposal.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setPage('booking')} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} /> Book Free Site Inspection
              </button>
              <a href="tel:+919338301234" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} /> Call +91 93383 01234
              </a>
              <a href="https://wa.me/919338301234" target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#25D366', color: 'var(--white)', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 28px' }}>
                <MessageSquare size={18} /> WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
