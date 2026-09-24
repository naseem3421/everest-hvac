import React, { useState, useEffect } from 'react';
import { 
  Phone, MessageSquare, Menu, X, Check, Download, 
  HelpCircle, ChevronRight, FileText, Send 
} from 'lucide-react';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Industries from './pages/Industries';
import Solutions from './pages/Solutions';
import Projects from './pages/Projects';
import Brands from './pages/Brands';
import CaseStudies from './pages/CaseStudies';
import AMC from './pages/AMC';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import LandingPage from './pages/LandingPage';
import LocalSEO from './pages/LocalSEO';

export default function App() {
  const [page, setPage] = useState('home');
  const [landingKey, setLandingKey] = useState('commercial-hvac');
  const [cityKey, setCityKey] = useState('chennai');
  
  // Mobile nav state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Popups States
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [showQuickQuote, setShowQuickQuote] = useState(false);

  // Form submit confirmation states
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [profileDownloaded, setProfileDownloaded] = useState(false);

  // Exit intent trigger
  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY < 50) {
        // Trigger exit intent only once
        const seen = localStorage.getItem('exit_intent_seen');
        if (!seen) {
          setShowExitIntent(true);
          localStorage.setItem('exit_intent_seen', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Listen to profile download triggers from internal links
  useEffect(() => {
    const openDownload = () => setShowDownloadPopup(true);
    window.addEventListener('open-download-popup', openDownload);
    return () => window.removeEventListener('open-download-popup', openDownload);
  }, []);

  // Render current page based on state
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} setLandingKey={setLandingKey} setCityKey={setCityKey} />;
      case 'about':
        return <About />;
      case 'industries':
        return <Industries />;
      case 'solutions':
        return <Solutions setLandingKey={setLandingKey} setPage={setPage} />;
      case 'projects':
        return <Projects />;
      case 'brands':
        return <Brands />;
      case 'case-studies':
        return <CaseStudies />;
      case 'amc':
        return <AMC setPage={setPage} />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'booking':
        return <Booking />;
      case 'landing':
        return <LandingPage landingKey={landingKey} setPage={setPage} />;
      case 'localseo':
        return <LocalSEO cityKey={cityKey} setPage={setPage} />;
      case 'privacy':
        return (
          <div className="container section-padding">
            <h2>Privacy Policy</h2>
            <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>
              Everest Air Conditioning Company values your business and B2B confidentiality. Technical drawings, heat calculations, and facility coordinates submitted to us are strictly used for custom HVAC proposing and contract service delivery. We do not sell or distribute customer information to third parties.
            </p>
          </div>
        );
      case 'terms':
        return (
          <div className="container section-padding">
            <h2>Terms & Conditions</h2>
            <p style={{ marginTop: '20px', color: 'var(--text-light)' }}>
              All technical surveys, heat load metrics, and preliminary 3D routing designs shared with prospective clients are proprietary assets of Everest Air Conditioning. Site inspections are scheduled based on coordinator validation. AMC SLAs are governed by final signed service terms.
            </p>
          </div>
        );
      default:
        return <Home setPage={setPage} setLandingKey={setLandingKey} setCityKey={setCityKey} />;
    }
  };

  const handleNavClick = (targetPage) => {
    setPage(targetPage);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const triggerCity = (city) => {
    setCityKey(city);
    handleNavClick('localseo');
  };

  const triggerLanding = (key) => {
    setLandingKey(key);
    handleNavClick('landing');
  };

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header */}
      <header>
        <div className="container header-content">
          <div className="logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Everest Air Conditioning Company" style={{ height: '55px', borderRadius: '4px' }} />
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-only-nav">
            <ul className="nav-links">
              <li><a href="#home" className={page === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}>Home</a></li>
              <li><a href="#about" className={page === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About</a></li>
              <li><a href="#solutions" className={page === 'solutions' || page === 'landing' ? 'active' : ''} onClick={() => handleNavClick('solutions')}>Solutions</a></li>
              <li><a href="#industries" className={page === 'industries' ? 'active' : ''} onClick={() => handleNavClick('industries')}>Industries</a></li>
              <li><a href="#projects" className={page === 'projects' ? 'active' : ''} onClick={() => handleNavClick('projects')}>Projects</a></li>
              <li><a href="#case-studies" className={page === 'case-studies' ? 'active' : ''} onClick={() => handleNavClick('case-studies')}>Case Studies</a></li>
              <li><a href="#amc" className={page === 'amc' ? 'active' : ''} onClick={() => handleNavClick('amc')}>AMC</a></li>
              <li><a href="#blog" className={page === 'blog' ? 'active' : ''} onClick={() => handleNavClick('blog')}>Blog</a></li>
              <li><a href="#contact" className={page === 'contact' ? 'active' : ''} onClick={() => handleNavClick('contact')}>Contact</a></li>
            </ul>
          </nav>

          <div className="header-cta">
            <button onClick={() => setShowDownloadPopup(true)} className="btn btn-outline header-profile-btn" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
              <Download size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Profile
            </button>
            <button onClick={() => handleNavClick('booking')} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
              Book Inspection
            </button>
            <button className="menu-burger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', color: 'var(--white)', border: 'none', cursor: 'pointer' }}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          width: '100%',
          backgroundColor: 'var(--primary-dark)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          zIndex: 998,
          boxShadow: 'var(--shadow-lg)'
        }}>
          <ul style={{ listStyle: 'none', padding: '20px' }}>
            {['home', 'about', 'solutions', 'industries', 'projects', 'case-studies', 'amc', 'blog', 'contact'].map((p) => (
              <li key={p} style={{ margin: '15px 0' }}>
                <a 
                  href={`#${p}`} 
                  onClick={() => handleNavClick(p)} 
                  style={{ color: 'var(--white)', fontSize: '1.1rem', display: 'block', fontWeight: 600 }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
            <li style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              <button onClick={() => { setMobileMenuOpen(false); setShowDownloadPopup(true); }} className="btn btn-outline" style={{ width: '100%' }}>
                Download Profile PDF
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Main Page Area */}
      <main style={{ flexGrow: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="grid-4" style={{ gap: '30px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img src="/logo.png" alt="Everest Air Conditioning Company" style={{ height: '60px', borderRadius: '4px', backgroundColor: 'var(--white)', padding: '3px' }} />
              </div>
              <p style={{ fontSize: '0.9rem', marginBottom: '20px', opacity: 0.8 }}>
                South India's premier B2B commercial HVAC design, execution, testing, and commissioning engineering partner. Over 34 years experience.
              </p>
              <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                📍 28/81, Millers Road, Kilpauk, Chennai - 600 010.
              </p>
            </div>

            <div>
              <h4>Key Solutions</h4>
              <ul className="footer-links">
                <li><a href="#vrf" onClick={() => triggerLanding('vrf-installation')}>VRF System Installation</a></li>
                <li><a href="#chillers" onClick={() => triggerLanding('chiller-plants')}>Chiller Plants & Piping</a></li>
                <li><a href="#cold-storage" onClick={() => triggerLanding('cold-storage')}>Cold Storage Rooms</a></li>
                <li><a href="#amc" onClick={() => handleNavClick('amc')}>Annual Maintenance SLAs</a></li>
              </ul>
            </div>

            <div>
              <h4>Local SEO Hubs</h4>
              <ul className="footer-links">
                <li><a href="#chennai" onClick={() => triggerCity('chennai')}>HVAC Chennai</a></li>
                <li><a href="#bangalore" onClick={() => triggerCity('bangalore')}>HVAC Bangalore</a></li>
                <li><a href="#coimbatore" onClick={() => triggerCity('coimbatore')}>HVAC Coimbatore</a></li>
                <li><a href="#pondicherry" onClick={() => triggerCity('pondicherry')}>HVAC Pondicherry</a></li>
              </ul>
            </div>

            <div>
              <h4>Subscribe Newsletter</h4>
              <p style={{ fontSize: '0.85rem', marginBottom: '15px', opacity: 0.8 }}>
                Get our technical articles, case studies, and energy efficiency guides.
              </p>
              <div style={{ display: 'flex', gap: '5px' }}>
                <input type="email" placeholder="Corporate email" className="form-control" style={{ padding: '8px 12px' }} />
                <button className="btn btn-primary" style={{ padding: '8px 12px' }}><Send size={16} /></button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', padding: '0 10px' }}>
              <span>© {new Date().getFullYear()} Everest Air Conditioning Company. All Rights Reserved.</span>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#privacy" onClick={() => handleNavClick('privacy')}>Privacy Policy</a>
                <a href="#terms" onClick={() => handleNavClick('terms')}>Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Conversion Actions */}
      <div className="floating-actions">
        <a href="tel:+919338301234" className="float-btn float-phone" title="Call Senior Engineer">
          <Phone size={24} />
        </a>
        <a href="https://wa.me/919338301234" target="_blank" rel="noopener noreferrer" className="float-btn float-whatsapp" title="WhatsApp Chat">
          <MessageSquare size={24} />
        </a>
        <button onClick={() => setShowQuickQuote(true)} className="float-btn float-book">
          <FileText size={18} /> Quick Quote
        </button>
      </div>

      {/* Popups (Modals) */}
      
      {/* 1. Download Profile Popup */}
      <div className={`modal-overlay ${showDownloadPopup ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="close-modal" onClick={() => setShowDownloadPopup(false)}>×</button>
          <h3 style={{ marginBottom: '15px' }}>Download Corporate Profile</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '20px' }}>
            Please fill in your coordinates to receive a PDF copy of our 30-year engineering milestone portfolio and certifications deck.
          </p>

          {profileDownloaded ? (
            <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
              <Check size={32} style={{ display: 'block', margin: '0 auto 10px auto' }} />
              <h4>Download Started!</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Your browser has downloaded Everest_Corporate_Profile_2026.pdf</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setProfileDownloaded(true); }}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" required placeholder="e.g. Anand" />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="form-control" required placeholder="e.g. Larsen & Toubro" />
              </div>
              <div className="form-group">
                <label>Corporate Email</label>
                <input type="email" className="form-control" required placeholder="e.g. anand@lt.com" />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Download size={18} /> Request PDF Copy
              </button>
            </form>
          )}
        </div>
      </div>

      {/* 2. Exit Intent Popup */}
      <div className={`modal-overlay ${showExitIntent ? 'active' : ''}`}>
        <div className="modal-content" style={{ borderTop: '6px solid var(--accent-orange)' }}>
          <button className="close-modal" onClick={() => setShowExitIntent(false)}>×</button>
          <h3 style={{ marginBottom: '10px' }}>Wait! Need a Free HVAC Design Audit?</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '20px' }}>
            Before you leave, let our senior fluid dynamicists perform a zero-cost cooling audit of your current blueprint layouts.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setShowExitIntent(false); handleNavClick('booking'); }} className="btn btn-primary" style={{ flexGrow: 1 }}>
              Book Site Survey
            </button>
            <button onClick={() => setShowExitIntent(false)} className="btn btn-secondary" style={{ flexGrow: 1 }}>
              No Thanks
            </button>
          </div>
        </div>
      </div>

      {/* 3. Quick Quote Floating Form */}
      <div className={`modal-overlay ${showQuickQuote ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="close-modal" onClick={() => setShowQuickQuote(false)}>×</button>
          <h3 style={{ marginBottom: '15px' }}>Request Quick HVAC Quote</h3>
          
          {quoteSubmitted ? (
            <div style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--success)', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
              <Check size={32} style={{ display: 'block', margin: '0 auto 10px auto' }} />
              <h4>Quote Request Logged!</h4>
              <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>Our regional design head will follow up within 4 business hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setQuoteSubmitted(true); }}>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Estimated Plant Size (in TR / HP)</label>
                <input type="text" className="form-control" placeholder="e.g. 150 TR" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Request Pricing Estimate
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
