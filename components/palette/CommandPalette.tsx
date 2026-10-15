'use client';

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { projects, profile } from '@/content';
import { OPEN_PALETTE_EVENT } from '@/lib/palette';

export interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  group: 'Sections' | 'Projects' | 'Links';
  keywords?: string[];
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const previousFocusRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Generate palette items dynamically from content
  const allItems: PaletteItem[] = useMemo(() => {
    const sectionItems: PaletteItem[] = [
      {
        id: 'sec-projects',
        title: 'Projects Dossier',
        subtitle: 'View production systems, prototypes, and CLI tools',
        group: 'Sections',
        keywords: ['projects', 'work', 'code', 'builds'],
        action: () => {
          router.push('/#projects');
        },
      },
      {
        id: 'sec-skills',
        title: 'Technical Skills',
        subtitle: 'View backend, frontend, database, and devops proficiencies',
        group: 'Sections',
        keywords: ['skills', 'stack', 'languages', 'technologies', 'tools'],
        action: () => {
          router.push('/#skills');
        },
      },
      {
        id: 'sec-about',
        title: 'Education & Background',
        subtitle: 'YouCode / UM6P, ENAA, languages, and leadership',
        group: 'Sections',
        keywords: ['about', 'education', 'degree', 'youcode', 'languages', 'bde'],
        action: () => {
          router.push('/#about');
        },
      },
      {
        id: 'sec-contact',
        title: 'Contact Channels',
        subtitle: 'Direct email, GitHub, LinkedIn, and CV download',
        group: 'Sections',
        keywords: ['contact', 'email', 'reach', 'message', 'hire'],
        action: () => {
          router.push('/#contact');
        },
      },
    ];

    const projectItems: PaletteItem[] = projects.map((p) => ({
      id: `proj-${p.slug}`,
      title: p.name,
      subtitle: `${p.tagline} [${p.status.toUpperCase()}]`,
      group: 'Projects',
      keywords: [...p.stack, p.slug, p.status],
      action: () => {
        router.push(`/projects/${p.slug}`);
      },
    }));

    const linkItems: PaletteItem[] = [
      {
        id: 'link-email',
        title: 'Send Email',
        subtitle: profile.email,
        group: 'Links',
        keywords: ['email', 'mail', 'write', 'aymane'],
        action: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: 'link-copy-email',
        title: 'Copy Email Address',
        subtitle: `Copy ${profile.email} to clipboard`,
        group: 'Links',
        keywords: ['copy', 'clipboard', 'email'],
        action: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopiedNotice(true);
            setTimeout(() => setCopiedNotice(false), 2000);
          } catch {
            // Clipboard fallback
          }
        },
      },
      {
        id: 'link-github',
        title: 'GitHub Profile',
        subtitle: profile.githubUrl,
        group: 'Links',
        keywords: ['github', 'vito-ctrl', 'git', 'repos'],
        action: () => {
          window.open(profile.githubUrl, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'link-linkedin',
        title: 'LinkedIn Profile',
        subtitle: 'Aymane El Khadraoui on LinkedIn',
        group: 'Links',
        keywords: ['linkedin', 'social', 'network'],
        action: () => {
          window.open(profile.linkedinUrl, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'link-cv',
        title: 'Download Curriculum Vitae (PDF)',
        subtitle: profile.cvUrl,
        group: 'Links',
        keywords: ['cv', 'resume', 'pdf', 'download'],
        action: () => {
          window.open(profile.cvUrl, '_blank', 'noopener,noreferrer');
        },
      },
    ];

    return [...sectionItems, ...projectItems, ...linkItems];
  }, [router]);

  // Filter items fuzzy-ish based on query
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;

    return allItems.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const subMatch = item.subtitle ? item.subtitle.toLowerCase().includes(q) : false;
      const groupMatch = item.group.toLowerCase().includes(q);
      const keywordMatch = item.keywords
        ? item.keywords.some((k) => k.toLowerCase().includes(q))
        : false;
      return titleMatch || subMatch || groupMatch || keywordMatch;
    });
  }, [allItems, query]);

  const openPalette = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
      previousFocusRef.current.focus();
    }
  }, []);

  const runItem = useCallback(
    (item: PaletteItem) => {
      closePalette();
      item.action();
    },
    [closePalette],
  );

  // Keyboard shortcut listener: Ctrl+K, Cmd+K, and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        closePalette();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        const target = e.target as HTMLElement;
        const isEditable =
          target &&
          (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

        // Do not hijack if user is inside an input elsewhere on page
        if (isEditable && !dialogRef.current?.contains(target)) {
          return;
        }

        e.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, openPalette, closePalette]);

  // Listen for custom open event (from Header button or others)
  useEffect(() => {
    const handleCustomOpen = () => openPalette();
    window.addEventListener(OPEN_PALETTE_EVENT, handleCustomOpen);
    return () => window.removeEventListener(OPEN_PALETTE_EVENT, handleCustomOpen);
  }, [openPalette]);

  // Focus trap and initial focus
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within palette
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length,
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length,
      );
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredItems[selectedIndex];
      if (current) {
        runItem(current);
      }
      return;
    }

    // Trap focus inside modal
    if (e.key === 'Tab') {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input, button, [tabindex="0"]',
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 backdrop-blur-sm sm:pt-24"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePalette();
        }
      }}
      onKeyDown={handleModalKeyDown}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-xl overflow-hidden rounded border border-border bg-surface shadow-2xl"
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-border px-4 py-3">
          <svg
            className="mr-3 h-4 w-4 text-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={
              filteredItems[selectedIndex] ? `palette-opt-${selectedIndex}` : undefined
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search (sections, projects, links)..."
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close command palette"
            className="ml-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded font-mono text-xs text-muted hover:text-foreground"
          >
            [Esc]
          </button>
        </div>

        {/* Polite Screen Reader Announcement */}
        <div aria-live="polite" className="sr-only">
          {copiedNotice
            ? 'Email copied to clipboard'
            : `${filteredItems.length} results available.`}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-muted">
              No matching commands or specs found for &quot;{query}&quot;.
            </div>
          ) : (
            <ul ref={listRef} id="palette-results" role="listbox" className="space-y-1">
              {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    id={`palette-opt-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => runItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex cursor-pointer items-center justify-between rounded px-3 py-2 text-xs transition ${
                      isSelected
                        ? 'bg-accent text-accent-contrast'
                        : 'text-foreground hover:bg-surface-muted'
                    }`}
                  >
                    <div>
                      <div className="font-mono font-semibold">{item.title}</div>
                      {item.subtitle && (
                        <div
                          className={`mt-0.5 line-clamp-1 ${
                            isSelected ? 'text-accent-contrast/80' : 'text-muted'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                    <span
                      className={`ml-2 shrink-0 font-mono text-[10px] uppercase ${
                        isSelected ? 'text-accent-contrast/90' : 'text-muted'
                      }`}
                    >
                      [{item.group}]
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="bg-surface-muted/50 flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-muted">
          <span>↑↓ Navigate • Enter Run • Esc Close</span>
          <span>{filteredItems.length} Commands</span>
        </div>
      </div>
    </div>
  );
}
