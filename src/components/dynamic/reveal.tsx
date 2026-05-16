"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.215, 0.61, 0.355, 1] as const;
const VIEWPORT = { once: true, margin: "-100px" } as const;
const DURATION = 0.6;

type CommonProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
};

export function Reveal({
  children,
  className,
  y = 20,
  delay = 0,
}: CommonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 20,
  index = 0,
  stagger = 0.1,
  baseDelay = 0,
}: CommonProps & { index?: number; stagger?: number; baseDelay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: DURATION,
        ease: EASE,
        delay: baseDelay + index * stagger,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
