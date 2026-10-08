import React, {
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
} from "react";

/** Normalise a path: no trailing slash (except root). */
export const normalise = (p: string) => p.replace(/\/+$/, "") || "/";

export function navigate(to: string) {
  if (normalise(window.location.pathname) === normalise(to)) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.history.pushState({}, "", to);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export function usePath() {
  const [path, setPath] = useState(normalise(window.location.pathname));

  useEffect(() => {
    const sync = () => setPath(normalise(window.location.pathname));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return path;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

/** Client-side link: no full page reload, no extra dependency. */
export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank"
    )
      return;
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
