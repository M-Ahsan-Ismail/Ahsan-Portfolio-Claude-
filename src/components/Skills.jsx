import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../lib/motion.jsx';
import { SectionHeading } from './SectionHeading.jsx';
import { getIcon } from '../lib/icons.jsx';

export function Skills({ skills = [] }) {
  return (
    <section id="skills" className="relative z-10 px-6 py-28 sm:py-36 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeading eyebrow="What I build with" title="Skills" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {skills.map((sk, i) => {
          const Icon = getIcon(sk.icon);
          return (
            <Reveal key={sk.id} delay={(i % 4) * 0.05}>
              <motion.div whileHover={{ y: -5 }} className="group relative flex items-center gap-3 rounded-2xl border border-line p-5 overflow-hidden hover:border-gold/40 transition-colors">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'radial-gradient(120% 100% at 0% 0%, rgba(255,90,31,0.10), transparent 60%)' }} />
                <span className="relative grid place-items-center w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 text-haze group-hover:text-gold transition-colors"><Icon size={24} /></span>
                <span className="relative text-sm font-medium text-bone">{sk.name}</span>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
