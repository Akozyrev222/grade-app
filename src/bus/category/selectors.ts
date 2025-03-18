import {RootState} from '@/store/rootReducer';

export const getItems = (state: RootState) => state.category.items;
export const getName = (state: RootState) => state.category.name;
export const getDETAIL = (state: RootState) => state.category.detail;
