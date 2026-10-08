import React, { useId } from "react";
import "./Logo.css";

type LogoProps = {
  /** Height of the symbol in px */
  size?: number;
  /** Show the aiLLynqs wordmark next to the symbol */
  wordmark?: boolean;
  /** Show the small tagline under the wordmark */
  tagline?: boolean;
};

/** The aiLLynqs symbol: an "A" built from linked strokes, with an orbiting node. */
export function LogoMark({ size = 44 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  const g = `lg-grad-${id}`;
  const glow = `lg-glow-${id}`;

  return (
    <svg
      className="lg-mark"
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={g} x1="8" y1="50" x2="48" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4fc3ff" />
          <stop offset="0.55" stopColor="#7b5cff" />
          <stop offset="1" stopColor="#d3a6ff" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#8d78ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* open orbit ring */}
      <circle
        className="lg-ring"
        cx="28"
        cy="28"
        r="25"
        stroke={`url(#${g})`}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeDasharray="112 45"
        transform="rotate(-62 28 28)"
        opacity="0.9"
      />

      {/* the A */}
      <path
        d="M16.5 40.5 L28 14.5 L39.5 40.5"
        stroke={`url(#${g})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* link bar */}
      <path
        d="M22.2 33 H33.8"
        stroke={`url(#${g})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* apex node */}
      <circle cx="28" cy="14.5" r="6.5" fill={`url(#${glow})`} opacity="0.55" />
      <circle cx="28" cy="14.5" r="2.4" fill="#fff" />

      {/* orbiting node on the ring */}
      <circle className="lg-node" cx="46.7" cy="10.8" r="2.1" fill="#c9a8ff" />
    </svg>
  );
}

export default function Logo({
  size = 44,
  wordmark = true,
  tagline = true,
}: LogoProps) {
  return (
    <span className="lg">
      <LogoMark size={size} />

      {wordmark && (
        <span className="lg-text">
          <span className="lg-word">
            <i>ai</i>LLynqs
          </span>
          {tagline && <span className="lg-tag">AI Software House</span>}
        </span>
      )}
    </span>
  );
}
