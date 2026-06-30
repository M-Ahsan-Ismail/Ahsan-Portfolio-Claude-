import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Github, Linkedin, Globe, Settings } from 'lucide-react';
import { Reveal } from '../lib/motion.jsx';

export function Contact({ social, name, onOpenAdmin }) {
  const items = [
    { icon: Phone, label: social.phone, href: `tel:${(social.phone || '').replace(/\s/g, '')}` },
    { icon: Mail, label: social.email, href: `mailto:${social.email}` },
    { icon: Github, label: 'GitHub', href: social.github },
    { icon: Linkedin, label: 'LinkedIn', href: social.linkedin },
    { icon: Globe, label: 'Website', href: social.website },
  ].filter((i) => i.href);

  return (
    <section id="contact" className="relative z-10 px-6 py-24 sm:py-32 scroll-mt-24">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="eyebrow mb-4">Let's talk</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
            Have a build in mind?
          </h2>
          <p className="mt-5 text-haze max-w-xl mx-auto">
            Whether it's an Odoo implementation, a custom module, or a tool from scratch — I'm happy to help make it real.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {items.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass text-sm text-white/90 hover:border-gold/40 hover:text-gold transition-colors"
              >
                <Icon size={16} /> {label}
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href={`mailto:${social.email}`}
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-obsidian font-medium hover:scale-[1.03] active:scale-95 transition-transform"
            style={{ boxShadow: '0 10px 40px -10px rgba(233,185,73,0.6)' }}
          >
            Start a conversation
          </a>
        </Reveal>
      </div>

      {/* footer */}
      <footer className="mt-24 pt-8 border-t border-line max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-haze">
        <p>© {new Date().getFullYear()} {name}. Built with React.</p>
        <button
          onClick={onOpenAdmin}
          aria-label="Admin settings"
          className="inline-flex items-center gap-2 text-haze/60 hover:text-gold transition-colors"
        >
          <Settings size={15} /> <span className="text-xs">Admin</span>
        </button>
      </footer>
    </section>
  );
}
