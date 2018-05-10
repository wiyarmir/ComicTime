import { use } from "i18next";
import { translate } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./en/translations";
import esTranslations from "./es/translations";
import { developmentEnvironment } from "../utils/environmentUtils";

export default use(LanguageDetector).init({
  resources: {
    en: enTranslations,
    es: esTranslations
  },
  fallbackLng: {
    "en-US": ["en"],
    default: ["en"]
  },
  debug: developmentEnvironment(),

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export function translateComponent(component) {
  return translate(["translations"])(component);
}
