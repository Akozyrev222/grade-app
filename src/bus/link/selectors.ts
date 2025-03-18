import {RootState} from '@/store/rootReducer';

export const getLink = (state: RootState) => state.link?.item;
