import {RootState} from '@/store/rootReducer';

export const getItems = (state: RootState) => state.application.items;

export const getPage = (state: RootState) => state.application.currentPage;
export const getHasMore = (state: RootState) => state.application.hasMore;
export const getShowSuccessModal = (state: RootState) =>
  state.application.showSuccessModal;
