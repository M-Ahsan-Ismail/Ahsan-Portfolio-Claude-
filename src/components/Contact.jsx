import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Github, Linkedin, Globe, Settings, ArrowUpRight } from 'lucide-react';
import { Reveal, WordReveal, Magnetic } from '../lib/motion.jsx';

export function Contact({ social, name, onOpenAdmin }) {
  const items = [
    { icon: Phone, label: social.phone, href: `tel:${(social.phone || '').replace(/\s/g, '')}` },
    { icon: Mail, label: social.email, href: `mailto:${social.email}` },
    { icon: Github, label: 'GitHub', href: social.github },
    { icon: Linkedin, label: 'LinkedIn', href: social.linkedin },
    { icon: Globe, label: 'Website', href: social.website },
  ].filter((i) => i.href);

  return (
    <section id="contact" className="relative z-10 px-6 pt-28 sm:pt-36 pb-12 scroll-mt-24 overflow-hidden">
      <div className="absolute -z-10 left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[400px]" style={{ background: 'radial-gradient(circle at 50% 100%, rgba(255,90,31,0.18), transparent 65%)' }} />
      <div className="max-w-5xl mx-auto">
        <Reveal><p className="eyebrow mb-6">Let's talk</p></Reveal>
        <h2 className="display text-5xl sm:text-7xl md:text-8xl font-semibold tracking-[-0.03em] leading-[0.92] text-bone">
          <WordReveal text="Have a build" /><br /><span className="text-ember-grad"><WordReveal text="in mind?" delay={0.15} /></span>
        </h2>
        <Reveal delay={0.15}>
          <p className="mt-7 max-w-xl text-haze text-lg">Odoo implementation, a custom module, or a tool from scratch — let's make it real.</p>
        </Reveal>
        <Reveal delay={0.25}>
          <Magnetic className="inline-block mt-10">
            <a href={`mailto:${social.email}`} className="group inline-flex items-center gap-3 pl-8 pr-6 py-5 rounded-full bg-gold text-obsidian font-medium text-lg" style={{ boxShadow: '0 16px 50px -12px rgba(255,90,31,0.7)' }}>
              Start a conversation
              <span className="grid place-items-center w-8 h-8 rounded-full bg-obsidian/15 group-hover:rotate-45 transition-transform"><ArrowUpRight size={18} /></span>
            </a>
          </Magnetic>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {items.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-haze hover:text-gold transition-colors"><Icon size={15} /> {label}</a>
            ))}
          </div>
        </Reveal>
      </div>

      <footer className="mt-24 pt-7 border-t border-line max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-haze">
        <p>© {new Date().getFullYear()} {name}. Designed & built from scratch.</p>
        <button onClick={onOpenAdmin} aria-label="Admin" className="inline-flex items-center gap-2 text-haze/50 hover:text-gold transition-colors">
          <Settings size={15} /> <span className="text-xs">Admin</span>
        </button>
      </footer>
    </section>
  );
}
