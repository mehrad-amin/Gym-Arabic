"use client";

import React, { useState, useRef } from "react";

const DEFAULT_ARABIC_PLANS = [
  {
    id: "starter",
    title: "الباقة الأساسية",
    duration: "شهر واحد",
    price: "450 درهم / ر.س",
    features: [
      "جدول تمارين مخصص وفق تجهيزاتك (نادي / منزل)",
      "نظام غذائي محسوب السعرات والماكروز",
      "تقييم ومتابعة وتحديث الخطة كل أسبوعين",
      "دعم ومتابعة أسبوعية للإجابة على الاستفسارات",
    ],
    isPopular: false,
  },
  {
    id: "pro",
    title: "باقة التدريب المتقدم VIP",
    duration: "3 أشهر",
    price: "1,150 درهم / ر.س",
    features: [
      "تصميم جدول تدريبي شامل مع خطة مكملات متخصصة",
      "نظام غذائي مرن ومتنوع يلائم أسلوب حياتك",
      "مراجعة فيديوهات التمرين وتصحيح التكنيك باستمرار",
      "متابعة مباشرة وخاصة عبر واتساب طوال الأسبوع",
      "تحليل وتتبع أسبوعي للوزن والقياسات ونسبة الدهون",
    ],
    isPopular: true,
  },
  {
    id: "elite",
    title: "باقة التحول الشامل VIP",
    duration: "6 أشهر",
    price: "1,950 درهم / ر.س",
    features: [
      "برنامج تدريبي وتغذوي متقدم مع إعادة ضبط مستمرة",
      "متابعة يومية مباشرة وتصحيح فوري لأداء التمارين",
      "خطة خاصة لتثبيت الوزن والمحافظة على النتيجة",
      "استشارات غذائية وتعديل الجداول أثناء السفر",
      "أولوية التواصل المباشر 24/7 طوال فترة الاشتراك",
    ],
    isPopular: false,
  },
];

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-fitness-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PricingCard({ plan }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100),
    });

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={() => setIsInteracting(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        transform: isInteracting
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-6px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isInteracting
          ? "none"
          : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border p-6 xl:p-7 [transform-style:preserve-3d] ${
        plan.isPopular
          ? "border-fitness-primary/70 bg-gradient-to-b from-[#131d16] via-fitness-surface to-[#0a0d0c] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(34,197,94,0.18)]"
          : "border-fitness-border bg-gradient-to-b from-fitness-surface to-[#0b0e11] shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:border-fitness-border/90"
      }`}
    >
      {/* نور تعاملی */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${coords.x}% ${coords.y}%, rgba(34, 197, 94, 0.16), transparent 80%)`,
        }}
      />

      {/* هاله پشت پلن ویژه */}
      {plan.isPopular && (
        <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-fitness-primary/20 blur-3xl" />
      )}

      {/* بج سه بعدی پیشنهاد مربی */}
      <div className="min-h-[32px] flex items-center justify-start [transform:translateZ(30px)]">
        {plan.isPopular && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-fitness-primary/50 bg-fitness-primary/15 px-3 py-1 text-xs font-black text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.25)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fitness-primary" />
            </span>
            <span>الخيار الأكثر ترشيحاً</span>
          </span>
        )}
      </div>

      {/* محتوای بالایی کارت */}
      <div className="relative z-10 [transform:translateZ(20px)] mt-2">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-black text-white whitespace-nowrap">
            {plan.title}
          </h3>
          <span className="shrink-0 rounded-full border border-fitness-border bg-fitness-surface-light px-2.5 py-0.5 text-[11px] font-semibold text-fitness-muted">
            {plan.duration}
          </span>
        </div>

        {/* قیمت در یک خط بدون شکستن */}
        <div className="mt-4 flex items-baseline">
          <p className="text-2xl xl:text-3xl font-black tracking-tight text-fitness-primary drop-shadow-[0_0_12px_rgba(34,197,94,0.3)] whitespace-nowrap">
            {plan.price}
          </p>
        </div>

        {/* لیست ویژگی‌ها */}
        <ul className="mt-6 space-y-3 border-t border-fitness-border/60 pt-5">
          {plan.features.map((feat, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-xs leading-relaxed text-zinc-300"
            >
              <div className="rounded-md border border-fitness-primary/30 bg-fitness-primary/10 p-0.5 mt-0.5 shrink-0">
                <CheckIcon />
              </div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* دکمه انتخاب پلن */}
      <div className="relative z-10 mt-6 [transform:translateZ(25px)]">
        <a
          href="#booking"
          className={`block w-full rounded-2xl py-3.5 text-center text-xs font-black transition-all active:scale-[0.98] ${
            plan.isPopular
              ? "bg-fitness-primary text-black shadow-[0_0_25px_rgba(34,197,94,0.35)] hover:bg-fitness-primary-hover hover:shadow-[0_0_35px_rgba(34,197,94,0.5)]"
              : "border border-fitness-border bg-fitness-surface-light text-fitness-text hover:border-fitness-primary hover:text-white"
          }`}
        >
          اشترك في هذه الباقة
        </a>
      </div>
    </div>
  );
}

export default function PricingSection({ plans }) {
  const activePlans =
    plans && plans.length > 0 && !plans[0]?.title?.includes("پلن")
      ? plans
      : DEFAULT_ARABIC_PLANS;

  return (
    <section
      className="relative w-full border-t border-fitness-border py-16 md:py-24 overflow-hidden"
      dir="rtl"
    >
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-fitness-primary/5 blur-[150px]" />

      {/* تغییر مهم: افزایش عرض حداکثر کانتینر برای پهن شدن کارت‌ها */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-3.5 py-1 text-xs font-bold text-fitness-primary mb-3">
            استثمار في صحتك وبنائك البدني
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            باقات التدريب والاشتراكات
          </h2>
          <p className="mt-2 text-xs text-fitness-muted md:text-sm">
            اختر مستوى المتابعة الذي يتناسب مع أهدافك وجدولك اليومي
          </p>
        </div>

        {/* گرید ۳ ستونه متوازن در دسکتاپ و ۱ ستونه در موبایل */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {activePlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
