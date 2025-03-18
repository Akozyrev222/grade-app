import {clearObject} from '@/helpers';
import axios from '@/services/axios';
import Geolocation from '@react-native-community/geolocation';
import {AxiosPromise} from 'axios';
import {App} from '../app';
import {Executor} from './namespace';

const toQueryString = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((val) => `${key}[]=${val}`).join('&');
      }
      return `${key}=${value}`;
    })
    .join('&');
};

export const apiExecutor = new (class Api {
  fetchItems(
    params: Executor.ReqFetchItems,
  ): AxiosPromise<Executor.ResFetchItems> {
    const newParams = clearObject({
      obj: params,
      callback: (item) => {
        if (item) {
          if (Array.isArray(item)) {
            return !!item.length;
          }
          return true;
        }
        return false;
      },
    });

    let url = '/executors';

    if (newParams.tags) {
      const queryString = toQueryString(newParams);
      url = `/executors?${queryString}`;
    }

    // console.warn('url', url);

    return axios({
      // url: '/executors',
      url,
      method: 'get',
      params: newParams,
    });
  }

  fetchLocation(): Promise<App.Location> {
    return new Promise((res, rej) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          res({
            latitude: position.coords.latitude,
            // longitude: 30.54240059999999,
            longitude: position.coords.longitude,
            // latitude: 50.3746119,
          });
        },
        (e) => {
          res(null);
        },
        {enableHighAccuracy: false, timeout: 30000, maximumAge: 100000},
      );
    });
  }

  fetchDetail(
    params: Executor.ReqFetchDetail,
  ): AxiosPromise<Executor.ResFetchDetail> {
    return axios({
      url: `/user/${params.id}`,
      method: 'get',
    });
  }
})();
