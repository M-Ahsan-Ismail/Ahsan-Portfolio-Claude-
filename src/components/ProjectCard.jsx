import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, FolderGit2 } from 'lucide-react';

export function ProjectCard({ project }) {
  const images = project.images || [];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 2600);
    return () => clearInterval(t);
  }, [images.length, paused]);

  return (
    <article
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      className="group relative shrink-0 w-[82vw] sm:w-[58vw] lg:w-[40vw] xl:w-[34vw] rounded-3xl border border-line overflow-hidden bg-obsidian2">
      <div className="relative aspect-[16/10] overflow-hidden bg-obsidian">
        {images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img key={idx} src={images[idx]} alt={project.title}
              initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }} className="absolute inset-0 w-full h-full object-cover" />
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 100% at 30% 0%, rgba(255,90,31,0.12), transparent 60%)' }} />
            <FolderGit2 className="text-gold/30" size={50} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian2 via-transparent to-transparent" />
        {project.subtitle && <span className="absolute top-4 left-4 text-[11px] font-mono px-2.5 py-1 rounded-md glass-strong text-gold border border-gold/25">{project.subtitle}</span>}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => <button key={i} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-5 bg-gold' : 'w-1.5 bg-white/40'}`} />)}
          </div>
        )}
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <h3 className="display text-2xl font-semibold text-bone">{project.title}</h3>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-line text-haze hover:text-gold hover:border-gold/40 transition-colors"><Github size={17} /></a>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-haze line-clamp-4">{project.description}</p>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold2 hover:text-gold transition-colors">
            View repository <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </article>
  );
}
