import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StoryScene from "./components/StoryScene";
import { navigate, Link } from "./router";

// DUMMY CONTENT — replace with your real copy
const stories = [
  { scene: "chatbot", to: "/services/ai-chatbots", title: "AI Chatbots", story: "A customer writes at 2 AM. Your AI answers in seconds and books the sale while you sleep." },
  { scene: "automation", to: "/services/workflow-automation", title: "Workflow Automation", story: "Scattered, repetitive tasks flow through one AI core and come out finished." },
  { scene: "scraping", to: "/services/web-scraping", title: "Data & Web Scraping", story: "Hundreds of web pages become one clean, organised dataset you can act on." },
  { scene: "web", to: "/services/web-development", title: "Custom Web Development", story: "A fast, beautiful website that turns first-time visitors into real enquiries." },
  { scene: "shop", to: "/services/shopify", title: "Shopify & WooCommerce", story: "Your store opens, the first order lands, and then they keep coming." },
  { scene: "seo", to: "/services/seo", title: "SEO Growth", story: "From page five to page one — steady, measurable climbs in search." },
];

const steps = [
  ["01", "Discover", "We listen, map your goals and find where AI saves the most time."],
  ["02", "Design", "A clear plan, scope and quote — no surprises."],
  ["03", "Build", "We build fast, share progress and refine with you."],
  ["04", "Launch & grow", "We launch, monitor and keep improving the system."],
];

const stats = [["50+", "Projects delivered"], ["24/7", "Systems running"], ["3x", "Faster operations"], ["98%", "Client satisfaction"]];

const quotes = [
  ["“They automated work that used to take our team hours every day.”", "Client Name", "Company, Role"],
  ["“Clear communication, fast delivery and a website that finally converts.”", "Client Name", "Company, Role"],
];

const openContact = () => navigate("/contact");

function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="site">

      {/* ================= HEADER ================= */}

      <Header />


      {/* ================= HERO ================= */}

      <main>

        <section
          id="home"
          className="hero"
        >

          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-content">

            <div className="eyebrow">
              <span className="live-dot" />
              AI SOFTWARE HOUSE
            </div>

            <h1>
              Build the
              <span> system.</span>
              <br />
              Let AI run it.
            </h1>

            <p>
              aiLLynqs builds intelligent agents,
              automation systems and AI-powered
              software designed to operate your
              business around the clock.
            </p>

            <div className="hero-actions">

              <button
                className="primary-btn"
                onClick={openContact}
              >
                Start a project
                <span>↗</span>
              </button>

              <button
                className="secondary-btn"
                onClick={() => scrollTo("portfolio")}
              >
                Explore our work
                <span>↓</span>
              </button>

            </div>

            <div className="hero-tags">
              <span>AI AGENTS</span>
              <span>AUTOMATION</span>
              <span>LLM SYSTEMS</span>
              <span>WEB DEVELOPMENT</span>
            </div>

          </div>


          <div className="hero-visual">

            <div className="visual-grid" />

            <div className="status">
              <span className="live-dot" />
              SYSTEM OPERATIONAL
            </div>

            <div className="ai-core">

              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="orbit orbit-c" />

              <div className="core">
                AI
              </div>

            </div>

            <div className="visual-footer">
              <span>INTELLIGENCE LAYER</span>
              <span>∞ ONLINE</span>
            </div>

          </div>

        </section>


        {/* ================= MARQUEE ================= */}

        <div className="marquee">

          <div className="marquee-track">

            <span>AI AGENTS</span>
            <b>✦</b>

            <span>AUTOMATION</span>
            <b>✦</b>

            <span>LLM SYSTEMS</span>
            <b>✦</b>

            <span>WEB DEVELOPMENT</span>
            <b>✦</b>

            <span>DATA SYSTEMS</span>
            <b>✦</b>

            <span>AI AGENTS</span>
            <b>✦</b>

            <span>AUTOMATION</span>
            <b>✦</b>

            <span>LLM SYSTEMS</span>

          </div>

        </div>


        {/* ================= SERVICES (stories) ================= */}

        <section id="services" className="section">
          <div className="section-label">01 / SERVICES</div>
          <div className="section-heading">
            <h2>Every service<br /><span>tells a story.</span></h2>
            <p>Six ways we turn ideas into intelligent systems — each built around a real business moment.</p>
          </div>

          <div className="story-grid">
            {stories.map((st, i) => (
              <Link to={st.to} className="story-card" key={st.title}>
                <div className="story-media">
                  <StoryScene name={st.scene} />
                  <span className="story-num">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="story-body">
                  <h3>{st.title}</h3>
                  <p>{st.story}</p>
                  <span className="story-more">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= PROCESS ================= */}

        <section id="process" className="section">
          <div className="section-label">02 / HOW WE WORK</div>
          <div className="section-heading">
            <h2>From idea<br /><span>to launch.</span></h2>
            <p>A simple, transparent process so you always know what happens next.</p>
          </div>
          <div className="step-grid">
            {steps.map(([n, t, d]) => (
              <div className="step-card" key={n}>
                <b>{n}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PROOF ================= */}

        <section id="portfolio" className="section">
          <div className="section-label">03 / RESULTS</div>
          <div className="stat-row">
            {stats.map(([v, l]) => (
              <div key={l}><strong>{v}</strong><span>{l}</span></div>
            ))}
          </div>
          <div className="quote-grid">
            {quotes.map(([q, n, r]) => (
              <figure className="quote-card" key={q}>
                <blockquote>{q}</blockquote>
                <figcaption><i />{n}<small>{r}</small></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}

        <section className="final-cta">

          <div className="eyebrow">
            <span className="live-dot" />
            READY WHEN YOU ARE
          </div>

          <h2>
            Have an idea?
            <br />
            <span>Let's build it.</span>
          </h2>

          <p>
            Tell us what you're building and
            let's turn the idea into a working system.
          </p>

          <button
            className="primary-btn"
            onClick={openContact}
          >
            Start a Project
            <span>↗</span>
          </button>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}

export default App;