import i18n, {Resource, LanguageDetectorAsyncModule} from 'i18next';
import {initReactI18next} from 'react-i18next';

import ru from './locale/ru.json';
import uk from './locale/uk.json';
import pl from './locale/pl.json';
import es from './locale/es.json';
import en from './locale/en.json';
import de from './locale/de.json';
import fr from './locale/fr.json';
import it from './locale/it.json';
import ro from './locale/ro.json';
import sk from './locale/sk.json';
import tr from './locale/tr.json';
import el from './locale/el.json';
import et from './locale/et.json';
import lt from './locale/lt.json';
import hu from './locale/hu.json';
import ka from './locale/ka.json';
import sr from './locale/sr.json';
import hy from './locale/hy.json';

import ENV from '@/configs';
import AsyncStorage from '@react-native-community/async-storage';

export enum Languages {
  UK = 'uk',
  RU = 'ru',
  PL = 'pl',
  ES = 'es',
  EN = 'en',
  DE = 'de',
  FR = 'fr',
  IT = 'it',
  RO = 'ro',
  SK = 'sk',
  HU = 'hu',
  ET = 'et',
  LT = 'lt',
  EL = 'el',
  TR = 'tr',
  KA = 'ka',
  SR = 'sr',
  HY = 'hy',
}

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: any) => {
    return AsyncStorage.getItem('LANGUAGE').then((locale) => {
      callback(locale || ENV.DEFAULT_LOCALE);
    });
  },
  init: () => {},

  cacheUserLanguage: (language) => {
    // AsyncStorage.setItem('LANGUAGE', language);
  },
};

const resources: {[key in Languages]: Resource} = {
  ru: {
    translation: ru,
  },
  uk: {
    translation: uk,
  },
  pl: {
    translation: pl,
  },
  es: {
    translation: es,
  },
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  ro: {
    translation: ro,
  },
  sk: {
    translation: sk,
  },
  hu: {
    translation: hu,
  },
  tr: {
    translation: tr,
  },
  el: {
    translation: el,
  },
  et: {
    translation: et,
  },
  lt: {
    translation: lt,
  },
  ka: {
    translation: ka,
  },
  sr: {
     translation: sr,
  },
  hy: {
    translation: hy,
  }
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: ENV.DEFAULT_LOCALE,
    keySeparator: '.',
    debug: ENV.IS_DEVELOPMENT,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
