import React, { useState } from 'react';
import { ongoingProjects, completedProjects, amcProjects } from '../data';
import { Activity, CheckCircle, Clock, MapPin, Layers, Award, ShieldCheck, Search, Building2, Wrench } from 'lucide-react';

export default function Projects() {
  const [industry, setIndustry] = useState('all');
  const [location, setLocation] = useState('all');
  const [brand, setBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewTab, setViewTab] = useState('all'); // 'all', 'ongoing', 'completed', 'amc'

  const filterItem = (p) => {
    const matchesIndustry = industry === 'all' || p.industry === industry;
    const matchesLocation = location === 'all' || p.location.toLowerCase().includes(location.toLowerCase());
    const matchesBrand = brand === 'all' || (p.brand && p.brand.toLowerCase().includes(brand.toLowerCase()));
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.customer && p.customer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.capacity.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesIndustry && matchesLocation && matchesBrand && matchesSearch;
  };

  const filteredOngoing = ongoingProjects.filter(filterItem);
  const filteredCompleted = completedProjects.filter(filterItem);
  const filteredAmc = amcProjects.filter(filterItem);
  const totalCount = filteredOngoing.length + filteredCompleted.length + filteredAmc.length;

  return (
    <div className="projects-page">
      {/* Hero Header */}
      <section style={{ backgroundColor: 'var(--primary-dark)', padding: '65px 0', color: 'var(--white)', textAlign: 'center' }}>
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
            34+ Years Proven HVAC Track Record
          </span>
          <h1 style={{ color: 'var(--white)', fontSize: '2.8rem', fontWeight: 800, marginBottom: '10px' }}>
            Our Projects & AMC Portfolio
          </h1>
          <p style={{ opacity: 0.9, maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
            High-tonnage central chiller plants, cleanroom ventilation, VRF installations, and comprehensive AMC contracts executed for institutional, industrial, and banking clients across South India.
          </p>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '15px',
            maxWidth: '900px',
            margin: '35px auto 30px auto',
            textAlign: 'center'
          }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-orange)' }}>46+</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Tracked Client Projects</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38BDF8' }}>4,500+</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Total TR / HP Capacity</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)' }}>24</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Commissioned Sites</div>
            </div>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FCD34D' }}>17</div>
              <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Active AMC Contracts</div>
            </div>
          </div>

          {/* Quick Tab Switcher */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            <button
              onClick={() => setViewTab('all')}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                backgroundColor: viewTab === 'all' ? 'var(--accent-orange)' : 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                border: viewTab === 'all' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            >
              All Projects ({totalCount})
            </button>
            <button
              onClick={() => setViewTab('ongoing')}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                backgroundColor: viewTab === 'ongoing' ? 'var(--accent-orange)' : 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                border: viewTab === 'ongoing' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px'
              }}
            >
              <span className="live-dot" /> Ongoing HVAC ({filteredOngoing.length})
            </button>
            <button
              onClick={() => setViewTab('completed')}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                backgroundColor: viewTab === 'completed' ? 'var(--accent-orange)' : 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                border: viewTab === 'completed' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            >
              ✓ Completed HVAC ({filteredCompleted.length})
            </button>
            <button
              onClick={() => setViewTab('amc')}
              className="btn"
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                backgroundColor: viewTab === 'amc' ? 'var(--accent-orange)' : 'rgba(255,255,255,0.1)',
                color: 'var(--white)',
                border: viewTab === 'amc' ? 'none' : '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '8px'
              }}
            >
              <ShieldCheck size={16} /> Ongoing AMC Contracts ({filteredAmc.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container">
          
          {/* Advanced Filter & Search Bar */}
          <div className="card" style={{ padding: '24px', marginBottom: '45px', backgroundColor: 'var(--white)', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <h3 style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={20} color="var(--primary-medium)" /> Filter Engineering Projects
              </h3>
              {(industry !== 'all' || location !== 'all' || brand !== 'all' || searchQuery !== '') && (
                <button 
                  onClick={() => { setIndustry('all'); setLocation('all'); setBrand('all'); setSearchQuery(''); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-orange)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Reset Filters ↺
                </button>
              )}
            </div>

            {/* Search Box */}
            <div style={{ marginBottom: '18px', position: 'relative' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="Search by client name, location (e.g. Parrys, Kanchipuram, T-Nagar), or capacity..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '42px', fontSize: '0.95rem' }}
                />
              </div>
            </div>
            
            <div className="grid-3" style={{ gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--text-dark)' }}>Industry Sector</label>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="form-control">
                  <option value="all">All Industries</option>
                  <option value="commercial-offices">Commercial Offices & Banking</option>
                  <option value="factories">Industrial, Robotics & Manufacturing</option>
                  <option value="educational-institutions">Educational Institutions</option>
                  <option value="hotels">Hotels & Banquet Halls</option>
                  <option value="it-parks">IT Parks & Software Tech Hubs</option>
                  <option value="shopping-malls">Retail Stores & Showrooms</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--text-dark)' }}>Region / Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="form-control">
                  <option value="all">All Locations</option>
                  <option value="chennai">Chennai Region</option>
                  <option value="kanchipuram">Kanchipuram</option>
                  <option value="madurantakam">Madurantakam</option>
                  <option value="irrungattukottai">Irungattukottai / Sriperumbudur</option>
                  <option value="andhra">Andhra Pradesh (Puttur)</option>
                  <option value="oragadam">Oragadam</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px', color: 'var(--text-dark)' }}>OEM Systems Brand</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="form-control">
                  <option value="all">All Brands</option>
                  <option value="Daikin">Daikin</option>
                  <option value="Blue Star">Blue Star</option>
                  <option value="Carrier">Carrier</option>
                  <option value="Voltas">Voltas</option>
                  <option value="Trane">Trane</option>
                  <option value="Johnson Controls">Johnson Controls / York</option>
                  <option value="Mitsubishi Electric">Mitsubishi Electric</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 1: ONGOING HVAC PROJECTS */}
          {(viewTab === 'all' || viewTab === 'ongoing') && (
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', borderBottom: '2px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="live-dot" />
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)' }}>Ongoing HVAC Projects</h2>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Active turnkey HVAC installations, ducting networks, and chiller equipment currently under execution.
                  </p>
                </div>
                <span style={{ 
                  backgroundColor: 'rgba(238, 108, 77, 0.12)', 
                  color: 'var(--accent-orange)', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontWeight: 700, 
                  fontSize: '0.85rem' 
                }}>
                  {filteredOngoing.length} Sites In Progress
                </span>
              </div>

              {filteredOngoing.length > 0 ? (
                <div className="grid-3" style={{ gap: '25px' }}>
                  {filteredOngoing.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="card" 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        padding: '0',
                        overflow: 'hidden',
                        borderTop: '4px solid var(--accent-orange)',
                        backgroundColor: 'var(--white)',
                        boxShadow: 'var(--shadow-md)',
                        position: 'relative'
                      }}
                    >
                      {/* Project Logo / Brand Identity */}
                      <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '170px', 
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
                            maxHeight: '105px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'rgba(238, 108, 77, 0.95)',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                        }}>
                          <span className="live-dot-sm" /> Under Execution
                        </div>
                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          color: '#fff',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <MapPin size={12} /> {proj.location}
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        {/* Title & Description */}
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{proj.name}</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                          {proj.description}
                        </p>

                        {/* Progress Bar Component */}
                        <div style={{ backgroundColor: 'var(--bg-steel)', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                            <span style={{ color: 'var(--primary-dark)' }}>Phase: {proj.currentPhase}</span>
                            <span style={{ color: 'var(--accent-orange)' }}>{proj.progress}</span>
                          </div>
                          <div style={{ width: '100%', height: '8px', backgroundColor: '#CBD5E1', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ 
                              width: proj.progress, 
                              height: '100%', 
                              background: 'linear-gradient(90deg, var(--accent-orange) 0%, #F97316 100%)', 
                              borderRadius: '4px',
                              transition: 'width 1s ease-in-out'
                            }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                            <span>Target Handover:</span>
                            <strong style={{ color: 'var(--primary-dark)' }}>{proj.expectedCompletion}</strong>
                          </div>
                        </div>

                        {/* Technical Specs List */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', borderTop: '1px solid var(--bg-steel)', paddingTop: '14px' }}>
                          <li>⚙️ <strong>Capacity:</strong> <strong style={{ color: 'var(--accent-orange)' }}>{proj.capacity}</strong></li>
                          <li>🏗️ <strong>Scope:</strong> {proj.scope}</li>
                          <li>🏢 <strong>Systems Brand:</strong> {proj.brand}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '35px', backgroundColor: 'var(--white)', borderRadius: '8px', color: 'var(--text-light)', border: '1px dashed var(--border)' }}>
                  No ongoing projects match the selected filter criteria.
                </div>
              )}
            </div>
          )}

          {/* SECTION 2: COMPLETED HVAC PROJECTS */}
          {(viewTab === 'all' || viewTab === 'completed') && (
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', borderBottom: '2px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={24} color="var(--success)" />
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)' }}>Completed HVAC Projects</h2>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Successfully commissioned and handed-over commercial HVAC installations across industrial, institutional, and retail sectors.
                  </p>
                </div>
                <span style={{ 
                  backgroundColor: 'rgba(16, 185, 129, 0.12)', 
                  color: 'var(--success)', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontWeight: 700, 
                  fontSize: '0.85rem' 
                }}>
                  {filteredCompleted.length} Delivered
                </span>
              </div>

              {filteredCompleted.length > 0 ? (
                <div className="grid-3" style={{ gap: '25px' }}>
                  {filteredCompleted.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="card" 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        padding: '0',
                        overflow: 'hidden',
                        borderTop: '4px solid var(--primary-medium)',
                        backgroundColor: 'var(--white)',
                        boxShadow: 'var(--shadow-md)'
                      }}
                    >
                      {/* Project Logo / Brand Identity */}
                      <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '170px', 
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
                            maxHeight: '105px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: 'rgba(16, 185, 129, 0.95)',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                        }}>
                          ✓ Commissioned ({proj.year})
                        </div>
                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          color: '#fff',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <MapPin size={12} /> {proj.location}
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        {/* Title & Description */}
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{proj.name}</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                          {proj.description}
                        </p>

                        {/* Technical Specs List */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', borderTop: '1px solid var(--bg-steel)', paddingTop: '14px' }}>
                          <li>⚙️ <strong>Installed Capacity:</strong> <strong style={{ color: 'var(--accent-orange)' }}>{proj.capacity}</strong></li>
                          <li>🏗️ <strong>Turnkey Scope:</strong> {proj.scope}</li>
                          <li>🏢 <strong>OEM Brand:</strong> {proj.brand}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '35px', backgroundColor: 'var(--white)', borderRadius: '8px', color: 'var(--text-light)', border: '1px dashed var(--border)' }}>
                  No completed projects match the selected filter criteria.
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: ONGOING AMC CONTRACTS */}
          {(viewTab === 'all' || viewTab === 'amc') && (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px', borderBottom: '2px solid var(--border)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={26} color="#0284C7" />
                    <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-dark)' }}>Active AMC Maintenance Contracts</h2>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Over 3,600+ TR/HP of mission-critical chiller plants, institutional campuses, and headquarters under continuous SLA maintenance.
                  </p>
                </div>
                <span style={{ 
                  backgroundColor: 'rgba(2, 132, 199, 0.12)', 
                  color: '#0284C7', 
                  padding: '6px 14px', 
                  borderRadius: '20px', 
                  fontWeight: 700, 
                  fontSize: '0.85rem' 
                }}>
                  {filteredAmc.length} Active Contracts
                </span>
              </div>

              {filteredAmc.length > 0 ? (
                <div className="grid-3" style={{ gap: '25px' }}>
                  {filteredAmc.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="card" 
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        padding: '0',
                        overflow: 'hidden',
                        borderTop: '4px solid #0284C7',
                        backgroundColor: 'var(--white)',
                        boxShadow: 'var(--shadow-md)'
                      }}
                    >
                      {/* Project Logo / Brand Identity */}
                      <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '170px', 
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
                            maxHeight: '105px',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: 'rgba(2, 132, 199, 0.95)',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backdropFilter: 'blur(4px)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                        }}>
                          <ShieldCheck size={13} /> {proj.contractType}
                        </div>
                        <div style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(15, 23, 42, 0.85)',
                          color: '#fff',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <MapPin size={12} /> {proj.location}
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        {/* Title & Description */}
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--primary-dark)' }}>{proj.name}</h3>
                        <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: '1.5' }}>
                          {proj.description}
                        </p>

                        {/* Technical Specs List */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', borderTop: '1px solid var(--bg-steel)', paddingTop: '14px' }}>
                          <li>⚙️ <strong>Maintained Capacity:</strong> <strong style={{ color: '#0284C7', fontSize: '0.95rem' }}>{proj.capacity}</strong></li>
                          <li>🏗️ <strong>Service Scope:</strong> {proj.scope}</li>
                          <li>🏢 <strong>Systems Under AMC:</strong> {proj.brand}</li>
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '35px', backgroundColor: 'var(--white)', borderRadius: '8px', color: 'var(--text-light)', border: '1px dashed var(--border)' }}>
                  No AMC contracts match the selected filter criteria.
                </div>
              )}
            </div>
          )}

          {/* Bottom Consultation Callout */}
          <div style={{ marginTop: '60px', backgroundColor: 'var(--primary-dark)', padding: '40px', borderRadius: '12px', color: 'var(--white)', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--white)', fontSize: '1.6rem', marginBottom: '10px' }}>Planning a High-Tonnage HVAC Installation or AMC Contract?</h3>
            <p style={{ opacity: 0.9, maxWidth: '650px', margin: '0 auto 25px auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Speak with our senior MEP design consultants and AMC managers for initial heat load calculations, chiller plant sizing, and customized SLA maintenance proposals.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); window.location.hash = 'contact'; }} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
                Request Project Estimate
              </a>
              <a href="#booking" onClick={(e) => { e.preventDefault(); window.location.hash = 'booking'; }} className="btn" style={{ padding: '12px 28px', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.12)', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.25)' }}>
                Schedule Plant AMC Audit
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
