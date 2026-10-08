import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { Link, usePath } from "../router";
import { serviceGroups } from "../pages/pageData";
import "./Header.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", mega: true },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const path = usePath();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobServices, setMobServices] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const megaRef = useRef<HTMLDivElement>(null);

  const isActive = (to: string) =>
    to === "/" ? path === "/" : path === to || path.startsWith(to + "/");

  // scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close everything when the page changes
  useEffect(() => {
    setMega(false);
    setMobile(false);
    setMobServices(false);
  }, [path]);

  // escape + click outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setMobile(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMega(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const openMega = () => {
    window.clearTimeout(timer.current);
    setMega(true);
  };
  const closeMega = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMega(false), 140);
  };

  return (
    <>
      <header className={`hd ${scrolled ? "hd-scrolled" : ""}`}>
        <div className="hd-bar">
          <Link to="/" className="hd-logo" aria-label="aiLLynqs — home">
            <Logo size={42} />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hd-nav" aria-label="Main">
            {links.map((l) =>
              l.mega ? (
                <div
                  key={l.to}
                  className="hd-services"
                  ref={megaRef}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <Link
                    to={l.to}
                    className={`hd-link ${isActive(l.to) ? "is-active" : ""} ${
                      mega ? "is-open" : ""
                    }`}
                    aria-haspopup="true"
                    aria-expanded={mega}
                  >
                    {l.label}
                    <svg className="hd-chev" width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 3.5 5 7l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>

                  <div className={`hd-mega ${mega ? "open" : ""}`}>
                    <div className="hd-mega-card">
                      <div className="hd-mega-intro">
                        <span className="hd-kicker">What we build</span>
                        <h3>
                          Intelligent software,
                          <br />
                          <em>quietly powerful.</em>
                        </h3>
                        <p>
                          AI, automation and digital products designed around
                          the way your business works.
                        </p>
                        <Link to="/services" className="hd-mega-all">
                          View all services <span>→</span>
                        </Link>
                      </div>

                      <div className="hd-mega-cols">
                        {serviceGroups.map((g) => (
                          <div className="hd-col" key={g.title}>
                            <div className="hd-col-head">
                              <span className="hd-ico">{g.icon}</span>
                              <div>
                                <h4>{g.title}</h4>
                                <small>{g.tag}</small>
                              </div>
                            </div>
                            {g.items.map((i) => (
                              <Link to={i.path} className="hd-sub" key={i.path}>
                                {i.short}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`hd-link ${isActive(l.to) ? "is-active" : ""}`}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <Link to="/contact" className="hd-cta">
            <span>Start a Project</span>
            <i>↗</i>
          </Link>

          <button
            className={`hd-burger ${mobile ? "open" : ""}`}
            onClick={() => setMobile((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobile}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`hd-drawer ${mobile ? "open" : ""}`} aria-hidden={!mobile}>
        <div className="hd-drawer-inner">
          {links.map((l, idx) =>
            l.mega ? (
              <div key={l.to} className="hd-m-group">
                <button
                  className="hd-m-link"
                  onClick={() => setMobServices((v) => !v)}
                  aria-expanded={mobServices}
                >
                  <small>{String(idx + 1).padStart(2, "0")}</small>
                  <span>{l.label}</span>
                  <b>{mobServices ? "−" : "+"}</b>
                </button>

                <div className={`hd-m-sub ${mobServices ? "open" : ""}`}>
                  <div>
                    <Link to="/services" className="hd-m-all">
                      All services →
                    </Link>
                    {serviceGroups.map((g) => (
                      <div key={g.title} className="hd-m-block">
                        <strong>{g.title}</strong>
                        {g.items.map((i) => (
                          <Link to={i.path} key={i.path}>
                            {i.short}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.to} to={l.to} className="hd-m-link">
                <small>{String(idx + 1).padStart(2, "0")}</small>
                <span>{l.label}</span>
              </Link>
            )
          )}

          <Link to="/contact" className="hd-m-cta">
            Start a Project ↗
          </Link>
        </div>
      </div>
    </>
  );
}
