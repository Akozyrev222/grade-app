import {RootState} from '@/store/rootReducer';

export const getItems = (state: RootState) => state.currencies.items;
