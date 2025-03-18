import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ReviewActionTypes, ReviewState, types} from './types';
import {Review} from './';

const initialState: ReviewState = {
  items: [],
};

const slice = createSlice({
  initialState,
  name: 'Review',
  reducers: {
    saveItems: (state: ReviewState, action: PayloadAction<Review.Item[]>) => {
      state.items = action.payload;
    },
  },
});

export default slice.reducer;

export const reviewActions = {
  ...slice.actions,
  createItemAsync: (payload: Review.ReqCreateItem): ReviewActionTypes => ({
    type: types.CREATE_ITEM,
    payload,
  }),
};
