import {clearObject} from '@/helpers';
import axios from '@/services/axios';
import {AxiosPromise, AxiosResponse} from 'axios';
import {Category} from './namespace';

export const apiCategory = new (class Api {
  fetchItems(
    params: Category.ReqFetchItems,
  ): AxiosPromise<Category.ResFetchItems> {
    const newParams = clearObject({
      obj: params,
      callback: (value) => {
        if (!value) return false;

        return true;
      },
    });

    return axios({
      url: '/categories',
      method: 'get',
      params: newParams,
    });
  }
})();
