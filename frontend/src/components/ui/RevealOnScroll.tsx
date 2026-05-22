'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export function RevealOnScroll({ children, className, delay = 0, id }: RevealOnScrollProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.2, 1, 0.3, 1], delay }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
}
