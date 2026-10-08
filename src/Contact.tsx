import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Socials from "./components/Social";
import { LOCATIONS, API_BASE } from "./data/site";
import { Link } from "./router";
import "./Contact.css";

/* =====================================================================
   SETTINGS — change these in one place
   ===================================================================== */
const WHATSAPP_NUMBER = "923173132667"; // international format, no + or spaces
const WHATSAPP_DISPLAY = "+92 317 3132667";
const EMAIL = "aillynqs@gmail.com";



const SERVICES = [
  "Website Chatbot & Custom AI",
  "AI RAG / Knowledge Systems",
  "AI Workflow Automation",
  "Machine Learning / Deep Learning",
  "Web Scraping & Data Extraction",
  "Custom Web Development",
  "WordPress & WooCommerce",
  "Shopify E-commerce",
  "SEO Services",
  "Something else",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const TIMELINES = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "Just exploring",
];

const FAQ = [
  {
    q: "How does the quote process work?",
    a: "Send us the form with your idea, budget range and timeline. We review it, ask any follow-up questions, and send back a clear proposal with scope, timeline and price — no obligation.",
  },
  {
    q: "Is the first consultation free?",
    a: "Yes. Tell us what you want to build or automate and we'll tell you honestly what's possible, what it takes and where AI actually makes sense for you.",
  },
  {
    q: "I don't have a clear idea yet. Can I still reach out?",
    a: "Absolutely. Many projects start with a rough problem — 'we waste hours on this task'. Describe it in your own words and we'll help shape it into a plan.",
  },
  {
    q: "Which budget should I choose?",
    a: "Pick the closest range, or 'Not sure yet'. It only helps us suggest the right approach — the final quote depends on the scope we agree on together.",
  },
];

type Form = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  timeline: string;
  message: string;
  website: string; // honeypot
};

const empty: Form = {
  name: "",
  email: "",
  phone: "",
  company: "",
  services: [],
  budget: "",
  timeline: "",
  message: "",
  website: "",
};

