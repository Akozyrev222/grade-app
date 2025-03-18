import {Currencies} from './namespace';

export enum types {
  FETCH_ITEMS = 'CURRENCIES/FETCH_ITEMS',
}

export type CurrenciesState = {
  items: Currencies.Item[];
};

export type FetchItemsAsync = {
  type: typeof types.FETCH_ITEMS;
};

export type CurrenciesActionTypes = FetchItemsAsync;
