import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ name = 'Ahsan Ismail' }) {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      {/* Desktop floating pill */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      >
        <div className={`relative flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-500 ${scrolled ? 'glass-strong' : 'glass'}`}>
          {/* gold glow edge */}
          <div className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: '0 0 0 1px rgba(233,185,73,0.25), 0 8px 40px -12px rgba(233,185,73,0.4)' }} />
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative px-4 py-1.5 text-sm rounded-full transition-colors"
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(120deg, rgba(233,185,73,0.22), rgba(200,161,74,0.12))', border: '1px solid rgba(233,185,73,0.35)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${active === l.id ? 'text-goldsoft font-medium' : 'text-haze hover:text-white'}`}>
                {l.label}
              </span>
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile top bar */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="fixed top-3 inset-x-3 z-50 md:hidden"
      >
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 ${scrolled || open ? 'glass-strong' : 'glass'}`}>
          <a href="#home" className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 text-gold font-display font-semibold text-sm">{initials}</span>
            <span className="text-sm text-white/90 font-medium">{name}</span>
          </a>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-white"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="mt-2 glass-strong rounded-2xl p-2 overflow-hidden"
            >
              {LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm transition-colors ${active === l.id ? 'bg-gold/15 text-goldsoft' : 'text-haze hover:bg-white/5 hover:text-white'}`}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
