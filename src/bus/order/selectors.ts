import {RootState} from '@/store/rootReducer';

export const getItems = (state: RootState) => state.order.items;
export const getDetail = (state: RootState) => state.order.detail;
export const getSpecialization = (state: RootState) =>
  state.order.specializatoion;

export const getDetailUser = (state: RootState) => state.order.detail_user;

export const getCurrentPage = (state: RootState) => state.order.currentPage;
export const getHasMore = (state: RootState) => state.order.hasMore;
