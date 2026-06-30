import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, FolderGit2 } from 'lucide-react';

export function ProjectCard({ project, index }) {
  const images = project.images || [];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 2600);
    return () => clearInterval(t);
  }, [images.length, paused]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="group relative flex flex-col glass rounded-2xl overflow-hidden transition-colors hover:border-gold/30"
    >
      {/* media */}
      <div className="relative aspect-[16/10] overflow-hidden bg-obsidian2">
        {images.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={images[idx]}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 100% at 30% 0%, rgba(233,185,73,0.10), transparent 60%)' }} />
            <FolderGit2 className="text-gold/30" size={46} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />

        {/* dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Image ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-5 bg-gold' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        )}

        {project.subtitle && (
          <span className="absolute top-3 left-3 z-10 text-[11px] font-mono px-2.5 py-1 rounded-md glass-strong text-goldsoft border border-gold/25">
            {project.subtitle}
          </span>
        )}
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-haze hover:text-gold hover:border-gold/40 transition-colors"
            >
              <Github size={16} />
            </a>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-haze line-clamp-4 flex-1">{project.description}</p>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-gold2 hover:text-gold transition-colors"
          >
            View repository <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </motion.article>
  );
}
