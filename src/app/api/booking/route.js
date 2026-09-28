import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// تابع کمکی تولید کد پرونده اختصاصی
function generateFileId() {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const timePart = Date.now().toString().slice(-3);
  return `FIT-${randomPart}${timePart}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      goal,
      goalKey,
      experience,
      notes,
      calculatedStats,
      selectedPlan,
      planDuration,
      locale = "ar",
    } = body;

    const fileId = generateFileId();
    const isEn = locale === "en";

    const chosenPlanTitle =
      selectedPlan || (isEn ? "Unspecified Plan" : "باقة غير محددة");
    const chosenPlanDuration = planDuration ? ` (${planDuration})` : "";

    const coachEmail = process.env.COACH_EMAIL;
    const coachPhone = process.env.COACH_WHATSAPP_PHONE || "971500000000";

    // استخراج دقیق داده‌های بیومتریک و نقشه راه ۱۲ هفته‌ای
    const hasBiometrics = !!calculatedStats;
    const weight = calculatedStats?.weight || "-";
    const height = calculatedStats?.height || "-";
    const age = calculatedStats?.age || "-";
    const gender =
      calculatedStats?.gender === "female"
        ? isEn
          ? "Female"
          : "أنثى (Female)"
        : isEn
          ? "Male"
          : "ذكر (Male)";

    const targetCalories =
      calculatedStats?.result?.targetCalories ||
      calculatedStats?.result?.calories ||
      calculatedStats?.result?.tdee ||
      (isEn ? "Not specified" : "غير محدد");

    const bmr = calculatedStats?.result?.bmr || "-";
    const tdee = calculatedStats?.result?.tdee || "-";

    // داده‌های فیزیولوژیک جدید: ۱۲ هفته، تغذیه و مکمل
    const target12Weeks =
      calculatedStats?.result?.projection?.estimatedWeight || "-";
    const expectedDelta =
      calculatedStats?.result?.projection?.expectedDelta || "-";
    const composition = calculatedStats?.result?.projection?.composition || "-";

    const nutritionType =
      calculatedStats?.nutrition === "coached"
        ? isEn
          ? "Precision Macro Plan (Coached)"
          : "خطة مخصصة ومحسوبة الغرامات"
        : isEn
          ? "Standard Home Cooking"
          : "أكل منزلي عام";

    const supplementsType =
      calculatedStats?.supplements === "essential"
        ? isEn
          ? "Performance Stack (Whey + Creatine + Omega 3)"
          : "مكملات أساسية (واي + كرياتين + أوميغا 3)"
        : isEn
          ? "Natural Whole Foods Only"
          : "أغذية طبيعية فقط بدون مكملات";

    // محاسبه تفکیک ماکروها
    const calNumber = Number(targetCalories);
    const protein = !isNaN(calNumber) ? Math.round((calNumber * 0.3) / 4) : "-";
    const carbs = !isNaN(calNumber) ? Math.round((calNumber * 0.45) / 4) : "-";
    const fats = !isNaN(calNumber) ? Math.round((calNumber * 0.25) / 9) : "-";

    const cleanUserPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

    // متن پیش‌فرض چت واتس‌اپ مربی با شاگرد (متناسب با زبان شاگرد)
    const whatsappGreeting = isEn
      ? `Hello ${name}, I have received your registration details through the website:
- File ID: #${fileId}
- Selected Tier: ${chosenPlanTitle}${chosenPlanDuration}
- Primary Goal: ${goal}
${hasBiometrics ? `- Current Weight: ${weight} kg \vert{} Height:${height} cm\n- 12-Wk Target: ${target12Weeks} (${expectedDelta})\n- Target Intake: ${targetCalories} kcal\n- Supplement Plan:${supplementsType}` : ""}
Are you ready to initiate your customized onboarding assessment?`
      : `مرحباً ${name}، استلمت تفاصيل تسجيلك في البرنامج التدريبي عبر الموقع:
- رقم الملف: #${fileId}
- الباقة المختارة: ${chosenPlanTitle}${chosenPlanDuration}
- الهدف: ${goal}
${hasBiometrics ? `- الوزن الحالي: ${weight} كجم \vert{} الطول: ${height} سم\n- الهدف بعد 12 أسبوعاً: ${target12Weeks} (${expectedDelta})\n- السعرات المستهدفة: ${targetCalories} kcal\n- بروتوكول المكملات: ${supplementsType}` : ""}
جاهز نبدأ خطتك التدريبية والتحليل الشامل؟`;

    const waDirectUrl = `https://wa.me/${cleanUserPhone}?text=${encodeURIComponent(
      whatsappGreeting,
    )}`;

    // قالب مدرن، جذاب و واکنش‌گرای ایمیل گزارش برای مربی
    const emailHtml = `
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1012; color: #f4f4f5; padding: 25px; border-radius: 18px; max-width: 620px; margin: 0 auto; border: 1px solid #27272a;">
        
        <!-- هدر ایمیل -->
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.4); padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: bold;">
            🔔 مشترك جديد (${isEn ? "English" : "العربية"})
          </span>
          <h2 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 22px;">طلب خطة تدريبية ومسار تحول جديد</h2>
          <div style="display: inline-block; margin-top: 6px; background-color: #1f2937; color: #38bdf8; padding: 4px 12px; border-radius: 6px; font-family: monospace; font-size: 13px; font-weight: bold;">
            رقم الملف: #${fileId}
          </div>
          <p style="color: #a1a1aa; font-size: 13px; margin: 8px 0 0 0;">تفاصيل المشترك وتحليلات الفحص الحيوي (INBODY BIO-SCANNER 4.0)</p>
        </div>

        <!-- کارت ۱: اطلاعات فردی و دوره انتخابی -->
        <div style="background-color: #141418; padding: 18px; border-radius: 14px; border: 1px solid #282832; margin-bottom: 16px;">
          <h3 style="color: #22c55e; margin: 0 0 12px 0; font-size: 14px; border-bottom: 1px solid #27272a; padding-bottom: 8px;">
            👤 البيانات الشخصية والتواصل
          </h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa; width: 35%;">رقم الملف:</td>
              <td style="padding: 6px 0; color: #38bdf8; font-weight: bold; font-family: monospace;">#${fileId}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa;">اسم المشترك:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa;">الباقة المطلوبة:</td>
              <td style="padding: 6px 0; color: #22c55e; font-weight: bold;">${chosenPlanTitle}${chosenPlanDuration}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa;">رقم الواتساب:</td>
              <td style="padding: 6px 0; color: #38bdf8; font-family: monospace;" dir="ltr">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa;">الهدف الرئيسي:</td>
              <td style="padding: 6px 0; color: #22c55e; font-weight: bold;">${goal}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa;">مستوى الخبرة:</td>
              <td style="padding: 6px 0; color: #ffffff;">${experience}</td>
            </tr>
          </table>
        </div>

        <!-- کارت ۲: آنالیز بیومتریک و نقشه راه ۱۲ هفته‌ای -->
        <div style="background-color: #141418; padding: 18px; border-radius: 14px; border: 1px solid #282832; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 8px; margin-bottom: 12px;">
            <h3 style="color: #22c55e; margin: 0; font-size: 14px;">
              📊 نتائج الفحص الحيوي وخارطة التحول المتوقعة
            </h3>
            <span style="font-size: 11px; color: ${hasBiometrics ? "#22c55e" : "#ef4444"}; font-weight: bold;">
              ${hasBiometrics ? "● تم إرفاق الفحص والمحاكاة" : "○ لم يستخدم الحاسبة"}
            </span>
          </div>

          ${
            hasBiometrics
              ? `
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 5px 0; color: #a1a1aa; width: 25%;">الوزن الحالي:</td>
                  <td style="padding: 5px 0; color: #ffffff; font-weight: bold;">${weight} كجم</td>
                  <td style="padding: 5px 0; color: #a1a1aa; width: 25%;">الطول:</td>
                  <td style="padding: 5px 0; color: #ffffff; font-weight: bold;">${height} سم</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #a1a1aa;">العمر:</td>
                  <td style="padding: 5px 0; color: #ffffff; font-weight: bold;">${age} سنة</td>
                  <td style="padding: 5px 0; color: #a1a1aa;">الجنس:</td>
                  <td style="padding: 5px 0; color: #ffffff; font-weight: bold;">${gender}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #a1a1aa;">BMR الأيض:</td>
                  <td style="padding: 5px 0; color: #e4e4e7; font-family: monospace;">${bmr} kcal</td>
                  <td style="padding: 5px 0; color: #a1a1aa;">TDEE الأساسي:</td>
                  <td style="padding: 5px 0; color: #e4e4e7; font-family: monospace;">${tdee} kcal</td>
                </tr>
              </table>

              <!-- نقشه راه ۱۲ هفته‌ای و مکمل‌ها -->
              <div style="background-color: #0c1012; border: 1px solid rgba(56,189,248,0.3); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
                <span style="color: #38bdf8; font-size: 11px; font-weight: bold; display: block; margin-bottom: 4px;">🎯 الهدف التقديري بعد 12 أسبوعاً:</span>
                <div style="font-size: 14px; color: #ffffff; font-weight: bold;">
                  الوزن المتوقع: <span style="color: #22c55e; font-family: monospace;">${target12Weeks}</span> 
                  <span style="color: #a1a1aa; font-size: 12px;">(${expectedDelta})</span>
                </div>
                <div style="font-size: 11px; color: #d4d4d8; margin-top: 4px;">
                  طبيعة التغير: ${composition}
                </div>
                <div style="margin-top: 8px; font-size: 12px; border-top: 1px dashed #27272a; padding-top: 6px;">
                  <div><span style="color: #a1a1aa;">منهجية التغذية:</span> <strong style="color: #ffffff;">${nutritionType}</strong></div>
                  <div style="margin-top: 3px;"><span style="color: #a1a1aa;">المكملات المطلوبة:</span> <strong style="color: #38bdf8;">${supplementsType}</strong></div>
                </div>
              </div>

              <!-- تارگت کالری و ماکروها -->
              <div style="background-color: #0c1012; border: 1px solid rgba(34,197,94,0.3); border-radius: 10px; padding: 12px; text-align: center;">
                <span style="color: #a1a1aa; font-size: 11px; display: block;">الهدف اليومي الموصى به من السعرات</span>
                <span style="color: #22c55e; font-size: 24px; font-weight: 900; font-family: monospace; display: block; margin: 4px 0;">
                  ${targetCalories} <span style="font-size: 13px;">KCAL</span>
                </span>
                
                <div style="display: flex; justify-content: space-around; margin-top: 10px; border-top: 1px dashed #27272a; padding-top: 8px; font-size: 11px;">
                  <div>
                    <span style="color: #a1a1aa; display: block;">البروتين</span>
                    <strong style="color: #ffffff; font-family: monospace;">${protein}g</strong>
                  </div>
                  <div style="border-right: 1px solid #27272a; border-left: 1px solid #27272a; padding: 0 15px;">
                    <span style="color: #a1a1aa; display: block;">الكارب</span>
                    <strong style="color: #ffffff; font-family: monospace;">${carbs}g</strong>
                  </div>
                  <div>
                    <span style="color: #a1a1aa; display: block;">الدهون</span>
                    <strong style="color: #ffffff; font-family: monospace;">${fats}g</strong>
                  </div>
                </div>
              </div>
            `
              : `
              <p style="color: #71717a; font-size: 12px; margin: 0; text-align: center;">
                سجّل المشترك مباشرة دون استخدام حاسبة السعرات مسبقاً.
              </p>
            `
          }
        </div>

        <!-- کارت توضیحات یا آسیب‌دیدگی -->
        ${
          notes
            ? `
          <div style="background-color: #141418; padding: 15px; border-radius: 12px; border: 1px solid #282832; margin-bottom: 20px;">
            <strong style="color: #facc15; font-size: 13px; display: block; margin-bottom: 5px;">⚠️ ملاحظات أو إصابات سابقة:</strong>
            <p style="color: #d4d4d8; font-size: 12px; line-height: 1.6; margin: 0;">${notes}</p>
          </div>
        `
            : ""
        }

        <!-- دکمه اقدام سریع واتساپ برای مربی -->
        <div style="text-align: center; margin-top: 25px;">
          <a href="${waDirectUrl}" style="background-color: #22c55e; color: #000000; padding: 14px 28px; text-decoration: none; border-radius: 14px; font-weight: 900; font-size: 14px; display: inline-block; box-shadow: 0 4px 20px rgba(34,197,94,0.35);">
            💬 فتح محادثة واتساب فورية مع المشترك
          </a>
        </div>

        <p style="text-align: center; color: #52525b; font-size: 11px; margin-top: 25px; border-top: 1px solid #1f1f23; padding-top: 12px;">
          تم استلام هذه البيانات وتوليدها تلقائياً عبر منصة التدريب الشخصي الخاصة بك.
        </p>
      </div>
    `;

    // ارسال ایمیل از طریق Resend
    if (process.env.RESEND_API_KEY && coachEmail) {
      await resend.emails.send({
        from: "Fitness Lead <onboarding@resend.dev>",
        to: coachEmail,
        subject: `[#${fileId}] 🔔 مشترك جديد: ${name} [${chosenPlanTitle}] - (${goal})`,
        html: emailHtml,
      });
    }

    return NextResponse.json({
      success: true,
      fileId: fileId,
      coachPhone: coachPhone,
      message: "Lead successfully recorded and emailed to coach",
    });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, error: "فشل في تسجيل البيانات، يرجى المحاولة لاحقاً." },
      { status: 500 },
    );
  }
}
