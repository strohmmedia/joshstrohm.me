"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const filteredItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setSearch("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-lg bg-surface2 border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-text placeholder:text-muted focus:outline-none"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs text-muted bg-surface rounded">ESC</kbd>
        </div>
        <div className="py-2 max-h-[300px] overflow-y-auto">
          {filteredItems.length === 0 ? (
            <p className="px-4 py-6 text-center text-text2">No results found</p>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleSelect(item.href)}
                className="w-full px-4 py-3 text-left text-text hover:bg-surface hover:text-[#2dd4bf] transition-colors flex items-center justify-between group"
              >
                <span>{item.label}</span>
                <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">Go →</span>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-xs text-muted">
          <span>Press <kbd className="px-1.5 py-0.5 bg-surface rounded">↵</kbd> to select</span>
          <span><kbd className="px-1.5 py-0.5 bg-surface rounded">↑↓</kbd> to navigate</span>
        </div>
      </div>
    </div>
  );
}