/* eslint-disable @typescript-eslint/no-floating-promises */
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh/translation.json';
import en from './en/translation.json';

// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
const option: InitOptions = {
  compatibilityJSON: 'v3',
  fallbackLng: 'zh',
  debug: true,
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
};
i18n.use(initReactI18next).init(option);

export default i18n;

export const ZH = 'zh';
export const EN = 'en';
