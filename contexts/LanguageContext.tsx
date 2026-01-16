import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  fr: {
    "hero.title": "LE N°1 EN FRANCE",
    "hero.subtitle": "SOIRÉE ÉTUDIANTE",
    "releases.title": "PROCHAINES DATES",
    "releases.view_all": "CALENDRIER COMPLET",
    "releases.get_ticket": "PRENDRE SA PLACE",
    "status.selling_fast": "DERNIÈRES PLACES",
    "status.sold_out": "COMPLET",
    "status.just_announced": "NOUVEAU",
    "radio.title": "Sets Live",
    "radio.archive": "+ Archives",
    "radio.recorded": "Enregistré Live",
    "shop.merch": "Merch",
    "shop.tickets": "Billets",
    "shop.vip": "Accès VIP",
    "shop.store_title": "La Boutique",
    "shop.desc": "Collection officielle SoireeINTERFAC. Vêtements de qualité, éditions limitées et accessoires.",
    "shop.cta": "Acheter",
    "newsletter.title": "GAGNE TON PACK VIP.",
    "newsletter.desc": "Chaque soirée, des inscrits sont tirés au sort pour recevoir 2 consos + 1 accès coupe-file prioritaire (et leurs groupes de potes). Inscris-toi pour tenter ta chance.",
    "newsletter.placeholder": "ADRESSE EMAIL",
    "newsletter.btn": "JE TENTE MA CHANCE",
    "footer.tour": "Tournée",
    "footer.lineup": "Line-up",
    "footer.cities": "Villes",
    "footer.sets": "Sets",
    "footer.store": "Boutique",
    "footer.privacy": "Politique de Confidentialité",
    "footer.design": "Conçu pour la Nuit",
    "menu.home": "Accueil",
    "menu.releases": "Dates",
    "menu.artists": "Artistes",
    "menu.events": "Événements",
    "menu.radio": "Radio",
    "menu.store": "Boutique",
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "modal.powered": "Propulsé par SoireeINTERFAC"
  },
  en: {
    "hero.title": "FRANCE'S #1",
    "hero.subtitle": "STUDENT EVENT",
    "releases.title": "UPCOMING EVENTS",
    "releases.view_all": "FULL TOUR SCHEDULE",
    "releases.get_ticket": "GET TICKET",
    "status.selling_fast": "SELLING FAST",
    "status.sold_out": "SOLD OUT",
    "status.just_announced": "JUST ANNOUNCED",
    "radio.title": "Live Sets",
    "radio.archive": "+ Archive",
    "radio.recorded": "Recorded Live",
    "shop.merch": "Merch",
    "shop.tickets": "Tickets",
    "shop.vip": "VIP Access",
    "shop.store_title": "The Store",
    "shop.desc": "Official SoireeINTERFAC collection. High quality apparel, limited edition drops and accessories.",
    "shop.cta": "Shop Now",
    "newsletter.title": "Join the SoireeINTERFAC List to get exclusive early access to student tickets and secret location drops.",
    "newsletter.desc": "Let us know what City and School you are in so we can make sure you hear about events near you.",
    "newsletter.placeholder": "EMAIL ADDRESS",
    "newsletter.btn": "Sign Up",
    "footer.tour": "Tour",
    "footer.lineup": "Lineup",
    "footer.cities": "Cities",
    "footer.sets": "Sets",
    "footer.store": "Merch",
    "footer.privacy": "Privacy Policy",
    "footer.design": "Designed for Nightlife",
    "menu.home": "Home",
    "menu.releases": "Releases",
    "menu.artists": "Artists",
    "menu.events": "Events",
    "menu.radio": "Radio",
    "menu.store": "Store",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "modal.powered": "Powered by SoireeINTERFAC"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Hardcoded to 'fr'
  const language: Language = 'fr';
  // no-op setter
  const setLanguage = (_: Language) => { };

  const t = (key: string) => {
    return translations['fr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};