import {Languages} from '@/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {App} from './namespace';

export const apiApp = new (class Api {
  fetchLanguage(): PromiseLike<App.Language> {
    return new Promise<App.Language>(async (res, rej) => {
      try {
        const language = await AsyncStorage.getItem('LANGUAGE');
        res(language as App.Language);
      } catch (e) {
        console.log(`error fetch language action ${e}`);

        rej(e);
      }
    });
  }

  updateLanguage(lang: App.Language): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await AsyncStorage.setItem('LANGUAGE', lang);

        res(true);
      } catch (e) {
        console.log(`error update language action ${e}`);

        rej(false);
      }
    });
  }
})();
