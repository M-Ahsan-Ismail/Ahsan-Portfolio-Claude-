import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ name = 'Ahsan Ismail' }) {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    LINKS.forEach((l) => { const el = document.getElementById(l.id); if (el) obs.observe(el); });
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener('scroll', onScroll);
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <>
      {/* Desktop */}
      <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 hidden md:flex items-center justify-between px-8 py-5 transition-colors duration-500 ${scrolled ? 'glass-strong' : ''}`}>
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 text-gold display font-bold text-sm group-hover:scale-105 transition-transform">{initials}</span>
          <span className="text-sm text-bone font-medium tracking-tight">{name}</span>
        </a>
        <nav className="flex items-center gap-1">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="relative px-3.5 py-2 text-sm rounded-full transition-colors">
              {active === l.id && <motion.span layoutId="nav-dot" className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className={`relative z-10 ${active === l.id ? 'text-gold' : 'text-haze hover:text-bone'}`}>{l.label}</span>
            </a>
          ))}
        </nav>
        <a href="#contact" className="text-sm px-5 py-2.5 rounded-full bg-bone text-obsidian font-medium hover:bg-white transition-colors">Let's talk</a>
      </motion.header>

      {/* Mobile */}
      <motion.nav initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
        className="fixed top-3 inset-x-3 z-50 md:hidden">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 ${scrolled || open ? 'glass-strong' : 'glass'}`}>
          <a href="#home" className="flex items-center gap-2">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 text-gold display font-bold text-xs">{initials}</span>
            <span className="text-sm text-bone font-medium">{name}</span>
          </a>
          <button aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((v) => !v)} className="grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-bone">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
              className="mt-2 glass-strong rounded-2xl p-2">
              {LINKS.map((l) => (
                <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm ${active === l.id ? 'bg-gold/15 text-gold' : 'text-haze hover:bg-white/5 hover:text-bone'}`}>{l.label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
