"use client";

import React, { useRef, useState } from "react";
import { CONTACT_INFO } from "@/constants/fitnessData";

function PhoneIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      className="h-4 w-4 fill-current text-fitness-primary"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      className="h-4 w-4 fill-current text-fitness-primary"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function Contact3DCard({ children, className = "" }) {
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
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isInteracting
          ? "none"
          : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-fitness-border bg-gradient-to-b from-fitness-surface to-[#0a0d0c] p-7 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-colors hover:border-fitness-primary/50 [transform-style:preserve-3d] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}% ${coords.y}%, rgba(34, 197, 94, 0.15), transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex h-full flex-col justify-between [transform:translateZ(20px)]">
        {children}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const whatsappUrl =
    CONTACT_INFO.whatsappUrl ||
    `https://wa.me/${CONTACT_INFO.phone?.replace(/[^0-9]/g, "")}`;

  const appleMapsUrl =
    CONTACT_INFO.appleMapsUrl ||
    `https://maps.apple.com/?q=${encodeURIComponent(CONTACT_INFO.address || "Dubai")}`;

  return (
    <section className="relative w-full border-t border-fitness-border py-16 md:py-24 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fitness-primary/5 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-fitness-primary/30 bg-fitness-primary/10 px-4 py-1 text-xs font-bold text-fitness-primary mb-3">
            قنوات التواصل المباشر
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            معلومات التواصل ومقر التدريب
          </h2>
          <p className="mt-2 text-xs text-fitness-muted md:text-sm">
            للاستشارات الخاصة، فحص البنية العضلية وحجز جلسات التدريب الشخصي
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* کارت ۱: تماس مستقیم و ساعات کاری */}
          <Contact3DCard>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-primary/30 bg-fitness-primary/10 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <PhoneIcon />
              </div>
              <h3 className="mt-5 text-lg font-black text-white">
                الاتصال والاستشارة الهاتفية
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-fitness-muted">
                للإجابة على الأسئلة قبل الاشتراك وحجز مواعيد التدريب الخاص:
              </p>

              <div className="mt-5">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2 rounded-xl border border-fitness-primary/40 bg-black/40 px-4 py-2.5 font-mono text-base font-black tracking-wider text-fitness-primary shadow-inner transition-all hover:bg-fitness-primary hover:text-black"
                >
                  <PhoneIcon />
                  <span>{CONTACT_INFO.displayPhone || CONTACT_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-fitness-border/60 pt-4">
              <span className="text-[11px] font-medium text-fitness-muted">
                ساعات الاستجابة ومواعيد التدريب:
              </span>
              <p className="mt-1 text-xs font-bold text-zinc-200">
                {CONTACT_INFO.workingHours}
              </p>
            </div>
          </Contact3DCard>

          {/* کارت ۲: شبکه‌های اجتماعی (واتس‌اپ و اینستاگرام) */}
          <Contact3DCard>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-primary/30 bg-fitness-primary/10 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <ChatIcon />
              </div>
              <h3 className="mt-5 text-lg font-black text-white">
                المحادثة وقنوات التواصل
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-fitness-muted">
                متابعة اليوميات الرياضية، شروحات التكنيك والتواصل الفوري:
              </p>

              <div className="mt-5 space-y-2.5">
                {/* واتس‌اپ */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 transition-all hover:border-fitness-primary hover:bg-fitness-primary/10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-fitness-primary/15 p-1.5">
                      <WhatsAppIcon />
                    </div>
                    <span className="text-xs font-bold text-zinc-200 group-hover/item:text-white">
                      محادثة واتساب المباشرة
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-fitness-muted group-hover/item:text-fitness-primary">
                    WhatsApp Chat
                  </span>
                </a>

                {/* اینستاگرام */}
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-3 transition-all hover:border-fitness-primary hover:bg-fitness-primary/10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-fitness-primary/15 p-1.5">
                      <InstagramIcon />
                    </div>
                    <span className="text-xs font-bold text-zinc-200 group-hover/item:text-white">
                      حساب إنستغرام الرسمي
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-fitness-muted group-hover/item:text-fitness-primary">
                    @{CONTACT_INFO.instagramUsername}
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-fitness-border/60 pt-3 text-[11px] text-fitness-muted">
              استجابة فورية عبر واتساب وإنستغرام خلال ساعات العمل
            </div>
          </Contact3DCard>

          {/* کارت ۳: موقعیت مکانی و ناوبری */}
          <Contact3DCard>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fitness-primary/30 bg-fitness-primary/10 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <MapPinIcon />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  الموقع متاح ومفعّل
                </span>
              </div>

              <h3 className="mt-5 text-lg font-black text-white">
                مقر التدريب والصالة الرياضية
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-fitness-muted">
                {CONTACT_INFO.address}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 border-t border-fitness-border/60 pt-4">
                <a
                  href={CONTACT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-fitness-border bg-zinc-950/70 py-3 text-center text-xs font-black text-zinc-200 transition-all hover:border-fitness-primary hover:bg-fitness-primary hover:text-black shadow-sm"
                >
                  Google Maps
                </a>
                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-fitness-border bg-zinc-950/70 py-3 text-center text-xs font-black text-zinc-200 transition-all hover:border-fitness-primary hover:bg-fitness-primary hover:text-black shadow-sm"
                >
                  Apple Maps
                </a>
              </div>
            </div>
          </Contact3DCard>
        </div>
      </div>
    </section>
  );
}
