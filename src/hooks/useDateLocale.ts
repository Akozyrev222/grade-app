import {appSelectors} from '@/bus/app';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {
  ru,
  uk,
  pl,
  es,
  enGB,
  de,
  fr,
  ro,
  sk,
  it,
  hu,
  et,
  el,
  lt,
  tr,
  ka,
  sr,
  hy,
} from 'date-fns/locale';
import {Languages} from '@/i18n';

export const useDateLocale = () => {
  const locale = useSelector(appSelectors.getLanguage);

  const dateLocale = useMemo(() => {
    switch (locale) {
      case Languages.RU:
        return ru;
      case Languages.UK:
        return uk;
      case Languages.PL:
        return pl;
      case Languages.ES:
        return es;
      case Languages.EN:
        return enGB;
      case Languages.DE:
        return de;
      case Languages.FR:
        return fr;
      case Languages.RO:
        return ro;
      case Languages.SK:
        return sk;
      case Languages.IT:
        return it;
      case Languages.HU:
        return hu;
      case Languages.EL:
        return el;
      case Languages.TR:
        return tr;
      case Languages.LT:
        return lt;
      case Languages.ET:
        return et;
      case Languages.KA:
        return ka;
      case Languages.SR:
        return sr;
      case Languages.HY:
        return hy;
      default:
        return ru;
    }
  }, [locale]);

  return {locale: dateLocale};
};
