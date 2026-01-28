"use client";

import dynamic from "next/dynamic";
import { ComponentProps } from "react";

// Lazy load framer-motion pour réduire le bundle initial
const LazyMotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { 
    ssr: false,
    loading: () => <div className="opacity-0" />
  }
);

const LazyMotionH1 = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.h1),
  { 
    ssr: false,
    loading: () => <h1 className="opacity-0" />
  }
);

const LazyMotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  { 
    ssr: false,
    loading: () => <p className="opacity-0" />
  }
);

// Types pour les props motion
type MotionDivProps = ComponentProps<typeof LazyMotionDiv>;
type MotionH1Props = ComponentProps<typeof LazyMotionH1>;
type MotionPProps = ComponentProps<typeof LazyMotionP>;

export { LazyMotionDiv, LazyMotionH1, LazyMotionP };
export type { MotionDivProps, MotionH1Props, MotionPProps };
