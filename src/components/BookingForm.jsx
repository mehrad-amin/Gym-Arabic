// src/components/BookingForm.jsx
"use client";

import { useState, useEffect } from "react";
import { PRICING_PLANS } from "@/constants/fitnessData";

const BOOKING_UI_TEXT = {
  ar: {
    planSectionTitle: "اختر الباقة التدريبية المناسبة لك",
    linkedBiometricsTitle: "البيانات الحيوية وخارطة التحول المرتبطة:",
    clearDataBtn: "مسح البيانات",
    weightLabel: "الوزن الحالي",
    heightLabel: "الطول",
    caloriesLabel: "السعرات اليومية",
    strategyLabel: "الاستراتيجية",
    targetProjectionLabel: "الهدف بعد 12 أسبوعاً",
    nutritionLabel: "منهجية التغذية",
    supplementsLabel: "بروتوكول المكملات",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: أحمد المنصوري",
    phoneLabel: "رقم الواتساب (للتواصل واستلام البرنامج)",
    phonePlaceholder: "+971 50 xxx xxxx",
    goalLabel: "الهدف الأساسي من البرنامج",
    experienceLabel: "الخبرة في التدريب المنتظم",
    notesLabel: "ملاحظات إضافية أو إصابات سابقة (اختياري)",
    notesPlaceholder:
      "أي إصابات مفاصل، حساسيات غذائية أو تفضيلات ترغب بمشاركتها مع الكابتن...",
    submitLoading: "جاري إرسال البيانات وحجز الخطة...",
    submitPrefix: "تأكيد الاشتراك في",
    submitSuffix: "والبدء فوراً",
    defaultError: "حدث خطأ أثناء تسجيل البيانات، يرجى المحاولة لاحقاً.",
    unexpectedError: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.",
    success: {
      title: "تم تسجيل بياناتك بنجاح!",
      confirmed: "تم اختيار:",
      desc: "تم استلام ملفك الرياضي وخارطة تحولك. لتسريع عملية التحليل وبدء استلام جدولك التدريبي، يمكنك مراسلة الكابتن مباشرة عبر واتساب.",
      whatsappBtn: "تأكيد الحجز ومراسلة المدرب عبر واتساب",
      newFormBtn: "تسجيل طلب جديد",
      waHello: "مرحباً كابتن 👋",
      waIm: "أنا",
      waRegistered: "قمت بالتسجيل عبر الموقع في:",
      waFileTag: "رقم الملف:",
      waBiometrics: "📊 ملخص الخطة والبيانات الحيوية:",
      waCurrentWeight: "الوزن الحالي",
      waTargetWeight: "الهدف المتوقع (12 أسبوع)",
      waCalories: "السعرات المستهدفة",
      waReady: "جاهز لبدء الخطة التدريبية والمتابعة معك إن شاء الله.",
    },
    goals: [
      { id: "cut", label: "خسارة الدهون والتنشيف العضلي" },
      { id: "bulk", label: "البناء والضخامة العضلية الصافية" },
      { id: "maintain", label: "تحسين اللياقة وإعادة التشكيل البدني" },
      { id: "competition", label: "الإعداد الرياضي والمنافسات" },
    ],
    experienceLevels: [
      { id: "beginner", label: "مبتدئ (أقل من 6 أشهر)" },
      { id: "intermediate", label: "متوسط (1 إلى 3 سنوات)" },
      { id: "advanced", label: "متقدم (أكثر من 3 سنوات)" },
    ],
    nutritionMap: {
      coached: "خطة مخصصة ومحسوبة الغرامات",
      home: "أكل منزلي عام",
    },
    supplementsMap: {
      essential: "مكملات أساسية (واي + كرياتين)",
      none: "أغذية طبيعية فقط",
    },
  },
  en: {
    planSectionTitle: "Select Your Preferred Coaching Tier",
    linkedBiometricsTitle: "Linked Biometric Assessment & Roadmap:",
    clearDataBtn: "Clear Metrics",
    weightLabel: "Current Weight",
    heightLabel: "Height",
    caloriesLabel: "Daily Calories",
    strategyLabel: "Strategy",
    targetProjectionLabel: "12-Week Target",
    nutritionLabel: "Dietary Protocol",
    supplementsLabel: "Supplement Support",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. John Doe",
    phoneLabel: "WhatsApp Number (For Direct Delivery & Check-ins)",
    phonePlaceholder: "+971 50 xxx xxxx",
    goalLabel: "Primary Training Objective",
    experienceLabel: "Regular Weight Training Experience",
    notesLabel: "Additional Notes or Past Injuries (Optional)",
    notesPlaceholder:
      "Any joint discomfort, dietary preferences, or specific notes you want to share with Coach...",
    submitLoading: "Processing application & securing spot...",
    submitPrefix: "Confirm Enrollment in",
    submitSuffix: "and Start Now",
    defaultError:
      "An error occurred while submitting your info. Please try again.",
    unexpectedError: "An unexpected error occurred. Please try again.",
    success: {
      title: "Your Application Has Been Received!",
      confirmed: "Selected Tier:",
      desc: "Your athletic assessment and transformation roadmap are logged. To expedite your onboarding and receive your custom plan, connect with Coach directly on WhatsApp.",
      whatsappBtn: "Confirm on WhatsApp & Connect with Coach",
      newFormBtn: "Submit Another Request",
      waHello: "Hello Coach 👋",
      waIm: "I am",
      waRegistered: "I registered on your website for:",
      waFileTag: "File ID:",
      waBiometrics: "📊 Biometrics & Projected Roadmap Summary:",
      waCurrentWeight: "Current Weight",
      waTargetWeight: "12-Wk Target Weight",
      waCalories: "Target Calories",
      waReady: "I am ready to review my onboarding assessment and get started.",
    },
    goals: [
      { id: "cut", label: "Fat Loss & Muscle Definition (Cut)" },
      { id: "bulk", label: "Hypertrophy & Lean Mass Building (Bulk)" },
      { id: "maintain", label: "Recomposition & Overall Athleticism" },
      { id: "competition", label: "Athletic Conditioning & Competition Prep" },
    ],
    experienceLevels: [
      { id: "beginner", label: "Beginner (< 6 months)" },
      { id: "intermediate", label: "Intermediate (1–3 years)" },
      { id: "advanced", label: "Advanced (> 3 years)" },
    ],
    nutritionMap: {
      coached: "Precision Macro Protocol (Gram-Calculated)",
      home: "General Home Meals",
    },
    supplementsMap: {
      essential: "Performance Stack (Whey + Creatine)",
      none: "Whole Foods Only",
    },
  },
};

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

