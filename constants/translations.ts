
export type Language = 'en' | 'es';

export interface Translations {
  // Home Screen
  daysTogetherTitle: string;
  days: string;
  hours: string;
  since: string;
  updatedInCST: string;
  firstName: string;
  secondName: string;
  relationshipStartDate: string;
  enterFirstName: string;
  enterSecondName: string;
  upcomingMilestones: string;
  daysLabel: string;
  completed: string;
  daysToGo: string;
  reset: string;
  allDataCleared: string;
  
  // Calendar Screen
  ourCalendar: string;
  markSpecialMoments: string;
  howToUse: string;
  tapAnyDay: string;
  daysWithEmojis: string;
  todayHighlighted: string;
  chooseEmoji: string;
  addNote: string;
  writeSomethingSpecial: string;
  save: string;
  delete: string;
  deleteNote: string;
  deleteNoteConfirm: string;
  cancel: string;
  
  // Games Screen
  coupleGames: string;
  funActivities: string;
  loveQuiz: string;
  loveQuizDesc: string;
  truthOrDare: string;
  truthOrDareDesc: string;
  wouldYouRather: string;
  wouldYouRatherDesc: string;
  twentyQuestions: string;
  twentyQuestionsDesc: string;
  neverHaveIEver: string;
  neverHaveIEverDesc: string;
  twoTruthsOneLie: string;
  twoTruthsOneLieDesc: string;
  storyBuilder: string;
  storyBuilderDesc: string;
  memoryMatch: string;
  memoryMatchDesc: string;
  emojiCharades: string;
  emojiCharadesDesc: string;
  loveTrivia: string;
  loveTriviaDesc: string;
  proTip: string;
  proTipText: string;
  startGame: string;
  gameAlertText: string;
  
  // Profile Screen
  about: string;
  daysTogetherApp: string;
  appDescription: string;
  features: string;
  trackYourLove: string;
  trackYourLoveDesc: string;
  calendarNotes: string;
  calendarNotesDesc: string;
  coupleGamesFeature: string;
  coupleGamesDesc: string;
  celebrateMilestones: string;
  celebrateMilestonesDesc: string;
  personalizeNames: string;
  personalizeNamesDesc: string;
  cstTimezone: string;
  cstTimezoneDesc: string;
  madeBy: string;
  version: string;
  language: string;
  selectLanguage: string;
  
  // Tab Labels
  home: string;
  games: string;
  calendar: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Home Screen
    daysTogetherTitle: 'Days Together',
    days: 'Days',
    hours: 'Hours',
    since: 'Since',
    updatedInCST: 'Updated in CST timezone',
    firstName: 'First Name',
    secondName: 'Second Name',
    relationshipStartDate: 'Relationship Start Date',
    enterFirstName: 'Enter first name',
    enterSecondName: 'Enter second name',
    upcomingMilestones: 'Upcoming Milestones',
    daysLabel: 'Days',
    completed: 'Completed! 🎉',
    daysToGo: 'days to go',
    reset: 'Reset',
    allDataCleared: 'All data has been cleared!',
    
    // Calendar Screen
    ourCalendar: 'Our Calendar',
    markSpecialMoments: 'Mark special moments together',
    howToUse: 'How to use:',
    tapAnyDay: '• Tap any day to add a note or emoji',
    daysWithEmojis: '• Days with emojis have saved notes',
    todayHighlighted: '• Today\'s date is highlighted',
    chooseEmoji: 'Choose an Emoji',
    addNote: 'Add a Note',
    writeSomethingSpecial: 'Write something special...',
    save: 'Save',
    delete: 'Delete',
    deleteNote: 'Delete Note',
    deleteNoteConfirm: 'Are you sure you want to delete this note?',
    cancel: 'Cancel',
    
    // Games Screen
    coupleGames: 'Couple Games',
    funActivities: 'Fun activities to enjoy together',
    loveQuiz: 'Love Quiz',
    loveQuizDesc: 'Test how well you know each other',
    truthOrDare: 'Truth or Dare',
    truthOrDareDesc: 'Classic game for couples',
    wouldYouRather: 'Would You Rather',
    wouldYouRatherDesc: 'Choose between two options',
    twentyQuestions: '20 Questions',
    twentyQuestionsDesc: 'Guess what your partner is thinking',
    neverHaveIEver: 'Never Have I Ever',
    neverHaveIEverDesc: 'Learn new things about each other',
    twoTruthsOneLie: 'Two Truths One Lie',
    twoTruthsOneLieDesc: 'Can you spot the lie?',
    storyBuilder: 'Story Builder',
    storyBuilderDesc: 'Create a story together',
    memoryMatch: 'Memory Match',
    memoryMatchDesc: 'Test your memory skills',
    emojiCharades: 'Emoji Charades',
    emojiCharadesDesc: 'Act out using only emojis',
    loveTrivia: 'Love Trivia',
    loveTriviaDesc: 'Answer questions about your relationship',
    proTip: 'Pro Tip',
    proTipText: 'These games are designed to help you connect, laugh, and create beautiful memories together. Take turns choosing games and enjoy quality time with your loved one! 💑',
    startGame: 'Start Game',
    gameAlertText: 'This is a fun game to play together! Get creative and enjoy your time together! 💕',
    
