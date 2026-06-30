import React from 'react';
import { Reveal, WordReveal } from '../lib/motion.jsx';

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-14">
      <Reveal>{eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}</Reveal>
      <h2 className="display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-bone leading-[0.95]">
        <WordReveal text={title} />
      </h2>
      {subtitle && <Reveal delay={0.1}><p className="mt-5 max-w-xl text-haze">{subtitle}</p></Reveal>}
    </div>
  );
}
