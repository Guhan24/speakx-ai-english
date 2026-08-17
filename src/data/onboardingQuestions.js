// Structure for all 12 Onboarding Steps matching the reference video

export const ONBOARDING_STEPS = [
  {
    id: 'language',
    type: 'single-select-list',
    titleKey: 'langQuestion',
    showSearch: true
  },
  {
    id: 'level',
    type: 'single-select-card',
    titleKey: 'levelQuestion',
    optionsKey: 'levelOptions'
  },
  {
    id: 'profile',
    type: 'profile-form',
    titleKey: 'profileTitle',
    ageRanges: ['<18', '18-25', '26-30', '31-40', '41-50', '50+']
  },
  {
    id: 'motivation',
    type: 'multi-select',
    titleKey: 'motivationTitle',
    optionsKey: 'motivationOptions'
  },
  {
    id: 'profession',
    type: 'single-select-grid',
    titleKey: 'professionTitle',
    optionsKey: 'professionOptions'
  },
  {
    id: 'timeline',
    type: 'single-select-card',
    titleKey: 'timelineTitle',
    optionsKey: 'timelineOptions'
  },
  {
    id: 'challenge',
    type: 'multi-select',
    titleKey: 'challengeTitle',
    optionsKey: 'challengeOptions'
  },
  {
    id: 'studyTime',
    type: 'single-select-card',
    titleKey: 'studyTimeTitle',
    optionsKey: 'studyTimeOptions'
  },
  {
    id: 'dailyTime',
    type: 'single-select-card',
    titleKey: 'dailyTimeTitle',
    optionsKey: 'dailyTimeOptions'
  },
  {
    id: 'supportStyle',
    type: 'single-select-card',
    titleKey: 'supportTitle',
    optionsKey: 'supportOptions'
  },
  {
    id: 'habitReminder',
    type: 'notification-permission',
    titleKey: 'habitTitle'
  },
  {
    id: 'profileSummary',
    type: 'ai-summary',
    titleKey: 'summaryWelcome'
  }
];
