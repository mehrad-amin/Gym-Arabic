"use client";

import React, { useState } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { TRANSFORMATIONS, PAGE_CONTENT } from "@/constants/fitnessData";

export default function TransformationsCarousel({ lang = "ar" }) {
  const items = TRANSFORMATIONS[lang] || TRANSFORMATIONS.ar;
  const t =
    PAGE_CONTENT[lang]?.transformations || PAGE_CONTENT.ar.transformations;
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = items.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentItem = items[currentIndex];

  return (
    <section
      id="transformations"
      className="relative w-full border-t border-fitness-border py-20 overflow-hidden"
    >
      {/* هاله نور پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/10 blur-[140px]" />

      <div className="mx-auto max-w-4xl px-6">
        {/* تیتر و توضیحات بخش */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black md:text-3xl text-white">
            {t.title}
          </h2>
          <p className="mt-2 text-sm text-fitness-muted">{t.subtitle}</p>
        </div>

        {/* کانتینر اسلایدر تک‌کارت متمرکز */}
        <div className="relative mx-auto flex max-w-[440px] flex-col items-center">
          {/* کارت تک و فعال با انیمیشن ورود فید */}
          <div
            key={currentItem.id || currentIndex}
            className="w-full transition-all duration-300 animate-in fade-in zoom-in-95"
          >
            <BeforeAfterSlider item={currentItem} lang={lang} />
          </div>

          {/* نوار کنترل اسلایدر: دکمه قبلی/بعدی + شماره اسلاید */}
          <div className="mt-6 flex w-full items-center justify-between px-2">
            {/* دکمه اسلاید قبلی */}
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Transformation"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-border bg-fitness-surface text-white transition-all hover:border-fitness-primary hover:text-fitness-primary hover:shadow-[0_0_15px_rgba(204,255,0,0.25)] active:scale-90 cursor-pointer"
            >
              <span className="text-lg font-bold rtl:rotate-180">
                <svg
                  className="h-5 w-5 transition-transform rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
            </button>

            {/* نشانگر شماره اسلاید (مثلاً 01 / 10) و بولت‌ها */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="font-mono text-xs font-bold tracking-widest text-fitness-primary">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              {/* نشانگر نقطه‌ای مینی */}
              <div className="flex items-center gap-1">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    type="button"
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-5 bg-fitness-primary shadow-[0_0_8px_rgba(204,255,0,0.7)]"
                        : "w-1.5 bg-fitness-border hover:bg-zinc-600"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* دکمه اسلاید بعدی */}
            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Transformation"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-border bg-fitness-surface text-white transition-all hover:border-fitness-primary hover:text-fitness-primary hover:shadow-[0_0_15px_rgba(204,255,0,0.25)] active:scale-90 cursor-pointer"
            >
              <span className="text-lg font-bold rtl:rotate-180">
                <svg
                  className="h-5 w-5 transition-transform rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
