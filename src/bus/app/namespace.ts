import {Languages} from '@/i18n';

export namespace App {
  export type Language = Languages;

  export type Location = {
    latitude: number;
    longitude: number;
  };
}
