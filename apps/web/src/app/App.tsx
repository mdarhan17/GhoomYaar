import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { APP_NAME } from "@ghoomyaar/shared";
import "../styles/global.css";

type Kind = "All" | "Nature" | "Culture" | "Beaches";
type Destination = {
  id: string;
  title: string;
  state: string;
  region: string;
  kind: Exclude<Kind, "All">;
  caption: string;
  image: string;
  label: string;
};

// Carefully labelled demo content: backend destination records will replace this array.
const destinations: Destination[] = [
  {
    id: "munnar",
    title: "Munnar",
    state: "Kerala",
    region: "South India",
    kind: "Nature",
    caption: "Rolling tea gardens & misty mountain roads",
    image: "https://unsplash.com/photos/PHOk0ZP28a0/download?force=true&w=1400",
    label: "HILLS & GREEN ESCAPES",
  },
  {
    id: "jaipur",
    title: "Jaipur",
    state: "Rajasthan",
    region: "North India",
    kind: "Culture",
    caption: "Royal architecture & colourful old streets",
    image: "https://images.unsplash.com/photo-1578999935853-4ec5fa6c1f60?auto=format&fit=crop&w=1100&q=85",
    label: "CULTURE & HERITAGE",
  },
  {
    id: "goa",
    title: "Palolem",
    state: "Goa",
    region: "West India",
    kind: "Beaches",
    caption: "Slow afternoons along the Arabian Sea",
    image: "https://unsplash.com/photos/WSe6NAwwESA/download?force=true&w=1400",
    label: "BEACHES & COASTLINES",
  },
];

const tripModes = [
  { title: "Weekend escapes", detail: "Short journeys, big memories", icon: "sun" },
  { title: "Seasonal favourites", detail: "Trips that fit your calendar", icon: "spark" },
  { title: "Epic road trips", detail: "One route, many stories", icon: "route" },
  { title: "All-India discovery", detail: "From the coast to the peaks", icon: "compass" },
] as const;

