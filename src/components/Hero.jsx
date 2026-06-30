import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, ArrowUpRight } from 'lucide-react';
import { Magnetic, RotatingWord } from '../lib/motion.jsx';

export function Hero({ profile, onDownloadCV }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const first = profile.firstName || 'Ahsan';
  const last = profile.lastName || 'Ismail';

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-6">
      {/* ambient cinematic background */}
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(130% 90% at 50% -10%, #14161f 0%, #0a0c11 55%, #07080b 100%)' }} />
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <div className="aurora animate-drift" style={{ width: 520, height: 520, left: '8%', top: '6%', background: 'radial-gradient(circle, rgba(255,90,31,0.30), transparent 65%)' }} />
        <div className="aurora animate-drift2" style={{ width: 600, height: 600, right: '4%', top: '22%', background: 'radial-gradient(circle, rgba(120,80,255,0.16), transparent 65%)' }} />
        <div className="aurora animate-drift" style={{ width: 460, height: 460, left: '34%', bottom: '0%', background: 'radial-gradient(circle, rgba(255,160,90,0.12), transparent 65%)' }} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 75%)' }} />

      <motion.div style={{ opacity: fade }} className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="eyebrow mb-6">
          {profile.role} · {profile.location}
        </motion.p>

        {/* kinetic name */}
        <h1 className="display font-semibold leading-[0.88] tracking-[-0.03em] text-[clamp(3.4rem,15vw,12rem)]">
          <span className="reveal-mask">
            <motion.span className="inline-block text-bone" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              {first}
            </motion.span>
          </span>
          <span className="reveal-mask">
            <motion.span className="inline-block text-ember-grad" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              {last}
            </motion.span>
          </span>
        </h1>

        {/* rotating role line */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-7 flex flex-wrap items-baseline gap-x-3 text-xl sm:text-2xl text-haze">
          <span>I build</span>
          <span className="display text-bone font-medium">
            <RotatingWord words={['ERP systems', 'Odoo modules', 'custom software', 'clean APIs']} />
          </span>
          <span>that businesses run on.</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}
          className="mt-10 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a href="#projects" className="group inline-flex items-center gap-2 pl-7 pr-5 py-4 rounded-full bg-gold text-obsidian font-medium text-sm"
              style={{ boxShadow: '0 14px 50px -12px rgba(255,90,31,0.7)' }}>
              View selected work
              <span className="grid place-items-center w-6 h-6 rounded-full bg-obsidian/15 group-hover:rotate-45 transition-transform"><ArrowUpRight size={14} /></span>
            </a>
          </Magnetic>
          <Magnetic>
            <button onClick={onDownloadCV} className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/15 text-bone font-medium text-sm hover:bg-white/5 transition-colors">
              <Download size={16} /> Download CV
            </button>
          </Magnetic>
          {profile.available && (
            <span className="ml-1 inline-flex items-center gap-2 text-xs text-haze">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" /></span>
              Available for work
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.a href="#about" aria-label="Scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-haze">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="block"><ArrowDown size={20} /></motion.span>
      </motion.a>
    </section>
  );
}
