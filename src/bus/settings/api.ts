import {AxiosPromise} from 'axios';

import axios from '@/services/axios';
import {SettingsItemResponse, SettingsListResponse} from '@/bus/settings/types';

export const apiSettings = new (class Api {
  fetchList(): AxiosPromise<SettingsListResponse> {
    return axios({
      url: '/static_pages',
      method: 'get',
    });
  }

  fetchPage(page): AxiosPromise<SettingsItemResponse> {
    return axios({
      url: `/static_pages/${page}`,
      method: 'get',
    });
  }
})();
