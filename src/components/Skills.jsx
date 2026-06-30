import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../lib/motion.jsx';
import { SectionHeading } from './SectionHeading.jsx';
import { getIcon } from '../lib/icons.jsx';

export function Skills({ skills = [] }) {
  return (
    <section id="skills" className="relative z-10 px-6 py-24 sm:py-32 max-w-5xl mx-auto scroll-mt-24">
      <SectionHeading eyebrow="Toolbox" title="Skills" subtitle="The stack I reach for to build and ship." />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {skills.map((sk, i) => {
          const Icon = getIcon(sk.icon);
          return (
            <Reveal key={sk.id} delay={(i % 4) * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group flex items-center gap-3 glass rounded-xl px-4 py-4 transition-colors hover:border-gold/30"
              >
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-white/[0.03] border border-white/5 text-gold2 group-hover:text-gold transition-colors">
                  <Icon size={22} />
                </span>
                <span className="text-sm font-medium text-white/90">{sk.name}</span>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