export default function BookingForm({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const ui = BOOKING_UI_TEXT[lang] || BOOKING_UI_TEXT.ar;

  const availablePlans = PRICING_PLANS[lang] || PRICING_PLANS.ar;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    selectedPlan: "pro",
    goal: "cut",
    experience: "beginner",
    notes: "",
  });

  const [isMounted, setIsMounted] = useState(false);
  const [calcData, setCalcData] = useState(null);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
  });
  const [coachPhone, setCoachPhone] = useState("");
  const [fileId, setFileId] = useState("");

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = sessionStorage.getItem("user_fitness_data");
      if (stored) {
        setCalcData(JSON.parse(stored));
      }
    } catch (_) {}

    const handlePlanSelect = (e) => {
      if (e.detail?.planId) {
        setFormData((prev) => ({ ...prev, selectedPlan: e.detail.planId }));
      }
    };

    const handleUpdate = (event) => {
      const data = event?.detail || null;
      setCalcData(data);

      if (data?.result?.goalKey) {
        setFormData((prev) => ({
          ...prev,
          goal: data.result.goalKey,
        }));
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
      window.dispatchEvent(
        new CustomEvent("fitness_calc_updated", { detail: null }),
      );
    } catch (_) {}
    setCalcData(null);
  };

  const selectedPlanDetails =
    availablePlans.find((p) => p.id === formData.selectedPlan) ||
    availablePlans[1];

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

    const currentGoalLabel =
      ui.goals.find((g) => g.id === formData.goal)?.label || formData.goal;
    const currentExpLabel =
      ui.experienceLevels.find((exp) => exp.id === formData.experience)
        ?.label || formData.experience;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          selectedPlan: selectedPlanDetails.title,
          planDuration: selectedPlanDetails.duration,
          goal: currentGoalLabel,
          goalKey: formData.goal,
          experience: currentExpLabel,
          notes: formData.notes,
          calculatedStats: currentStats || null,
          locale: lang,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || ui.defaultError);
      }

      setCoachPhone(
        data.coachPhone || process.env.NEXT_PUBLIC_COACH_WHATSAPP_PHONE || "",
      );
      setFileId(data.fileId || "");
      setStatus({ loading: false, success: true, error: "" });

      try {
        sessionStorage.removeItem("user_fitness_data");
      } catch (_) {}
      setCalcData(null);
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || ui.unexpectedError,
      });
    }
  };

  if (status.success) {
    const fileTag = fileId
      ? `\n📁 ${ui.success.waFileTag} \`\`\`${fileId}\`\`\``
      : "";

    // استخراج خلاصه بیومتریک برای متن واتساپ مربی
    let biometricsSummary = "";
    if (calcData) {
      const cWeight = calcData.weight ? `${calcData.weight} kg` : "-";
      const tWeight = calcData.result?.projection?.estimatedWeight || "-";
      const cKcal = calcData.result?.targetCalories
        ? `${calcData.result.targetCalories} kcal`
        : "-";
      biometricsSummary = `\n\n${ui.success.waBiometrics}\n• ${ui.success.waCurrentWeight}: ${cWeight}\n• ${ui.success.waTargetWeight}: ${tWeight}\n• ${ui.success.waCalories}: ${cKcal}`;
    }

    const waText = encodeURIComponent(
      `${ui.success.waHello}\n${ui.success.waIm} ${formData.name}, ${ui.success.waRegistered}\n- ${selectedPlanDetails.title} (${selectedPlanDetails.duration})${fileTag}${biometricsSummary}\n\n${ui.success.waReady}`,
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
          {ui.success.title}
        </h3>
        <p className="mx-auto mt-2 text-sm text-fitness-primary font-bold">
          {ui.success.confirmed} {selectedPlanDetails.title} (
          {selectedPlanDetails.duration})
        </p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-fitness-muted md:text-sm">
          {ui.success.desc}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-fitness-primary px-8 py-4 font-black text-black shadow-[0_0_25px_rgba(34,197,94,0.35)] transition-all hover:bg-fitness-primary-hover active:scale-[0.98] sm:w-auto"
          >
            <span>{ui.success.whatsappBtn}</span>
            <span
              className={`text-sm transition-transform duration-200 ${
                isRtl ? "rotate-180" : ""
              }`}
            >
              →
            </span>
          </a>

          <button
            type="button"
            onClick={() => {
              setFormData({
                name: "",
                phone: "",
                selectedPlan: "pro",
                goal: "cut",
                experience: "beginner",
                notes: "",
              });
              setFileId("");
              setStatus({ loading: false, success: false, error: "" });
            }}
            className="w-full rounded-2xl border border-fitness-border bg-zinc-950/70 px-6 py-4 text-xs font-bold text-zinc-300 transition-colors hover:text-white sm:w-auto cursor-pointer"
          >
            {ui.success.newFormBtn}
          </button>
        </div>
      </div>
    );
  }

  const displayCalories =
    calcData?.result?.targetCalories ||
    calcData?.result?.tdee ||
    calcData?.result?.cutting;

  const currentGoalOption = ui.goals.find(
    (g) => g.id === (calcData?.result?.goalKey || formData.goal),
  );
  const goalDisplayName =
    currentGoalOption?.label || calcData?.result?.goal || "";

  const projectedWeightDisplay =
    calcData?.result?.projection?.estimatedWeight || null;

  const currentNutritionLabel = ui.nutritionMap[calcData?.nutrition] || null;
  const currentSupplementsLabel =
    ui.supplementsMap[calcData?.supplements] || null;

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-fitness-border bg-gradient-to-b from-fitness-surface via-[#0d1110] to-black p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] md:p-10">
      <div className="pointer-events-none absolute -top-20 -start-20 h-64 w-64 rounded-full bg-fitness-primary/10 blur-[100px]" />

      {/* نمایش مشخصات بیومتریک و نقشه راه استخراج‌شده از ماشین‌حساب */}
      {isMounted && calcData && (
        <div className="mb-8 overflow-hidden rounded-2xl border border-fitness-primary/40 bg-gradient-to-r from-fitness-primary/10 via-[#0d1a12] to-black p-4 shadow-[0_0_25px_rgba(34,197,94,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fitness-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fitness-primary" />
              </span>
              <span className="font-mono text-xs font-bold tracking-wider text-fitness-primary">
                {ui.linkedBiometricsTitle}
              </span>
            </div>

            <button
              type="button"
              onClick={handleClearCalcData}
              className="cursor-pointer text-[11px] text-zinc-400 underline transition-colors hover:text-red-400"
            >
              {ui.clearDataBtn}
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 text-center font-mono">
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">
                {ui.weightLabel}
              </span>
              <p className="text-xs font-bold text-white">
                {calcData.weight} kg
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">
                {ui.heightLabel}
              </span>
              <p className="text-xs font-bold text-white">
                {calcData.height} cm
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">
                {ui.caloriesLabel}
              </span>
              <p className="text-xs font-bold text-fitness-primary">
                {displayCalories} kcal
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800/80 bg-black/50 p-2">
              <span className="text-[10px] text-zinc-500 font-sans">
                {ui.strategyLabel}
              </span>
              <p className="text-xs font-bold text-emerald-400 truncate font-sans">
                {goalDisplayName}
              </p>
            </div>
          </div>

          {/* ردیف تکمیلی: هدف ۱۲ هفته‌ای، تغذیه و مکمل */}
          {(projectedWeightDisplay || currentNutritionLabel) && (
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-zinc-800/60 bg-black/40 px-3 py-2 text-[11px]">
              {projectedWeightDisplay && (
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">
                    {ui.targetProjectionLabel}:
                  </span>
                  <span className="font-mono font-bold text-fitness-primary">
                    {projectedWeightDisplay}
                  </span>
                </div>
              )}
              {currentNutritionLabel && (
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">{ui.nutritionLabel}:</span>
                  <span className="text-zinc-200">{currentNutritionLabel}</span>
                </div>
              )}
              {currentSupplementsLabel && (
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500">{ui.supplementsLabel}:</span>
                  <span className="text-zinc-200">
                    {currentSupplementsLabel}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ۱. انتخاب پکیج */}
        <div>
          <label className="mb-2.5 block text-xs font-bold text-white">
            {ui.planSectionTitle}
            <span className="text-fitness-primary ms-1">*</span>
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {availablePlans.map((plan) => {
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
                  {plan.isPopular && (
                    <span className="absolute -top-2.5 end-3 rounded-full border border-fitness-primary/50 bg-fitness-primary px-2 py-0.5 text-[9px] font-black text-black">
                      VIP
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
                      {plan.price}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ۲. نام و تلفن */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="booking-name"
              className="mb-2 block text-xs font-medium text-fitness-muted"
            >
              {ui.nameLabel}
            </label>
            <input
              id="booking-name"
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={ui.namePlaceholder}
              className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
            />
          </div>

          <div>
            <label
              htmlFor="booking-phone"
              className="mb-2 block text-xs font-medium text-fitness-muted"
            >
              {ui.phoneLabel}
            </label>
            <input
              id="booking-phone"
              type="tel"
              name="phone"
              required
              dir="ltr"
              value={formData.phone}
              onChange={handleChange}
              placeholder={ui.phonePlaceholder}
              className={`w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 font-mono text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary ${
                isRtl ? "text-end" : "text-start"
              }`}
            />
          </div>
        </div>

        {/* ۳. هدف از برنامه */}
        <div>
          <label
            htmlFor="booking-goal"
            className="mb-2 block text-xs font-medium text-fitness-muted"
          >
            {ui.goalLabel}
          </label>
          <select
            id="booking-goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
          >
            {ui.goals.map((g) => (
              <option
                key={g.id}
                value={g.id}
                className="bg-zinc-900 text-white"
              >
                {g.label}
              </option>
            ))}
          </select>
        </div>

        {/* ۴. سابقه تمرینی */}
        <div>
          <span className="mb-2 block text-xs font-medium text-fitness-muted">
            {ui.experienceLabel}
          </span>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {ui.experienceLevels.map((exp) => (
              <button
                key={exp.id}
                type="button"
                onClick={() =>
                  setFormData((p) => ({ ...p, experience: exp.id }))
                }
                className={`cursor-pointer rounded-xl border p-3 text-xs font-bold transition-all ${
                  formData.experience === exp.id
                    ? "border-fitness-primary bg-fitness-primary/15 text-fitness-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                    : "border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {exp.label}
              </button>
            ))}
          </div>
        </div>

        {/* ۵. یادداشت اختیاری */}
        <div>
          <label
            htmlFor="booking-notes"
            className="mb-2 block text-xs font-medium text-fitness-muted"
          >
            {ui.notesLabel}
          </label>
          <textarea
            id="booking-notes"
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder={ui.notesPlaceholder}
            className="w-full rounded-xl border border-fitness-border bg-zinc-950/70 p-3.5 text-sm text-fitness-text outline-none transition-colors focus:border-fitness-primary"
          />
        </div>

        {status.error && (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
            {status.error}
          </p>
        )}

        {/* دکمه ارسال نهایی */}
        <button
          type="submit"
          disabled={status.loading}
          className="w-full cursor-pointer rounded-2xl bg-fitness-primary py-4 text-center font-black text-black shadow-[0_0_30px_rgba(34,197,94,0.35)] transition-all hover:bg-fitness-primary-hover active:scale-[0.98] disabled:opacity-50"
        >
          {status.loading
            ? ui.submitLoading
            : `${ui.submitPrefix} ${selectedPlanDetails.title} ${ui.submitSuffix}`}
        </button>
      </form>
    </div>
  );
}
