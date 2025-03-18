import {appActions} from '@/bus/app';
import {Languages} from '@/i18n';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {
  RuIcon,
  FrIcon,
  UkIcon,
  ItIcon,
  ESIcon,
  DeIcon,
  EnIcon,
  PlIcon,
  SkIcon,
  RoIcon,
  HuIcon,
  ElIcon,
  EtIcon,
  TrIcon,
  LtIcon,
  KaIcon,
  SrIcon,
  HyIcon,
} from '@/assets';

export const useData = () => {
  const dispatch = useDispatch();

  const onChangeLanguage = useCallback((locale: Languages) => {
    dispatch(appActions.updateLanguageAsync(locale));
  }, []);

  const langIcons: {[key in Languages]: any} = {
    de: DeIcon,
    en: EnIcon,
    es: ESIcon,
    fr: FrIcon,
    ru: RuIcon,
    uk: UkIcon,
    it: ItIcon,
    pl: PlIcon,
    ro: RoIcon,
    sk: SkIcon,
    hu: HuIcon,
    el: ElIcon,
    et: EtIcon,
    tr: TrIcon,
    lt: LtIcon,
    ka: KaIcon,
    sr: SrIcon,
    hy: HyIcon,
  };

  return {onChangeLanguage, langIcons};
};
