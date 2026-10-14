import { Link } from 'react-router-dom';
export function HomePage() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div><span className="eyebrow">✦ Discover India differently</span>
        <h1>Every state.<br /><span>Every season.</span><br />Your next story.</h1>
        <p>Discover the diversity of India—from weekend escapes to cross-country adventures. Your trip starts with the right destination.</p>
        <div className="actions"><Link to="/explore" className="btn btn-primary">Explore all 36 states & UTs →</Link><Link to="/register" className="btn btn-ghost">Create a free account</Link></div>
        <div className="hero-notes"><span>28 states</span><span>8 union territories</span><span>6 travel regions</span></div>
      </div>
      <div className="hero-art" role="img" aria-label="Stylized mountain, sun, and journey illustration"><div className="sun"/><div className="mountain back"/><div className="mountain front"/><div className="hero-art-card"><span>YOUR NEXT DESTINATION</span><strong>Somewhere incredible.</strong><small>Made for curious explorers ↗</small></div></div>
    </div></section>
    <section className="container section"><div className="section-heading"><span className="eyebrow">A journey worth planning</span><h2>Built for every kind of traveller.</h2></div>
      <div className="feature-grid"><article className="feature-card"><span className="emoji">🧭</span><h3>Explore by region</h3><p>Browse every state and union territory and find where you want to travel next.</p></article><article className="feature-card"><span className="emoji">📅</span><h3>Trips for every season</h3><p>Seasonal discovery, weekend planning and holidays are coming in the next phases.</p></article><article className="feature-card"><span className="emoji">🗺️</span><h3>Road trips that make sense</h3><p>Multi-stop routes and Google Maps integration are planned as a dedicated phase.</p></article></div>
    </section>
  </>;
}