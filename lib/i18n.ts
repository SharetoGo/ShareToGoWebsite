import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/public/locales/en/common.json';
import es from '@/public/locales/es/common.json';
import fr from '@/public/locales/fr/common.json';
import ca from '@/public/locales/ca/common.json';
import pt from '@/public/locales/pt/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      ca: { translation: ca },
      pt: { translation: pt },
    },
    lng: 'es',
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'fr', 'ca', 'pt'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
