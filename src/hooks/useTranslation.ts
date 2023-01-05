import { useTranslation as baseUseTranslation } from 'react-i18next';

type T = (key: string, opt?: Record<string, string | number>) => string;
export const useTranslation: () => {
  t: T;
} = baseUseTranslation;
