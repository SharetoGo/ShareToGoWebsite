"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  delay?: number;
  format?: (v: number) => string;
}

export function AnimatedNumber({ 
  value, 
  duration = 0.8,
  delay = 0.1,
  format = (v) => String(Math.round(v)).padStart(2, "0") 
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  
  // Use the format prop to allow customization (e.g., adding decimals or %)
  const displayValue = useTransform(motionVal, format);

  useEffect(() => {
    if (!inView) return;
    
    const controls = animate(motionVal, value, {
      duration,
      ease: EASE_OUT,
      delay,
    });
    
    return controls.stop;
  }, [inView, motionVal, value, duration, delay]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}