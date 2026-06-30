import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, animate, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const el = document.querySelector(id);
        if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -70 }); }
      }
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy(); };
  }, []);
}

export function Reveal({ children, y = 30, delay = 0, className = '', once = true }) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* word-by-word mask reveal for headings (ref-based, reliable) */
export function WordReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const words = text.split(' ');
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-mask inline-block align-bottom mr-[0.22em]">
          <motion.span className="inline-block"
            initial={{ y: '110%' }} animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function AnimatedCounter({ value = 0, suffix = '', className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  const [d, setD] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, value, { duration: 1.7, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setD(Math.floor(v)) });
    return c.stop;
  }, [inView, value, mv]);
  return <span ref={ref} className={className}>{d}{suffix}</span>;
}

/* magnetic hover button/wrapper */
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

/* rotating word cycle */
export function RotatingWord({ words = [], className = '', interval = 2200 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span className={`relative inline-grid ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span key={i}
          initial={{ y: '0.7em', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-0.7em', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="col-start-1 row-start-1">
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
