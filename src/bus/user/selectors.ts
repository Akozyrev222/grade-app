import {RootState} from '@/store/rootReducer';

export const getDetail = (state: RootState) => state.user.detail;
export const getSpecialization = (state: RootState) =>
  state.user.specialization;
export const getDeviceToken = (state: RootState) => state.user.device_token;
export const getPromoCodeSuccess = (state: RootState) =>
  state.user.promoCodeSuccess;
export const getLoader = (state: RootState) => state.user.loading;
