import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Item, Page} from './types';

import {SettingsState, types, SettingsActionTypes} from './types';

const initialState: SettingsState = {
  list: [],
  listLoader: false,
  page: undefined,
  pageLoader: false,
};

const slice = createSlice({
  name: 'Settings',
  initialState,
  reducers: {
    getList: (state: SettingsState, action: PayloadAction<Array<Item>>) => {
      state.list = action.payload;
    },
    setListLoader: (state: SettingsState) => {
      state.listLoader = true;
    },
    removeListLoader: (state: SettingsState) => {
      state.listLoader = false;
    },
    getPage: (state: SettingsState, action: PayloadAction<Page>) => {
      state.page = action.payload;
    },
    setPageLoader: (state: SettingsState) => {
      state.pageLoader = true;
    },
    removePageLoader: (state: SettingsState) => {
      state.pageLoader = false;
    },
  },
});

export default slice.reducer;

export const settingsActions = {
  ...slice.actions,
  fetchListDetails: (): SettingsActionTypes => ({
    type: types.FETCH_SETTINGS,
  }),
  fetchPageDetails: (id: string): SettingsActionTypes => ({
    type: types.FETCH_PAGE,
    payload: id,
  }),
};
