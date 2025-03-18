import {appActions, appSelectors} from '@/bus/app';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Languages} from '@/i18n';

export const useData = () => {
  const dispatch = useDispatch();

  const locale = useSelector(appSelectors.getLanguage);
  const [lang, setLang] = useState(locale);
  const [currentLang, setCurrentLang] = useState({});

  const langs = useMemo(
    () => [
      {
        lang: 'uk',
        flag: '🇺🇦',
      },
      {
        lang: 'ru',
        flag: '🇷🇺',
      },
      {
        lang: 'pl',
        flag: '🇵🇱',
      },
      {
        lang: 'es',
        flag: '🇪🇸',
      },
      {
        lang: 'en',
        flag: '🇬🇧',
      },
      {
        lang: 'de',
        flag: '🇩🇪',
      },
      {
        lang: 'fr',
        flag: '🇫🇷',
      },
      {
        lang: 'it',
        flag: '🇮🇹',
      },
      {
        lang: 'ro',
        flag: '🇷🇴',
      },
      {
        lang: 'sk',
        flag: '🇸🇰',
      },
      {
        lang: 'hu',
        flag: '🇭🇺',
      },
      {
        lang: 'tr',
        flag: '🇹🇷',
      },
      {
        lang: 'el',
        flag: '🇬🇷',
      },
      {
        lang: 'et',
        flag: '🇪🇪',
      },
      {
        lang: 'lt',
        flag: '🇱🇹',
      },
      {
        flag: '🇬🇪', // Грузия
        lang: 'ka', // Грузинский
      },
      {
        flag: '🇷🇸', // Сербия
        lang: 'sr', // Сербский
      },
      {
        flag: '🇦🇲', // Армения
        lang: 'hy', // Армянский
      },
    ],
    [],
  );

  const onChangeLanguage = useCallback((locale: Languages) => {
    dispatch(appActions.updateLanguageAsync(locale));
  }, []);

  useEffect(() => {
    const index = langs.findIndex((code) => locale === code.lang);
    setCurrentLang(index !== -1 ? langs[index] : {});
  }, [lang, locale]);

  return {langs, currentLang, onChangeLanguage};
};
