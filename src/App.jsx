import React, { useEffect, useState } from 'react';
import { useContent } from './lib/store.jsx';
import { useLenis } from './lib/motion.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Marquee } from './components/Marquee.jsx';
import { About } from './components/About.jsx';
import { Stats } from './components/Stats.jsx';
import { Experience } from './components/Experience.jsx';
import { Skills } from './components/Skills.jsx';
import { Projects } from './components/Projects.jsx';
import { Contact } from './components/Contact.jsx';
import { CVPopup, downloadCV } from './components/CVPopup.jsx';
import { AdminPanel } from './components/AdminPanel.jsx';

export default function App() {
  useLenis();
  const { content } = useContent();
  const [showCV, setShowCV] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShowCV(true), 2400); return () => clearTimeout(t); }, []);

  const marqueeItems = content.skills.slice(0, 10).map((s) => s.name);

  return (
    <div className="relative grain">
      <Navbar name={content.profile.name} />
      <Hero profile={content.profile} onDownloadCV={downloadCV} />
      <Marquee items={marqueeItems.length ? marqueeItems : ['Python', 'Odoo', 'PostgreSQL', 'React', 'FastAPI']} />
      <About profile={content.profile} />
      <Stats stats={content.stats} />
      <Experience experience={content.experience} />
      <Skills skills={content.skills} />
      <Projects projects={content.projects} />
      <Contact social={content.social} name={content.profile.name} onOpenAdmin={() => setShowAdmin(true)} />
      <CVPopup open={showCV} onClose={() => setShowCV(false)} />
      <AdminPanel open={showAdmin} onClose={() => setShowAdmin(false)} />
    </div>
  );
}