type Status = "idle" | "sending" | "sent" | "manual" | "error";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function Contact() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [ref, setRef] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Contact & Get a Quote | aiLLynqs";
    return () => {
      document.title = "aiLLynqs — AI Software House";
    };
  }, []);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string])
      setErrors((e) => {
        const n = { ...e };
        delete n[key as string];
        return n;
      });
  };

  const toggleService = (s: string) =>
    set(
      "services",
      form.services.includes(s)
        ? form.services.filter((x) => x !== s)
        : [...form.services, s]
    );

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!emailOk(form.email)) e.email = "Please enter a valid email.";
    if (form.services.length === 0) e.services = "Choose at least one service.";
    if (form.message.trim().length < 15)
      e.message = "Tell us a little more about your project.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = (id: string) =>
    [
      `New project request — aiLLynqs (Ref ${id})`,
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone / WhatsApp: ${form.phone}` : false,
      form.company ? `Company: ${form.company}` : false,
      "",
      `Services: ${form.services.join(", ")}`,
      form.budget ? `Budget: ${form.budget}` : false,
      form.timeline ? `Timeline: ${form.timeline}` : false,
      "",
      "Project details:",
      form.message,
    ]
      .filter((l): l is string => l !== false)
      .join("\n");

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      setAttempt((n) => n + 1); // effect below scrolls once the errors are rendered
      return;
    }

    const id = "AQ-" + Date.now().toString(36).toUpperCase().slice(-6);
    setRef(id);

    if (!API_BASE) {
      setStatus("manual"); // backend URL not configured: fall back to WhatsApp / Email buttons
      return;
    }

    setStatus("sending");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);
    try {
      const res = await fetch(`${API_BASE}/quote`, {
        signal: ctrl.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          services: form.services,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          website: form.website,
        }),
      });
      if (res.ok) {
        const d = await res.json().catch(() => null);
        if (d?.ref) setRef(d.ref);
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildMessage(ref)
  )}`;
  const mailLink = `mailto:${EMAIL}?subject=${encodeURIComponent(
    `Project request ${ref} — ${form.name}`
  )}&body=${encodeURIComponent(buildMessage(ref))}`;

  const reset = () => {
    setForm(empty);
    setErrors({});
    setStatus("idle");
  };

  // after a failed submit, jump to the first problem (runs after errors are on screen)
  useEffect(() => {
    if (attempt === 0) return;
    document
      .querySelector(".ct-field.has-error, .ct-group.has-error")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [attempt]);

  const done = status === "sent" || status === "manual" || status === "error";

  // bring the confirmation into view (the panel gets shorter after submit)
  useEffect(() => {
    if (done)
      document
        .querySelector(".ct-panel")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  return (
    <div className="ct">
      <div className="ct-bg">
        <span className="ct-orb ct-orb-a" />
        <span className="ct-orb ct-orb-b" />
        <span className="ct-grid" />
      </div>

      <Header />

      <main className="ct-main">
        {/* ---------------- HERO ---------------- */}
        <section className="ct-hero">
          <div className="ct-badge">
            <span className="ct-dot" />
            Available for new projects
          </div>

          <h1>
            Let's build something
            <br />
            <em>intelligent.</em>
          </h1>

          <p>
            Tell us what you want to build, automate or improve. Share a few
            details and we'll come back with a clear plan and a quote — free,
            with no obligation.
          </p>

          <div className="ct-trust">
            <span>✦ Free consultation</span>
            <span>✦ Clear, fixed quotes</span>
            <span>✦ Fast response</span>
          </div>
        </section>

        {/* ---------------- BODY ---------------- */}
        <section className="ct-body">
          {/* LEFT — info */}
          <aside className="ct-side">
            <a
              className="ct-card ct-card-feature"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="ct-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9 9.2c.3 2.4 2.4 4.5 5 5.4l1.2-1.2-1.8-1-.8.7a4 4 0 0 1-1.7-1.7l.7-.8-1-1.8L9 9.2Z" fill="currentColor" />
                </svg>
              </span>
              <div>
                <small>WhatsApp · fastest reply</small>
                <strong>{WHATSAPP_DISPLAY}</strong>
                <span className="ct-link">Chat with us now →</span>
              </div>
            </a>

            <a className="ct-card" href={`mailto:${EMAIL}`}>
              <span className="ct-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <small>Email</small>
                <strong>{EMAIL}</strong>
                <span className="ct-link">Write to us →</span>
              </div>
            </a>

            <div className="ct-card ct-card-static ct-offices">
              <div>
                <small>Our offices</small>
                {LOCATIONS.map((l) => (
                  <div className="ct-office" key={l.country}>
                    <span>{l.flag}</span>
                    <b>{l.country}</b>
                    {l.wa ? (
                      <a href={`https://wa.me/${l.wa}`} target="_blank" rel="noreferrer">{l.phone}</a>
                    ) : (
                      <em>{l.phone}</em>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="ct-card ct-card-static">
              <div style={{ width: "100%" }}>
                <small>Follow us</small>
                <Socials label />
              </div>
            </div>

            <div className="ct-steps">
              <span className="ct-kicker">What happens next</span>
              <ol>
                <li>
                  <b>01</b>
                  <div>
                    <strong>You send the request</strong>
                    <p>A few minutes to describe your project.</p>
                  </div>
                </li>
                <li>
                  <b>02</b>
                  <div>
                    <strong>We review &amp; reply</strong>
                    <p>We study your needs and follow up with questions.</p>
                  </div>
                </li>
                <li>
                  <b>03</b>
                  <div>
                    <strong>You get a clear quote</strong>
                    <p>Scope, timeline and price — then we start building.</p>
                  </div>
                </li>
              </ol>
            </div>
          </aside>

          {/* RIGHT — form */}
          <div className="ct-panel">
            {!done ? (
              <form onSubmit={submit} noValidate>
                <div className="ct-panel-head">
                  <div>
                    <span className="ct-kicker">Request a quote</span>
                    <h2>Tell us about your project</h2>
                  </div>
                  <span className="ct-secure">● Takes ~2 minutes</span>
                </div>

                <div className="ct-step-label"><b>1</b> About you</div>

                <div className="ct-row">
                  <div className={`ct-field ${errors.name ? "has-error" : ""}`}>
                    <label htmlFor="ct-name">Full name *</label>
                    <input id="ct-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" autoComplete="name" />
                    {errors.name && <em>{errors.name}</em>}
                  </div>
                  <div className={`ct-field ${errors.email ? "has-error" : ""}`}>
                    <label htmlFor="ct-email">Email *</label>
                    <input id="ct-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" autoComplete="email" />
                    {errors.email && <em>{errors.email}</em>}
                  </div>
                </div>

                <div className="ct-row">
                  <div className="ct-field">
                    <label htmlFor="ct-phone">Phone / WhatsApp</label>
                    <input id="ct-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+92 …" autoComplete="tel" />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-company">Company</label>
                    <input id="ct-company" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company or brand (optional)" autoComplete="organization" />
                  </div>
                </div>

                <div className="ct-step-label"><b>2</b> What do you need?</div>

                <div className={`ct-group ${errors.services ? "has-error" : ""}`}>
                  <span className="ct-group-title">Services * <small>(select one or more)</small></span>
                  <div className="ct-chips">
                    {SERVICES.map((s) => (
                      <button type="button" key={s} className={`ct-chip ${form.services.includes(s) ? "on" : ""}`} aria-pressed={form.services.includes(s)} onClick={() => toggleService(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.services && <em>{errors.services}</em>}
                </div>

                <div className="ct-group">
                  <span className="ct-group-title">Budget range</span>
                  <div className="ct-chips">
                    {BUDGETS.map((b) => (
                      <button type="button" key={b} className={`ct-chip ${form.budget === b ? "on" : ""}`} aria-pressed={form.budget === b} onClick={() => set("budget", form.budget === b ? "" : b)}>
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ct-group">
                  <span className="ct-group-title">Timeline</span>
                  <div className="ct-chips">
                    {TIMELINES.map((t) => (
                      <button type="button" key={t} className={`ct-chip ${form.timeline === t ? "on" : ""}`} aria-pressed={form.timeline === t} onClick={() => set("timeline", form.timeline === t ? "" : t)}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="ct-step-label"><b>3</b> Project details</div>

                <div className={`ct-field ${errors.message ? "has-error" : ""}`}>
                  <label htmlFor="ct-message">Describe your project *</label>
                  <textarea id="ct-message" rows={6} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="What do you want to build or automate? Any links, goals or features that matter to you…" />
                  {errors.message && <em>{errors.message}</em>}
                </div>

                {Object.keys(errors).length > 0 && (
                  <div className="ct-alert" role="alert">
                    <b>Please complete the required fields:</b>
                    <ul>
                      {Object.values(errors).map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="ct-submit-row">
                  <button type="submit" className="ct-submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send quote request"}
                    <span>↗</span>
                  </button>
                  <p>
                    Your details are used only to reply to your request. We
                    never share them.
                  </p>
                </div>
              </form>
            ) : (
              <div className="ct-done">
                <div className="ct-done-icon">{status === "error" ? "!" : "✓"}</div>

                {status === "sent" && (
                  <>
                    <span className="ct-kicker">Request received · {ref}</span>
                    <h2>Thank you, {form.name.split(" ")[0] || "friend"}.</h2>
                    <p>
                      Your quote request is in. We'll review the details and get
                      back to you at <b>{form.email}</b> shortly.
                    </p>
                  </>
                )}

                {status === "manual" && (
                  <>
                    <span className="ct-kicker">Almost done · {ref}</span>
                    <h2>One tap to send it to us.</h2>
                    <p>
                      Your request is ready. Choose how you'd like to send it
                      — all your details are already filled in.
                    </p>
                  </>
                )}

                {status === "error" && (
                  <>
                    <span className="ct-kicker">Couldn't send automatically</span>
                    <h2>Please send it directly.</h2>
                    <p>
                      Something went wrong on the way. Use one of the buttons
                      below — your details are already filled in.
                    </p>
                  </>
                )}

                {(status === "manual" || status === "error") && (
                  <div className="ct-done-actions">
                    <a className="ct-btn ct-btn-solid" href={waLink} target="_blank" rel="noreferrer">
                      Send on WhatsApp ↗
                    </a>
                    <a className="ct-btn ct-btn-ghost" href={mailLink}>
                      Send by Email ↗
                    </a>
                  </div>
                )}

                {status === "sent" && (
                  <div className="ct-done-actions">
                    <a className="ct-btn ct-btn-solid" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">
                      Chat on WhatsApp ↗
                    </a>
                    <Link className="ct-btn ct-btn-ghost" to="/">
                      Back to Home
                    </Link>
                  </div>
                )}

                <button className="ct-again" onClick={reset}>
                  ← Edit / send another request
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="ct-faq">
          <div className="ct-faq-head">
            <span className="ct-kicker">Good to know</span>
            <h2>
              Questions, <em>answered.</em>
            </h2>
          </div>

          <div className="ct-faq-list">
            {FAQ.map((f, i) => (
              <div key={f.q} className={`ct-faq-item ${open === i ? "open" : ""}`}>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                  <span>{f.q}</span>
                  <b>{open === i ? "−" : "+"}</b>
                </button>
                <div className="ct-faq-body">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
