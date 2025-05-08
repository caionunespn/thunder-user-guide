import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt from './globals/locales/pt.json';
import en from './globals/locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'pt',
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    debug: false,

    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;