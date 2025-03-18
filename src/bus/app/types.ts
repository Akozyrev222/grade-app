import {App} from './namespace';

export enum types {
  FETCH_LANGUAGE = 'APP/FETCH_LANGUAGE',
  UPDATE_LANGUAGE = 'APP/UPDATE_LANGUAGE',
  BOOTSTRAP = 'APP/BOOTSTRAP',

  END_FETCH_LANGUAGE = 'APP/END_FETCH_LANGUAGE',
}

export type AppState = {
  initialized: boolean;
  language: App.Language | null;
  tabBar: boolean;
};

//ASYNC

export type FetchLanguageAsync = {
  type: typeof types.FETCH_LANGUAGE;
};

export type BootstrapAsync = {
  type: typeof types.BOOTSTRAP;
};

export type UpdateLanguageAsync = {
  type: typeof types.UPDATE_LANGUAGE;
  payload: App.Language;
};

export type AppActionTypes =
  | FetchLanguageAsync
  | BootstrapAsync
  | UpdateLanguageAsync;
