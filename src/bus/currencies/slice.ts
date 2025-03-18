import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Currencies} from './';
import {CurrenciesActionTypes, CurrenciesState, types} from './types';

const initialState: CurrenciesState = {
  items: [],
};

const slice = createSlice({
  name: 'Currencies',
  initialState,
  reducers: {
    saveItems: (
      state: CurrenciesState,
      action: PayloadAction<Currencies.ResFetchItems>,
    ) => {
      state.items = action.payload.currencies;
    },
  },
});

export default slice.reducer;

export const currenciesActions = {
  ...slice.actions,
  fetchItemsAsync: (): CurrenciesActionTypes => ({
    type: types.FETCH_ITEMS,
  }),
};
