export { LocaleProvider, useTranslation } from './LocaleContext';
export type { LocaleProviderProps } from './LocaleContext';
export { useChromeTranslate, type ChromeTranslate } from './useChromeTranslate';

// Re-exported from the i18n package so ported controls can type their `labelKey` fields
// against the real key union derived from `en.json`, exactly as legacy did.
export type { TranslationKey } from '@zqmi/docx-editor-i18n';
