import React from "react";
import { SOCIALS } from "../data/site";
import "./Social.css";

const icons: Record<string, React.ReactNode> = {
  LinkedIn: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <path d="M8 10.5v6M8 7.7v.1M11.6 16.5v-6m0 2.6c0-1.6 1.1-2.6 2.5-2.6s2.4 1 2.4 2.6v3.4" />
    </>
  ),
  Facebook: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M13.4 20.4v-6.6h2.2l.4-2.5h-2.6V9.8c0-.8.3-1.3 1.4-1.3h1.3V6.3c-.3 0-1-.1-1.9-.1-2 0-3.2 1.2-3.2 3.2v1.9H8.8v2.5h2.2v6.6" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M17.2 6.9v.1" />
    </>
  ),
};

export default function Socials({ label = false }: { label?: boolean }) {
  return (
    <div className="soc">
      {SOCIALS.map((s) => (
        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`aiLLynqs on ${s.name}`} title={s.name}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {icons[s.name]}
          </svg>
          {label && <span>{s.name}</span>}
        </a>
      ))}
    </div>
  );
}
