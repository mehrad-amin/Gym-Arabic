// src/components/Navbar.jsx
"use client";

import React from "react";
import { PAGE_CONTENT } from "@/constants/fitnessData";

export default function Navbar({ lang = "ar", onToggleLang }) {
  const content = PAGE_CONTENT[lang]?.nav || PAGE_CONTENT.ar.nav;
  const isArabic = lang === "ar";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-fitness-border/70 bg-fitness-bg/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* برند و نام مدرب */}
        <a href="#" className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-fitness-primary shadow-[0_0_12px_#ccff00]" />
          <span className="font-mono text-sm font-black tracking-wider text-white">
            {content.brand}
          </span>
        </a>

        {/* لینک‌های اسکرول ناوبری دسکتاپ */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-fitness-muted">
          {content.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="transition-colors hover:text-fitness-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* بخش اکشن‌های پایانی: دکمه سوئیچ زبان + دکمه CTA */}
        <div className="flex items-center gap-3">
          {/* دکمه سوئیچ زبان */}
          <button
            onClick={onToggleLang}
            type="button"
            aria-label="Switch Language"
            className="inline-flex items-center gap-1.5 rounded-full border border-fitness-border bg-fitness-surface/90 px-3 py-1.5 text-xs font-bold transition-all hover:border-fitness-primary/60 hover:text-white"
          >
            <span className="rounded bg-fitness-primary/10 px-1.5 py-0.5 font-mono text-[10px] text-fitness-primary">
              {isArabic ? "EN" : "عربي"}
            </span>
            <span className="text-[11px] text-zinc-300">
              {isArabic ? "English" : "العربية"}
            </span>
          </button>

          {/* دکمه ثبت‌نام سریع */}
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-fitness-primary px-4 py-2 text-xs font-black text-black transition-all hover:bg-fitness-primary-hover active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
