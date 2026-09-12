import FitnessCalculator from "@/components/FitnessCalculator";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BookingForm from "@/components/BookingForm";
import {
  SERVICES,
  TRANSFORMATIONS,
  PRICING_PLANS,
  FAQS,
} from "@/constants/fitnessData";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-fitness-primary"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

export default function FitnessLandingPage() {
  return (
    <main className="flex flex-col items-center justify-between">
      {/* ۱. هیرو سکشن */}
      <HeroSection />

      {/* ۲. سرویس‌ها و متدولوژی علمی */}
      <MethodologySection services={SERVICES} />

      {/* ۳. اثبات بصری: نتایج واقعی قبل و بعد (انتقال به قبل از ماشین‌حساب) */}
      <section className="w-full border-t border-fitness-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-black md:text-3xl text-white">
              نتائج حقيقية بدون فلاتر
            </h2>
            <p className="mt-2 text-sm text-fitness-muted">
              اسحب المؤشر لمشاهدة الفارق والتحول البدني للمشتركين
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {TRANSFORMATIONS.map((item) => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ۴. اثبات روایی: نظرات و رضایت شاگردان */}
      <TestimonialsSection />

      {/* ۵. ماشین‌حساب BMR / TDEE (ارزیابی وضعیت بدنی خود کاربر) */}
      <section
        id="calculator"
        className="w-full border-t border-fitness-border py-20"
      >
        <div className="mx-auto max-w-4xl px-6">
          <FitnessCalculator />
        </div>
      </section>

      {/* ۶. تعرفه‌ها و پکیج‌ها */}
      <PricingSection plans={PRICING_PLANS} />

      {/* ۷. سوالات متداول (رفع شک و تردیدها راجع به هزینه‌ها و نحوه ارسال برنامه) */}
      <FaqSection faqs={FAQS} />

      {/* ۸. راه‌های ارتباطی و اطلاعات تماس سریع */}
      <ContactSection />

      {/* ۹. فرم نهایی ثبت‌نام (آخرین گام کاربر قبل از فوتر) */}
      <section
        id="booking"
        className="w-full border-t border-fitness-border py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-black md:text-3xl text-white">
              ابدأ رحلة تحولك واحصل على خطتك
            </h2>
            <p className="mt-2 text-sm text-fitness-muted">
              قم بتعبئة النموذج ليتم تحليل بياناتك وتجهيز برنامجك التدريبي
              والتغذوي
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* ۱۰. فوتر */}
      <footer className="w-full border-t border-fitness-border bg-fitness-surface py-8 text-center text-xs text-fitness-muted">
        <div className="mx-auto max-w-6xl px-6">
          <p>
            © {CURRENT_YEAR} جميع الحقوق محفوظة لأكاديمية التدريب واللياقة
            البدنية.
          </p>
          <p className="mt-2 font-mono text-[11px] text-fitness-primary">
            Developed by mehrad_amin
          </p>
        </div>
      </footer>
    </main>
  );
}
