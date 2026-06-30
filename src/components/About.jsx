import React from 'react';
import { Reveal, WordReveal } from '../lib/motion.jsx';

export function About({ profile }) {
  return (
    <section id="about" className="relative z-10 px-6 py-28 sm:py-36 max-w-5xl mx-auto scroll-mt-24">
      <Reveal><p className="eyebrow mb-8">What I do</p></Reveal>
      <h2 className="display text-3xl sm:text-5xl md:text-[3.6rem] leading-[1.08] tracking-tight font-medium text-bone">
        <WordReveal text="I turn messy business processes into clean, scalable ERP systems —" />
        <span className="text-haze/60">
          <WordReveal text="custom Odoo modules, integrations, and migrations that teams actually rely on every day." delay={0.1} />
        </span>
      </h2>
    </section>
  );
}
