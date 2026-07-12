"use client";

import { useState, useEffect, RefObject } from "react";

export function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const check = () => {
      if (isIntersecting) return;
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) {
          setIntersecting(true);
        }
      }
    };
    
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [isIntersecting, ref]);

  return isIntersecting;
}
