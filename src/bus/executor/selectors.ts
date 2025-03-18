import {RootState} from '@/store/rootReducer';

export const getItems = (state: RootState) => state.executor.items;
export const getDetail = (state: RootState) => state.executor.detail;

export const getCurrentPage = (state: RootState) => state.executor.currentPage;
export const getHasMore = (state: RootState) => state.executor.hasMore;
