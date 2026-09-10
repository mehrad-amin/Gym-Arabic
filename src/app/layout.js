import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo",
  preload: true,
  weight: ["400", "700", "900"],
});

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "تدريب شخصي وتصميم جداول فيتنس احترافية | نحو تحول بدني حقيقي",
  description:
    "تصميم برامج تدريبية وتغذوية علمية متقدمة مع تدريب أونلاين ومتابعة أسبوعية دقيقة لضمان تحقيق أهدافك الرياضية.",
  keywords: [
    "مدرب شخصي أونلاين",
    "جدول تمارين كمال أجسام",
    "حساب السعرات والماكروز TDEE",
    "نظام غذائي للتنشيف",
    "بناء عضلات",
    "تدريب خاص دبي والرياض",
  ],
  authors: [{ name: "أكاديمية التدريب واللياقة البدنية" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "تدريب شخصي وتصميم جداول فيتنس احترافية | تحول بدني حقيقي",
    description:
      "تصميم برامج تدريبية وتغذوية متقدمة وتدريب أونلاين مع متابعة مستمرة لتحقيق أفضل النتائج.",
    locale: "ar_AE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "تدريب شخصي وجداول لياقة بدنية احترافية",
    description:
      "برامج تدريب وتغذية علمية متكاملة مع متابعة مستمرة لتحقيق أهدافك.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-fitness-bg font-sans text-fitness-text selection:bg-fitness-primary selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
