export const PRACTICE_SCENARIOS = [
  {
    id: 'interview',
    title: 'Job Interview Preparation',
    category: 'Career',
    icon: 'Briefcase',
    level: 'Intermediate',
    description: 'Practice answering common job interview questions with confidence.',
    initialGreeting: "Hello! Welcome to the interview practice. Can you tell me a little about yourself and your professional experience?",
    sampleResponses: [
      "Tell me about a time you solved a difficult problem.",
      "What are your biggest strengths?",
      "Why do you want to work with our team?"
    ]
  },
  {
    id: 'cafe',
    title: 'Coffee Shop Ordering',
    category: 'Daily Speaking',
    icon: 'Coffee',
    level: 'Beginner',
    description: 'Order your favorite coffee and pastry at a busy cafe.',
    initialGreeting: "Hi there! Welcome to Sunside Coffee. What can I get started for you today?",
    sampleResponses: [
      "I'd like an oat milk latte, please.",
      "Do you have fresh croissants?",
      "Can I get that to go?"
    ]
  },
  {
    id: 'office_chat',
    title: 'Workplace Small Talk',
    category: 'Workplace',
    icon: 'MessageSquare',
    level: 'Beginner',
    description: 'Chat with a colleague near the water cooler about weekend plans.',
    initialGreeting: "Hey! How is your day going so far? Got any exciting plans for this weekend?",
    sampleResponses: [
      "I'm planning to relax and meet some friends.",
      "Work has been quite busy today!",
      "Did you see the project updates?"
    ]
  },
  {
    id: 'travel',
    title: 'Hotel Check-In & Travel',
    category: 'Travel',
    icon: 'Plane',
    level: 'Intermediate',
    description: 'Check in at an international hotel receptionist counter.',
    initialGreeting: "Good afternoon, sir/madam. Welcome to Grand Vista Hotel. How may I assist you with your reservation today?",
    sampleResponses: [
      "I have a reservation under my name.",
      "Is breakfast included in the booking?",
      "Could I request a room on a higher floor?"
    ]
  }
];

export const DAILY_QUIZZES = [
  {
    id: 1,
    type: 'listen-repeat',
    title: 'Listen & Speak Back',
    phrase: "I am confident in communicating my ideas clearly.",
    translation: "நான் என் கருத்துக்களை தெளிவாகக் தொடர்புகொள்வதில் நம்பிக்கையுடன் இருக்கிறேன்.",
    tips: "Focus on pronouncing 'confident' clearly."
  },
  {
    id: 2,
    type: 'fill-blank',
    title: 'Complete the Sentence',
    question: "She decided to _____ her English speaking skills every day.",
    options: ["practice", "practicing", "practiced"],
    answer: "practice",
    explanation: "'decided to' is followed by the base form of the verb."
  },
  {
    id: 3,
    type: 'sentence-order',
    title: 'Sentence Builder',
    words: ["speaking", "English", "makes", "me", "happy"],
    correctOrder: ["speaking", "English", "makes", "me", "happy"],
    translation: "ஆங்கிலம் பேசுவது મને மகிழ்ச்சியளிக்கிறது"
  }
];
