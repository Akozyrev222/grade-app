import {useDispatch, useSelector} from 'react-redux';
import {
  referralProgramActions,
  referralProgramSelectors,
} from '@/bus/referral_program';
import {identifierArr} from '@/screens/ReferralProgram/constants';
import {useTranslation} from 'react-i18next';

export const useData = () => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const isLoading = useSelector(
    referralProgramSelectors.getActivateReferralLoader,
  );

  const getTitle = (title) => {
    const referral = identifierArr.find((item) => item.id === title);
    if (referral.id === 'top_14') {
      return t(`vip.top.title`) + ' 14 ' + t('vip.top.day');
    }

    if (referral.id === 'top_7_gin') {
      return t(`vip.top.title`) + ' 7 ' + t('vip.top.day');
    }

    if (referral.id === 'top_3') {
      return t(`vip.top.title`) + ' 3 ' + t('vip.top.day');
    }

    return t(referral.name);
  };

  const activateReferral = (id: string) => {
    dispatch(
      referralProgramActions.activateReferral({
        id,
      }),
    );
  };

  return {
    getTitle,
    activateReferral,
    isLoading,
  };
};
