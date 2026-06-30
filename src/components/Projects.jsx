import React, { useRef } from 'react';
import { ProjectCard } from './ProjectCard.jsx';
import { Reveal, WordReveal } from '../lib/motion.jsx';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Projects({ projects = [] }) {
  const scroller = useRef(null);
  const nudge = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' });
  };
  return (
    <section id="projects" className="relative z-10 py-28 sm:py-36 scroll-mt-24">
      <div className="px-6 max-w-6xl mx-auto flex items-end justify-between gap-6 mb-12">
        <div>
          <Reveal><p className="eyebrow mb-5">Selected work</p></Reveal>
          <h2 className="display text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.03em] text-bone leading-[0.95]"><WordReveal text="Work" /></h2>
          <Reveal delay={0.1}><p className="mt-5 max-w-md text-haze">ERP builds, modules and tools — drag or scroll the reel.</p></Reveal>
        </div>
        <div className="hidden sm:flex gap-2">
          <button onClick={() => nudge(-1)} aria-label="Previous" className="grid place-items-center w-11 h-11 rounded-full border border-line text-haze hover:text-gold hover:border-gold/40 transition-colors"><ArrowLeft size={18} /></button>
          <button onClick={() => nudge(1)} aria-label="Next" className="grid place-items-center w-11 h-11 rounded-full border border-line text-haze hover:text-gold hover:border-gold/40 transition-colors"><ArrowRight size={18} /></button>
        </div>
      </div>

      <div ref={scroller} className="no-bar flex gap-5 overflow-x-auto px-6 max-w-[100vw] pb-4 snap-x snap-mandatory scroll-pl-6"
        style={{ scrollPaddingLeft: '24px' }}>
        {projects.map((p) => (
          <div key={p.id} className="snap-start"><ProjectCard project={p} /></div>
        ))}
        <div className="shrink-0 w-6" />
      </div>
    </section>
  );
}
