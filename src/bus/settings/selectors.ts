import {RootState} from '@/store/rootReducer';

export const getSettings = (state: RootState) => state.settings.list;
export const getSettingsLoader = (state: RootState) =>
  state.settings.listLoader;
export const getPageLoader = (state: RootState) => state.settings.pageLoader;
export const getPage = (state: RootState) => state.settings.page;
