import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "../router";
import type { PageInfo } from "./pageData";
import "./ComingSoon.css";

export default function ComingSoon({ page }: { page: PageInfo }) {
  useEffect(() => {
    document.title = `${page.title} — Coming Soon | aiLLynqs`;
    return () => {
      document.title = "aiLLynqs — AI Software House";
    };
  }, [page.title]);

  return (
    <div className="cs">
      <div className="cs-bg">
        <span className="cs-orb cs-orb-a" />
        <span className="cs-orb cs-orb-b" />
        <span className="cs-grid" />
      </div>

      <Header />

      <main className="cs-main">
        <div className="cs-eyebrow">
          <span className="cs-dot" />
          {page.eyebrow}
        </div>

        <h1 className="cs-title">{page.title}</h1>

        <h2 className="cs-sub">
          <span>Coming Soon</span>
        </h2>

        <p className="cs-text">{page.blurb}</p>

        <div className="cs-progress" aria-hidden="true">
          <span />
        </div>
        <div className="cs-progress-label">Currently being crafted</div>

        <div className="cs-actions">
          <Link to="/" className="cs-btn cs-btn-ghost">
            <span>←</span> Back to Home
          </Link>
          <Link to="/contact" className="cs-btn cs-btn-solid">
            Start a Project <span>↗</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
