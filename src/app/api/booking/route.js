import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, goal, experience, notes, calculatedStats } = body;

    const coachEmail = process.env.COACH_EMAIL;
    const coachPhone = process.env.COACH_WHATSAPP_PHONE || "971500000000";

    // استخراج دقیق داده‌های بیومتریک و محاسبات از calculatedStats
    const hasBiometrics = !!calculatedStats;
    const weight = calculatedStats?.weight || "-";
    const height = calculatedStats?.height || "-";
    const age = calculatedStats?.age || "-";
    const gender =
      calculatedStats?.gender === "female" ? "أنثى (Female)" : "ذكر (Male)";

    const targetCalories =
      calculatedStats?.result?.targetCalories ||
      calculatedStats?.result?.calories ||
      calculatedStats?.result?.tdee ||
      "غير محدد";

    const bmr = calculatedStats?.result?.bmr || "-";
    const tdee = calculatedStats?.result?.tdee || "-";

    // محاسبه یا دریافت ماکروها (در صورت وجود عدد کالری)
    const calNumber = Number(targetCalories);
    const protein = !isNaN(calNumber) ? Math.round((calNumber * 0.3) / 4) : "-";
    const carbs = !isNaN(calNumber) ? Math.round((calNumber * 0.45) / 4) : "-";
    const fats = !isNaN(calNumber) ? Math.round((calNumber * 0.25) / 9) : "-";

    // تمیز کردن شماره شاگرد برای ایجاد لینک مستقیم چت واتس‌اپ
    const cleanUserPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

    // متن پیش‌فرضی که در چت واتس‌اپ مربی با شاگرد باز می‌شود
    const whatsappGreeting = `مرحباً ${name}، استلمت تفاصيل تسجيلك في البرنامج التدريبي عبر الموقع:
- الهدف: ${goal}
${hasBiometrics ? `- الوزن: ${weight} كجم | الطول: ${height} سم | السعرات: ${targetCalories} kcal` : ""}
جاهز نبدأ خطتك التدريبية؟`;

    const waDirectUrl = `https://wa.me/${cleanUserPhone}?text=${encodeURIComponent(
      whatsappGreeting,
    )}`;

    // ساخت قالب شیک و تفکیک‌شده ایمیل با گزارش کامل بیومتریک
    const emailHtml = `
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0c1012; color: #f4f4f5; padding: 25px; border-radius: 18px; max-width: 600px; margin: 0 auto; border: 1px solid #27272a;">
        
        <!-- هدر ایمیل -->
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.4); padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: bold;">
            🔔 اشتراك جديد في الموقع
          </span>
          <h2 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 22px;">طلب خطة تدريبية جديدة</h2>
          <p style="color: #a1a1aa; font-size: 13px; margin: 0;">تفاصيل المشترك وتحليلات الفحص الحيوي (Bio-Scanner)</p>
        </div>

        <!-- کارت اطلاعات فردی و تماس -->
        <div style="background-color: #141418; padding: 18px; border-radius: 14px; border: 1px solid #282832; margin-bottom: 16px;">
          <h3 style="color: #22c55e; margin: 0 0 12px 0; font-size: 14px; border-bottom: 1px solid #27272a; padding-bottom: 8px;">
            👤 البيانات الشخصية والتواصل
          </h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #a1a1aa; width: 35%;">اسم المشترك:</td>
              <td style="padding: 6px 0; color: #ffffff; font-weight: bold;">${name}</td>
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

        <!-- کارت نتایج آنالیز ماشین حساب بیومتریک -->
        <div style="background-color: #141418; padding: 18px; border-radius: 14px; border: 1px solid #282832; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 8px; margin-bottom: 12px;">
            <h3 style="color: #22c55e; margin: 0; font-size: 14px;">
              📊 نتائج الفحص الحيوي (INBODY BIO-SCANNER)
            </h3>
            <span style="font-size: 11px; color: ${hasBiometrics ? "#22c55e" : "#ef4444"}; font-weight: bold;">
              ${hasBiometrics ? "● تم إرفاق الفحص" : "○ لم يستخدم الحاسبة"}
            </span>
          </div>

          ${
            hasBiometrics
              ? `
              <!-- مشخصات فیزیکی شاگرد -->
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 5px 0; color: #a1a1aa; width: 25%;">الوزن:</td>
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

              <!-- تارگت کالری و تقسیم ماکروها -->
              <div style="background-color: #0c1012; border: 1px solid rgba(34,197,94,0.3); border-radius: 10px; padding: 12px; text-align: center; margin-top: 10px;">
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

        <!-- بخش توضیحات و آسیب‌دیدگی -->
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

        <!-- دکمه CTA شروع چت در واتس‌اپ با شاگرد -->
        <div style="text-align: center; margin-top: 25px;">
          <a href="${waDirectUrl}" style="background-color: #22c55e; color: #000000; padding: 14px 28px; text-decoration: none; border-radius: 14px; font-weight: 900; font-size: 14px; display: inline-block; box-shadow: 0 4px 20px rgba(34,197,94,0.35);">
            💬 فتح محادثة واتساب فورية مع المشترك
          </a>
        </div>

        <p style="text-align: center; color: #52525b; font-size: 11px; margin-top: 25px; border-top: 1px solid #1f1f23; padding-top: 12px;">
          تم استلام هذه البيانات وتوليدها تلقائياً عبر منصة اللاندينج الخاصة بك.
        </p>
      </div>
    `;

    // ارسال ایمیل
    if (process.env.RESEND_API_KEY && coachEmail) {
      await resend.emails.send({
        from: "Fitness Lead <onboarding@resend.dev>",
        to: coachEmail,
        subject: `🔔 مشترك جديد: ${name} (${goal}) - ${targetCalories} kcal`,
        html: emailHtml,
      });
    }

    return NextResponse.json({
      success: true,
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
