import React from "react";
import Logo from "./Logo";
import { Link } from "../router";
import { serviceGroups } from "../pages/pageData";
import { EMAIL, LOCATIONS } from "../data/site";
import Socials from "./Social";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <Logo size={44} />
            <p>
              We design and build intelligent software — AI assistants,
              automation and digital products that help businesses grow.
            </p>
            <Link to="/contact" className="ft-cta">
              Start a Project <span>↗</span>
            </Link>
            <div className="ft-soc"><Socials /></div>
          </div>

          <div className="ft-col">
            <h4>Services</h4>
            {serviceGroups.flatMap((g) => g.items).map((i) => (
              <Link key={i.path} to={i.path}>{i.short}</Link>
            ))}
          </div>

          <div className="ft-col">
            <h4>Company</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>

          <div className="ft-col">
            <h4>Our offices</h4>
            {LOCATIONS.map((l) => (
              <div className="ft-loc" key={l.country}>
                <span>{l.flag}</span>
                <div>
                  <b>{l.country}</b>
                  {l.wa ? (
                    <a href={`https://wa.me/${l.wa}`} target="_blank" rel="noreferrer">{l.phone}</a>
                  ) : (
                    <em>{l.phone}</em>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} aiLLynqs. All rights reserved.</span>
          <span>Intelligent systems. Human ambition.</span>
        </div>
      </div>
    </footer>
  );
}
