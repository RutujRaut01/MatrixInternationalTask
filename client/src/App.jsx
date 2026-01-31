import { useState, useEffect } from 'react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // In production, use the relative path '/api/contact'
      // For local development with separate ports, you might need a proxy or full URL.
      // Since we set up a proxy in package.json or vite.config.js, relative is best.
      // But we didn't set up proxy yet. Let's assume relative path works if built, 
      // or handle the port difference for dev.
      // For now, let's try direct fetch to port 5000 if in dev mode.

      const endpoint = import.meta.env.PROD
        ? '/api/contact'
        : 'http://localhost:5000/api/contact';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <a href="#" className="logo gradient-text">Matrix AI</a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
          <button className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container hero-content">
          <h1>Pioneering the <br /><span className="gradient-text">Future of Intelligence</span></h1>
          <p>We transform businesses through advanced AI strategies, custom LLM integration, and intelligent automation solutions.</p>
          <a href="#contact" className="btn btn-primary">Start Your Transformation</a>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <header className="section-header">
            <span className="section-subtitle">Our Expertise</span>
            <h2 className="section-title">Intelligent Solutions</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Tailored AI strategies for the modern enterprise.</p>
          </header>

          <div className="services-grid">
            {[
              { title: 'AI Strategy Consulting', icon: '✦', desc: 'Roadmapping your journey to AI maturity with data-driven insights.' },
              { title: 'Custom LLM Integration', icon: '⚡', desc: 'Deploying fine-tuned Large Language Models strictly for your business data.' },
              { title: 'Process Automation', icon: '⚙️', desc: 'End-to-end intelligent automation to reduce costs and increase efficiency.' },
              { title: 'Predictive Analytics', icon: '📈', desc: 'Forecasting market trends and user behaviors with high-precision models.' }
            ].map((service, index) => (
              <div key={index} className="service-card glass-panel">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ background: 'linear-gradient(to bottom, var(--bg-color), #0a0a0f)' }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-image glass-panel" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', color: 'var(--accent-glow)' }}>
              M
            </div>
            <div className="about-content">
              <span className="section-subtitle">About Matrix</span>
              <h2 className="section-title">Architecting the Neural Enterprise</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                Founded by a team of ex-DeepMind and Google engineers, Matrix International is at the forefront of the generative AI revolution. We don't just implement tools; we reshape how value is created in the digital age.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <h4>50+</h4>
                  <p>Enterprise Clients</p>
                </div>
                <div className="stat-item">
                  <h4>$200M</h4>
                  <p>Value Unlocked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <header className="section-header">
            <span className="section-subtitle">Get in Touch</span>
            <h2 className="section-title">Ready to Accelerate?</h2>
          </header>

          <div className="contact-container glass-panel">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p style={{ color: 'green', marginTop: '10px', textAlign: 'center' }}>Message sent successfully!</p>}
              {status === 'error' && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2026 Matrix International. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
