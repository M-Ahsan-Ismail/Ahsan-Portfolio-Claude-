import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Upload } from 'lucide-react';

const CV_KEYS = { data: 'uploadedCV', name: 'cvFileName', type: 'cvFileType' };

export function downloadCV() {
  const data = localStorage.getItem(CV_KEYS.data);
  const name = localStorage.getItem(CV_KEYS.name) || 'Ahsan_Ismail_CV.pdf';
  if (data) {
    const link = document.createElement('a');
    link.href = data;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // fall back to the bundled default CV in /public
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Ahsan_Ismail_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function saveCVFile(file, onDone) {
  const allowed = ['application/pdf', 'text/plain',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|txt|docx)$/i)) {
    alert('Please upload a PDF, DOCX or TXT file.');
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      localStorage.setItem(CV_KEYS.data, e.target.result);
      localStorage.setItem(CV_KEYS.name, file.name);
      localStorage.setItem(CV_KEYS.type, file.type);
      onDone?.(file.name);
    } catch (err) {
      alert('CV is too large for browser storage. Try a smaller PDF.');
    }
  };
  reader.readAsDataURL(file);
}

export function CVPopup({ open, onClose }) {
  const [savedName, setSavedName] = useState('');

  useEffect(() => {
    setSavedName(localStorage.getItem(CV_KEYS.name) || '');
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 80, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.34, 1.4, 0.64, 1] }}
          className="fixed bottom-5 right-5 z-[60] w-[min(92vw,340px)]"
        >
          <div className="rounded-2xl p-5 shadow-2xl" style={{ background: 'linear-gradient(135deg, #f4d58a, #e9b949 45%, #d4a536)' }}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 text-obsidian">
                <Download size={18} />
                <h3 className="font-semibold text-sm">Download My CV</h3>
              </div>
              <button onClick={onClose} aria-label="Close" className="text-obsidian/70 hover:text-obsidian">
                <X size={16} />
              </button>
            </div>
            <p className="mt-1.5 text-[13px] text-obsidian/80 leading-snug">
              Get my latest resume with all project details and experience.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={downloadCV}
                className="flex-1 bg-white text-[#b8860b] px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors"
              >
                Download Now
              </button>
              <label className="inline-flex items-center gap-1.5 bg-obsidian/90 text-goldsoft px-3 py-2.5 rounded-lg text-sm font-semibold hover:bg-obsidian transition-colors cursor-pointer">
                <Upload size={14} /> Upload
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) saveCVFile(f, setSavedName);
                  }}
                />
              </label>
            </div>
            {savedName && (
              <p className="mt-2 text-[11px] text-obsidian/70 truncate">Saved on this device: {savedName}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
