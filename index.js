/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '@/App';
import {name as appName} from './app.json';

import messaging from '@react-native-firebase/messaging';

import notifee from '@notifee/react-native';

import ENV from '@/configs';


if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

messaging().setBackgroundMessageHandler(async (message) => {
  try {
     const style = message.data?.image_url
      ? {
          style: {
            type: AndroidStyle.BIGPICTURE,
            picture: `${ENV.BASE_URL_PROD}${message.data.image_url}`,
          },
        }
      : {};
   
    switch (message.data?.action) {

      case 'new_message': {
       return {
          ...message,
          data: {
            ...message.data,
          },
        };
      }
  
      case 'unverified': {
        return {
          ...message,
          data: {
            ...message.data,
          },
        };
      }
  
      case 'new_request': {
        return {
          ...message,
          data: {
            ...message.data,
          },
        };
      }
  
      case 'choice_executor': {
        return {
          ...message,
          data: {
            ...message.data,
          },
        };
      }
    }
        return await notifee.displayNotification({
        title: message.data?.title,
        body: message.data?.body,
        data: message.data,
        //@ts-ignore
        android: {
          ...style,
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
  } catch (e) {
    console.log(`error parse image ${e}`);
  }
});


AppRegistry.registerComponent(appName, () => App);
