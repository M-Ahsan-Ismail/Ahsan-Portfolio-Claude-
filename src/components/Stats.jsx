import React from 'react';
import { Reveal, AnimatedCounter } from '../lib/motion.jsx';

export function Stats({ stats = [] }) {
  if (!stats.length) return null;
  return (
    <section className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08}>
            <div className="display text-6xl md:text-7xl font-semibold text-bone tracking-tight">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 h-px w-10 bg-gold" />
            <div className="mt-3 text-sm text-haze">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
