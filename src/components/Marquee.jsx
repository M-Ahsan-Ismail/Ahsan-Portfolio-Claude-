import React from 'react';

export function Marquee({ items = [] }) {
  const row = [...items, ...items];
  return (
    <div className="relative py-6 border-y border-line overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-obsidian to-transparent" />
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="mx-7 inline-flex items-center gap-7 text-2xl sm:text-3xl display font-medium text-haze/50">
            {t}<span className="text-gold text-lg">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
