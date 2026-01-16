export type Language = 'fr' | 'en';

export const translations = {
  fr: {
    // Navbar
    tagline: 'Point de Vente Officiel',
    
    // CityList
    upcomingEvents: 'Événements à Venir',
    soldOut: 'complet',
    available: 'disponible',
    soon: 'bientôt',
    
    // PastEvents
    pastArchives: 'Archives Passées',
    reliveTheLuxury: 'Revivez le Luxe Industriel',
    eventsCompleted: 'Événements Réalisés',
    
    // TicketModal
    eventNotAnnounced: 'Événement Non Encore Annoncé',
    dropNotHappened: "Le drop pour {city} n'a pas encore eu lieu. Restez connecté sur nos réseaux ou découvrez nos événements passés.",
    viewPastEvents: 'Voir les Événements Passés',
    soldOutTitle: 'Complet',
    joinWaitlist: 'Rejoindre la Liste d\'Attente',
    ticketsOnSale: 'Billets en Vente',
    pretixLoading: '[CHARGEMENT WIDGET PRETIX...]',
    earlyBird: 'Prévente',
    limitedQuantity: 'Quantité Limitée',
    regular: 'Normal',
    standardEntry: 'Entrée Standard',
    proceedToCheckout: 'Passer à la Caisse',
    secureTicketing: 'Billetterie Sécurisée • Événement Vérifié',
    comingSoon: 'Bientôt Disponible',
    
    // Marquee
    marqueeContent: 'INTERFAC OFFICIEL • 15 ANS D\'ÉVÉNEMENTS • 500 000+ PARTICIPANTS • DÉCOUVREZ LE LUXE INDUSTRIEL • RÉSERVEZ VOTRE PLACE • ',
    
    // MobileStickyButton
    selectYourCity: 'Choisissez Votre Ville',
    
    // Auth
    adminLogin: 'Connexion Administrateur',
    signIn: 'Connexion',
    signUp: 'Inscription',
    email: 'Email',
    password: 'Mot de passe',
    signingIn: 'Connexion...',
    signingUp: 'Inscription...',
    backToSite: 'Retour au site',
    signUpSuccess: 'Inscription réussie ! Vérifiez votre email pour confirmer votre compte.',
    
    // Admin
    adminDashboard: 'Tableau de Bord Admin',
    signOut: 'Déconnexion',
    addEvent: 'Ajouter un Événement',
    upcomingEventsTab: 'Événements à Venir',
    pastEventsTab: 'Événements Passés',
    noUpcomingEvents: 'Aucun événement à venir',
    noPastEvents: 'Aucun événement passé',
    createFirstEvent: 'Créez votre premier événement pour commencer.',
  },
  en: {
    // Navbar
    tagline: 'Sovereign Drop Site',
    
    // CityList
    upcomingEvents: 'Upcoming Events',
    soldOut: 'sold out',
    available: 'available',
    soon: 'soon',
    
    // PastEvents
    pastArchives: 'Past Archives',
    reliveTheLuxury: 'Relive the Industrial Luxury',
    eventsCompleted: 'Events Completed',
    
    // TicketModal
    eventNotAnnounced: 'Event Not Yet Announced',
    dropNotHappened: "The drop for {city} hasn't happened yet. Stay tuned on our socials or check out our past events.",
    viewPastEvents: 'View Past Events',
    soldOutTitle: 'Sold Out',
    joinWaitlist: 'Join Waitlist',
    ticketsOnSale: 'Tickets On Sale Now',
    pretixLoading: '[PRETIX WIDGET LOADING...]',
    earlyBird: 'Early Bird',
    limitedQuantity: 'Limited Quantity',
    regular: 'Regular',
    standardEntry: 'Standard Entry',
    proceedToCheckout: 'Proceed to Checkout',
    secureTicketing: 'Secure Ticketing • Verified Event',
    comingSoon: 'Coming Soon',
    
    // Marquee
    marqueeContent: 'OFFICIAL INTERFAC • 15 YEARS OF EVENTS • 500,000+ ATTENDEES • EXPERIENCE THE INDUSTRIAL LUXURY • SECURE YOUR SPOT • ',
    
    // MobileStickyButton
    selectYourCity: 'Select Your City',
    
    // Auth
    adminLogin: 'Admin Login',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    signingIn: 'Signing in...',
    signingUp: 'Signing up...',
    backToSite: 'Back to site',
    signUpSuccess: 'Sign up successful! Please check your email to confirm your account.',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    signOut: 'Sign Out',
    addEvent: 'Add Event',
    upcomingEventsTab: 'Upcoming Events',
    pastEventsTab: 'Past Events',
    noUpcomingEvents: 'No upcoming events',
    noPastEvents: 'No past events',
    createFirstEvent: 'Create your first event to get started.',
  }
} as const;

export type TranslationKey = keyof typeof translations.en;
