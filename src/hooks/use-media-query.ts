import { useEffect, useState } from "react";

/**
 * Simple, SSR-safe media query hook.
 * Returns true when the given media query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.matchMedia(query).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    let mounted = true;
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia(query);
    } catch {
      return;
    }

    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (!mounted) return;
      setMatches((e as any).matches ?? !!mq.matches);
    };

    // Set initial state
    setMatches(mq.matches);

    // Prefer modern API but fallback to `addListener` for older browsers
    if (mq.addEventListener) mq.addEventListener("change", onChange as any);
    else mq.addListener(onChange as any);

    return () => {
      mounted = false;
      if (mq.removeEventListener) mq.removeEventListener("change", onChange as any);
      else mq.removeListener(onChange as any);
    };
  }, [query]);

  return matches;
}
