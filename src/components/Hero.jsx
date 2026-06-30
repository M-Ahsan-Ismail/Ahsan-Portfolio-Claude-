import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';

export function Hero({ profile, onDownloadCV }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const words = (profile.firstName || 'Ahsan') + '||' + (profile.lastName || 'Ismail');
  const [first, last] = words.split('||');

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6">
      {/* ambient layers */}
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(120% 80% at 50% 0%, #10182a 0%, #0a0d14 55%, #070a10 100%)' }} />
      <motion.div
        aria-hidden
        className="absolute -z-10 left-1/2 top-[18%] -translate-x-1/2 w-[680px] h-[680px] rounded-full blur-[120px] animate-pulseglow"
        style={{ background: 'radial-gradient(circle, rgba(233,185,73,0.22) 0%, rgba(233,185,73,0.05) 45%, transparent 70%)', y }}
      />
      <div aria-hidden className="absolute -z-10 inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '64px 64px', maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 70%)' }} />

      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="eyebrow mb-7"
        >
          Python · Odoo · ERP Architecture
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-[clamp(3rem,11vw,7.5rem)]">
          <motion.span
            className="block text-white"
            initial={{ opacity: 0, filter: 'blur(14px)', y: 24 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {first}
          </motion.span>
          <motion.span
            className="block text-gold-gradient animate-shimmer"
            initial={{ opacity: 0, filter: 'blur(14px)', y: 24 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {last}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-7 mx-auto max-w-xl text-base sm:text-lg text-haze leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-obsidian font-medium text-sm transition-transform hover:scale-[1.03] active:scale-95"
            style={{ boxShadow: '0 10px 40px -10px rgba(233,185,73,0.6)' }}
          >
            View Selected Work
          </a>
          <button
            onClick={onDownloadCV}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/90 font-medium text-sm hover:bg-white/5 transition-colors"
          >
            <Download size={16} /> Download CV
          </button>
        </motion.div>

        {profile.available && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-8 inline-flex items-center gap-2 text-xs text-haze"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for new projects · {profile.location}
          </motion.div>
        )}
      </motion.div>

      <motion.a
        href="#experience"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-haze"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="block">
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
