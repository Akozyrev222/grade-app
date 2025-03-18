import {RootState} from '@/store/rootReducer';

export const getInitialize = (state: RootState) => state.app.initialized;
export const getLanguage = (state: RootState) => state.app.language;
export const getTabBar = (state: RootState) => state.app.tabBar;
