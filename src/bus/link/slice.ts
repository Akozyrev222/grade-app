import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {types, LinkState, LinkActionTypes} from './types';
import {Link} from './namespace';
import ENV from '@/configs';

const initialState: LinkState = {
  item: ENV.BASE_URL_PROD,
};

const slice = createSlice({
  name: 'Link',
  initialState,
  reducers: {
    saveLink: (state: LinkState, action: PayloadAction<Link.Item>) => {
      state.item = action.payload;
    },
  },
});

export default slice.reducer;

export const linkActions = {
  ...slice.actions,
  fetchItemAsync: (): LinkActionTypes => ({
    type: types.FETCH_ITEM,
  }),
  updateItemAsync: (payload: Link.Item): LinkActionTypes => ({
    type: types.UPDATE_ITEM,
    payload,
  }),
};
