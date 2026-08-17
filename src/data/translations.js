// Dynamic multi-lingual dictionary matching reference video languages and UI prompts

export const LANGUAGES = [
  { id: 'hi', name: 'हिंदी', englishName: 'Hindi', flag: '🇮🇳' },
  { id: 'ta', name: 'தமிழ்', englishName: 'Tamil', flag: '🇮🇳' },
  { id: 'mr', name: 'मराठी', englishName: 'Marathi', flag: '🇮🇳' },
  { id: 'bn', name: 'বাংলা', englishName: 'Bengali', flag: '🇮🇳' },
  { id: 'te', name: 'తెలుగు', englishName: 'Telugu', flag: '🇮🇳' },
  { id: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', flag: '🇮🇳' },
  { id: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', flag: '🇮🇳' },
  { id: 'ur', name: 'اردو', englishName: 'Urdu', flag: '🇵🇰' },
  { id: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia', flag: '🇮🇳' },
  { id: 'ml', name: 'മലയാളം', englishName: 'Malayalam', flag: '🇮🇳' },
  { id: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', flag: '🇮🇳' },
  { id: 'ne', name: 'नेपाली', englishName: 'Nepali', flag: '🇳🇵' },
  { id: 'es', name: 'español', englishName: 'Spanish', flag: '🇪🇸' },
  { id: 'ar', name: 'العربية', englishName: 'Arabic', flag: '🇸🇦' },
  { id: 'en', name: 'English', englishName: 'English', flag: '🇬🇧' }
];

export const TRANSLATIONS = {
  en: {
    langQuestion: "Which language do you speak at home?",
    levelQuestion: "What is your English level?",
    levelOptions: [
      "I am new to English",
      "I know some common english words",
      "I can do basic conversations",
      "I can talk about various topics",
      "I can discuss big topics in detail"
    ],
    profileTitle: "Tell us about yourself",
    nameLabel: "Your name",
    namePlaceholder: "Type your name here...",
    genderLabel: "Gender",
    genderMale: "Male",
    genderFemale: "Female",
    ageLabel: "Select Age",
    motivationTitle: "What is your main motivation to learn English?",
    motivationOptions: [
      "Promotion at office / Career growth",
      "Overseas travel",
      "Speaking with friends & family in English",
      "Everyday English",
      "Success in job interviews",
      "Just for fun & interest",
      "Higher education"
    ],
    professionTitle: "What is your profession?",
    professionOptions: [
      "Homemaker",
      "Driver",
      "Working professional",
      "Student",
      "Investor",
      "Business owner",
      "Teacher",
      "Job seeker"
    ],
    timelineTitle: "How quickly do you want to learn English?",
    timelineOptions: [
      "Within 1 Month ⚡",
      "1 - 3 Months 📅",
      "6 Months 🗓️",
      "No fixed timeline 🌱"
    ],
    challengeTitle: "What is the hardest part for you in learning English?",
    challengeOptions: [
      "I forget words while speaking 😕",
      "Understanding English speakers 👂",
      "Correct sentence structure ✍️",
      "Hesitation while speaking English 😰",
      "Understanding grammar rules 📚"
    ],
    studyTimeTitle: "What is the best time in your day to learn?",
    studyTimeOptions: [
      "Morning (Before work) 🌅",
      "Daytime ☀️",
      "Afternoon 🥪",
      "Evening 🌙",
      "Before sleep 🛌",
      "Flexible 🚩"
    ],
    dailyTimeTitle: "How much time are you ready to dedicate daily?",
    dailyTimeOptions: [
      "5-10 minutes ⏰",
      "15-30 minutes 📱",
      "30-60 minutes 💻",
      "More than 1 hour 🚀",
      "Whenever I feel like 👩‍💻"
    ],
    supportTitle: "How should I assist you?",
    supportOptions: [
      "Strict reminders 🔥",
      "Gentle notifications 🔔",
      "Silent mode 🤫",
      "Strict tutor ⚡",
      "Others 🔍"
    ],
    habitTitle: "I'll remind you to practice so it becomes a habit",
    allowNotifications: "Allow SpeakX to send you notifications?",
    allowBtn: "Allow",
    dontAllowBtn: "Don't Allow",
    remindBtn: "Remind me to practice",
    summaryWelcome: "You are ready to start,",
    summarySubtitle: "Here is your personalized learning profile:",
    startJourney: "Start your journey",
    continue: "Continue"
  },
  ta: {
    langQuestion: "வீட்டில் நீங்கள் எந்த மொழி பேசுகிறீர்கள்?",
    levelQuestion: "உங்கள் English level என்ன?",
    levelOptions: [
      "நான் English-ல் புதியவன்",
      "எனக்கு சில common English words தெரியும்",
      "Basic conversations என்னால் பேச முடியும்",
      "பல்வேறு topics பற்றி பேசுவது எனக்கு",
      "English fluently பேசுவதில் எந்த சிக்கலும் இல்லை"
    ],
    profileTitle: "வணக்கம், நான் சியா",
    nameLabel: "உங்கள் பெயர்",
    namePlaceholder: "உங்கள் பெயரை இங்கே தட்டச்சு செய்க...",
    genderLabel: "பாலினம்",
    genderMale: "ஆண் (Male)",
    genderFemale: "பெண் (Female)",
    ageLabel: "வயதைத் தேர்ந்தெடுக்கவும்",
    motivationTitle: "இங்கிலீஷ் கற்றுக்கொள்வதற்கான உங்கள் முக்கிய உந்துதல் என்ன?",
    motivationOptions: [
      "அலுவலகத்தில் பதவி உயர்வு பெறுவது 🏢",
      "வெளிநாட்டு பயணம் ✈️",
      "நண்பர்கள்/குடும்பத்துடன் ஆங்கிலத்தில் பேசுவது 👥",
      "அன்றாட ஆங்கிலம் 🗣️",
      "வேலை நேர்காணல்களில் தேர்ச்சி 👨‍💻",
      "வெறும் சுவாரஸ்யத்திற்கு 🎉",
      "உயர்கல்வி 🎓"
    ],
    professionTitle: "உங்கள் தொழில் என்ன?",
    professionOptions: [
      "இல்லத்தரசி 🏠",
      "டிரைவர் 🚗",
      "பணிபுரிபவர் 👔",
      "மாணவர் 🎓",
      "முதலீட்டாளர் 📈",
      "வணிக உரிமையாளர் 💼",
      "ஆசிரியர் 👩‍🏫",
      "வேலை தேடுகிறேன் 🔍"
    ],
    timelineTitle: "எவ்வளவு விரைவாக ஆங்கிலம் கற்க விரும்புகிறீர்கள்?",
    timelineOptions: [
      "1 மாதத்திற்குள் ⚡",
      "1-3 மாதங்கள் 📅",
      "6 மாதங்கள் 🗓️",
      "நிலையான கால அளவு இல்லை 🌱"
    ],
    challengeTitle: "ஆங்கிலம் கற்பதில் கடினமான பகுதி எது?",
    challengeOptions: [
      "வார்த்தைகளை மறந்துவிடுகிறேன் 😕",
      "ஆங்கிலம் பேசுபவர்களைப் புரிந்துகொள்வது 👂",
      "சரியான வாக்கிய அமைப்பு ✍️",
      "ஆங்கிலம் பேசும்போது தயக்கம் 😰",
      "இலக்கண விதிகளைப் புரிந்துகொள்வது 📚"
    ],
    studyTimeTitle: "உங்கள் நாளில் கற்றுக்கொள்ள எந்த நேரம் சிறந்தது?",
    studyTimeOptions: [
      "காலை (வேலைக்கு முன்) 🌅",
      "பகல் நேரம் ☀️",
      "மதிய நேரம் 🥪",
      "மாலை 🌙",
      "தூங்குவதற்கு முன் 🛌",
      "நெகிழ்வான 🚩"
    ],
    dailyTimeTitle: "தினமும் கற்றுக்கொள்ள எவ்வளவு நேரம் ஒதுக்க தயாராக இருக்கிறீர்கள்?",
    dailyTimeOptions: [
      "5-10 நிமிடங்கள் ⏰",
      "15-30 நிமிடங்கள் 📱",
      "30-60 நிமிடங்கள் 💻",
      "1 மணி நேரத்திற்கு மேல் 🚀",
      "எனக்கு தோன்றும்ப்போது 👩‍💻"
    ],
    supportTitle: "நான் உங்களுக்கு எப்படி உதவ வேண்டும்?",
    supportOptions: [
      "கடுமையான நினைவூட்டல்கள் 🔥",
      "மென்மையான அறிவிப்புகள் 🔔",
      "அமைதி முறை 🤫",
      "கண்டிப்பான பயிற்சியாளர் ⚡",
      "மற்றவை 🔍"
    ],
    habitTitle: "நீங்கள் பயிற்சியை ஒரு வழக்கமாக்க நினைவூட்டுகிறேன்",
    allowNotifications: "SpeakX உங்களுக்கு அறிவிப்புகளை அனுப்ப அனுமதிக்கவா?",
    allowBtn: "அனுமதி",
    dontAllowBtn: "வேண்டாம்",
    remindBtn: "பயிற்சி செய்ய நினைவூட்டு",
    summaryWelcome: "நீங்கள் தயாராக உள்ளீர்கள்,",
    summarySubtitle: "இதோ உங்கள் கற்றல் சுயவிவரம்:",
    startJourney: "பயணத்தைத் தொடங்குங்கள்",
    continue: "தொடரவும் (Continue)"
  },
  hi: {
    langQuestion: "आप घर पर कौन सी भाषा बोलते हैं?",
    levelQuestion: "आपका english level क्या है?",
    levelOptions: [
      "Main english mein abhi beginner hoon",
      "Mujhe kuch common English words aate hain",
      "Basic conversation mujhse ho jaati hai",
      "Alag-alag topics par baat karne mein comfortable hoon",
      "English fluently bolne mein koi dikkat nahin"
    ],
    profileTitle: "नमस्ते, मैं सिया हूँ",
    nameLabel: "आपका नाम",
    namePlaceholder: "अपना नाम यहाँ लिखें...",
    genderLabel: "लिंग",
    genderMale: "पुरुष (Male)",
    genderFemale: "महिला (Female)",
    ageLabel: "उम्र चुनें",
    motivationTitle: "अंग्रेजी सीखने का आपका मुख्य उद्देश्य क्या है?",
    motivationOptions: [
      "ऑफिस में प्रमोशन / करियर ग्रोथ 🏢",
      "विदेश यात्रा ✈️",
      "दोस्तों और परिवार से इंग्लिश में बात करना 👥",
      "डेली लाइफ इंग्लिश 🗣️",
      "जॉब इंटरव्यू में सफलता 👨‍💻",
      "सिर्फ शौक के लिए 🎉",
      "उच्च शिक्षा 🎓"
    ],
    professionTitle: "आपका पेशा क्या है?",
    professionOptions: [
      "गृहणी (Homemaker) 🏠",
      "ड्राइवर 🚗",
      "वर्किंग प्रोफेशनल 👔",
      "छात्र (Student) 🎓",
      "इन्वेस्टर 📈",
      "बिजनेस ओनर 💼",
      "टीचर 👩‍🏫",
      "जॉब की तलाश में 🔍"
    ],
    timelineTitle: "आप कितनी जल्दी इंग्लिश सीखना चाहते हैं?",
    timelineOptions: [
      "1 महीने के अंदर ⚡",
      "1 - 3 महीने 📅",
      "6 महीने 🗓️",
      "कोई समय सीमा नहीं 🌱"
    ],
    challengeTitle: "इंग्लिश सीखने में सबसे कठिन क्या लगता है?",
    challengeOptions: [
      "बोलते समय शब्द भूल जाता/जाती हूँ 😕",
      "अंग्रेजी बोलने वालों को समझना 👂",
      "सही वाक्य संरचना ✍️",
      "बोलते समय हिचकिचाहट 😰",
      "ग्रामर के नियम समझना 📚"
    ],
    studyTimeTitle: "पढ़ाई के लिए दिन का कौन सा समय सबसे अच्छा है?",
    studyTimeOptions: [
      "सुबह (काम से पहले) 🌅",
      "दिन में ☀️",
      "दोपहर 🥪",
      "शाम 🌙",
      "सोने से पहले 🛌",
      "लचीला 🚩"
    ],
    dailyTimeTitle: "आप रोज कितना समय दे सकते हैं?",
    dailyTimeOptions: [
      "5-10 मिनट ⏰",
      "15-30 मिनट 📱",
      "30-60 मिनट 💻",
      "1 घंटे से ज्यादा 🚀",
      "जब भी मन करे 👩‍💻"
    ],
    supportTitle: "मैं आपकी मदद कैसे करूँ?",
    supportOptions: [
      "सख्त रिमाइंडर 🔥",
      "हल्के नोटिफिकेशन 🔔",
      "साइलेंट मोड 🤫",
      "स्ट्रिक्ट ट्यूटर ⚡",
      "अन्य 🔍"
    ],
    habitTitle: "मैं आपको प्रैक्टिस याद दिलाऊँगा ताकि आदत बन सके",
    allowNotifications: "क्या SpeakX को नोटिफिकेशन भेजने की अनुमति दें?",
    allowBtn: "अनुमति दें",
    dontAllowBtn: "न दें",
    remindBtn: "प्रैक्टिस याद दिलाएं",
    summaryWelcome: "आप तैयार हैं,",
    summarySubtitle: "यह रहा आपका लर्निंग प्रोफाइल:",
    startJourney: "अपनी यात्रा शुरू करें",
    continue: "आगे बढ़ें (Continue)"
  },
  te: {
    langQuestion: "మీరు ఇంట్లో ఏ భాష మాట్లాడతారు?",
    levelQuestion: "మీ English level ఏమిటి?",
    levelOptions: [
      "నేను English లో beginner ని",
      "నాకు కొన్ని common English words తెలుసు",
      "Basic conversations నేను చేయగలను",
      "వేర్వేరు topics పై మాట్లాడటం నాకు comfortable",
      "English fluently మాట్లాడటంలో ఏ ఇబ్బంది లేదు"
    ],
    profileTitle: "నమస్కారం, నేను సియా",
    nameLabel: "మీ పేరు",
    namePlaceholder: "మీ పేరు ఇక్కడ టైప్ చేయండి...",
    genderLabel: "లింగం",
    genderMale: "పురుషుడు (Male)",
    genderFemale: "స్త్రీ (Female)",
    ageLabel: "వయస్సును ఎంచుకోండి",
    motivationTitle: "ఇంగ్లీష్ నేర్చుకోవడానికి మీ ముఖ్య ఉద్దేశం ఏమిటి?",
    motivationOptions: [
      "కార్యాలయంలో ప్రమోషన్ 🏢",
      "విదేశీ ప్రయాణం ✈️",
      "స్నేహితులు/కుటుంబంతో మాట్లాడటం 👥",
      "రోజువారీ ఇంగ్లీష్ 🗣️",
      "ఇంటర్వ్యూలలో విజయం 👨‍💻",
      "కేవలం ఆసక్తి కోసం 🎉",
      "ఉన్నత చదువులు 🎓"
    ],
    professionTitle: "మీ వృత్తి ఏమిటి?",
    professionOptions: [
      "గృహిణి 🏠",
      "డ్రైవర్ 🚗",
      "ఉద్యోగి 👔",
      "విద్యార్థి 🎓",
      "ఇన్వెస్టర్ 📈",
      "వ్యాపారవేత్త 💼",
      "టీచర్ 👩‍🏫",
      "ఉద్యోగాన్వేషణ 🔍"
    ],
    timelineTitle: "మీరు ఎంత త్వరగా నేర్చుకోవాలనుకుంటున్నారు?",
    timelineOptions: [
      "1 నెలలోపు ⚡",
      "1-3 నెలలు 📅",
      "6 నెలలు 🗓️",
      "సమయ పరిమితి లేదు 🌱"
    ],
    challengeTitle: "ఇంగ్లీష్ నేర్చుకోవడంలో కష్టమైన భాగం ఏది?",
    challengeOptions: [
      "పదాలు మరచిపోతున్నాను 😕",
      "ఇంగ్లీష్ మాట్లాడేవారిని అర్థం చేసుకోవడం 👂",
      "సరైన వాక్య నిర్మాణం ✍️",
      "మాట్లాడేటప్పుడు సంకోచం 😰",
      "గ్రామర్ నియమాలు అర్థం చేసుకోవడం 📚"
    ],
    studyTimeTitle: "నేర్చుకోవడానికి ఏ సమయం అనుకూలం?",
    studyTimeOptions: [
      "ఉదయం 🌅",
      "పగలు ☀️",
      "మధ్యాహ్నం 🥪",
      "సాయంత్రం 🌙",
      "నిద్రపోయే ముందు 🛌",
      "ఎప్పుడైనా 🚩"
    ],
    dailyTimeTitle: "రోజుకు ఎంత సమయం కేటాయించగలరు?",
    dailyTimeOptions: [
      "5-10 నిమిషాలు ⏰",
      "15-30 నిమిషాలు 📱",
      "30-60 నిమిషాలు 💻",
      "1 గంట కంటే ఎక్కువ 🚀",
      "నాకు అనిపించినప్పుడు 👩‍💻"
    ],
    supportTitle: "నేను మీకు ఎలా సహాయపడాలి?",
    supportOptions: [
      "ఖచ్చితమైన రిమైండర్లు 🔥",
      "సాధారణ నోటిఫికేషన్లు 🔔",
      "సైలెంట్ మోడ్ 🤫",
      "స్ట్రిక్ట్ ట్యూటర్ ⚡",
      "ఇతరములు 🔍"
    ],
    habitTitle: "అలవాటుగా మారడానికి నేను మీకు రిమైండ్ చేస్తాను",
    allowNotifications: "SpeakX మీకు నోటిఫికేషన్‌లు పంపడానికి అనుమతించాలా?",
    allowBtn: "అనుమతించు",
    dontAllowBtn: "అనుమతించవద్దు",
    remindBtn: "రిమైండ్ చేయండి",
    summaryWelcome: "మీరు సిద్ధంగా ఉన్నారు,",
    summarySubtitle: "ఇది మీ నేర్చుకునే ప్రొఫైల్:",
    startJourney: "ప్రయాణాన్ని ప్రారంభించండి",
    continue: "ముందుకు సాగండి (Continue)"
  },
  kn: {
    langQuestion: "ಮನೆಯಲ್ಲಿ ನೀವು ಯಾವ ಭಾಷೆ ಮಾತನಾಡುತ್ತೀರಿ?",
    levelQuestion: "ನಿಮ್ಮ English level ಏನು?",
    levelOptions: [
      "ನಾನು English ನಲ್ಲಿ beginner",
      "ನನಗೆ ಕೆಲವು common English words ಗೊತ್ತು",
      "Basic conversations ನನ್ನಿಂದ ಆಗುತ್ತದೆ",
      "ಬೇರೆ ಬೇರೆ topics ಬಗ್ಗೆ ಮಾತನಾಡಲು comfortable",
      "English fluently ಮಾತನಾಡಲು ಯಾವ ತೊಂದರೆ ಇಲ್ಲ"
    ],
    profileTitle: "ನಮಸ್ಕಾರ, ನಾನು ಸಿಯಾ",
    nameLabel: "ನಿಮ್ಮ ಹೆಸರು",
    namePlaceholder: "ನಿಮ್ಮ ಹೆಸರನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    genderLabel: "ಲಿಂಗ",
    genderMale: "ಪುರುಷ (Male)",
    genderFemale: "ಮಹಿಳೆ (Female)",
    ageLabel: "ವಯಸ್ಸನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    motivationTitle: "ಇಂಗ್ಲಿಷ್ ಕಲಿಯಲು ನಿಮ್ಮ ಮುಖ್ಯ ಉದ್ದೇಶವೇನು?",
    motivationOptions: [
      "ಉದ್ಯೋಗದಲ್ಲಿ ಬಡ್ತಿ 🏢",
      "ವಿದೇಶಿ ಪ್ರಯಾಣ ✈️",
      "ಸ್ನೇಹಿತರೊಂದಿಗೆ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡುವುದು 👥",
      "ದೈನಂದಿನ ಇಂಗ್ಲಿಷ್ 🗣️",
      "ನೇರ ಸಂದರ್ಶನಗಳಲ್ಲಿ ಯಶಸ್ಸು 👨‍💻",
      "ಕೇವಲ ಆಸಕ್ತಿಗಾಗಿ 🎉",
      "ಉನ್ನತ ಶಿಕ್ಷಣ 🎓"
    ],
    professionTitle: "ನಿಮ್ಮ ಕಸುಬು ಯಾವುದು?",
    professionOptions: [
      "ಗೃಹಿಣಿ 🏠",
      "ಚಾಲಕ 🚗",
      "ಉದ್ಯೋಗಿ 👔",
      "ವಿದ್ಯಾರ್ಥಿ 🎓",
      "ಹೂಡಿಕೆದಾರ 📈",
      "ವ್ಯಾಪಾರಿ 💼",
      "ಶಿಕ್ಷಕ 👩‍🏫",
      "ಕೆಲಸ ಹುಡುಕುತ್ತಿದ್ದೇನೆ 🔍"
    ],
    timelineTitle: "ಎಷ್ಟು ಬೇಗ ಇಂಗ್ಲಿಷ್ ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?",
    timelineOptions: [
      "1 ತಿಂಗಳೊಳಗೆ ⚡",
      "1-3 ತಿಂಗಳುಗಳು 📅",
      "6 ತಿಂಗಳುಗಳು 🗓️",
      "ಯಾವ ನಿರ್ದಿಷ್ಟ ಸಮಯವಿಲ್ಲ 🌱"
    ],
    challengeTitle: "ಇಂಗ್ಲಿಷ್ ಕಲಿಯುವಲ್ಲಿ ಕಷ್ಟಕರವಾದ ಭಾಗ ಯಾವುದು?",
    challengeOptions: [
      "ಮಾತನಾಡುವಾಗ ಪದಗಳು ಮರೆತುಹೋಗುತ್ತವೆ 😕",
      "ಇಂಗ್ಲಿಷ್ ಮಾತನಾಡುವವರನ್ನು ಅರ್ಥೈಸಿಕೊಳ್ಳುವುದು 👂",
      "ಸರಿಯಾದ ವಾಕ್ಯ ರಚನೆ ✍️",
      "ಮಾತನಾಡುವಾಗ ಹಿಂಜರಿಕೆ 😰",
      "ವ್ಯಾಕರಣ ನಿಯಮಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು 📚"
    ],
    studyTimeTitle: "ಕಲಿಯಲು ದಿನದ ಯಾವ ಸಮಯ ಸೂಕ್ತ?",
    studyTimeOptions: [
      "ಬೆಳಿಗ್ಗೆ 🌅",
      "ಹಗಲು ☀️",
      "ಮಧ್ಯಾಹ್ನ 🥪",
      "ಸಂಜೆ 🌙",
      "ಮಲಗುವ ಮುನ್ನ 🛌",
      "ಯಾವಾಗಲಾದರೂ 🚩"
    ],
    dailyTimeTitle: "ದಿನಕ್ಕೆ ಎಷ್ಟು ಸಮಯ ನೀಡಬಲ್ಲರಿ?",
    dailyTimeOptions: [
      "5-10 ನಿಮಿಷಗಳು ⏰",
      "15-30 ನಿಮಿಷಗಳು 📱",
      "30-60 ನಿಮಿಷಗಳು 💻",
      "1 ಗಂಟೆಗಿಂತ ಹೆಚ್ಚು 🚀",
      "ನನಗೆ ಅನ್ನಿಸಿದಾಗ 👩‍💻"
    ],
    supportTitle: "ನಾನು ನಿಮಗೇಗೆ ಸಹಾಯ ಮಾಡಬೇಕು?",
    supportOptions: [
      "ಕಟ್ಟುನಿಟ್ಟಿನ ನೆನಪುಗಳು 🔥",
      "ಮೃದುವಾದ ಸೂಚನೆಗಳು 🔔",
      "ಸೈಲೆಂಟ್ ಮೋಡ್ 🤫",
      "ಕಟ್ಟುನಿಟ್ಟಿನ ತರಬೇತುದಾರ ⚡",
      "ಇತರ 🔍"
    ],
    habitTitle: "ಅಭ್ಯಾಸವಾಗಲು ನಾನು ನಿಮಗೆ ನೆನಪಿಸುತ್ತೇನೆ",
    allowNotifications: "SpeakX ನಿಮಗೆ ಸೂಚನೆಗಳನ್ನು ಕಳುಹಿಸಲು ಅನುಮತಿಸುವುದೇ?",
    allowBtn: "ಅನುಮತಿಸಿ",
    dontAllowBtn: "ಬೇಡ",
    remindBtn: "ನೆನಪಿಸಿ",
    summaryWelcome: "ನೀವು ಸಿದ್ಧರಾಗಿದ್ದೀರಿ,",
    summarySubtitle: "ಇಗೋ ನಿಮ್ಮ ಕಲಿಕೆಯ ಪ್ರೊಫೈಲ್:",
    startJourney: "ಪ್ರಾರಂಭಿಸಿ",
    continue: "ಮುಂದುವರಿಸಿ (Continue)"
  }
};

export function getTranslation(langId, key) {
  const dictionary = TRANSLATIONS[langId] || TRANSLATIONS.en;
  return dictionary[key] || TRANSLATIONS.en[key] || key;
}
