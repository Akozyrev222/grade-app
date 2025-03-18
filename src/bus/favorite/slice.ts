import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {types, FavoriteState, FavoriteActionTypes} from './types';
import {Favorite} from './namespace';

const initialState: FavoriteState = {
  items: [],
};

const slice = createSlice({
  initialState,
  name: 'Favorite',
  reducers: {
    saveItems: (
      state: FavoriteState,
      action: PayloadAction<Favorite.ResFetchItems>,
    ) => {
      state.items = action.payload.favorite_users;
    },

    removeItem: (state: FavoriteState, action: PayloadAction<number>) => {
      state.items = state.items.filter(({id}) => id !== action.payload);
    },
  },
});

export default slice.reducer;

export const favoriteActions = {
  ...slice.actions,
  //ASYNC
  fetchItemsAsync: (payload: Favorite.ReqFetchItems): FavoriteActionTypes => ({
    type: types.FETCH_ITEMS,
    payload,
  }),
  createItemAsync: (payload: Favorite.ReqCreateItem): FavoriteActionTypes => ({
    type: types.CREATE_ITEM,
    payload,
  }),
  removeItemAsync: (payload: Favorite.ReqRemoveItem): FavoriteActionTypes => ({
    type: types.REMOVE_ITEM,
    payload,
  }),
};
