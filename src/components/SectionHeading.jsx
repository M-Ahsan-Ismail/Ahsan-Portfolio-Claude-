import React from 'react';
import { Reveal } from '../lib/motion.jsx';

export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12 sm:mb-16">
      <Reveal>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        {subtitle && <p className="mt-4 max-w-xl text-haze">{subtitle}</p>}
      </Reveal>
    </div>
  );
}