type IconName = "arrow" | "compass" | "pin" | "heart" | "sun" | "route" | "spark" | "calendar" | "menu" | "close" | "search" | "check" | "chevron";
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    heart: <path d="M20.8 8.4c0 4.7-8.8 10.6-8.8 10.6S3.2 13.1 3.2 8.4A4.9 4.9 0 0 1 12 5.5a4.9 4.9 0 0 1 8.8 2.9Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h5a5 5 0 0 0 0-10H8a3 3 0 0 1 0-6"/></>,
    spark: <><path d="m12 2 2.1 6 6 2.1-6 2.1-2.1 6-2.1-6-6-2.1 6-2.1L12 2Z"/><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <path d="M5 5l14 14M19 5 5 19"/>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m8 10 4 4 4-4"/>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function SectionTitle({ tag, title, description }: { tag: string; title: ReactNode; description: string }) {
  return <div className="section-title fade-in"><span className="eyebrow eyebrow-dark"><span className="eyebrow-dot"/>{tag}</span><h2>{title}</h2><p>{description}</p></div>;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [kind, setKind] = useState<Kind>("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [startingCity, setStartingCity] = useState("");
  const [duration, setDuration] = useState("Weekend · 2 days");
  const [month, setMonth] = useState("November");
  const [tripPreview, setTripPreview] = useState(false);
  const exploreRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => destinations.filter((place) => {
    const query = search.trim().toLowerCase();
    const matchesText = !query || [place.title, place.state, place.region, place.caption, place.kind].some((value) => value.toLowerCase().includes(query));
    return matchesText && (kind === "All" || place.kind === kind);
  }), [search, kind]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".fade-in"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appeared");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filtered.length]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    exploreRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function toggleSave(id: string) {
    setSaved((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]);
  }
  function handleTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!startingCity.trim()) return;
    setTripPreview(true);
  }

  return (
    <div className="page-shell" id="top">
      <div className="hero-wrap">
        <div className="aurora aurora-one" aria-hidden="true"/><div className="aurora aurora-two" aria-hidden="true"/>
        <header className="site-header">
          <div className="nav-shell layout">
            <a href="#top" className="brand" aria-label="GhoomYaar home" onClick={() => setMenuOpen(false)}>
              <span className="brand-symbol"><Icon name="compass" size={24}/></span><span>Ghoom<span className="brand-accent">Yaar</span><small>EXPLORE INDIA</small></span>
            </a>
            <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
              <a href="#explore" onClick={() => setMenuOpen(false)}>Explore</a>
              <a href="#experiences" onClick={() => setMenuOpen(false)}>Experiences</a>
              <a href="#roadtrips" onClick={() => setMenuOpen(false)}>Road trips</a>
              <a href="#planner" onClick={() => setMenuOpen(false)}>Trip planner</a>
            </nav>
            <a className="nav-cta" href="#planner">Plan a trip <Icon name="arrow" size={16}/></a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
              <Icon name={menuOpen ? "close" : "menu"}/>
            </button>
          </div>
        </header>

        <main>
          <section className="hero layout" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-pill"><span className="live-dot"/> YOUR NEXT STORY STARTS HERE <Icon name="spark" size={15}/></div>
              <h1 id="hero-title">India is calling.<br/><span>Go where you</span><br/><em>feel alive.</em></h1>
              <p className="hero-subtitle">From misty mountains to sunlit shores. Discover remarkable places, dream up road trips, and make every escape unforgettable.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#explore">Explore destinations <Icon name="arrow" size={19}/></a>
                <a className="button button-ghost" href="#roadtrips"><Icon name="route" size={19}/> Road trip preview</a>
              </div>
              <div className="hero-proof"><div className="proof-icons"><span>✦</span><span>✷</span><span>✺</span></div><p><strong>36 states & union territories</strong><br/>One extraordinary country to explore</p></div>
            </div>
            <div className="hero-visual" aria-label="Travel inspiration photography">
              <div className="visual-outline"/>
              <div className="hero-photo"><img src={destinations[0].image} alt="Green tea plantations in Munnar" fetchPriority="high"/><div className="image-gradient"/><div className="image-caption"><span className="image-tag"><Icon name="pin" size={13}/> KERALA, INDIA</span><strong>Find your kind<br/>of paradise.</strong></div></div>
              <div className="side-photo"><img src={destinations[1].image} alt="Hawa Mahal in Jaipur" loading="lazy"/></div>
              <div className="floating-card floating-rating"><span className="floating-symbol"><Icon name="compass" size={20}/></span><div><small>EXPLORE MORE</small><strong>Places beyond the ordinary</strong></div></div>
              <div className="floating-card floating-location"><Icon name="pin" size={18}/><span>Every journey, beautifully planned</span></div>
              <span className="visual-spark spark-a">✧</span><span className="visual-spark spark-b">✳</span>
            </div>
          </section>

          <div className="hero-search-wrap layout">
            <form className="search-glass" onSubmit={handleSearch} aria-label="Search demo destinations">
              <div className="search-label"><Icon name="search" size={20}/><span><small>WHERE TO?</small><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search places or states" aria-label="Search destinations or states"/></span></div>
              <span className="search-divider"/>
              <div className="search-label"><Icon name="compass" size={20}/><span><small>TRAVEL VIBE</small><select value={kind} onChange={(event) => setKind(event.target.value as Kind)} aria-label="Travel category"><option>All</option><option>Nature</option><option>Culture</option><option>Beaches</option></select></span></div>
              <button type="submit" className="search-button">Explore now <Icon name="arrow" size={18}/></button>
            </form>
            <span className="search-note">Preview search: 3 sample destinations · Full India catalog arrives in later phases</span>
          </div>
        </main>
      </div>

      <section className="explore-section section-space" id="explore" ref={exploreRef}>
        <div className="layout">
          <div className="explore-header"><SectionTitle tag="HANDPICKED INSPIRATION" title={<>Some places just <span className="serif-word">stay with you.</span></>} description="A small preview of the journeys waiting to be discovered across India."/><div className="saved-counter"><Icon name="heart" size={18}/>{saved.length} saved</div></div>
          <div className="filter-row" aria-label="Filter destinations">{(["All","Nature","Culture","Beaches"] as Kind[]).map((filter) => <button key={filter} type="button" className={`filter-pill ${kind === filter ? "active" : ""}`} onClick={() => setKind(filter)}>{filter === "All" ? "All destinations" : filter}</button>)}</div>
          {filtered.length === 0 ? <div className="empty-state"><Icon name="search" size={30}/><h3>No matching preview destinations</h3><p>Try a different search or explore all three sample places.</p><button type="button" className="button button-primary" onClick={() => {setSearch("");setKind("All");}}>Reset filters <Icon name="arrow" size={16}/></button></div> : <div className="destination-grid">{filtered.map((place, index) => <article className="destination-card fade-in" key={place.id} style={{ animationDelay: `${index * 90}ms` }}>
            <div className="destination-image"><img src={place.image} alt={`${place.title}, ${place.state}`} loading="lazy"/><div className="destination-shade"/><span className="card-category">{place.label}</span><button className={`save-button ${saved.includes(place.id) ? "is-saved" : ""}`} type="button" onClick={() => toggleSave(place.id)} aria-label={`${saved.includes(place.id) ? "Remove" : "Save"} ${place.title} ${saved.includes(place.id) ? "from" : "to"} saved places`} aria-pressed={saved.includes(place.id)}><Icon name="heart" size={19}/></button></div>
            <div className="destination-info"><div><span className="destination-location"><Icon name="pin" size={13}/>{place.state} · {place.region}</span><h3>{place.title}</h3><p>{place.caption}</p></div><a href="#planner" className="destination-arrow" aria-label={`Plan a trip to ${place.title}`}><Icon name="arrow" size={19}/></a></div>
          </article>)}</div>}
        </div>
      </section>

      <section className="experience-section section-space" id="experiences">
        <div className="layout"><SectionTitle tag="TRAVEL YOUR WAY" title={<>Not just where. <span className="serif-word">How you go.</span></>} description="Weekend escapes, seasonal favourites, and open-road adventures — designed around your kind of travel."/>
          <div className="experience-grid">{tripModes.map((mode, index) => <div className="experience-card fade-in" key={mode.title} style={{ animationDelay: `${index * 70}ms` }}><span className="experience-icon"><Icon name={mode.icon} size={24}/></span><span className="experience-index">0{index + 1}</span><h3>{mode.title}</h3><p>{mode.detail}</p></div>)}</div>
        </div>
      </section>

      <section className="roadtrip-section" id="roadtrips">
        <div className="layout roadtrip-layout"><div className="roadtrip-copy fade-in"><span className="eyebrow"><span className="eyebrow-dot"/> THE ROAD LESS ORDINARY</span><h2>One road.<br/><em>Endless stories.</em></h2><p>Build flexible multi-stop adventures across India. Add destinations, rearrange your stops, and keep the good parts of the journey in focus.</p><div className="roadtrip-bullets"><span><Icon name="check" size={17}/> Multiple destinations</span><span><Icon name="check" size={17}/> Day-wise itinerary planning</span><span><Icon name="check" size={17}/> Google Maps integration — upcoming phase</span></div><a className="button button-primary" href="#planner">Start planning <Icon name="arrow" size={18}/></a></div>
          <div className="map-preview fade-in"><div className="map-grid" aria-hidden="true"/><div className="map-line" aria-hidden="true"><span className="map-stop stop-one"/><span className="map-stop stop-two"/><span className="map-stop stop-three"/></div><span className="map-chip map-chip-one"><Icon name="pin" size={16}/> Bengaluru</span><span className="map-chip map-chip-two"><Icon name="pin" size={16}/> Mysuru</span><span className="map-chip map-chip-three"><Icon name="pin" size={16}/> Coorg</span><div className="map-footer"><Icon name="route" size={18}/><div><strong>A journey made yours</strong><small>Illustrative route · Live maps to be connected</small></div><span className="map-arrow"><Icon name="arrow" size={17}/></span></div></div>
        </div>
      </section>

      <section className="planner-section section-space" id="planner">
        <div className="layout planner-layout"><div className="planner-intro fade-in"><span className="eyebrow eyebrow-dark"><span className="eyebrow-dot"/> YOUR NEXT ESCAPE</span><h2>Great trips start<br/>with <span className="serif-word">a little wonder.</span></h2><p>Tell us the basics and preview your travel idea. Full itinerary generation, budgets, and maps will come in later development phases.</p><div className="planner-decoration"><Icon name="spark" size={25}/><span>GO SOMEWHERE GOOD.</span></div></div>
          <form className="planner-card fade-in" onSubmit={handleTrip}><div className="planner-heading"><span className="planner-emblem"><Icon name="compass" size={22}/></span><div><h3>Dream it. Plan it.</h3><p>Start with a few details</p></div></div>
            <label className="field-label" htmlFor="origin">YOUR STARTING CITY</label><input id="origin" className="form-input" value={startingCity} onChange={(event) => {setStartingCity(event.target.value);setTripPreview(false);}} placeholder="e.g. Bengaluru" required maxLength={70}/>
            <div className="form-two-col"><div><label className="field-label" htmlFor="travel-duration">TRIP DURATION</label><div className="select-wrap"><select className="form-input" id="travel-duration" value={duration} onChange={(event) => {setDuration(event.target.value);setTripPreview(false);}}><option>One day</option><option>Weekend · 2 days</option><option>Long weekend · 3–4 days</option><option>One week</option></select><Icon name="chevron" size={17}/></div></div><div><label className="field-label" htmlFor="travel-month">TRAVEL MONTH</label><div className="select-wrap"><select className="form-input" id="travel-month" value={month} onChange={(event) => {setMonth(event.target.value);setTripPreview(false);}}>{["January","February","March","April","May","June","July","August","September","October","November","December"].map((m)=><option key={m}>{m}</option>)}</select><Icon name="chevron" size={17}/></div></div></div>
            <button type="submit" className="button button-primary planner-submit">Create trip preview <Icon name="arrow" size={19}/></button>
            {tripPreview ? <div className="preview-result" role="status"><Icon name="check" size={19}/><div><strong>Travel idea ready!</strong><p>From {startingCity.trim()} · {duration} · {month}. Next phases will connect destination data and route planning.</p></div></div> : <p className="form-note"><Icon name="spark" size={15}/> Interactive preview · No booking or itinerary created yet</p>}
          </form>
        </div>
      </section>

      <footer className="site-footer"><div className="layout footer-layout"><div className="footer-brand"><span className="brand-symbol"><Icon name="compass" size={22}/></span><span><strong>{APP_NAME}</strong><small>Explore India. Your way.</small></span></div><p>Built for curious souls & beautiful journeys.</p><a href="#top" className="back-top">Back to top ↑</a></div></footer>
    </div>
  );
}
