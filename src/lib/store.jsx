import React, { createContext, useContext, useState, useCallback } from 'react';
import defaultContent from '../data/content.json';

const STORAGE_KEY = 'portfolioContent';

export function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // shallow-merge so new default keys appear even on old saves
      return { ...defaultContent, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to read saved content, using defaults.', e);
  }
  return defaultContent;
}

export function persist(content) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    alert('Could not save — storage may be full (large images). Try smaller images.');
    console.error(e);
  }
}

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContentState] = useState(loadContent);

  const setContent = useCallback((updater) => {
    setContentState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      persist(next);
      return next;
    });
  }, []);

  const resetContent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContentState(defaultContent);
  }, []);

  return (
    <ContentContext.Provider value={{ content, setContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
