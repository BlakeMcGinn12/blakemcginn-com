"use client";

import { motion, type Variants } from "framer-motion";
import React, { type ReactNode } from "react";

export type PresetType = 
  | "fade" 
  | "slide" 
  | "slide-left" 
  | "slide-right"
  | "scale" 
  | "blur" 
  | "blur-slide";

export interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
  asChild?: React.ElementType;
  staggerDelay?: number;
  once?: boolean;
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
    }
  },
};

// Presets matching your site's current animation style
const presetVariants: Record<PresetType, Variants> = {
  // Subtle fade - good for text blocks
  fade: {},
  
  // Slide up from below - your most common pattern
  slide: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
      }
    },
  },
  
  // Slide from left - for alternating layouts
  "slide-left": {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
      }
    },
  },
  
  // Slide from right - for alternating layouts
  "slide-right": {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
      }
    },
  },
  
  // Scale up - good for cards, buttons
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
      }
    },
  },
  
  // Blur in - modern, polished feel
  blur: {
    hidden: { opacity: 0, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
      }
    },
  },
  
  // Blur + slide - premium effect
  "blur-slide": {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
      }
    },
  },
};

export function AnimatedGroup({ 
  children, 
  className, 
  variants, 
  preset = "slide",
  as = "div", 
  asChild = "div",
  staggerDelay = 0.1,
  once = true,
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: preset ? presetVariants[preset] : defaultItemVariants,
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    },
  };

  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  const MotionComponent = motion(as);
  const MotionChild = motion(asChild);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild
          key={index}
          variants={itemVariants}
        >
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

// Convenience wrapper for single element animations
export interface AnimatedProps {
  children: ReactNode;
  className?: string;
  preset?: PresetType;
  delay?: number;
  once?: boolean;
  as?: React.ElementType;
}

export function Animated({
  children,
  className,
  preset = "slide",
  delay = 0,
  once = true,
  as = "div",
}: AnimatedProps) {
  const variants = presetVariants[preset];
  const MotionComponent = motion(as);

  return (
    <MotionComponent
      initial={variants.hidden}
      whileInView={{
        ...variants.visible,
        transition: {
          ...(variants.visible as { transition?: object }).transition,
          delay,
        },
      }}
      viewport={{ once }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export default AnimatedGroup;
