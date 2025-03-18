import {RootState} from '@/store/rootReducer';

export const referralsList = (state: RootState) =>
  state.referral_program.referral_programs_list;

export const getLoading = (state: RootState) => state.referral_program.loading;
export const getActivateReferralLoader = (state: RootState) =>
  state.referral_program.activateReferralLoading;
