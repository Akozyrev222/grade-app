import ENV from '@/configs';
import AsyncStorage from '@react-native-community/async-storage';
import {Link} from './namespace';

export const apiLink = new (class Api {
  fetchItem(): Promise<Link.Item> {
    return new Promise(async (res, rej) => {
      try {
        const link = (await AsyncStorage.getItem('dev')) as Link.Item;

        let updatedItem = link === 'dev' ? ENV.BASE_URL : ENV.BASE_URL_PROD;
        res(updatedItem);
      } catch (e) {
        console.log(`error fetch link action ${e}`);

        rej('prod');
      }
    });
  }
  updateItem(link: Link.Item): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await AsyncStorage.setItem('dev', `${link}`);

        let updatedItem = link === 'dev' ? ENV.BASE_URL : ENV.BASE_URL_PROD;

        res(updatedItem);
      } catch (e) {
        console.log(`error action role action ${e}`);

        rej(false);
      }
    });
  }
})();
