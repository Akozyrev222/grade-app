import {RootState} from '@/store/rootReducer';
import {createSelector} from '@reduxjs/toolkit';

export const getItems = (state: RootState) => state.message.items;
export const getHasMore = (state: RootState) => state.message.hasMore;
