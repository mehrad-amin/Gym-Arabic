// src/app/page.jsx یا FitnessLandingPage.jsx
"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FitnessCalculator from "@/components/FitnessCalculator";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingForm from "@/components/BookingForm";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";

import {
  SERVICES,
  TRANSFORMATIONS,
  PRICING_PLANS,
  FAQS,
  PAGE_CONTENT,
} from "@/constants/fitnessData";
import TransformationsCarousel from "@/components/TransformationsCarousel";

const CURRENT_YEAR = new Date().getFullYear();

export default function FitnessLandingPage() {
  const [lang, setLang] = useState("ar");

  // همگام‌سازی جهت صفحه (RTL / LTR) با تغییر زبان
  useEffect(() => {
    const isRtl = lang === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const pageText = PAGE_CONTENT[lang] || PAGE_CONTENT.ar;

  return (
    <main className="flex flex-col items-center justify-between selection:bg-fitness-primary selection:text-black">
      {/* ۰. هدر اصلی حاوی دکمه سوئیچ زبان */}
      <Navbar lang={lang} onToggleLang={toggleLanguage} />

      {/* ۱. هیرو سکشن */}
      <HeroSection lang={lang} />

      {/* ۲. سرویس‌ها و متدولوژی علمی */}
      <div id="methodology" className="w-full">
        <MethodologySection
          services={SERVICES[lang] || SERVICES.ar}
          lang={lang}
        />
      </div>

      {/* ۳. قبل و بعد مشترکین */}
      <TransformationsCarousel lang={lang} />

      {/* ۴. اثبات روایی: نظرات و رضایت شاگردان */}
      <TestimonialsSection lang={lang} />

      {/* ۵. ماشین‌حساب BMR / TDEE */}
      <section
        id="calculator"
        className="w-full border-t border-fitness-border py-20"
      >
        <div className="mx-auto max-w-4xl px-6">
          <FitnessCalculator lang={lang} />
        </div>
      </section>

      {/* ۶. تعرفه‌ها و پکیج‌ها */}
      <div id="pricing" className="w-full">
        <PricingSection
          plans={PRICING_PLANS[lang] || PRICING_PLANS.ar}
          lang={lang}
        />
      </div>

      {/* ۷. سوالات متداول */}
      <div id="faq" className="w-full">
        <FaqSection faqs={FAQS[lang] || FAQS.ar} lang={lang} />
      </div>

      {/* ۸. راه‌های ارتباطی */}
      <ContactSection lang={lang} />

      {/* ۹. فرم نهایی ثبت‌نام */}
      <section
        id="booking"
        className="w-full border-t border-fitness-border py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black md:text-3xl text-white">
              {pageText.booking.title}
            </h2>
            <p className="mt-2 text-sm text-fitness-muted">
              {pageText.booking.subtitle}
            </p>
          </div>
          <BookingForm lang={lang} />
        </div>
      </section>

      {/* ۱۰. فوتر */}
      <footer className="w-full border-t border-fitness-border bg-fitness-surface py-8 text-center text-xs text-fitness-muted">
        <div className="mx-auto max-w-6xl px-6">
          <p>
            © {CURRENT_YEAR} {pageText.footer.rights}
          </p>
          <p className="mt-2 font-mono text-[11px] text-fitness-primary">
            {pageText.footer.developedBy}
          </p>
        </div>
      </footer>
    </main>
  );
}
