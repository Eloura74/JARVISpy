import { useEffect, useRef, useState } from "react";

export function useSmoothedAudioLevel(value: number, smoothing = 0.12) {
  const [smoothed, setSmoothed] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    targetRef.current = Math.max(0, Math.min(1, value || 0));
  }, [value]);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      currentRef.current +=
        (targetRef.current - currentRef.current) * smoothing;
      setSmoothed(currentRef.current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [smoothing]);

  return smoothed;
}
