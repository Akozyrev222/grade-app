import AsyncStorage from '@react-native-community/async-storage';
import {Role} from './namespace';

export const apiRole = new (class Api {
  fetchItem(): Promise<Role.Item | null> {
    return new Promise(async (res, rej) => {
      try {
        const role = (await AsyncStorage.getItem('ROLE')) as Role.Item | null;

        res(role);
      } catch (e) {
        console.log(`error fetch role action ${e}`);

        rej(null);
      }
    });
  }
  updateItem(role: Role.Item | null): Promise<boolean> {
    return new Promise(async (res, rej) => {
      try {
        await AsyncStorage.setItem('ROLE', `${role}`);

        res(true);
      } catch (e) {
        console.log(`error action role action ${e}`);

        rej(false);
      }
    });
  }
})();
