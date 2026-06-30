import React from 'react';
import { Reveal } from '../lib/motion.jsx';
import { SectionHeading } from './SectionHeading.jsx';

export function Experience({ experience = [] }) {
  return (
    <section id="experience" className="relative z-10 px-6 py-24 sm:py-32 max-w-5xl mx-auto scroll-mt-24">
      <SectionHeading eyebrow="Career so far" title="Experience" subtitle="Where I've shipped real ERP systems into production." />

      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold/50 via-line to-transparent md:left-[9px]" />

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 0.06}>
              <div className="relative pl-9 md:pl-12">
                {/* node */}
                <span className="absolute left-0 top-3 grid place-items-center w-4 h-4 rounded-full bg-gold/20 border border-gold/60 md:w-5 md:h-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </span>

                <div className="group glass rounded-2xl p-6 sm:p-7 transition-colors hover:border-gold/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{exp.role}</h3>
                      <p className="text-gold2 text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="self-start sm:self-auto shrink-0 text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-haze">
                      {exp.period}
                    </span>
                  </div>

                  {exp.detail && <p className="mt-4 text-sm leading-relaxed text-haze">{exp.detail}</p>}

                  {exp.tech?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gold/10 text-goldsoft border border-gold/15">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
