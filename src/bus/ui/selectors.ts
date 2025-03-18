import {RootState} from '@/store/rootReducer';
import {createSelector} from 'reselect';
import {Ui} from './namespace';

export const getErrors = (state: RootState) => state.ui.errors;

export const getLoaders = (state: RootState) => state.ui.loaders;

export const getForms = (state: RootState) => state.ui.forms;

export const getLoading = (name: Ui.FormName) =>
  createSelector(
    [getLoaders],
    (loaders) => loaders.find((loader) => loader.name === name)?.loading,
  );

export const getError = (name: Ui.FormName) =>
  createSelector(
    [getErrors],
    (errors) => errors.find((error) => error.name === name)?.message,
  );

export const getForm = (name: Ui.FormName) =>
  createSelector(
    [getForms],
    (forms) => forms.find((form) => form.name === name)?.reset,
  );

export const getOpenLink = (state: RootState) => state.ui.link;
