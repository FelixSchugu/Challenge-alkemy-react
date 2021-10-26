import { useState, useLayoutEffect } from "react";

export function useWindowAndComponentSize(elemId: string) {
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });
  const [windowSize, setWindowSIze] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    function updateSize() {
      const height = document.querySelector(elemId)?.clientHeight || 0;
      const width = document.querySelector(elemId)?.clientWidth || 0;

      setComponentSize({ width, height });
      setWindowSIze({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);

    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [elemId]);
  return { componentSize, windowSize };
}
