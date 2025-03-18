import {AxiosPromise} from 'axios';
import axios from '@/services/axios';
import {Favorite} from './namespace';
import {App} from '../app';
import Geolocation from '@react-native-community/geolocation';

export const apiFavorite = new (class Api {
  fetchItems(
    params: Favorite.ReqFetchItems,
  ): AxiosPromise<Favorite.ResFetchItems> {
    return axios({
      url: '/favorites',
      method: 'get',
      params,
    });
  }

  createItem(
    data: Favorite.ReqCreateItem,
  ): AxiosPromise<Favorite.ResFetchItems> {
    return axios({
      url: '/favorites',
      method: 'post',
      data,
    });
  }

  removeItem({
    id,
  }: Favorite.ReqRemoveItem): AxiosPromise<Favorite.ResRemoveItem> {
    return axios({
      url: `/favorites/${id}`,
      method: 'delete',
    });
  }

  fetchLocation(): Promise<App.Location> {
    return new Promise((res, rej) => {
      Geolocation.getCurrentPosition(
        async (position) => {
          res({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (e) => {
          rej(e);
        },
        {timeout: 30000},
      );
    });
  }
})();
