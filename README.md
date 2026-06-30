# Ahsan Ismail — Portfolio

A modern, luxury single-page portfolio. Dark obsidian + gold theme, cinematic hero, floating pill navbar, smooth scrolling, and a built-in **admin panel** to manage Projects, Experience, Skills, Profile and your CV — **no database required**.

Built with **React + Vite + Tailwind + Framer Motion + Lenis + react-icons**.

---

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

Build for production:

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build
```

---

## Deploy to Netlify (GitHub → Netlify)

1. Push this folder to a GitHub repo.
2. On Netlify → **Add new site → Import from GitHub** → pick the repo.
3. Netlify auto-detects the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy. Done. The included `netlify.toml` also handles SPA routing so refreshes never 404.

---

## How the "no database" content works

- Default content lives in **`src/data/content.json`**.
- The **admin panel** (gear/“Admin” link at the very bottom of the page) saves your edits to the browser's **localStorage** instantly — realtime, on your device.
- To publish changes for **everyone**: in the admin **Publish** tab, click **Download content.json**, replace `src/data/content.json` with it, then push to GitHub. Netlify redeploys and the new content is live for all visitors.

### Admin panel
- Open it via the **Admin** link in the footer.
- Passcode: **`ahsan2026`** — change it at the top of `src/components/AdminPanel.jsx` (`PASSCODE`).
- Tabs:
  - **Projects** — add/remove, set name, tag, description, GitHub URL, and upload multiple images (they auto-scroll on each card).
  - **Experience** — add/remove company, role, date period, detail, tech tags.
  - **Skills** — add/remove a skill and pick an icon from the searchable icon grid.
  - **Profile** — name, role, tagline, location, social links, stats.
  - **Publish** — export `content.json`, download current CV, reset to defaults.

### CV (download / upload)
- The yellow **Download My CV** popup (and the hero button) downloads your CV.
- **Upload CV** saves the file to localStorage on your device (PDF/DOCX/TXT).
- The public default is **`public/cv.pdf`** — replace it with your real resume and push to make it the default for everyone.

---

## Notes
- Images and the uploaded CV are stored as base64 in localStorage, which has a ~5 MB limit per browser. Keep project images reasonably small (the admin warns above ~1.6 MB).
- localStorage is per-browser/per-device: your uploads show on your device; the committed `content.json` / `cv.pdf` are what new visitors see.
- Respects reduced-motion and is responsive down to mobile.
