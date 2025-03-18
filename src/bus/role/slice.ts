import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {types, RoleState, RoleActionTypes} from './types';
import {Role} from './namespace';

const initialState: RoleState = {
  item: null,
};

const slice = createSlice({
  name: 'Role',
  initialState,
  reducers: {
    saveRole: (state: RoleState, action: PayloadAction<Role.Item | null>) => {
      state.item = action.payload;
    },
  },
});

export default slice.reducer;

export const roleActions = {
  ...slice.actions,
  fetchItemAsync: (): RoleActionTypes => ({
    type: types.FETCH_ITEM,
  }),
  updateItemAsync: (payload: Role.Item | null): RoleActionTypes => ({
    type: types.UPDATE_ITEM,
    payload,
  }),
};
