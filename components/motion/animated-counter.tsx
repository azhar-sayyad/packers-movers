"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 1.2,
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(target);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    if (reduceMotion) return;

    let controls: ReturnType<typeof animate> | undefined;
    const timeout = setTimeout(() => {
      controls = animate(0, target, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => setValue(Math.round(latest)),
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      controls?.stop();
    };
  }, [inView, reduceMotion, target, duration, delay]);

  const formatted = new Intl.NumberFormat("en-IN").format(value);

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}