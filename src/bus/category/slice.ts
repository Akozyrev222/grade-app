import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Category} from './';
import {CategoryActionTypes, CategoryState, types} from './types';

const initialState: CategoryState = {
  items: [],
  detail: null,
  name: '',
};

const slice = createSlice({
  name: 'Category',
  initialState,
  reducers: {
    saveItems: (
      state: CategoryState,
      action: PayloadAction<Category.ResFetchItems>,
    ) => {
      state.items = action.payload.categories;
    },
    saveDetail: (
      state: CategoryState,
      action: PayloadAction<Category.Item>,
    ) => {
      state.detail = action.payload;
    },
    clearDetail: (state: CategoryState) => {
      state.detail = null;
    },
    updateName: (state: CategoryState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export default slice.reducer;

export const categoryActions = {
  ...slice.actions,
  fetchItemsAsync: (payload: Category.ReqFetchItems): CategoryActionTypes => ({
    type: types.FETCH_ITEMS,
    payload,
  }),
};
