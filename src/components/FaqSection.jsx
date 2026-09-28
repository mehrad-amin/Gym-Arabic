"use client";

import React, { useState } from "react";
import { FAQS } from "@/constants/fitnessData";

const FAQ_UI_TEXT = {
  ar: {
    badge: "وضوح تام قبل الاشتراك",
    title: "الأسئلة الشائعة",
    subtitle:
      "إجابات وافية على أكثر استفسارات المشتركين تكراراً قبل بدء البرنامج",
    askMoreTitle: "لديك سؤال آخر لم تجد إجابته هنا؟",
    askMoreDesc: "يمكنك التواصل مباشرة مع المدرب للإجابة على جميع استفساراتك.",
    whatsappBtn: "تحدث مع المدرب عبر واتساب",
    whatsappMessage: "مرحباً كابتن، لدي استفسار بخصوص برامج التدريب.",
  },
  en: {
    badge: "Full Transparency Before You Join",
    title: "Frequently Asked Questions",
    subtitle:
      "Clear answers to the most common questions before starting your journey",
    askMoreTitle: "Have another question not listed here?",
    askMoreDesc:
      "Reach out directly to the coach for quick answers to your questions.",
    whatsappBtn: "Chat with Coach on WhatsApp",
    whatsappMessage:
      "Hello Coach, I have an inquiry regarding your training programs.",
  },
};

function PlusIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}

export default function FaqSection({
  faqs,
  lang = "ar",
  coachWhatsapp = process.env.NEXT_PUBLIC_COACH_WHATSAPP_PHONE ||
    "971500000000",
}) {
  const isRtl = lang === "ar";
  const ui = FAQ_UI_TEXT[lang] || FAQ_UI_TEXT.ar;

  // اگر faqs به عنوان prop پاس داده نشد، از دیکشنری مرکزی خوانده شود
  const activeFaqs = faqs && faqs.length > 0 ? faqs : FAQS[lang] || FAQS.ar;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const whatsappDirectUrl = `https://wa.me/${coachWhatsapp.replace(
    /\+/g,
    "",
  )}?text=${encodeURIComponent(ui.whatsappMessage)}`;

  return (
    <section className="relative w-full border-t border-fitness-border py-16 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/5 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-6">
        {/* هدر بخش */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3.5 py-1 text-xs font-bold text-fitness-primary mb-3">
            {ui.badge}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            {ui.title}
          </h2>
          <p className="mt-2 text-xs text-fitness-muted md:text-sm">
            {ui.subtitle}
          </p>
        </div>

        {/* لیست آکاردئونی سوالات */}
        <div className="space-y-4">
          {activeFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const formattedIdx = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b from-fitness-surface to-[#0a0d0c] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                  isOpen
                    ? "border-fitness-primary/60 shadow-[0_12px_35px_rgba(34,197,94,0.12)] scale-[1.01]"
                    : "border-fitness-border hover:border-fitness-border/90"
                }`}
              >
                {/* خط نئونی بالای کارت */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-fitness-primary/80 to-transparent transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full cursor-pointer select-none items-center justify-between gap-4 text-start"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`font-mono text-xs font-black transition-colors ${
                        isOpen
                          ? "text-fitness-primary"
                          : "text-fitness-muted/60"
                      }`}
                    >
                      {formattedIdx}
                    </span>
                    <span
                      className={`text-sm font-black transition-colors md:text-base ${
                        isOpen ? "text-fitness-primary" : "text-zinc-100"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-fitness-primary/50 bg-fitness-primary/15 text-fitness-primary shadow-[0_0_12px_rgba(34,197,94,0.3)]"
                        : "border-zinc-800 bg-zinc-900/80 text-zinc-400"
                    }`}
                  >
                    <PlusIcon />
                  </div>
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-150 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="overflow-hidden border-s-2 border-fitness-primary/40 ps-4 pt-1">
                    <p className="text-xs leading-relaxed text-fitness-muted md:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* کارت ارتباط مستقیم واتساپ */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 text-center sm:flex-row sm:text-start">
          <div>
            <p className="text-xs font-bold text-zinc-200">{ui.askMoreTitle}</p>
            <p className="mt-0.5 text-[11px] text-zinc-500">{ui.askMoreDesc}</p>
          </div>
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-fitness-primary/40 bg-fitness-primary/10 px-4 py-2 text-xs font-bold text-fitness-primary transition-colors hover:bg-fitness-primary hover:text-black"
          >
            <span>{ui.whatsappBtn}</span>
            <span
              className={`text-sm transition-transform duration-200 ${isRtl ? "rotate-180" : ""}`}
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
