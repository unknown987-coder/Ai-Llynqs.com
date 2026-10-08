import React, { useEffect, useRef, useState } from "react";
import { LogoMark } from "./Logo";
import "./ChatWidget.css";

/* Backend URL: set VITE_CHAT_API in .env (see .env.example) */
const API =
  ((import.meta as any).env?.VITE_CHAT_API as string | undefined) ??
  ((import.meta as any).env?.DEV ? "http://localhost:8000" : "");

const GREETING =
  "Assalam-o-Alaikum! I'm the aiLLynqs assistant. Ask me about our services, pricing or a project quote. English ya Roman Urdu, dono chalta hai.";
const CHIPS: [string, string][] = [
  ["Pricing", "What are your prices?"],
  ["Web development", "I need a website"],
  ["Chatbots & AI", "I want an AI chatbot for my business"],
  ["Get a quote", "I want a quote for my project"],
];
const FALLBACK =
  "I could not reach the server. Please try again in a moment, or contact us on WhatsApp +92 317 3132667 (Pakistan) or +44 7587 788327 (UK), or email aillynqs@gmail.com.";

type Msg = { role: "user" | "assistant"; content: string };
const KEY = "aillynqs_chat_v1";
const LINK_RE = /(https?:\/\/[^\s]+)|([\w.+-]+@[\w-]+\.[\w.-]+)|(\+\d[\d\s-]{8,}\d)/g;

function load(): { sid: string; msgs: Msg[] } {
  try {
    const s = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (s?.sid && Array.isArray(s.msgs)) return s;
  } catch {
    /* ignore */
  }
  const a = crypto.getRandomValues(new Uint8Array(12));
  return { sid: "s" + Array.from(a, (b) => b.toString(16).padStart(2, "0")).join(""), msgs: [] };
}

function renderText(text: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(LINK_RE.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const raw = m[0].replace(/[.,;:!?)]+$/, "");
    const href = m[1] ? raw : m[2] ? "mailto:" + raw : "https://wa.me/" + raw.replace(/\D/g, "");
    out.push(
      <a key={m.index} href={href} target="_blank" rel="noopener noreferrer">
        {raw}
      </a>
    );
    last = m.index + raw.length;
    re.lastIndex = last;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [state, setState] = useState(load);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [state.msgs, busy, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  // friendly teaser once per session
  useEffect(() => {
    if (sessionStorage.getItem("aillynqs_teaser")) return;
    const t = setTimeout(() => {
      setTeaser(true);
      sessionStorage.setItem("aillynqs_teaser", "1");
    }, 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  const send = async (raw: string) => {
    const msg = raw.trim();
    if (!msg || busy) return;
    const history = state.msgs.slice(-12);
    setState((s) => ({ ...s, msgs: [...s.msgs, { role: "user", content: msg }] }));
    setText("");
    setBusy(true);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 30000);
    let reply = FALLBACK;
    try {
      const r = await fetch(API.replace(/\/+$/, "") + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, session_id: state.sid, history }),
        signal: ctrl.signal,
      });
      const d = await r.json().catch(() => null);
      if (d && typeof d.reply === "string" && d.reply) reply = d.reply;
    } catch {
      /* fallback */
    }
    clearTimeout(timer);
    setState((s) => ({ ...s, msgs: [...s.msgs, { role: "assistant", content: reply }] }));
    setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 30);
  };

  const toggle = () => {
    setOpen((o) => !o);
    setTeaser(false);
  };

  const started = state.msgs.some((m) => m.role === "user");

  return (
    <div className={`cw ${open ? "cw-open" : ""}`}>
      {/* PANEL */}
      <section className="cw-panel" role="dialog" aria-label="Chat with aiLLynqs" aria-hidden={!open}>
        <header className="cw-head">
          <span className="cw-avatar">
            <LogoMark size={30} />
          </span>
          <div className="cw-title">
            <b>
              <i>ai</i>LLynqs
            </b>
            <span>AI Assistant · Replies in seconds</span>
          </div>
          <button className="cw-x" onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="cw-log" ref={logRef} role="log" aria-live="polite">
          {[{ role: "assistant", content: GREETING } as Msg, ...state.msgs].map((m, i) => (
            <div key={i} className={`cw-row ${m.role === "user" ? "user" : "bot"}`}>
              {m.role === "assistant" && (
                <span className="cw-mini">
                  <LogoMark size={20} />
                </span>
              )}
              <div className="cw-msg">{renderText(m.content)}</div>
            </div>
          ))}
          {busy && (
            <div className="cw-row bot">
              <span className="cw-mini">
                <LogoMark size={20} />
              </span>
              <div className="cw-msg cw-typing" aria-label="Assistant is typing">
                <i /> <i /> <i />
              </div>
            </div>
          )}
        </div>

        {!started && (
          <div className="cw-chips">
            {CHIPS.map(([label, q]) => (
              <button key={label} onClick={() => send(q)}>
                {label}
              </button>
            ))}
          </div>
        )}

        <form
          className="cw-form"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            send(text);
          }}
        >
          <input
            ref={inputRef}
            value={text}
            maxLength={500}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question…"
            aria-label="Your message"
          />
          <button type="submit" disabled={busy || !text.trim()} aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.4 20.4 20.8 12.4a.5.5 0 0 0 0-.9L3.4 3.6a.5.5 0 0 0-.7.6L5 11l9 1-9 1-2.3 6.8a.5.5 0 0 0 .7.6z" />
            </svg>
          </button>
        </form>
        <div className="cw-note">AI assistant · Final quotes are confirmed by our team.</div>
      </section>

      {/* TEASER */}
      {teaser && !open && (
        <div className="cw-teaser" onClick={toggle}>
          <b>👋 Need help?</b>
          <span>Ask about services, pricing or a quote.</span>
          <button
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation();
              setTeaser(false);
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* LAUNCHER */}
      <button className="cw-launcher" onClick={toggle} aria-expanded={open} aria-label={open ? "Close chat" : "Chat with aiLLynqs"}>
        <span className="cw-launcher-mark">
          <LogoMark size={30} />
        </span>
        <span className="cw-launcher-text">
          Chat with <b><i>ai</i>LLynqs</b>
        </span>
      </button>
    </div>
  );
}
