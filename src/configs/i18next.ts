import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../locales/en/translation.json';
import translationAR from '../locales/ar/translation.json';

// the translations
const resources = {
    en: {
        translation: translationEN
    },
    ar: {
        translation: translationAR
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'ar',
        fallbackLng: 'ar',

        interpolation: {
            escapeValue: false // react already safes arom xss
        }
    });

export default i18n;