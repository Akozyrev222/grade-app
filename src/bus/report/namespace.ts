import {DocumentPickerResponse} from 'react-native-document-picker';

export namespace Report {
  export type Item = {};

  export type Type = 'it' | 'consultation' | 'complaint' | 'add_specialty';

  export type Messanger = 'viber' | 'tg';

  export type ReqCreateItem = {
    text: string;
    report_type: Type;
    file: DocumentPickerResponse | null;
  };
}
