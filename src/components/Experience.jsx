import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../lib/motion.jsx';
import { SectionHeading } from './SectionHeading.jsx';

export function Experience({ experience = [] }) {
  return (
    <section id="experience" className="relative z-10 px-6 py-28 sm:py-36 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeading eyebrow="Career so far" title="Experience" />
      <div className="divide-y divide-line border-t border-line">
        {experience.map((exp, i) => (
          <Reveal key={exp.id} delay={i * 0.05}>
            <motion.div className="group grid md:grid-cols-12 gap-4 md:gap-8 py-9 items-start" whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
              <div className="md:col-span-3">
                <span className="font-mono text-xs text-haze">{exp.period}</span>
              </div>
              <div className="md:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="display text-2xl sm:text-3xl font-medium text-bone group-hover:text-gold transition-colors">{exp.role}</h3>
                  <span className="text-gold2">— {exp.company}</span>
                </div>
                {exp.detail && <p className="mt-3 text-sm leading-relaxed text-haze max-w-2xl">{exp.detail}</p>}
                {exp.tech?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tech.map((t) => <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md border border-line text-haze">{t}</span>)}
                  </div>
                )}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
