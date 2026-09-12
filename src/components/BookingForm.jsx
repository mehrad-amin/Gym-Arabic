"use client";

import { useState, useEffect } from "react";

const PLAN_OPTIONS = [
  {
    id: "starter",
    title: "الباقة الأساسية",
    duration: "شهر واحد",
    price: "450 درهم / ر.س",
  },
  {
    id: "pro",
    title: "باقة التدريب المتقدم VIP",
    duration: "3 أشهر",
    price: "1,150 درهم / ر.س",
    badge: "الأكثر طلباً",
  },
  {
    id: "elite",
    title: "باقة التحول الشامل VIP",
    duration: "6 أشهر",
    price: "1,950 درهم / ر.س",
  },
];

const INITIAL_FORM_DATA = {
  name: "",
  phone: "",
  selectedPlan: "pro", // پیش‌فرض پلن محبوب
  goal: "التنشيف وحرق الدهون",
  experience: "مبتدئ (أقل من 6 أشهر)",
  notes: "",
};

const GOAL_OPTIONS = [
  "التنشيف وحرق الدهون",
  "الضخامة والبناء العضلي",
  "اللياقة والصحة العامة",
  "الإعداد للبطولات والمنافسات",
];

const EXPERIENCE_OPTIONS = [
  "مبتدئ (أقل من 6 أشهر)",
  "متوسط (1 إلى 3 سنوات)",
  "متقدم (أكثر من 3 سنوات)",
];

