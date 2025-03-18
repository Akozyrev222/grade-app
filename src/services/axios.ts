import {authActions} from './../bus/auth/slice';
import axios, {AxiosError, AxiosInstance} from 'axios';
import ENV from '@/configs';
import AsyncStorage from '@react-native-community/async-storage';
import {showToast} from './toast';
import {store} from '@/store';

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
  withCredentials: false,
  timeout: 30000,
  baseURL: `${ENV.BASE_URL_PROD}/api/v${ENV.API_VERSION}`,
});

axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem('TOKEN');
    const role = await AsyncStorage.getItem('ROLE');
    const locale = (await AsyncStorage.getItem('LANGUAGE')) || 'ru';
    const envSetting = await AsyncStorage.getItem('dev');

    if (envSetting === 'dev') {
      config.baseURL = `${ENV.BASE_URL}/api/v${ENV.API_VERSION}`;
    } else {
      config.baseURL = `${ENV.BASE_URL_PROD}/api/v${ENV.API_VERSION}`;
    }

    if (token && config.url !== '/update_phone') {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.headers['del_token']) {
      config.headers.Authorization = `Bearer ${config.headers['del_token']}`;
    }

    if (!token) {
      config.params = {
        ...config.params,
        un_logged: true,
      };
    }

    if (config.url !== '/send_sms' && config.url !== '/sign_in') {
      config.headers.role = role;
    }

    config.headers.locale = locale;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<{message: string}>) {
    const token = store.getState().auth.token;

    if (error?.response?.status === 401 && token) {
      store.dispatch(authActions.logoutAsync());
    } else {

      if (error?.response?.data && error?.response?.data?.message) {
        showToast({text1: error.response.data?.message, type: 'error'});
      } else {
        if (error?.response?.data?.errors?.length) {
          if (Array.isArray(error?.response?.data?.errors)) {
            error?.response?.data?.errors?.forEach((error) => {
              showToast({text1: error, type: 'error'});
            });
          }
        }
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
