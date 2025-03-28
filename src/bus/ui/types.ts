import type {Ui} from './namespace';

export enum types {}
//Async

// STATE

export type UiState = {
  loaders: Ui.Loader[];
  forms: Ui.Form[];
  errors: Ui.Error[];
  link: string | null;
};