function SuccessCheckIcon() {
  return (
    <svg
      className="h-8 w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function BookingForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isMounted, setIsMounted] = useState(false);
  const [calcData, setCalcData] = useState(null);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [coachPhone, setCoachPhone] = useState("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = sessionStorage.getItem("user_fitness_data");
      if (stored) {
        setCalcData(JSON.parse(stored));
      }
    } catch (_) {}

    // گوش دادن به تغییر پلن از بخش تعرفه‌ها (در صورت ارسال رویداد)
    const handlePlanSelect = (e) => {
      if (e.detail?.planId) {
        setFormData((prev) => ({ ...prev, selectedPlan: e.detail.planId }));
      }
    };

    const handleUpdate = (event) => {
      const data = event?.detail || null;
      setCalcData(data);

      if (data?.result?.goalKey) {
        if (data.result.goalKey === "cut") {
          setFormData((prev) => ({ ...prev, goal: "التنشيف وحرق الدهون" }));
        } else if (data.result.goalKey === "bulk") {
          setFormData((prev) => ({ ...prev, goal: "الضخامة والبناء العضلي" }));
        } else if (data.result.goalKey === "maintain") {
          setFormData((prev) => ({ ...prev, goal: "اللياقة والصحة العامة" }));
        }
      }
    };

    window.addEventListener("fitness_calc_updated", handleUpdate);
    window.addEventListener("fitness_plan_selected", handlePlanSelect);

    return () => {
      window.removeEventListener("fitness_calc_updated", handleUpdate);
      window.removeEventListener("fitness_plan_selected", handlePlanSelect);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearCalcData = () => {
    try {
      sessionStorage.removeItem("user_fitness_data");
    } catch (_) {}
    setCalcData(null);
  };

  const selectedPlanDetails =
    PLAN_OPTIONS.find((p) => p.id === formData.selectedPlan) || PLAN_OPTIONS[1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    let currentStats = calcData;
    if (!currentStats) {
      try {
        const stored = sessionStorage.getItem("user_fitness_data");
        if (stored) currentStats = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          selectedPlan: selectedPlanDetails.title,
          planDuration: selectedPlanDetails.duration,
          goal: formData.goal,
          experience: formData.experience,
          notes: formData.notes,
          calculatedStats: currentStats || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error || "حدث خطأ أثناء تسجيل البيانات، يرجى المحاولة لاحقاً.",
        );
      }

      setCoachPhone(
        data.coachPhone || process.env.NEXT_PUBLIC_COACH_WHATSAPP_PHONE || "",
      );
      setStatus({ loading: false, success: true, error: "" });

      try {
        sessionStorage.removeItem("user_fitness_data");
      } catch (_) {}
      setCalcData(null);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.",
      });
    }
  };

  if (status.success) {
    // درج دقیق دوره انتخاب‌شده در پیام واتس‌اپ
    const waText = encodeURIComponent(
      `مرحباً كابتن، قمت بالتسجيل عبر الموقع للحصول على خطة تدريبية.\nالاسم: ${formData.name}\nالباقة المختارة: ${selectedPlanDetails.title} (${selectedPlanDetails.duration})\nالهدف: ${formData.goal}`,
    );
    const whatsappDirectUrl = coachPhone
      ? `https://wa.me/${coachPhone.replace(/\+/g, "")}?text=${waText}`
      : "https://wa.me/";

    return (
      <div className="relative overflow-hidden rounded-[2.5rem] border border-fitness-primary/40 bg-gradient-to-b from-[#101b14] via-fitness-surface to-black p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(34,197,94,0.15)] md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-fitness-primary/50 bg-fitness-primary/20 text-fitness-primary shadow-[0_0_25px_rgba(34,197,94,0.4)]">
          <SuccessCheckIcon />
        </div>

        <h3 className="mt-6 text-2xl font-black text-white">
          تم تسجيل بياناتك بنجاح!
        </h3>
        <p className="mx-auto mt-2 text-sm text-fitness-primary font-bold">
          تم تثبيت اختيارك: {selectedPlanDetails.title} ({selectedPlanDetails.duration})
        </p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-fitness-muted md:text-sm">
          تم استلام ملفك الرياضي. لتسريع عملية التحليل وبدء استلام جدولك
          التدريبي، يمكنك بدء المحادثة مباشرة مع الكابتن عبر واتساب.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-fitness-primary px-8 py-4 font-black text-black shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all hover:bg-fitness-primary-hover active:scale-[0.98] sm:w-auto"
          >
            <span>تأكيد الحجز ومراسلة المدرب عبر واتساب</span>
            <span className="text-sm rtl:rotate-180">←</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setFormData(INITIAL_FORM_DATA);
              setStatus({ loading: false, success: false, error: "" });
            }}
            className="w-full rounded-2xl border border-fitness-border bg-zinc-950/70 px-6 py-4 text-xs font-bold text-zinc-300 transition-colors hover:text-white sm:w-auto"
          >
            تسجيل نموذج جديد
          </button>
        </div>
      </div>
    );
  }

  const displayCalories =
    calcData?.result?.targetCalories ||
    calcData?.result?.tdee ||
    calcData?.result?.cutting;

  const goalName =
    calcData?.result?.goal ||
    (calcData?.result?.goalKey === "bulk"
      ? "الضخامة والبناء العضلي"
      : calcData?.result?.goalKey === "maintain"
        ? "اللياقة والصحة العامة"
        : "التنشيف وحرق الدهون");

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-fitness-border bg-gradient-to-b from-fitness-surface via-[#0d1110] to-black p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] md:p-10">
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-fitness-primary/10 blur-[100px]" />

      {/* اطلاعات بیومتریک در صورت محاسبه ماشین حساب */}
      {isMounted && calcData && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-fitness-primary/40 bg-gradient-to-r from-fitness-primary/10 via-[#0d1a12] to-black p-4 shadow-[0_0_25px_rgba(34,197,94,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fitness-primary" />
              </span>
              <span className="font-mono text-xs font-bold tracking-wider text-fitness-primary">
                البيانات الحيوية المرتبطة:
              </span>
            </div>

            <button
              type="button"
              onClick={handleClearCalcData}
              className="cursor-pointer text-[11px] text-zinc-400 underline transition-colors hover:text-red-400"
            >
              مسح البيانات
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-center font-mono">
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">الوزن</span>
              <p className="text-xs font-bold text-white">
                {calcData.weight} kg
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">الطول</span>
              <p className="text-xs font-bold text-white">
                {calcData.height} cm
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">
                السعرات اليومية
              </span>
              <p className="text-xs font-bold text-fitness-primary">
                {displayCalories} kcal
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">
                الاستراتيجية
              </span>
              <p className="text-xs font-bold text-emerald-400 truncate font-sans">
                {goalName}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ۱. بخش جدید: انتخاب دوره و پلن تمرینی */}
        <div>
          <label className="mb-2.5 block text-xs font-bold text-white">
            اختر الباقة التدريبية المناسبة لك
            <span className="text-fitness-primary ms-1">*</span>
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {PLAN_OPTIONS.map((plan) => {
              const isSelected = formData.selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, selectedPlan: plan.id }))
                  }
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 text-start transition-all ${
                    isSelected
                      ? "border-fitness-primary bg-gradient-to-b from-fitness-primary/20 via-fitness-surface to-black shadow-[0_0_20px_rgba(34,197,94,0.22)] ring-1 ring-fitness-primary/50"
                      : "border-fitness-border bg-zinc-950/60 hover:border-zinc-700"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 end-3 rounded-full border border-fitness-primary/50 bg-fitness-primary px-2 py-0.5 text-[9px] font-black text-black">
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-xs font-black ${
                        isSelected ? "text-fitness-primary" : "text-white"
                      }`}
                    >
                      {plan.title}
                    </span>
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-fitness-primary bg-fitness-primary"
                          : "border-zinc-700 bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      )}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between border-t border-fitness-border/40 pt-2.5">
                    <span className="text-[11px] font-semibold text-fitness-muted">
                      {plan.duration}
                    </span>
                    <span className="font-mono text-xs font-bold text-white">
                      {plan.price.split(" ")[0]}{" "}
                      <span className="text-[9px] font-sans text-fitness-muted">
                        درهم
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ۲. نام و شماره واتساپ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="booking-name"
              className="mb-2 block text-xs font-medium text-fitness-muted"
            >
              الاسم الكامل
            </label>
            <input
              id="booking-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="مثال: أحمد المطيري"
              className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
            />
          </div>

          <div>
            <label
              htmlFor="booking-phone"
              className="mb-2 block text-xs font-medium text-fitness-muted"
            >
              رقم الواتساب (للتواصل والمتابعة)
            </label>
            <input
              id="booking-phone"
              type="tel"
              name="phone"
              required
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+971 50 xxx xxxx"
              className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-right font-mono text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
            />
          </div>
        </div>

        {/* ۳. هدف تمرینی */}
        <div>
          <label
            htmlFor="booking-goal"
            className="mb-2 block text-xs font-medium text-fitness-muted"
          >
            الهدف الأساسي من البرنامج
          </label>
          <select
            id="booking-goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
          >
            {GOAL_OPTIONS.map((g) => (
              <option key={g} value={g} className="bg-zinc-900 text-white">
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* ۴. سابقه تمرین */}
        <div>
          <span className="mb-2 block text-xs font-medium text-fitness-muted">
            الخبرة في التدريب المنتظم
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {EXPERIENCE_OPTIONS.map((exp) => (
              <button
                key={exp}
                type="button"
                onClick={() => setFormData((p) => ({ ...p, experience: exp }))}
                className={`cursor-pointer rounded-xl border p-3 text-xs font-bold transition-all ${
                  formData.experience === exp
                    ? "border-fitness-primary bg-fitness-primary/15 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>

        {/* ۵. توضیحات اختیاری */}
        <div>
          <label
            htmlFor="booking-notes"
            className="mb-2 block text-xs font-medium text-fitness-muted"
          >
            ملاحظات إضافية أو إصابات سابقة (اختياري)
          </label>
          <textarea
            id="booking-notes"
            rows="3"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="أي إصابات مفاصل، تفضيلات غذائية أو ملاحظات خاصة ترغب بمشاركتها..."
            className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
          />
        </div>

        {status.error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            {status.error}
          </p>
        )}

        {/* دکمه سابمیت */}
        <button
          type="submit"
          disabled={status.loading}
          className="w-full cursor-pointer rounded-2xl bg-fitness-primary py-4 text-center font-black text-black shadow-[0_0_30px_rgba(34,197,94,0.35)] transition-all hover:bg-fitness-primary-hover active:scale-[0.98] disabled:opacity-50"
        >
          {status.loading
            ? "جاري إرسال البيانات وحجز الخطة..."
            : `تأكيد اشتراك ${selectedPlanDetails.title} والبدء فوراً`}
        </button>
      </form>
    </div>
  );
}