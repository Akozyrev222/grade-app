import {RootState} from '@/store/rootReducer';

export const getRole = (state: RootState) =>
  state.role.item === 'null' ? null : state.role.item;
