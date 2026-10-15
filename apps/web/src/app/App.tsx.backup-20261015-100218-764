import { useEffect, useState } from "react";

import {
  APP_NAME,
  APP_DESCRIPTION
} from "@ghoomyaar/shared";

import { getApiHealth } from "../lib/api/health";

type ApiStatus = "checking" | "online" | "offline";

const features = [
  {
    title: "Explore India",
    description:
      "Discover destinations across all Indian states and union territories.",
    icon: "01"
  },
  {
    title: "Seasonal Travel",
    description:
      "Find places suited to different months, seasons and travel dates.",
    icon: "02"
  },
  {
    title: "Weekend Getaways",
    description:
      "Explore short trips based on your starting city and available days.",
    icon: "03"
  },
  {
    title: "Road Trip Builder",
    description:
      "Plan multi-stop routes with Google Maps and travel-time information.",
    icon: "04"
  },
  {
    title: "Custom Itineraries",
    description:
      "Build and edit complete day-wise travel plans.",
    icon: "05"
  },
  {
    title: "Group Travel",
    description:
      "Coordinate shared trips, tasks and travel plans with friends.",
    icon: "06"
  }
];

export function App() {
  const [apiStatus, setApiStatus] =
    useState<ApiStatus>("checking");

  useEffect(() => {
    const controller = new AbortController();

    getApiHealth(controller.signal)
      .then(() => setApiStatus("online"))
      .catch((error: unknown) => {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        setApiStatus("offline");
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container navbar">
          <a className="brand" href="/">
            <span className="brand-mark">G</span>
            <span>{APP_NAME}</span>
          </a>

          <nav className="nav-links" aria-label="Main navigation">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#development">Development</a>
          </nav>

          <a className="nav-button" href="#features">
            Explore Platform
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="eyebrow">
              INDIA TOURISM & TRIP PLANNING PLATFORM
            </div>

            <h1>
              Every State.
              <br />
              Every Season.
              <br />
              <span>One GhoomYaar.</span>
            </h1>

            <p className="hero-description">
              {APP_DESCRIPTION} From weekend
              escapes to cross-country adventures,
              plan your journey in one place.
            </p>

            <div className="hero-actions">
              <a className="button-primary" href="#features">
                Discover Features
              </a>

              <a className="button-secondary" href="#about">
                About GhoomYaar
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>28</strong>
                <span>Indian States</span>
              </div>

              <div>
                <strong>8</strong>
                <span>Union Territories</span>
              </div>

              <div>
                <strong>12</strong>
                <span>Travel Months</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="section container"
        >
          <div className="section-heading">
            <p className="section-label">
              PLATFORM CAPABILITIES
            </p>

            <h2>Built for Every Kind of Journey</h2>

            <p>
              Our planned travel tools will help users
              explore destinations and organise trips
              across India.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article
                className="feature-card"
                key={feature.title}
              >
                <div className="feature-number">
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="section about-section"
        >
          <div className="container about-layout">
            <div>
              <p className="section-label">
                ABOUT THE PROJECT
              </p>

              <h2>India is More Than a Destination.</h2>

              <p>
                GhoomYaar is being developed as an
                advanced MERN Stack tourism platform
                with state-wise discovery, custom travel
                planning and interactive routes.
              </p>
            </div>

            <div className="about-panel">
              <h3>Core Technology</h3>

              <ul>
                <li>React + TypeScript</li>
                <li>Node.js + Express</li>
                <li>MongoDB + Mongoose</li>
                <li>Google Maps Platform</li>
                <li>Socket.IO</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          id="development"
          className="section container"
        >
          <div className="status-card">
            <div>
              <p className="section-label">
                DEVELOPMENT STATUS
              </p>

              <h2>System Connection</h2>

              <p>
                This checks whether the React application
                can reach the Express API.
              </p>
            </div>

            <div
              className={`status-indicator ${apiStatus}`}
              role="status"
            >
              <span className="status-dot" />

              {apiStatus === "checking"
                ? "Checking API..."
                : apiStatus === "online"
                ? "API Connected"
                : "API Offline"}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <strong>{APP_NAME}</strong>

          <span>
            Explore India. Your Way.
          </span>
        </div>
      </footer>
    </div>
  );
}