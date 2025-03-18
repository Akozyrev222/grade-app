import axios from '@/services/axios';
import {AxiosPromise} from 'axios';
import {Currencies} from './namespace';

export const apiCurrencies = new (class Api {
  fetchItems(): AxiosPromise<Currencies.ResFetchItems> {
    return axios({
      url: '/currencies',
      method: 'get',
    });
  }
})();
