import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/public/locales/en/common.json';
import es from '@/public/locales/es/common.json';
import fr from '@/public/locales/fr/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    lng: 'es',
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'fr'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
