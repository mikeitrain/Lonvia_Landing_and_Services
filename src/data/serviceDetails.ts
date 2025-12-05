export interface ServiceDetail {
  id: number;
  slug: string;
  headline: string;
  intro: string;
  typicalConcerns: string[];
  diagnosticApproach: {
    title: string;
    items: string[];
  };
  lonviaSupport: {
    title: string;
    description: string;
    steps: string[];
  };
  safetyNotes: {
    title: string;
    notes: string[];
    disclaimer: string;
  };
  ctaLabel: string;
}

export const serviceDetails: Record<number, ServiceDetail> = {
  1: {
    id: 1,
    slug: "hormone-optimization",
    headline: "Hormone Optimization: Restoring Balance for Vitality and Well-being",
    intro: "Hormonal imbalances can affect energy levels, mood, metabolism, and overall quality of life. Our hormone optimization service provides comprehensive assessment and personalized support for individuals experiencing symptoms related to testosterone, thyroid, or growth hormone deficiencies. Whether you're dealing with age-related hormonal changes or seeking to optimize your hormonal health, our telemedicine approach connects you with experienced physicians who specialize in endocrine health.",
    typicalConcerns: [
      "Persistent fatigue and low energy despite adequate rest",
      "Unexplained weight gain or difficulty losing weight",
      "Reduced libido and sexual function",
      "Mood changes, irritability, or depressive symptoms",
      "Decreased muscle mass and increased body fat",
      "Poor sleep quality and recovery",
      "Difficulty concentrating or brain fog"
    ],
    diagnosticApproach: {
      title: "Our Diagnostic Approach",
      items: [
        "Comprehensive medical history and symptom questionnaire to understand your individual situation",
        "Detailed hormone panel testing (may include testosterone, estradiol, thyroid hormones, DHEA, cortisol, and other relevant markers)",
        "Assessment of lifestyle factors including sleep patterns, stress levels, nutrition, and physical activity",
        "Review of previous medical records and current medications",
        "Evaluation of metabolic health markers and cardiovascular risk factors"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports You",
      description: "Our telemedicine-based approach makes hormone optimization accessible and convenient while maintaining the highest standards of medical care:",
      steps: [
        "Complete a detailed online health questionnaire from the comfort of your home",
        "Receive lab test requisitions for comprehensive hormone panels through our partner laboratories",
        "Schedule a video consultation with board-certified physicians specializing in hormone health",
        "Receive a personalized optimization protocol that may include lifestyle modifications, nutritional guidance, and when appropriate, hormone therapy options",
        "Ongoing monitoring through follow-up consultations and regular lab testing to ensure safe and effective optimization",
        "Access to supplements and medications through our vetted partner network with convenient home delivery"
      ]
    },
    safetyNotes: {
      title: "Important Safety Information",
      notes: [
        "This service is designed for optimization and preventive health, not for acute medical emergencies",
        "Individuals with severe, uncontrolled endocrine disorders requiring immediate intervention should seek in-person specialist care",
        "Hormone therapy requires careful medical supervision and is not suitable for everyone",
        "Certain medical conditions may contraindicate hormone optimization therapies"
      ],
      disclaimer: "This telemedicine service does not replace emergency medical care. If you experience severe symptoms or a medical emergency, please contact emergency services or visit your nearest emergency department immediately."
    },
    ctaLabel: "Start Your Hormone Assessment"
  },
  2: {
    id: 2,
    slug: "hair-loss-prevention",
    headline: "Hair Loss Prevention & Restoration: Evidence-Based Solutions for Healthy Hair",
    intro: "Hair loss affects millions of people and can significantly impact self-confidence and quality of life. Our hair restoration service offers medical-grade treatments for androgenetic alopecia (pattern hair loss) and other forms of hair thinning. Through telemedicine consultations, we provide access to proven therapies including prescription medications, topical treatments, and advanced protocols tailored to your specific needs and hair loss pattern.",
    typicalConcerns: [
      "Progressive thinning at the crown or temples (male pattern baldness)",
      "Widening part or overall thinning (female pattern hair loss)",
      "Noticeable hair shedding when washing or brushing",
      "Family history of hair loss causing early concern",
      "Reduced hair density and visible scalp",
      "Self-consciousness about appearance and aging",
      "Previous treatments that didn't deliver results"
    ],
    diagnosticApproach: {
      title: "What We Evaluate",
      items: [
        "Detailed hair loss history including onset, progression, and pattern",
        "Family history and genetic predisposition to androgenetic alopecia",
        "Scalp health assessment through photo documentation",
        "Hormonal factors that may contribute to hair loss (thyroid function, androgens, nutritional status)",
        "Current medications and treatments you've tried",
        "Lifestyle factors including stress levels, diet, and hair care practices"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Hair Health",
      description: "We combine medical expertise with convenient telemedicine access to provide comprehensive hair loss solutions:",
      steps: [
        "Submit detailed questionnaire with photos of your scalp and hair loss pattern",
        "Video consultation with physicians experienced in hair loss treatment",
        "Personalized treatment plan that may include prescription medications (finasteride, dutasteride, minoxidil) and advanced topical formulations",
        "Optional laboratory testing to rule out underlying hormonal or nutritional deficiencies",
        "Regular follow-up assessments with photo comparisons to track progress",
        "Access to medical-grade hair care products and supplements through our partner pharmacy",
        "Referrals to specialized hair transplant clinics when appropriate"
      ]
    },
    safetyNotes: {
      title: "Important Considerations",
      notes: [
        "Hair loss treatments require several months to show visible results; patience and consistency are essential",
        "Not suitable for scarring alopecia or autoimmune-related hair loss without specialist evaluation",
        "Certain medications have potential side effects that will be discussed during consultation",
        "Sudden, rapid hair loss may indicate underlying medical conditions requiring urgent in-person evaluation"
      ],
      disclaimer: "This service focuses on androgenetic alopecia and common forms of hair loss. For unusual patterns, scarring, or acute hair loss, we recommend in-person dermatological evaluation."
    },
    ctaLabel: "Begin Hair Restoration Journey"
  },
  3: {
    id: 3,
    slug: "weight-management",
    headline: "Weight Management & Metabolic Health: Personalized Pathways to Sustainable Results",
    intro: "Sustainable weight management goes beyond simple calorie counting—it requires understanding your unique metabolic profile, hormonal influences, and individual health factors. Our weight management service combines advanced GLP-1 therapies, comprehensive metabolic testing, and personalized medical supervision to help you achieve and maintain healthy body composition. Through telemedicine, we make evidence-based weight loss support accessible while ensuring safety and medical oversight.",
    typicalConcerns: [
      "Difficulty losing weight despite diet and exercise efforts",
      "Weight regain after previous diet attempts",
      "Metabolic syndrome or prediabetes diagnosis",
      "Hormonal factors affecting weight (thyroid, insulin resistance, PCOS)",
      "Emotional eating or food cravings difficult to control",
      "Low energy and sluggish metabolism",
      "Health risks associated with excess weight (cardiovascular, diabetes, joint problems)"
    ],
    diagnosticApproach: {
      title: "Our Metabolic Assessment",
      items: [
        "Comprehensive weight and health history including previous attempts and challenges",
        "Metabolic panel testing (fasting glucose, HbA1c, insulin, lipid profile)",
        "Hormone assessment where relevant (thyroid function, sex hormones, cortisol)",
        "Body composition analysis and BMI evaluation",
        "Assessment of cardiovascular risk factors and comorbidities",
        "Nutritional habits, physical activity levels, and sleep quality review",
        "Psychological relationship with food and eating patterns"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Weight Goals",
      description: "Our medically supervised weight management program provides comprehensive support tailored to your needs:",
      steps: [
        "Complete detailed health and lifestyle questionnaire to identify metabolic factors",
        "Laboratory testing through convenient at-home or local lab options",
        "Telemedicine consultation to discuss results, medical history, and treatment goals",
        "Personalized weight management plan that may include GLP-1 medications (semaglutide, tirzepatide), metabolic optimization, and lifestyle protocols",
        "Nutritional guidance and sustainable eating strategies (not restrictive dieting)",
        "Regular monitoring through virtual check-ins, weight tracking, and follow-up labs",
        "Medications delivered discreetly to your home with ongoing prescription management",
        "Long-term maintenance strategies to prevent weight regain"
      ]
    },
    safetyNotes: {
      title: "Safety & Suitability",
      notes: [
        "GLP-1 medications are prescription-only and require medical eligibility assessment",
        "Not suitable for individuals with certain medical conditions (e.g., history of medullary thyroid cancer, pancreatitis)",
        "This is not a quick-fix solution; sustainable weight management requires time and lifestyle commitment",
        "Severe eating disorders or acute metabolic crises require specialized in-person care"
      ],
      disclaimer: "Weight management medications have potential side effects and are not appropriate for everyone. Our physicians will carefully evaluate your eligibility and monitor your progress. This service does not replace treatment for severe metabolic emergencies."
    },
    ctaLabel: "Start Weight Management Assessment"
  },
  4: {
    id: 4,
    slug: "cognitive-enhancement",
    headline: "Cognitive Enhancement: Optimizing Mental Performance and Brain Health",
    intro: "Mental clarity, focus, and cognitive performance are essential for productivity and quality of life. Our cognitive enhancement service addresses brain fog, concentration difficulties, and memory concerns through evidence-based interventions. We evaluate potential underlying factors—including hormonal imbalances, nutritional deficiencies, and sleep disorders—and create personalized protocols combining lifestyle optimization, targeted supplementation, and when appropriate, nootropic support.",
    typicalConcerns: [
      "Persistent brain fog or mental cloudiness",
      "Difficulty concentrating or maintaining focus",
      "Memory lapses or forgetfulness affecting daily life",
      "Reduced mental stamina or cognitive fatigue",
      "Slower information processing or decision-making",
      "Age-related cognitive decline concerns",
      "High-demand professional or academic performance needs"
    ],
    diagnosticApproach: {
      title: "Cognitive Assessment Process",
      items: [
        "Detailed questionnaire about cognitive symptoms, onset, and impact on daily functioning",
        "Assessment of sleep quality, stress levels, and lifestyle factors affecting cognition",
        "Laboratory evaluation to rule out underlying causes (thyroid function, vitamin deficiencies, inflammatory markers, hormone levels)",
        "Review of medications and substances that may impact cognitive function",
        "Evaluation of cardiovascular and metabolic health markers affecting brain function",
        "Screening for mood disorders that can present as cognitive symptoms"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Enhances Your Cognitive Health",
      description: "Our approach combines medical assessment with practical, evidence-based optimization strategies:",
      steps: [
        "Complete cognitive health questionnaire and lifestyle assessment",
        "Optional laboratory testing to identify treatable underlying factors",
        "Virtual consultation with physicians to review findings and discuss goals",
        "Personalized cognitive optimization protocol including sleep optimization, stress management, and targeted nutrition",
        "Access to evidence-based nootropic supplements and cognitive support formulations",
        "Guidance on lifestyle factors proven to support brain health (exercise, meditation, cognitive training)",
        "Follow-up consultations to assess progress and adjust protocols",
        "Referrals to neurologists or specialists when complex issues are identified"
      ]
    },
    safetyNotes: {
      title: "Important Medical Information",
      notes: [
        "Sudden cognitive decline or severe memory problems may indicate serious neurological conditions requiring urgent in-person evaluation",
        "This service is designed for optimization and mild-to-moderate cognitive concerns, not treatment of dementia or severe neurological disorders",
        "Some nootropics may interact with medications; full disclosure of current treatments is essential",
        "Cognitive enhancement supplements are not FDA-approved for treating medical conditions"
      ],
      disclaimer: "This service does not replace neurological evaluation for significant cognitive impairment, sudden changes in mental status, or symptoms suggesting stroke or other emergencies. Seek immediate medical attention for acute neurological symptoms."
    },
    ctaLabel: "Begin Cognitive Assessment"
  },
  5: {
    id: 5,
    slug: "mental-health-wellness",
    headline: "Mental Health & Wellness: Comprehensive Support for Emotional Well-being",
    intro: "Mental health is foundational to overall wellness, yet accessing quality support can be challenging. Our mental health service provides telemedicine-based assessment, support for anxiety and depression, stress management strategies, and connections to therapeutic resources. We take a holistic approach that considers biological factors (hormones, sleep, nutrition), psychological elements, and lifestyle influences to support your emotional well-being and resilience.",
    typicalConcerns: [
      "Persistent feelings of anxiety or worry affecting daily life",
      "Low mood, sadness, or loss of interest in activities",
      "Chronic stress and difficulty managing life demands",
      "Sleep disturbances related to mental health",
      "Mood swings or emotional instability",
      "Difficulty coping with life transitions or challenges",
      "Seeking preventive mental health optimization"
    ],
    diagnosticApproach: {
      title: "Our Assessment Process",
      items: [
        "Validated mental health screening questionnaires for anxiety, depression, and stress",
        "Discussion of symptoms, duration, severity, and impact on functioning",
        "Assessment of biological factors that may contribute to mental health (sleep quality, hormonal status, chronic medical conditions)",
        "Lifestyle evaluation including social support, work stress, relationship health",
        "Screening for substance use and other factors affecting mental health",
        "Risk assessment and safety evaluation"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Mental Wellness",
      description: "We provide accessible, confidential mental health support through our telemedicine platform:",
      steps: [
        "Complete confidential mental health questionnaire and symptom assessment",
        "Virtual consultation with physicians experienced in mental health and integrative approaches",
        "Discussion of treatment options that may include therapy referrals, medication considerations, and lifestyle interventions",
        "Personalized wellness plan addressing sleep, stress management, exercise, and nutrition",
        "Connections to licensed therapists and mental health professionals in our network",
        "When appropriate, prescription support for anxiety, depression, or related conditions",
        "Regular follow-up to monitor progress and adjust support strategies",
        "Integration with other Lonvia services (hormone optimization, sleep support) when relevant"
      ]
    },
    safetyNotes: {
      title: "Safety & Crisis Resources",
      notes: [
        "This service is not suitable for severe psychiatric emergencies, active suicidal ideation, or psychotic symptoms",
        "Individuals experiencing thoughts of self-harm should contact crisis services immediately",
        "Severe mental health crises requiring hospitalization need emergency psychiatric care",
        "This service complements but does not replace ongoing psychiatric treatment or therapy"
      ],
      disclaimer: "If you are experiencing a mental health crisis, thoughts of self-harm, or suicidal ideation, please contact emergency services (112 in EU) or a crisis hotline immediately. This telemedicine service is designed for non-emergency mental health support and optimization."
    },
    ctaLabel: "Start Mental Wellness Assessment"
  },
  6: {
    id: 6,
    slug: "longevity-anti-aging",
    headline: "Longevity & Anti-Aging: Proactive Strategies for Healthy Aging",
    intro: "Modern longevity medicine focuses on extending healthspan—the years of life lived in good health—rather than just lifespan. Our longevity service combines cutting-edge biomarker testing, preventive assessments, and evidence-based interventions to optimize your biological age and reduce age-related disease risk. From peptide therapies to NAD+ optimization and comprehensive health monitoring, we help you age optimally and maintain vitality throughout your life.",
    typicalConcerns: [
      "Desire to optimize health and prevent age-related decline",
      "Noticing early signs of aging (reduced energy, slower recovery, skin changes)",
      "Family history of age-related diseases (cardiovascular, metabolic, neurodegenerative)",
      "Interest in cutting-edge anti-aging therapies and longevity science",
      "Concerns about biological age vs. chronological age",
      "Decreased physical performance and vitality with aging",
      "Proactive health optimization and disease prevention"
    ],
    diagnosticApproach: {
      title: "Comprehensive Longevity Assessment",
      items: [
        "Extensive biomarker panel assessing cardiovascular health, metabolic function, inflammation, and hormonal status",
        "Evaluation of longevity-specific markers (NAD+ levels, telomere health indicators when available, advanced lipid panels)",
        "Assessment of biological age markers and aging trajectories",
        "Cardiovascular risk stratification and metabolic health evaluation",
        "Lifestyle assessment including exercise, nutrition quality, sleep, stress, and social connections",
        "Genetic risk factors and family health history review",
        "Functional health assessment (strength, mobility, cognitive function)"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Longevity Goals",
      description: "Our longevity program takes a comprehensive, science-based approach to healthy aging:",
      steps: [
        "Complete detailed longevity and lifestyle questionnaire",
        "Access comprehensive lab testing including advanced biomarkers for aging and disease risk",
        "In-depth telemedicine consultation to review your longevity profile and goals",
        "Personalized anti-aging protocol that may include peptide therapies, NAD+ supplementation, senolytics, and other evidence-based interventions",
        "Targeted lifestyle optimization: exercise programming, nutritional strategies, sleep enhancement, stress reduction",
        "Access to premium supplements and longevity compounds through vetted partners",
        "Ongoing monitoring with regular biomarker testing to track biological age and health trajectory",
        "Quarterly consultations to optimize your protocol based on latest research and your results"
      ]
    },
    safetyNotes: {
      title: "Important Considerations",
      notes: [
        "Longevity optimization is a long-term commitment, not a quick fix",
        "Many anti-aging interventions are still emerging science; we focus on evidence-based approaches",
        "This service is preventive and optimization-focused, not treatment for active disease",
        "Individuals with serious chronic conditions should maintain care with their primary specialists"
      ],
      disclaimer: "Longevity medicine is an evolving field. While we base our recommendations on current evidence, many interventions are still being studied. This service does not replace treatment for existing medical conditions or emergency care."
    },
    ctaLabel: "Begin Longevity Assessment"
  },
  7: {
    id: 7,
    slug: "sexual-health-optimization",
    headline: "Sexual Health Optimization: Restoring Confidence and Intimate Wellness",
    intro: "Sexual health is an important aspect of overall well-being and quality of life. Our sexual health optimization service addresses concerns ranging from erectile dysfunction and low libido to hormonal factors affecting sexual function in both men and women. Through discreet telemedicine consultations, we provide access to effective treatments, hormone optimization, and comprehensive support to help you regain confidence and satisfaction in your intimate life.",
    typicalConcerns: [
      "Erectile dysfunction or difficulty maintaining erections",
      "Reduced sexual desire or low libido",
      "Performance anxiety or psychological barriers",
      "Hormonal factors affecting sexual function (low testosterone, menopause)",
      "Reduced sensitivity or sexual satisfaction",
      "Relationship strain due to sexual health concerns",
      "Age-related decline in sexual performance"
    ],
    diagnosticApproach: {
      title: "Confidential Sexual Health Evaluation",
      items: [
        "Private questionnaire about sexual health history, concerns, and goals",
        "Assessment of potential contributing factors (cardiovascular health, medications, psychological factors)",
        "Hormone evaluation when relevant (testosterone, estrogen, thyroid)",
        "Cardiovascular risk assessment (especially important for ED evaluation)",
        "Review of relationship dynamics and psychological factors",
        "Screening for underlying conditions that may affect sexual function"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Sexual Health",
      description: "We provide confidential, judgment-free support for sexual health optimization:",
      steps: [
        "Complete private questionnaire in a secure, confidential environment",
        "Discreet telemedicine consultation with physicians experienced in sexual health",
        "Laboratory testing when appropriate to identify hormonal or metabolic factors",
        "Personalized treatment plan that may include PDE5 inhibitors (sildenafil, tadalafil), hormone optimization, or other evidence-based therapies",
        "Lifestyle counseling addressing factors like exercise, stress, sleep, and nutrition",
        "Referrals to sex therapists or couples counselors when psychological factors are significant",
        "Discreet home delivery of medications with ongoing prescription management",
        "Regular follow-up to ensure treatment effectiveness and safety"
      ]
    },
    safetyNotes: {
      title: "Medical Safety Information",
      notes: [
        "Sexual dysfunction can sometimes indicate serious cardiovascular problems; medical evaluation is important",
        "Not suitable for individuals with certain heart conditions, recent stroke, or uncontrolled blood pressure without cardiology clearance",
        "Some sexual health medications have interactions with common drugs (especially nitrates)",
        "Sudden loss of sexual function may warrant urgent in-person medical evaluation"
      ],
      disclaimer: "Sexual health medications require medical evaluation to ensure safety. Certain cardiovascular conditions may contraindicate treatment. This service does not replace emergency cardiovascular care or treatment for acute medical conditions."
    },
    ctaLabel: "Start Confidential Assessment"
  },
  8: {
    id: 8,
    slug: "athletic-performance",
    headline: "Athletic Performance Enhancement: Optimize Recovery, Strength, and Endurance",
    intro: "Peak athletic performance requires more than just training—it demands optimal recovery, hormonal balance, nutritional support, and strategic supplementation. Our performance enhancement service is designed for athletes, fitness enthusiasts, and active individuals seeking to maximize their physical potential. Through comprehensive testing and medical supervision, we create personalized protocols to improve strength, endurance, recovery, and overall athletic performance while prioritizing health and safety.",
    typicalConcerns: [
      "Plateaued performance despite consistent training",
      "Slow recovery between workouts or competitions",
      "Reduced strength gains or muscle development",
      "Persistent fatigue affecting training quality",
      "Frequent injuries or prolonged healing times",
      "Declining performance with age",
      "Desire to optimize body composition for sport"
    ],
    diagnosticApproach: {
      title: "Performance Evaluation Approach",
      items: [
        "Detailed athletic history including training volume, sport-specific demands, and performance goals",
        "Hormone panel assessment (testosterone, growth hormone markers, thyroid, cortisol)",
        "Metabolic and nutritional status evaluation (iron, vitamin D, B12, magnesium, electrolytes)",
        "Recovery markers and inflammation assessment",
        "Body composition analysis and lean muscle mass evaluation",
        "Sleep quality, stress levels, and recovery capacity assessment",
        "Screening for overtraining syndrome and hormonal imbalances"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Optimizes Your Performance",
      description: "Our sports-focused approach combines medical expertise with performance science:",
      steps: [
        "Complete performance and training questionnaire detailing your sport and goals",
        "Comprehensive lab testing to identify limiting factors and optimization opportunities",
        "Telemedicine consultation with physicians knowledgeable in sports medicine and performance",
        "Personalized performance protocol including recovery optimization, supplement strategies, and if appropriate, hormone optimization",
        "Evidence-based supplement recommendations (creatine, protein, performance nutrients)",
        "Sleep and recovery optimization strategies",
        "Injury prevention guidance and rehabilitation support",
        "Regular monitoring to track performance improvements and adjust protocols",
        "Coordination with your coaches or trainers when desired"
      ]
    },
    safetyNotes: {
      title: "Safety & Fair Play",
      notes: [
        "We prioritize health and safety over performance at all costs",
        "All recommendations comply with health regulations; we do not support doping or banned substance use",
        "Not suitable for individuals seeking illegal performance-enhancing drugs",
        "Competitive athletes must ensure any protocols comply with their sport's anti-doping regulations"
      ],
      disclaimer: "Our performance optimization service focuses on legal, health-promoting interventions. We do not prescribe banned substances or support doping. Athletes subject to drug testing should discuss all supplements and treatments with their sports medicine team."
    },
    ctaLabel: "Start Performance Assessment"
  },
  9: {
    id: 9,
    slug: "skin-health-aesthetics",
    headline: "Skin Health & Aesthetics: Medical-Grade Solutions for Radiant Skin",
    intro: "Healthy, radiant skin reflects overall wellness and can significantly impact confidence. Our skin health service combines dermatological expertise with aesthetic medicine to address concerns like aging skin, acne, hyperpigmentation, and skin quality. Through telemedicine consultations, we provide access to prescription skincare (retinoids, specialized formulations), supplement protocols, and advanced aesthetic recommendations tailored to your skin type and goals.",
    typicalConcerns: [
      "Signs of premature aging (fine lines, wrinkles, loss of firmness)",
      "Acne or persistent breakouts in adulthood",
      "Uneven skin tone, hyperpigmentation, or sun damage",
      "Dull, tired-looking skin lacking radiance",
      "Skin texture concerns (enlarged pores, roughness)",
      "Rosacea or sensitive, reactive skin",
      "Desire for preventive anti-aging skincare strategies"
    ],
    diagnosticApproach: {
      title: "Skin Health Evaluation",
      items: [
        "Detailed skin history questionnaire and photo documentation",
        "Assessment of skin type, concerns, and aesthetic goals",
        "Current skincare routine and product review",
        "Lifestyle factors affecting skin (sun exposure, diet, sleep, stress, smoking)",
        "Hormonal influences on skin health (acne, aging patterns)",
        "Nutritional status relevant to skin health (vitamin A, C, E, zinc, collagen)",
        "Identification of medical skin conditions vs. aesthetic concerns"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Skin Health",
      description: "Our aesthetic telemedicine approach provides medical-grade skincare solutions:",
      steps: [
        "Submit skin questionnaire with photos in controlled lighting",
        "Virtual consultation with physicians experienced in aesthetic dermatology",
        "Personalized skincare protocol using prescription ingredients (tretinoin, hydroquinone, specialized compounds)",
        "Evidence-based supplement recommendations for skin health (collagen, antioxidants, omega-3s)",
        "Guidance on professional treatments (chemical peels, lasers, microneedling) with referrals to trusted aesthetic clinics",
        "Sun protection and skin cancer prevention education",
        "Access to medical-grade skincare products through partner pharmacies",
        "Regular follow-up consultations with photo tracking to assess progress and refine protocols"
      ]
    },
    safetyNotes: {
      title: "Important Skin Health Information",
      notes: [
        "New or changing moles, suspicious lesions, or skin cancer concerns require in-person dermatological examination",
        "Severe acne, extensive rashes, or signs of infection may need in-person treatment",
        "Prescription skincare can cause irritation; proper guidance and monitoring are essential",
        "This service focuses on medical skincare and aesthetics, not treatment of serious dermatological diseases"
      ],
      disclaimer: "This telemedicine service is designed for aesthetic skincare and common skin concerns. It does not replace in-person dermatological examination for suspicious lesions, severe skin disease, or conditions requiring procedural treatment."
    },
    ctaLabel: "Begin Skin Health Assessment"
  },
  10: {
    id: 10,
    slug: "sleep-optimization",
    headline: "Sleep Optimization: Restoring Restorative Sleep for Health and Performance",
    intro: "Quality sleep is fundamental to physical health, mental clarity, hormonal balance, and longevity. Our sleep optimization service addresses insomnia, poor sleep quality, and sleep-related health concerns through comprehensive assessment and evidence-based interventions. We evaluate sleep disorders, hormonal and lifestyle factors affecting rest, and create personalized protocols to help you achieve consistently restorative sleep—essential for recovery, cognitive function, and overall well-being.",
    typicalConcerns: [
      "Difficulty falling asleep or staying asleep through the night",
      "Non-restorative sleep (waking tired despite adequate hours)",
      "Daytime fatigue and low energy due to poor sleep",
      "Frequent nighttime awakenings disrupting sleep continuity",
      "Racing thoughts or anxiety interfering with sleep",
      "Suspected sleep apnea or breathing issues during sleep",
      "Shift work or irregular schedules affecting sleep patterns"
    ],
    diagnosticApproach: {
      title: "Sleep Health Assessment",
      items: [
        "Detailed sleep history questionnaire (sleep duration, quality, patterns, disturbances)",
        "Sleep diary review to identify patterns and triggers",
        "Assessment of sleep environment, habits, and sleep hygiene practices",
        "Screening for sleep disorders (insomnia, sleep apnea, restless leg syndrome)",
        "Evaluation of factors affecting sleep: stress, anxiety, medications, caffeine, alcohol",
        "Hormone assessment when relevant (cortisol rhythm, melatonin, thyroid function)",
        "Medical conditions impacting sleep (pain, nocturia, acid reflux)"
      ]
    },
    lonviaSupport: {
      title: "How Lonvia Supports Your Sleep Health",
      description: "We provide comprehensive, evidence-based sleep optimization through telemedicine:",
      steps: [
        "Complete detailed sleep questionnaire and track sleep patterns",
        "Virtual consultation with physicians experienced in sleep medicine",
        "Personalized sleep optimization protocol including sleep hygiene education, behavioral strategies, and environmental modifications",
        "Evidence-based supplement recommendations (magnesium, glycine, melatonin when appropriate, herbal support)",
        "When needed, prescription sleep aid options with careful monitoring",
        "Referrals for sleep study if sleep apnea is suspected",
        "Addressing underlying factors (hormone imbalances, anxiety, pain) that disrupt sleep",
        "Follow-up consultations to refine your sleep protocol and ensure sustainable improvements"
      ]
    },
    safetyNotes: {
      title: "Sleep Safety Considerations",
      notes: [
        "Severe daytime sleepiness, loud snoring, or witnessed breathing pauses may indicate sleep apnea requiring formal sleep study",
        "Sudden changes in sleep patterns may indicate underlying medical or psychiatric conditions",
        "Chronic insomnia sometimes requires cognitive behavioral therapy (CBT-I) rather than medication alone",
        "Sleep medications should be used judiciously under medical supervision"
      ],
      disclaimer: "This service provides sleep optimization support but does not replace formal sleep studies for suspected sleep apnea or other sleep disorders requiring diagnostic testing. Severe sleep disturbances should be evaluated by a sleep specialist."
    },
    ctaLabel: "Start Sleep Assessment"
  }
};

