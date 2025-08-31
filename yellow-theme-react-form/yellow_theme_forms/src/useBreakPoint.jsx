import { useEffect, useState } from "react";

const breakpoints = {
  sm : 640,
  md : 768,
  lg : 1024,
  xl : 1280,
  "2xl": 1536,
};

export function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (width < breakpoints.sm) return "mobile";
  else if (width < breakpoints.lg) return "tablet";
  else return "desktop"
}