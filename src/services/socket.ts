import ENV from '@/configs';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const createSocket = async (token: string): Promise<WebSocket> => {
  let wsUrl = ENV.WS_URL_PROD;
  const urlMode = await AsyncStorage.getItem('dev');
  if (!urlMode) {
    wsUrl = ENV.WS_URL_PROD;
  } else {
    wsUrl = ENV.WS_URL;
  }

  return new Promise((res, rej) => {
    const socket = new WebSocket(`${wsUrl}/cable`, '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    socket.onclose = (e) => {
      if (token) {
      }

      rej(`${Platform.OS} ${JSON.stringify(e)}`);
    };

    socket.onopen = () => {
      res(socket);
    };

    socket.onerror = (e) => {
      if (token) {
        setTimeout(() => {
          createSocket(token);
        }, 30000);
      }

      rej(`${Platform.OS} ${JSON.stringify(e)}`);
    };
  });
};
