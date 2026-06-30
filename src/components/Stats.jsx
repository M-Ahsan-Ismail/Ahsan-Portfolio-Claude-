import React from 'react';
import { Reveal, AnimatedCounter } from '../lib/motion.jsx';

export function Stats({ stats = [] }) {
  if (!stats.length) return null;
  return (
    <section className="relative z-10 px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden glass">
        {stats.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.08} className="bg-white/[0.015] p-6 sm:p-8 text-center">
            <div className="font-display text-4xl sm:text-5xl font-semibold text-gold-gradient">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs sm:text-sm text-haze">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
