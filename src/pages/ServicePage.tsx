import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryScene from "../components/StoryScene";
import { Link } from "../router";
import { serviceGroups } from "./pageData";
import { serviceContent, processSteps } from "./serviceContent";
import { LOCATIONS } from "../data/site";
import "./ServicePage.css";

const allItems = serviceGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));
const slugOf = (path: string) => path.split("/").pop() || "";

export function Shell({ children, title }: { children: React.ReactNode; title: string }) {
  useEffect(() => {
    document.title = `${title} | aiLLynqs`;
    return () => { document.title = "aiLLynqs — AI Software House"; };
  }, [title]);
  return (
    <div className="sp">
      <div className="sp-bg"><span /><span /></div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

/* ---------- single service ---------- */
export function ServicePage({ path }: { path: string }) {
  const item = allItems.find((i) => i.path === path)!;
  const c = serviceContent[slugOf(path)];
  const others = allItems.filter((i) => i.path !== path).slice(0, 3);
  const wa = LOCATIONS[0].wa;

  return (
    <Shell title={item.title}>
      <main className="sp-main">
        <section className="sp-hero">
          <div>
            <div className="sp-crumb"><Link to="/services">Services</Link> / {item.group}</div>
            <h1>{item.title}</h1>
            <p className="sp-tag">{c.tagline}</p>
            <p className="sp-intro">{c.intro}</p>
            <div className="sp-actions">
              <Link to="/contact" className="sp-btn sp-solid">Get a Quote ↗</Link>
              <a className="sp-btn sp-ghost" href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">WhatsApp us</a>
            </div>
          </div>
          <div className="sp-art"><StoryScene name={c.scene} /></div>
        </section>

        <section className="sp-sec">
          <span className="sp-kick">What you get</span>
          <h2>Built around <em>your business.</em></h2>
          <div className="sp-grid4">
            {c.features.map(([t, d], i) => (
              <div className="sp-card" key={t}>
                <b>{String(i + 1).padStart(2, "0")}</b>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="sp-for">
            <span>Great for</span>
            {c.goodFor.map((g) => <i key={g}>{g}</i>)}
          </div>
        </section>

        <section className="sp-sec">
          <span className="sp-kick">How it works</span>
          <h2>A simple, <em>clear process.</em></h2>
          <div className="sp-steps">
            {processSteps.map(([t, d], i) => (
              <div key={t}><b>{String(i + 1).padStart(2, "0")}</b><h3>{t}</h3><p>{d}</p></div>
            ))}
          </div>
        </section>

        <section className="sp-sec">
          <span className="sp-kick">Explore more</span>
          <div className="sp-more">
            {others.map((o) => (
              <Link to={o.path} key={o.path} className="sp-mini">
                <div><StoryScene name={serviceContent[slugOf(o.path)].scene} /></div>
                <h3>{o.short}</h3><span>View →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="sp-cta">
          <h2>Ready to start <em>{item.short}?</em></h2>
          <p>Tell us about your project and we'll reply with a clear plan and quote.</p>
          <Link to="/contact" className="sp-btn sp-solid">Request a Quote ↗</Link>
        </section>
      </main>
    </Shell>
  );
}

/* ---------- all services ---------- */
export function ServicesOverview() {
  return (
    <Shell title="Services">
      <main className="sp-main">
        <section className="sp-head">
          <span className="sp-kick">What we build</span>
          <h1>Services designed to <em>grow your business.</em></h1>
          <p className="sp-intro">AI, automation and digital products — choose a service to see how we work.</p>
        </section>

        {serviceGroups.map((g) => (
          <section className="sp-sec sp-group" key={g.title}>
            <div className="sp-gh"><span>{g.icon}</span><div><h2>{g.title}</h2><small>{g.tag}</small></div></div>
            <div className="sp-ov">
              {g.items.map((i) => {
                const c = serviceContent[slugOf(i.path)];
                return (
                  <Link to={i.path} className="sp-ovcard" key={i.path}>
                    <div className="sp-ovart"><StoryScene name={c.scene} /></div>
                    <div className="sp-ovbody"><h3>{i.short}</h3><p>{c.tagline}</p><span>Learn more →</span></div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <section className="sp-cta">
          <h2>Not sure what you <em>need?</em></h2>
          <p>Describe your goal and we'll recommend the right approach.</p>
          <Link to="/contact" className="sp-btn sp-solid">Talk to Us ↗</Link>
        </section>
      </main>
    </Shell>
  );
}
