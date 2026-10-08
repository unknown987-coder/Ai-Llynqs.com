import React from "react";

/* Dummy story illustrations (inline SVG, brand colours). Replace with real images later. */

const Defs = () => (
  <defs>
    <linearGradient id="sg" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stopColor="#4fc3ff" />
      <stop offset=".55" stopColor="#7b5cff" />
      <stop offset="1" stopColor="#d3a6ff" />
    </linearGradient>
  </defs>
);

const soft = "rgba(255,255,255,0.08)";
const line = "rgba(255,255,255,0.22)";

const scenes: Record<string, React.ReactNode> = {
  chatbot: (
    <>
      <circle cx="282" cy="32" r="13" fill="#d9d2ff" opacity=".9" />
      <circle cx="288" cy="28" r="12" fill="#10111f" />
      <text x="214" y="36" fill="#8d8fa6">2:00 AM</text>
      <rect x="28" y="52" width="150" height="38" rx="14" fill={soft} />
      <text x="42" y="75" fill="#d6d7e6">Are you open now?</text>
      <rect x="120" y="104" width="172" height="38" rx="14" fill="url(#sg)" />
      <text x="134" y="127" fill="#07080f">Yes — booked for 9 AM ✓</text>
      <g fill="#8d78ff" className="dots">
        <circle cx="40" cy="168" r="3" /><circle cx="52" cy="168" r="3" /><circle cx="64" cy="168" r="3" />
      </g>
    </>
  ),
  automation: (
    <>
      {[40, 80, 120].map((y) => (
        <g key={y}>
          <rect x="22" y={y} width="62" height="26" rx="8" fill={soft} stroke={line} />
          <path d={`M84 ${y + 13} Q120 ${y + 13} 134 100`} className="flow" stroke="#8d78ff" fill="none" />
        </g>
      ))}
      <circle cx="160" cy="100" r="28" fill="url(#sg)" />
      <text x="160" y="105" textAnchor="middle" fill="#07080f" fontSize="14">AI</text>
      <path d="M188 100 H232" className="flow" stroke="#6fd0ff" fill="none" />
      <rect x="232" y="72" width="68" height="56" rx="12" fill={soft} stroke="#53ffad" />
      <text x="266" y="107" textAnchor="middle" fill="#53ffad" fontSize="22">✓</text>
    </>
  ),
  scraping: (
    <>
      {[26, 68, 110].map((y) => (
        <g key={y}>
          <rect x="22" y={y} width="50" height="34" rx="6" fill={soft} stroke={line} />
          <path d={`M30 ${y + 12} h34 M30 ${y + 21} h22`} stroke={line} />
        </g>
      ))}
      <path d="M84 100 H118" className="flow" stroke="#8d78ff" fill="none" />
      <path d="M122 70 H190 L168 112 H144 Z" fill="url(#sg)" opacity=".9" />
      <path d="M190 100 H214" className="flow" stroke="#6fd0ff" fill="none" />
      <rect x="214" y="44" width="92" height="112" rx="10" fill={soft} stroke={line} />
      {[60, 80, 100, 120, 140].map((y, i) => (
        <rect key={y} x="224" y={y - 6} width={30 + ((i * 17) % 40)} height="7" rx="3" fill="url(#sg)" opacity=".85" />
      ))}
    </>
  ),
  web: (
    <>
      <rect x="44" y="26" width="232" height="148" rx="12" fill="#0d0e1c" stroke={line} />
      <path d="M44 48 H276" stroke={line} />
      {[58, 72, 86].map((x) => <circle key={x} cx={x} cy="37" r="3.5" fill="#8d8fa6" />)}
      <rect x="58" y="60" width="130" height="46" rx="8" fill="url(#sg)" />
      <rect x="198" y="60" width="64" height="46" rx="8" fill={soft} />
      {[58, 124, 190].map((x) => <rect key={x} x={x} y="118" width="58" height="42" rx="8" fill={soft} stroke={line} />)}
    </>
  ),
  shop: (
    <>
      <path d="M134 78 v-12 a26 26 0 0 1 52 0 v12" stroke="#d3a6ff" strokeWidth="4" fill="none" />
      <rect x="108" y="78" width="104" height="92" rx="16" fill="url(#sg)" />
      <rect x="22" y="40" width="74" height="26" rx="13" fill={soft} stroke="#53ffad" />
      <text x="59" y="57" textAnchor="middle" fill="#53ffad">+1 order</text>
      <rect x="228" y="64" width="70" height="26" rx="13" fill={soft} stroke="#6fd0ff" />
      <text x="263" y="81" textAnchor="middle" fill="#6fd0ff">$129</text>
      <rect x="236" y="120" width="62" height="26" rx="13" fill={soft} stroke="#d3a6ff" />
      <text x="267" y="137" textAnchor="middle" fill="#d3a6ff">+3 orders</text>
    </>
  ),
  rag: (
    <>
      {[34, 70, 106].map((y) => (
        <g key={y}>
          <rect x="22" y={y} width="58" height="28" rx="6" fill={soft} stroke={line} />
          <path d={`M30 ${y + 10} h40 M30 ${y + 19} h26`} stroke={line} />
          <path d={`M80 ${y + 14} Q112 ${y + 14} 130 98`} className="flow" stroke="#8d78ff" fill="none" />
        </g>
      ))}
      <circle cx="152" cy="100" r="26" fill="url(#sg)" />
      <text x="152" y="105" textAnchor="middle" fill="#07080f" fontSize="13">LLM</text>
      <path d="M178 100 H206" className="flow" stroke="#6fd0ff" fill="none" />
      <rect x="206" y="62" width="96" height="76" rx="14" fill={soft} stroke="#53ffad" />
      <text x="254" y="95" textAnchor="middle" fill="#d6d7e6">Answer from</text>
      <text x="254" y="112" textAnchor="middle" fill="#53ffad">your documents ✓</text>
    </>
  ),
  ml: (
    <>
      {[[40, 50], [40, 100], [40, 150], [130, 70], [130, 130], [220, 100]].map(([x, y], i) => (
        <g key={i}>
          {i < 3 && [[130, 70], [130, 130]].map(([x2, y2]) => <path key={x2 + y2} d={`M${x} ${y} L${x2} ${y2}`} stroke={line} />)}
          {i >= 3 && i < 5 && <path d={`M${x} ${y} L220 100`} stroke={line} />}
        </g>
      ))}
      {[[40, 50], [40, 100], [40, 150], [130, 70], [130, 130]].map(([x, y]) => <circle key={x + "" + y} cx={x} cy={y} r="11" fill={soft} stroke="#8d78ff" />)}
      <circle cx="220" cy="100" r="16" fill="url(#sg)" />
      <path d="M248 100 H276" className="flow" stroke="#6fd0ff" fill="none" />
      <text x="292" y="104" textAnchor="middle" fill="#53ffad" fontSize="13">98%</text>
    </>
  ),
  seo: (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={36 + i * 46} y={160 - (i + 1) * 22} width="30" height={(i + 1) * 22} rx="6" fill={i === 4 ? "url(#sg)" : soft} stroke={i === 4 ? "none" : line} />
      ))}
      <path d="M48 118 L94 100 L140 92 L186 64 L246 36" stroke="#6fd0ff" strokeWidth="2.5" fill="none" className="flow" />
      <circle cx="262" cy="34" r="20" fill="url(#sg)" />
      <text x="262" y="39" textAnchor="middle" fill="#07080f" fontSize="14">#1</text>
    </>
  ),
};

export default function StoryScene({ name }: { name: keyof typeof scenes | string }) {
  return (
    <svg className="scene" viewBox="0 0 320 200" role="img" aria-hidden="true">
      <Defs />
      {scenes[name]}
    </svg>
  );
}
