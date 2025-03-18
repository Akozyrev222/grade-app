import {createSlice} from '@reduxjs/toolkit';

import {types, ReportState, ReportActionTypes} from './types';
import {Report} from './namespace';

const initialState: ReportState = {
  items: [],
};

const slice = createSlice({
  name: 'Report',
  initialState,
  reducers: {
    saveItems: (state: ReportState) => {},
  },
});

export default slice.reducer;

export const reportActions = {
  ...slice.actions,
  //ASYNC
  createItemAsync: (payload: Report.ReqCreateItem) => ({
    type: types.CREATE_ITEM,
    payload,
  }),
};
