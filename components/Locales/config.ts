import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import { commonZh } from "./zh-CN";
import { commonEn } from "./en-US";
import LanguageDetector from "i18next-browser-languagedetector";

export function initializeI18n({
  language,
  debug,
}: {
  language: string;
  debug?: boolean;
}) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: debug,
      interpolation: {
        escapeValue: false,
      },
      fallbackLng: "zh", // 如果未找到翻译内容，将会回退到默认语言
      resources: {
        zh: {
          translation: commonZh,
        },
        en: {
          translation: commonEn,
        },
      },
    });
}
