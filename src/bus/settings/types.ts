export enum types {
  FETCH_SETTINGS = 'USER/FETCH_SETTINGS',
  FETCH_PAGE = 'USER/FETCH_PAGE',
}

export type SettingsState = {
  list: Array<Item>;
  listLoader: boolean;
  page: Page | undefined;
  pageLoader: boolean;
};

export type Page = {
  id: number;
  icon: string;
  created_at: string;
  updated_at: string;
  title: string;
  body: string;
};

export type Item = {title: string; icon: string};

//ASYNC

export type fetchListDetails = {
  type: typeof types.FETCH_SETTINGS;
};

export type fetchPageDetails = {
  type: typeof types.FETCH_PAGE;
  payload: string;
};

export type SettingsListResponse = {
  success: boolean;
  static_pages: Item[];
};

export type SettingsItemResponse = {
  success: boolean;
  static_pages: Page;
};

export type SettingsActionTypes = fetchListDetails | fetchPageDetails;
