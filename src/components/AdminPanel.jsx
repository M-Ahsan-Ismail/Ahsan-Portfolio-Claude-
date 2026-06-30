import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Plus, Trash2, Upload, Download, RotateCcw, Lock, Search,
  FolderGit2, Briefcase, Sparkles, User, FileDown, ChevronUp, ChevronDown,
} from 'lucide-react';
import { useContent, uid } from '../lib/store.jsx';
import { iconList, getIcon } from '../lib/icons.jsx';
import { downloadCV } from './CVPopup.jsx';

const PASSCODE = 'ahsan2026'; // change me

const fieldCls =
  'w-full bg-obsidian2 border border-line rounded-lg px-3 py-2 text-sm text-white/90 placeholder-haze/50 focus:outline-none focus:border-gold/50 transition-colors';
const labelCls = 'block text-xs text-haze mb-1';
const btnGhost =
  'inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line text-haze hover:text-white hover:border-gold/40 text-sm transition-colors';

function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = (e) => res(e.target.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

/* ---------- Projects ---------- */
function ProjectsTab({ content, setContent }) {
  const update = (id, patch) =>
    setContent((c) => ({ ...c, projects: c.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const remove = (id) =>
    setContent((c) => ({ ...c, projects: c.projects.filter((p) => p.id !== id) }));
  const add = () =>
    setContent((c) => ({
      ...c,
      projects: [{ id: uid('p'), title: 'New Project', subtitle: '', description: '', githubUrl: '', images: [] }, ...c.projects],
    }));
  const move = (id, dir) =>
    setContent((c) => {
      const arr = [...c.projects];
      const i = arr.findIndex((p) => p.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return c;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...c, projects: arr };
    });

  const addImages = async (id, files) => {
    const urls = [];
    for (const f of files) {
      if (f.size > 1.6 * 1024 * 1024) {
        alert(`"${f.name}" is large (>1.6MB). Use a smaller image so browser storage doesn't fill up.`);
      }
      urls.push(await fileToDataUrl(f));
    }
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === id ? { ...p, images: [...(p.images || []), ...urls] } : p)),
    }));
  };
  const removeImage = (id, idx) =>
    setContent((c) => ({
      ...c,
      projects: c.projects.map((p) => (p.id === id ? { ...p, images: p.images.filter((_, k) => k !== idx) } : p)),
    }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-haze">{content.projects.length} projects</p>
        <button onClick={add} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gold text-obsidian text-sm font-medium hover:scale-[1.02] transition-transform">
          <Plus size={15} /> Add project
        </button>
      </div>

      {content.projects.map((p, i) => (
        <div key={p.id} className="glass rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-haze">#{i + 1}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(p.id, -1)} className="p-1.5 rounded text-haze hover:text-white" aria-label="Move up"><ChevronUp size={15} /></button>
              <button onClick={() => move(p.id, 1)} className="p-1.5 rounded text-haze hover:text-white" aria-label="Move down"><ChevronDown size={15} /></button>
              <button onClick={() => remove(p.id)} className="p-1.5 rounded text-red-400/80 hover:text-red-400" aria-label="Delete"><Trash2 size={15} /></button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Project name</label>
              <input className={fieldCls} value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Tag / industry</label>
              <input className={fieldCls} value={p.subtitle || ''} onChange={(e) => update(p.id, { subtitle: e.target.value })} placeholder="e.g. Manufacturing ERP" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea rows={3} className={fieldCls} value={p.description} onChange={(e) => update(p.id, { description: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>GitHub URL</label>
            <input className={fieldCls} value={p.githubUrl || ''} onChange={(e) => update(p.id, { githubUrl: e.target.value })} placeholder="https://github.com/..." />
          </div>

          {/* images */}
          <div>
            <label className={labelCls}>Images (auto-scroll on the card)</label>
            <div className="flex flex-wrap gap-2">
              {(p.images || []).map((src, idx) => (
                <div key={idx} className="relative w-20 h-14 rounded-lg overflow-hidden border border-line group">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => removeImage(p.id, idx)} className="absolute inset-0 grid place-items-center bg-black/60 opacity-0 group-hover:opacity-100 text-red-300 transition-opacity" aria-label="Remove image">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <label className="w-20 h-14 rounded-lg border border-dashed border-line grid place-items-center text-haze hover:border-gold/50 hover:text-gold cursor-pointer transition-colors">
                <Upload size={16} />
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(p.id, Array.from(e.target.files || []))} />
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Experience ---------- */
function ExperienceTab({ content, setContent }) {
  const update = (id, patch) =>
    setContent((c) => ({ ...c, experience: c.experience.map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
  const remove = (id) => setContent((c) => ({ ...c, experience: c.experience.filter((x) => x.id !== id) }));
  const add = () =>
    setContent((c) => ({
      ...c,
      experience: [{ id: uid('e'), role: 'Role', company: 'Company', period: '2025 — Present', detail: '', tech: [] }, ...c.experience],
    }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-haze">{content.experience.length} entries</p>
        <button onClick={add} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gold text-obsidian text-sm font-medium hover:scale-[1.02] transition-transform">
          <Plus size={15} /> Add experience
        </button>
      </div>

      {content.experience.map((x) => (
        <div key={x.id} className="glass rounded-xl p-4 space-y-3">
          <div className="flex justify-end">
            <button onClick={() => remove(x.id)} className="p-1.5 rounded text-red-400/80 hover:text-red-400" aria-label="Delete"><Trash2 size={15} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Role</label>
              <input className={fieldCls} value={x.role} onChange={(e) => update(x.id, { role: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>Company</label>
              <input className={fieldCls} value={x.company} onChange={(e) => update(x.id, { company: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Date period</label>
            <input className={fieldCls} value={x.period} onChange={(e) => update(x.id, { period: e.target.value })} placeholder="08/2024 — Present" />
          </div>
          <div>
            <label className={labelCls}>Detail</label>
            <textarea rows={3} className={fieldCls} value={x.detail} onChange={(e) => update(x.id, { detail: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>Tech (comma separated)</label>
            <input className={fieldCls} value={(x.tech || []).join(', ')} onChange={(e) => update(x.id, { tech: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} placeholder="Odoo, Python, PostgreSQL" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Skills ---------- */
function IconPicker({ value, onPick }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const Active = getIcon(value);
  const list = iconList.filter((k) => k.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-2 bg-obsidian2 border border-line rounded-lg px-3 py-2 text-sm text-white/90 hover:border-gold/40 transition-colors">
        <Active size={18} className="text-gold2" /> <span className="text-xs text-haze">{value}</span>
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-72 glass-strong rounded-xl p-3 shadow-2xl">
          <div className="flex items-center gap-2 mb-2 bg-obsidian2 border border-line rounded-lg px-2">
            <Search size={14} className="text-haze" />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search icons…" className="flex-1 bg-transparent py-2 text-sm text-white/90 focus:outline-none" />
          </div>
          <div className="grid grid-cols-6 gap-1.5 max-h-56 overflow-y-auto">
            {list.map((k) => {
              const Ic = getIcon(k);
              return (
                <button key={k} title={k} onClick={() => { onPick(k); setOpen(false); }} className={`grid place-items-center aspect-square rounded-lg border transition-colors ${value === k ? 'border-gold/60 bg-gold/15 text-gold' : 'border-transparent text-haze hover:bg-white/5 hover:text-white'}`}>
                  <Ic size={18} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SkillsTab({ content, setContent }) {
  const update = (id, patch) => setContent((c) => ({ ...c, skills: c.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  const remove = (id) => setContent((c) => ({ ...c, skills: c.skills.filter((s) => s.id !== id) }));
  const add = () => setContent((c) => ({ ...c, skills: [...c.skills, { id: uid('sk'), name: 'New Skill', icon: 'FaCode' }] }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-haze">{content.skills.length} skills</p>
        <button onClick={add} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gold text-obsidian text-sm font-medium hover:scale-[1.02] transition-transform">
          <Plus size={15} /> Add skill
        </button>
      </div>
      <div className="space-y-2">
        {content.skills.map((s) => (
          <div key={s.id} className="glass rounded-xl p-3 flex items-center gap-3">
            <IconPicker value={s.icon} onPick={(icon) => update(s.id, { icon })} />
            <input className={fieldCls} value={s.name} onChange={(e) => update(s.id, { name: e.target.value })} />
            <button onClick={() => remove(s.id)} className="p-2 rounded text-red-400/80 hover:text-red-400 shrink-0" aria-label="Delete"><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Profile ---------- */
function ProfileTab({ content, setContent }) {
  const setP = (patch) => setContent((c) => ({ ...c, profile: { ...c.profile, ...patch } }));
  const setS = (patch) => setContent((c) => ({ ...c, social: { ...c.social, ...patch } }));
  const setStat = (id, patch) => setContent((c) => ({ ...c, stats: c.stats.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  const p = content.profile, s = content.social;
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className={labelCls}>First name</label><input className={fieldCls} value={p.firstName} onChange={(e) => setP({ firstName: e.target.value, name: `${e.target.value} ${p.lastName}` })} /></div>
        <div><label className={labelCls}>Last name</label><input className={fieldCls} value={p.lastName} onChange={(e) => setP({ lastName: e.target.value, name: `${p.firstName} ${e.target.value}` })} /></div>
      </div>
      <div><label className={labelCls}>Role</label><input className={fieldCls} value={p.role} onChange={(e) => setP({ role: e.target.value })} /></div>
      <div><label className={labelCls}>Tagline</label><textarea rows={2} className={fieldCls} value={p.tagline} onChange={(e) => setP({ tagline: e.target.value })} /></div>
      <div><label className={labelCls}>Location</label><input className={fieldCls} value={p.location} onChange={(e) => setP({ location: e.target.value })} /></div>

      <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-line">
        <div><label className={labelCls}>Phone</label><input className={fieldCls} value={s.phone} onChange={(e) => setS({ phone: e.target.value })} /></div>
        <div><label className={labelCls}>Email</label><input className={fieldCls} value={s.email} onChange={(e) => setS({ email: e.target.value })} /></div>
        <div><label className={labelCls}>GitHub</label><input className={fieldCls} value={s.github} onChange={(e) => setS({ github: e.target.value })} /></div>
        <div><label className={labelCls}>LinkedIn</label><input className={fieldCls} value={s.linkedin} onChange={(e) => setS({ linkedin: e.target.value })} /></div>
        <div><label className={labelCls}>Website</label><input className={fieldCls} value={s.website} onChange={(e) => setS({ website: e.target.value })} /></div>
      </div>

      <div className="pt-2 border-t border-line">
        <p className={labelCls}>Stats</p>
        <div className="space-y-2">
          {content.stats.map((st) => (
            <div key={st.id} className="flex gap-2">
              <input className={fieldCls + ' flex-1'} value={st.label} onChange={(e) => setStat(st.id, { label: e.target.value })} />
              <input type="number" className={fieldCls + ' w-20'} value={st.value} onChange={(e) => setStat(st.id, { value: Number(e.target.value) })} />
              <input className={fieldCls + ' w-14'} value={st.suffix} onChange={(e) => setStat(st.id, { suffix: e.target.value })} placeholder="+" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Export ---------- */
function ExportTab({ content, resetContent }) {
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'content.json';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-5">
      <div className="glass rounded-xl p-5">
        <h4 className="font-medium text-white mb-1">Publish your changes to everyone</h4>
        <p className="text-sm text-haze leading-relaxed">
          Your edits are saved on <span className="text-goldsoft">this browser instantly</span>. To make them public for every visitor:
        </p>
        <ol className="mt-3 text-sm text-haze list-decimal list-inside space-y-1.5">
          <li>Click <span className="text-white">Download content.json</span> below.</li>
          <li>Replace <code className="text-gold2">src/data/content.json</code> in your project with it.</li>
          <li>Push to GitHub — Netlify redeploys automatically.</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={downloadJSON} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gold text-obsidian text-sm font-medium hover:scale-[1.02] transition-transform">
            <Download size={15} /> Download content.json
          </button>
          <button onClick={downloadCV} className={btnGhost}><FileDown size={15} /> Download current CV</button>
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <h4 className="font-medium text-white mb-1">Reset</h4>
        <p className="text-sm text-haze mb-3">Wipe local edits and restore the content that ships with the site.</p>
        <button onClick={() => { if (confirm('Reset all local edits to defaults?')) resetContent(); }} className={btnGhost}>
          <RotateCcw size={15} /> Reset to defaults
        </button>
      </div>
    </div>
  );
}

/* ---------- Shell ---------- */
const TABS = [
  { id: 'projects', label: 'Projects', icon: FolderGit2, Comp: ProjectsTab },
  { id: 'experience', label: 'Experience', icon: Briefcase, Comp: ExperienceTab },
  { id: 'skills', label: 'Skills', icon: Sparkles, Comp: SkillsTab },
  { id: 'profile', label: 'Profile', icon: User, Comp: ProfileTab },
  { id: 'export', label: 'Publish', icon: Download, Comp: ExportTab },
];

export function AdminPanel({ open, onClose }) {
  const { content, setContent, resetContent } = useContent();
  const [tab, setTab] = useState('projects');
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState('');

  const Current = TABS.find((t) => t.id === tab).Comp;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl h-[88vh] glass-strong rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 text-gold"><Sparkles size={16} /></span>
                <h3 className="font-display text-lg text-white">Admin</h3>
              </div>
              <button onClick={onClose} className="grid place-items-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-haze hover:text-white" aria-label="Close"><X size={18} /></button>
            </div>

            {!unlocked ? (
              <div className="flex-1 grid place-items-center p-6">
                <div className="w-full max-w-xs text-center">
                  <span className="grid place-items-center w-12 h-12 mx-auto rounded-xl bg-gold/15 border border-gold/30 text-gold mb-4"><Lock size={20} /></span>
                  <h4 className="text-white font-medium">Enter passcode</h4>
                  <p className="text-xs text-haze mt-1 mb-4">Default is <code className="text-gold2">ahsan2026</code> — change it in <code>AdminPanel.jsx</code>.</p>
                  <input
                    type="password" value={code} autoFocus
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && code === PASSCODE) setUnlocked(true); }}
                    placeholder="Passcode"
                    className={fieldCls + ' text-center'}
                  />
                  <button
                    onClick={() => { if (code === PASSCODE) setUnlocked(true); else alert('Wrong passcode'); }}
                    className="mt-3 w-full px-4 py-2.5 rounded-lg bg-gold text-obsidian font-medium text-sm hover:scale-[1.02] transition-transform"
                  >
                    Unlock
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex min-h-0">
                {/* tabs */}
                <nav className="w-14 sm:w-44 shrink-0 border-r border-line p-2 space-y-1 overflow-y-auto">
                  {TABS.map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id} onClick={() => setTab(t.id)}
                        className={`w-full flex items-center gap-2.5 px-2.5 sm:px-3 py-2.5 rounded-lg text-sm transition-colors ${tab === t.id ? 'bg-gold/15 text-goldsoft border border-gold/25' : 'text-haze hover:bg-white/5 hover:text-white border border-transparent'}`}
                      >
                        <Icon size={17} className="shrink-0" />
                        <span className="hidden sm:inline">{t.label}</span>
                      </button>
                    );
                  })}
                </nav>
                {/* content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  <Current content={content} setContent={setContent} resetContent={resetContent} />
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