    // Profile Screen
    about: 'About',
    daysTogetherApp: 'Days Together',
    appDescription: 'A beautiful app to track the days you\'ve been together with your loved one.',
    features: 'Features',
    trackYourLove: 'Track Your Love',
    trackYourLoveDesc: 'Count every precious day and hour together',
    calendarNotes: 'Calendar & Notes',
    calendarNotesDesc: 'Mark special moments with notes and emojis',
    coupleGamesFeature: 'Couple Games',
    coupleGamesDesc: 'Fun activities to enjoy together',
    celebrateMilestones: 'Celebrate Milestones',
    celebrateMilestonesDesc: 'Track and celebrate important relationship milestones',
    personalizeNames: 'Personalize Names',
    personalizeNamesDesc: 'Add both partners\' names for a personal touch',
    cstTimezone: 'CST Timezone',
    cstTimezoneDesc: 'Accurate time tracking in Central Standard Time',
    madeBy: 'Made it by Isra for Natasha',
    version: 'Version 2.0.0',
    language: 'Language',
    selectLanguage: 'Select Language',
    
    // Tab Labels
    home: 'Home',
    games: 'Games',
    calendar: 'Calendar',
  },
  es: {
    // Home Screen
    daysTogetherTitle: 'Días Juntos',
    days: 'Días',
    hours: 'Horas',
    since: 'Desde',
    updatedInCST: 'Actualizado en zona horaria CST',
    firstName: 'Primer Nombre',
    secondName: 'Segundo Nombre',
    relationshipStartDate: 'Fecha de Inicio de la Relación',
    enterFirstName: 'Ingresa el primer nombre',
    enterSecondName: 'Ingresa el segundo nombre',
    upcomingMilestones: 'Próximos Hitos',
    daysLabel: 'Días',
    completed: '¡Completado! 🎉',
    daysToGo: 'días para llegar',
    reset: 'Reiniciar',
    allDataCleared: '¡Todos los datos han sido borrados!',
    
    // Calendar Screen
    ourCalendar: 'Nuestro Calendario',
    markSpecialMoments: 'Marca momentos especiales juntos',
    howToUse: 'Cómo usar:',
    tapAnyDay: '• Toca cualquier día para agregar una nota o emoji',
    daysWithEmojis: '• Los días con emojis tienen notas guardadas',
    todayHighlighted: '• La fecha de hoy está resaltada',
    chooseEmoji: 'Elige un Emoji',
    addNote: 'Agregar una Nota',
    writeSomethingSpecial: 'Escribe algo especial...',
    save: 'Guardar',
    delete: 'Eliminar',
    deleteNote: 'Eliminar Nota',
    deleteNoteConfirm: '¿Estás seguro de que quieres eliminar esta nota?',
    cancel: 'Cancelar',
    
    // Games Screen
    coupleGames: 'Juegos de Pareja',
    funActivities: 'Actividades divertidas para disfrutar juntos',
    loveQuiz: 'Quiz de Amor',
    loveQuizDesc: 'Prueba qué tan bien se conocen',
    truthOrDare: 'Verdad o Reto',
    truthOrDareDesc: 'Juego clásico para parejas',
    wouldYouRather: '¿Qué Preferirías?',
    wouldYouRatherDesc: 'Elige entre dos opciones',
    twentyQuestions: '20 Preguntas',
    twentyQuestionsDesc: 'Adivina lo que tu pareja está pensando',
    neverHaveIEver: 'Yo Nunca',
    neverHaveIEverDesc: 'Aprende cosas nuevas el uno del otro',
    twoTruthsOneLie: 'Dos Verdades y Una Mentira',
    twoTruthsOneLieDesc: '¿Puedes detectar la mentira?',
    storyBuilder: 'Constructor de Historias',
    storyBuilderDesc: 'Crea una historia juntos',
    memoryMatch: 'Memoria',
    memoryMatchDesc: 'Pon a prueba tu memoria',
    emojiCharades: 'Charadas con Emojis',
    emojiCharadesDesc: 'Actúa usando solo emojis',
    loveTrivia: 'Trivia de Amor',
    loveTriviaDesc: 'Responde preguntas sobre su relación',
    proTip: 'Consejo',
    proTipText: 'Estos juegos están diseñados para ayudarles a conectar, reír y crear hermosos recuerdos juntos. ¡Túrnense para elegir juegos y disfruten tiempo de calidad con su ser amado! 💑',
    startGame: 'Iniciar Juego',
    gameAlertText: '¡Este es un juego divertido para jugar juntos! ¡Sean creativos y disfruten su tiempo juntos! 💕',
    
    // Profile Screen
    about: 'Acerca de',
    daysTogetherApp: 'Días Juntos',
    appDescription: 'Una hermosa aplicación para rastrear los días que han estado juntos con tu ser amado.',
    features: 'Características',
    trackYourLove: 'Rastrea tu Amor',
    trackYourLoveDesc: 'Cuenta cada precioso día y hora juntos',
    calendarNotes: 'Calendario y Notas',
    calendarNotesDesc: 'Marca momentos especiales con notas y emojis',
    coupleGamesFeature: 'Juegos de Pareja',
    coupleGamesDesc: 'Actividades divertidas para disfrutar juntos',
    celebrateMilestones: 'Celebra Hitos',
    celebrateMilestonesDesc: 'Rastrea y celebra hitos importantes de la relación',
    personalizeNames: 'Personaliza Nombres',
    personalizeNamesDesc: 'Agrega los nombres de ambos para un toque personal',
    cstTimezone: 'Zona Horaria CST',
    cstTimezoneDesc: 'Seguimiento preciso del tiempo en Hora Central Estándar',
    madeBy: 'Hecho por Isra para Natasha',
    version: 'Versión 2.0.0',
    language: 'Idioma',
    selectLanguage: 'Seleccionar Idioma',
    
    // Tab Labels
    home: 'Inicio',
    games: 'Juegos',
    calendar: 'Calendario',
  },
};
