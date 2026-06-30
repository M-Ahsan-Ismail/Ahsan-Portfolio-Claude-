import React from 'react';
import { ProjectCard } from './ProjectCard.jsx';
import { SectionHeading } from './SectionHeading.jsx';

export function Projects({ projects = [] }) {
  return (
    <section id="projects" className="relative z-10 px-6 py-24 sm:py-32 max-w-6xl mx-auto scroll-mt-24">
      <SectionHeading eyebrow="Selected work" title="Projects" subtitle="ERP builds, modules and tools — most with source on GitHub." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
