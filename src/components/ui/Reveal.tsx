"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export default function Reveal({ children, delay = 0, direction = "up", className = "" }: RevealProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 44 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.95, delay, ease: [0.25, 1, 0.5, 1] }} variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
