import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {AppState, types, AppActionTypes} from './types';
import {App} from './namespace';
import {Languages} from '@/i18n';

const initialState: AppState = {
  language: null,
  initialized: false,
  tabBar: true,
};

const slice = createSlice({
  name: 'App',
  initialState,
  reducers: {
    saveLanguage: (state: AppState, action: PayloadAction<App.Language>) => {
      state.language = action.payload;
    },
    toggleInitialized: (state: AppState, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    toggleTabBar: (state: AppState, action: PayloadAction<boolean>) => {
      state.tabBar = action.payload;
    },
  },
});

export default slice.reducer;

export const appActions = {
  ...slice.actions,
  fetchLanguageAsync: (): AppActionTypes => ({
    type: types.FETCH_LANGUAGE,
  }),
  updateLanguageAsync: (payload: App.Language): AppActionTypes => ({
    type: types.UPDATE_LANGUAGE,
    payload,
  }),
  bootstrapAsync: (): AppActionTypes => ({
    type: types.BOOTSTRAP,
  }),
};
