import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/public/locales/en/common.json';
import es from '@/public/locales/es/common.json';
import fr from '@/public/locales/fr/common.json';

const isServer = typeof window === 'undefined';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: {
        en: { common: en },
        es: { common: es },
        fr: { common: fr },
      },
      defaultNS: 'common',
      fallbackLng: 'es',
      lng: 'es',
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
      supportedLngs: ['es', 'en', 'fr'],
    });
}

export default i18n;
