"use client";

import React, { useState, useRef } from "react";

const SPOTLIGHT_REVIEWS = [
  {
    id: "spotlight-1",
    clientName: "سلطان المنصوري",
    role: "رجل أعمال - دبي",
    program: "برنامج التحول الشامل VIP",
    statNumber: "-15 كغ",
    statLabel: "خسارة دهون صافية",
    duration: "التزام 16 أسبوعاً",
    quote:
      "البرنامج نقلة استثنائية في جودة حياتي ونشاطي اليومي. كنت أظن أن مشاغلي وسفري الدائم يمنعاني من الوصول لهذا القوام، لكن المتابعة المخصصة على مدار الساعة غيرت قواعد اللعبة بالكامل.",
    rating: 5,
    tag: "قصة نجاح نخبوية",
  },
  {
    id: "spotlight-2",
    clientName: "م. فهد العتيبي",
    role: "مهندس معماري - الرياض",
    program: "برنامج التنشيف الميكانيكي",
    statNumber: "9.8%",
    statLabel: "نسبة الدهون الحالية",
    duration: "التزام 12 أسبوعاً",
    quote:
      "الدقة في تصحيح التكنيك وتحليل الزوايا المفصلية حمتني من تفاقم إصابة كتف قديمة. اليوم أرفع أوزاني بثقة، وبطني منحوتة كما لم تكن من قبل.",
    rating: 5,
    tag: "تحول قياسي",
  },
  {
    id: "spotlight-3",
    clientName: "د. خالد السويدي",
    role: "استشاري جراحة - الدوحة",
    program: "برنامج التضخيم والبناء العضلي",
    statNumber: "+6.5 كغ",
    statLabel: "كتلة عضلية صافية",
    duration: "التزام 24 أسبوعاً",
    quote:
      "كطبيب، احترمت جداً منهجية حساب فرط النمو العضلي (Hypertrophy) وموازنة الجهد العصبي. لا توجد عشوائية أو هدر للطاقة؛ كل تمرين محسوب بالمللي.",
    rating: 5,
    tag: "بناء علمي",
  },
  {
    id: "spotlight-4",
    clientName: "عبدالرحمن البلوشي",
    role: "مدير تنفيذي - مسقط",
    program: "برنامج الأداء الرياضي الخاص",
    statNumber: "100%",
    statLabel: "استعادة اللياقة والنشاط",
    duration: "التزام 10 أسابيع",
    quote:
      "النظام الغذائي بدون حرمان قاسي هو ما جعل الاستمرارية سهلة وغير مجهدة. فقدت الشحم وحافظت على طاقتي في العمل واجتماعاتي بدون خمول.",
    rating: 5,
    tag: "نتائج مستدامة",
  },
];

function RatingStars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 fill-fitness-primary drop-shadow-[0_0_6px_rgba(34,197,94,0.45)]"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CenteredSpotlightSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const total = SPOTLIGHT_REVIEWS.length;

  const scrollToCard = (index) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      isProgrammaticScroll.current = true;
      setActiveIndex(index);

      targetCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = activeIndex === 0 ? total - 1 : activeIndex - 1;
    scrollToCard(prevIdx);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerCenter =
      container.getBoundingClientRect().left + container.offsetWidth / 2;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden py-14 md:py-24"
    >
      {/* هاله نور پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/2 start-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/10 blur-[130px]" />

      {/* سربرگ */}
      <div className="mx-auto max-w-6xl px-6 mb-8 text-center md:mb-12">
        <span className="inline-block rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3.5 py-1 text-xs font-bold text-fitness-primary mb-2.5 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
          توثيق حقيقي وملموس
        </span>
        <h2 className="text-2xl font-black tracking-tight md:text-4xl text-white">
          تجارب تصنع الفارق
        </h2>
        <p className="mt-1.5 text-xs text-fitness-muted md:text-sm max-w-lg mx-auto">
          نخبة من المشتركين يتحدثون عن كواليس تحولهم البدني والتزامهم بالبرنامج
        </p>
      </div>

      {/* کانتینر اسلایدر با هماهنگی روان و سخت‌افزاری */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full items-center gap-4 sm:gap-6 overflow-x-auto py-6 px-[10vw] sm:px-[20vw] md:px-[25vw] scroll-smooth no-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {SPOTLIGHT_REVIEWS.map((review, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={review.id}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => scrollToCard(index)}
              style={{
                scrollSnapAlign: "center",
                WebkitBackfaceVisibility: "hidden",
                transform: isActive ? "scale(1)" : "scale(0.92)",
                opacity: isActive ? 1 : 0.4,
              }}
              className="shrink-0 cursor-pointer select-none transition-all duration-500 ease-out will-change-transform w-[80vw] sm:w-[500px] md:w-[600px]"
            >
              <div
                className={`relative flex flex-col justify-between rounded-3xl border p-5 sm:p-7 md:p-8 backdrop-blur-xl transition-all duration-300 ${
                  isActive
                    ? "border-fitness-primary/50 bg-gradient-to-b from-fitness-surface via-[#0a140d] to-black shadow-[0_12px_35px_rgba(34,197,94,0.16)]"
                    : "border-fitness-border bg-fitness-surface"
                }`}
              >
                {/* ردیف بالا: بج و آمار عددی */}
                <div className="flex items-center justify-between gap-2 border-b border-fitness-border/40 pb-4">
                  <RatingStars count={review.rating} />
                  <span
                    className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${
                      isActive
                        ? "border border-fitness-primary/40 bg-fitness-primary/15 text-fitness-primary shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                        : "border border-fitness-border bg-fitness-surface-light text-fitness-muted"
                    }`}
                  >
                    {review.tag}
                  </span>
                </div>

                {/* آمار عددی تغییر وزن */}
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-fitness-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]">
                    {review.statNumber}
                  </span>
                  <span className="text-xs font-semibold text-fitness-muted">
                    {review.statLabel}
                  </span>
                </div>

                {/* متن نظر شاگرد */}
                <p className="my-5 text-xs sm:text-sm md:text-base leading-relaxed text-zinc-200 line-clamp-4 sm:line-clamp-none">
                  &ldquo;{review.quote}&rdquo;
                </p>

                {/* ردیف پایین: نام و مشخصات */}
                <div className="flex items-center justify-between border-t border-fitness-border/40 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-fitness-primary/30 bg-gradient-to-br from-fitness-primary/20 via-black to-zinc-900 font-black text-xs text-fitness-primary">
                      {review.clientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-white">
                        {review.clientName}
                      </h4>
                      <p className="text-[11px] text-fitness-muted">
                        {review.role} • {review.program}
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block rounded-lg border border-fitness-border/60 bg-fitness-surface-light px-2 py-0.5 text-[11px] font-semibold text-fitness-muted">
                    {review.duration}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* کنترلرها و شمارنده اسلاید */}
      <div className="mx-auto max-w-6xl px-6 mt-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm">
          <span className="font-bold text-fitness-primary">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-fitness-border">/</span>
          <span className="text-fitness-muted">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="السابق"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-fitness-border bg-fitness-surface text-white transition-all hover:border-fitness-primary hover:text-fitness-primary active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="التالي"
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-fitness-border bg-fitness-surface text-white transition-all hover:border-fitness-primary hover:text-fitness-primary active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
