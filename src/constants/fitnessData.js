export const HERO_STATS = {
  ar: [
    { value: "+500", label: "مشترك حققوا أهدافهم" },
    { value: "98%", label: "نسبة رضا المشتركين" },
    { value: "+8 سنوات", label: "خبرة تدريبية معتمدة" },
  ],
  en: [
    { value: "+500", label: "Clients Transformed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "+8 Yrs", label: "Certified Experience" },
  ],
};

export const HERO_CONTENT = {
  ar: {
    badge: "HYPERTROPHY & FAT LOSS PROTOCOL",
    headlinePrimary: "هندسة دقيقة للبناء العضلي؛",
    headlineHighlight: "أبعد من مجرد تدريب تقليدي",
    description:
      "برامج تدريبية وتغذوية متقدمة مصممة وفق القياسات الحيوية الفريدة لجسمك ومعدل الأيض. انطلق نحو خسارة الدهون وبناء كتلة عضلية صافية وفق أحدث الأسس العلمية، دون حرمان أو إهدار للوقت.",
    ctaPrimary: "ابدأ الاستشارة واحصل على خطتك",
    ctaSecondary: "حساب السعرات واحتياج الـ TDEE فوراً",
    stats: [
      { value: "+500", label: "تحول بدني ناجح" },
      { value: "98%", label: "نسبة رضا المشتركين" },
      { value: "+8 سنوات", label: "خبرة تدريبية تخصصية" },
    ],
  },
  en: {
    badge: "HYPERTROPHY & FAT LOSS PROTOCOL",
    headlinePrimary: "Precision Hypertrophy Architecture;",
    headlineHighlight: "Beyond Conventional Coaching",
    description:
      "Elite, evidence-based training and nutritional protocols engineered around your unique biometrics and metabolic rate. Build dense, lean muscle and shred fat without extreme diets or wasted effort.",
    ctaPrimary: "Start Consultation & Get Your Plan",
    ctaSecondary: "Calculate Calories & TDEE Instantly",
    stats: [
      { value: "+500", label: "Successful Transformations" },
      { value: "98%", label: "Client Satisfaction Rate" },
      { value: "+8 Yrs", label: "Elite Coaching Experience" },
    ],
  },
};

export const SERVICES = {
  ar: [
    {
      id: 1,
      title: "التدريب الشخصي الشامل VIP",
      desc: "تصميم دقيق لبرامج التمرين والتغذية مع متابعة مستمرة، وتصحيح تكنيك الأداء وتواصل مباشر عبر واتساب 24/7.",
      badge: "الأكثر طلباً",
    },
    {
      id: 2,
      title: "برنامج التنشيف وحرق الدهون العلمي",
      desc: "خسارة قصوى لنسبة الدهون بالجسم مع المحافظة التامة على الكتلة العضلية بدون حميات قاسية أو حرمان.",
      badge: "تخصصي",
    },
    {
      id: 3,
      title: "برنامج التضخيم والبناء العضلي",
      desc: "أنظمة تدريبية تعتمد على الزيادة التدريجية للأحمال تتناسب مع جيناتك وطبيعة جسمك لتحقيق أقصى ضخامة.",
      badge: "نتائج مضمونة",
    },
  ],
  en: [
    {
      id: 1,
      title: "VIP 1-on-1 Online Coaching",
      desc: "Fully customized workout and nutrition plans with regular check-ins, technique analysis, and 24/7 direct WhatsApp access.",
      badge: "Most Popular",
    },
    {
      id: 2,
      title: "Evidence-Based Fat Loss & Shredding",
      desc: "Maximize body fat loss while fully preserving lean muscle mass without extreme crash diets or hunger.",
      badge: "Specialized",
    },
    {
      id: 3,
      title: "Hypertrophy & Muscle Building",
      desc: "Progressive overload workout systems tailored to your genetics and body structure for maximum muscle growth.",
      badge: "Guaranteed Results",
    },
  ],
};

export const TRANSFORMATIONS = {
  ar: [
    {
      id: 1,
      name: "أحمد م.",
      period: "12 أسبوعاً",
      achievement: "خسارة 11 كجم دهون + تشريح وبروز عضلات الكتف",
      beforeImg: "/images/before-1.jpg",
      afterImg: "/images/after-1.jpg",
    },
    {
      id: 2,
      name: "عمر س.",
      period: "16 أسبوعاً",
      achievement: "زيادة 6 كجم عضل صافي بدون دهون",
      beforeImg: "/images/before-2.jpg",
      afterImg: "/images/after-2.jpg",
    },
  ],
  en: [
    {
      id: 1,
      name: "Ahmed M.",
      period: "12 Weeks",
      achievement: "Lost 11 kg of fat + visible shoulder and core definition",
      beforeImg: "/images/before-1.jpg",
      afterImg: "/images/after-1.jpg",
    },
    {
      id: 2,
      name: "Omar S.",
      period: "16 Weeks",
      achievement: "Gained 6 kg of pure lean muscle mass with zero fat gain",
      beforeImg: "/images/before-2.jpg",
      afterImg: "/images/after-2.jpg",
    },
  ],
};

export const PRICING_PLANS = {
  ar: [
    {
      id: "starter",
      title: "الباقة الأساسية",
      duration: "شهر واحد",
      price: "450 درهم / ر.س",
      features: [
        "جدول تمارين مخصص وفق تجهیزاتك (نادي / منزل)",
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
        "خطة خاصة لتثبيت الوزن والمحافظة على النتيجة بعد التحول",
        "استشارات غذائية وتعديل الجداول أثناء السفر والمناسبات",
        "أولوية التواصل المباشر 24/7 طوال فترة الاشتراك",
      ],
      isPopular: false,
    },
  ],
  en: [
    {
      id: "starter",
      title: "Starter Plan",
      duration: "1 Month",
      price: "450 AED / SAR",
      features: [
        "Customized workout split based on your setup (Gym / Home)",
        "Precision calorie & macro-calculated meal plan",
        "Bi-weekly progress review & plan adjustments",
        "Weekly support check-in to answer inquiries",
      ],
      isPopular: false,
    },
    {
      id: "pro",
      title: "Advanced VIP Coaching",
      duration: "3 Months",
      price: "1,150 AED / SAR",
      features: [
        "Complete workout regimen + specialized supplement protocol",
        "Flexible, lifestyle-friendly nutrition plan",
        "Video exercise review & continuous form correction",
        "Direct private WhatsApp accountability throughout the week",
        "Weekly tracking of body weight, measurements & body fat %",
      ],
      isPopular: true,
    },
    {
      id: "elite",
      title: "Complete Transformation VIP",
      duration: "6 Months",
      price: "1,950 AED / SAR",
      features: [
        "Advanced dynamic diet & training periodization",
        "Daily direct check-ins & instant form feedback",
        "Post-transformation reverse diet & weight maintenance guide",
        "Nutritional coaching & adjustments for travel and events",
        "Priority 24/7 direct access for the entire subscription",
      ],
      isPopular: false,
    },
  ],
};

export const FAQS = {
  ar: [
    {
      question: "هل أحتاج بالضرورة إلى الاشتراك في نادٍ رياضي متكامل؟",
      answer:
        "لا، يتم تفصيل الخطة التدريبية بالكامل حسب الأدوات المتاحة لديك؛ سواء كان تدريباً في الجيم، أو هوم جيم منزلي، أو تمارين بوزن الجسم وأحبال المقاومة.",
    },
    {
      question: "كيف تتم المتابعة والتواصل مع المدرب بعد الاشتراك؟",
      answer:
        "مباشرة بعد التسجيل، يتم فتح قناة تواصل مباشرة عبر واتساب لإرسال الجداول، واستلام التقارير الدورية وتحليل التطور أسبوعياً.",
    },
    {
      question: "هل يتضمن النظام الغذائي أطعمة معقدة أو مكلفة؟",
      answer:
        "إطلاقاً. تعتمد جميع الأنظمة على خيارات غذائية طبيعية وسهلة الإعداد مع حساب دقيق للسعرات والبروتين بما يتوافق مع ميزانيتك وتفضيلاتك اليومية.",
    },
  ],
  en: [
    {
      question: "Do I need a fully equipped gym membership?",
      answer:
        "No, your workout plan is entirely customized to your available equipment—whether you train at a commercial gym, a home setup, or using bodyweight and resistance bands.",
    },
    {
      question: "How do communication and coaching work after signing up?",
      answer:
        "Immediately after onboarding, a direct 1-on-1 WhatsApp channel is set up to deliver your routines, submit check-in reports, and track your weekly progress.",
    },
    {
      question: "Does the meal plan involve complex or expensive ingredients?",
      answer:
        "Not at all. Every plan is built around accessible, whole foods with precise calorie and protein targets that match your budget and everyday preferences.",
    },
  ],
};

export const CONTACT_INFO = {
  phone: "+968 9123 4567",
  displayPhone: "+968 9123 4567",
  whatsappNumber: "989305002816",
  whatsappUrl: "https://wa.me/989305002816",
  instagramUsername: "your_test_page",
  instagramUrl: "https://instagram.com",
  googleMapsUrl: "https://maps.google.com/?q=Dubai",
  appleMapsUrl: "https://maps.apple.com/?q=Dubai",
  address: {
    ar: "دبي، الإمارات العربية المتحدة (متاح للتدريب الأونلاين والخاص)",
    en: "Dubai, United Arab Emirates (Available for in-person & online coaching)",
  },
  workingHours: {
    ar: "السبت إلى الخميس: 8:00 صباحاً - 9:00 مساءً",
    en: "Saturday to Thursday: 8:00 AM – 9:00 PM",
  },
};
export const SPOTLIGHT_REVIEWS = {
  ar: [
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
  ],
  en: [
    {
      id: "spotlight-1",
      clientName: "Sultan Al-Mansoori",
      role: "Entrepreneur - Dubai",
      program: "Complete Transformation VIP",
      statNumber: "-15 kg",
      statLabel: "Pure Fat Loss",
      duration: "16 Weeks Adherence",
      quote:
        "This program completely elevated my daily performance. I used to think constant business travel would keep me from achieving this physique, but the 24/7 personalized accountability was a total game-changer.",
      rating: 5,
      tag: "Elite Case Study",
    },
    {
      id: "spotlight-2",
      clientName: "Eng. Fahad Al-Otaibi",
      role: "Architect - Riyadh",
      program: "Precision Shred Protocol",
      statNumber: "9.8%",
      statLabel: "Current Body Fat",
      duration: "12 Weeks Adherence",
      quote:
        "The precision in exercise biomechanics and joint angle correction protected an old shoulder issue. Today I lift heavier with zero pain, and my abs are carved like never before.",
      rating: 5,
      tag: "Benchmark Result",
    },
    {
      id: "spotlight-3",
      clientName: "Dr. Khalid Al-Suwaidi",
      role: "Surgical Consultant - Doha",
      program: "Hypertrophy & Muscle Protocol",
      statNumber: "+6.5 kg",
      statLabel: "Lean Muscle Mass",
      duration: "24 Weeks Adherence",
      quote:
        "As a surgeon, I deeply respect the scientific approach to hypertrophy and central nervous system recovery. Nothing is left to guesswork; every training variable is precisely measured.",
      rating: 5,
      tag: "Evidence-Based",
    },
    {
      id: "spotlight-4",
      clientName: "Abdulrahman Al-Balushi",
      role: "Executive Director - Muscat",
      program: "Elite Athletic Performance",
      statNumber: "100%",
      statLabel: "Energy & Vitality Regained",
      duration: "10 Weeks Adherence",
      quote:
        "A flexible, whole-food diet without starvation made consistency effortless. I dropped excess fat while keeping high cognitive energy for back-to-back boardroom meetings.",
      rating: 5,
      tag: "Sustainable Results",
    },
  ],
};

export const PAGE_CONTENT = {
  ar: {
    nav: {
      brand: "ELITE COACHING",
      links: [
        { label: "المنهجية", href: "#methodology" },
        { label: "النتائج", href: "#transformations" },
        { label: "الحاسبة", href: "#calculator" },
        { label: "الباقات", href: "#pricing" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      cta: "ابدأ الآن",
    },
    transformations: {
      title: "نتائج حقيقية بدون فلاتر",
      subtitle: "اسحب المؤشر لمشاهدة الفارق والتحول البدني للمشتركين",
    },
    testimonials: {
      badge: "توثيق حقيقي وملموس",
      title: "تجارب تصنع الفارق",
      subtitle:
        "نخبة من المشتركين يتحدثون عن كواليس تحولهم البدني والتزامهم بالبرنامج",
      prevBtn: "السابق",
      nextBtn: "التالي",
    },
    booking: {
      title: "ابدأ رحلة تحولك واحصل على خطتك",
      subtitle:
        "قم بتعبئة النموذج ليتم تحليل بياناتك وتجهيز برنامجك التدريبي والتغذوي",
    },
    footer: {
      rights: "جميع الحقوق محفوظة لأكاديمية التدريب واللياقة البدنية.",
      developedBy: "Developed by mehrad_amin",
    },
    methodology: {
      badge: "مسار تدريبي قائم على النتائج",
      title: "المنهجية والبرامج التدريبية",
      subtitle:
        "مصممة وفق أحدث معايير الميكانيكا الحيوية وفرط النمو العضلي (Hypertrophy)",
      mobileCardCta: "اختر الخطة واحصل على برنامجك",
      desktopCardCta: "عرض تفاصيل البرنامج",
      swipeHint: "اسحب لليمين أو اليسار للتنقل بين البرامج التدريبية",
      cardAria: "البرنامج",
    },
    calculator: {
      scannerBadge: "INBODY BIO-SCANNER 4.0",
      resetBtn: "إعادة تعيين البيانات",
      targetLabel: "الهدف اليومي المقترح من السعرات:",
      kcalUnit: "KCAL / DAY",
      bmrLabel: "التمثيل الغذائي BMR:",
      tdeeLabel: "الاحتياج الأساسي TDEE:",
      macros: {
        protein: "بروتين",
        carbs: "كارب",
        fats: "دهون",
      },
      goals: {
        cut: "تنشيف وحرق دهون",
        maintain: "تثبيت الوزن",
        bulk: "ضخامة وبناء عضل",
      },
      profileSection: "الملف الفسيولوجي والبدني:",
      genderMale: "ذكر / MALE",
      genderFemale: "أنثى / FEMALE",
      weightLabel: "وزن الجسم",
      heightLabel: "الطول",
      ageLabel: "العمر",
      yearsUnit: "سنة",
      activitySection: "معدل النشاط الأسبوعي:",
      activityLevels: [
        {
          id: "sedentary",
          factor: "1.2",
          label: "قليل الحركة",
          desc: "بدون تمارين",
        },
        { id: "light", factor: "1.375", label: "نشاط خفيف", desc: "1-3 حصص" },
        {
          id: "moderate",
          factor: "1.55",
          label: "نشاط متوسط",
          desc: "3-5 حصص",
        },
        { id: "heavy", factor: "1.725", label: "نشاط مكثف", desc: "6-7 حصص" },
      ],
      ctaPrefix: "احصل على خطتك التدريبية بناءً على",
      ctaSuffix: "سعرة",
    },
  },
  en: {
    nav: {
      brand: "ELITE COACHING",
      links: [
        { label: "Methodology", href: "#methodology" },
        { label: "Transformations", href: "#transformations" },
        { label: "Calculator", href: "#calculator" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQs", href: "#faq" },
      ],
      cta: "Get Started",
    },
    transformations: {
      title: "Real Results, Zero Filters",
      subtitle: "Drag the slider to reveal client body transformations",
    },
    testimonials: {
      badge: "Verified Client Journeys",
      title: "Transformations That Speak",
      subtitle:
        "Elite professionals share the reality of their body recomposition and journey",
      prevBtn: "Previous",
      nextBtn: "Next",
    },
    booking: {
      title: "Start Your Transformation Journey",
      subtitle:
        "Fill out the assessment form to engineer your custom training and nutrition roadmap",
    },
    footer: {
      rights: "All rights reserved. Elite Fitness & Coaching Academy.",
      developedBy: "Developed by mehrad_amin",
    },
    methodology: {
      badge: "Result-Driven Training System",
      title: "Methodology & Training Protocols",
      subtitle:
        "Engineered around advanced biomechanics and scientific hypertrophy standards",
      mobileCardCta: "Choose Plan & Get Program",
      desktopCardCta: "View Program Details",
      swipeHint: "Swipe left or right to explore training programs",
      cardAria: "Program",
    },
    calculator: {
      scannerBadge: "INBODY BIO-SCANNER 4.0",
      resetBtn: "Reset All Metrics",
      targetLabel: "Target Daily Calorie Intake:",
      kcalUnit: "KCAL / DAY",
      bmrLabel: "Basal Metabolism BMR:",
      tdeeLabel: "Maintenance TDEE:",
      macros: {
        protein: "Protein",
        carbs: "Carbs",
        fats: "Fats",
      },
      goals: {
        cut: "Fat Loss & Cut",
        maintain: "Maintenance",
        bulk: "Hypertrophy Bulk",
      },
      profileSection: "Physiological Biometrics:",
      genderMale: "Male / MALE",
      genderFemale: "Female / FEMALE",
      weightLabel: "Body Weight",
      heightLabel: "Height",
      ageLabel: "Age",
      yearsUnit: "Yrs",
      activitySection: "Weekly Activity Level:",
      activityLevels: [
        {
          id: "sedentary",
          factor: "1.2",
          label: "Sedentary",
          desc: "No workout",
        },
        {
          id: "light",
          factor: "1.375",
          label: "Light Activity",
          desc: "1-3 sessions",
        },
        {
          id: "moderate",
          factor: "1.55",
          label: "Moderate Active",
          desc: "3-5 sessions",
        },
        {
          id: "heavy",
          factor: "1.725",
          label: "High Intensity",
          desc: "6-7 sessions",
        },
      ],
      ctaPrefix: "Get Custom Protocol Based on",
      ctaSuffix: "KCAL",
    },
  },
};
