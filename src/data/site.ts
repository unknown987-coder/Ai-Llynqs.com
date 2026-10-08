// Company contact details — edit here, used by Footer + Contact page.
export const EMAIL = "aillynqs@gmail.com";

export const LOCATIONS = [
  { country: "Pakistan", flag: "🇵🇰", phone: "+92 317 3132667", wa: "923173132667" },
  { country: "United Kingdom", flag: "🇬🇧", phone: "+44 7587 788327", wa: "447587788327" },
  // TODO: put the real Uganda number here (and its wa digits, e.g. "256700000000")
  { country: "Uganda", flag: "🇺🇬", phone: "+256 000 000 000", wa: "" },
];

/** Chatbot + quote backend (set VITE_CHAT_API in .env). */
export const API_BASE: string = (
  ((import.meta as any).env?.VITE_CHAT_API as string | undefined) ??
  ((import.meta as any).env?.DEV ? "http://localhost:8000" : "")
).replace(/\/+$/, "");

export const SOCIALS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ai-llynqs-softwarehouse0786/" },
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61594989891973" },
  { name: "Instagram", url: "https://www.instagram.com/ai_llynqs/" },
];
