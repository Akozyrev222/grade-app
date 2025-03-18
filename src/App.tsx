import React, {useEffect} from 'react';
//store redux
import {Provider} from 'react-redux';
import {store} from '@/store';

import {MenuProvider} from 'react-native-popup-menu';

import {AppNavigator} from '@/navigation';
import {InitializerLayout, ThemeLayout, ToastLayout} from './layouts';
import {LogBox, Platform} from 'react-native';
import {Settings} from 'react-native-fbsdk-next';
// import { requestNotifications } from 'react-native-permissions'

import Geolocation from '@react-native-community/geolocation';
Settings.initializeSDK();
Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  skipPermissionRequests: false,
});

import '@/i18n';
import {withIAPContext} from 'react-native-iap';
import notifee from '@notifee/react-native';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  useEffect(() => {
    setTimeout(async () => {
      const status = await requestTrackingPermission();
      if (status === 'authorized' || status === 'unavailable') {
        console.log('Yay! I have user permission to track data');
      }
    }, 500);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android') {
        const res = await notifee.requestPermission();
        console.log('Notification permission status:', res);
      }
    })();

    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <ThemeLayout>
        <MenuProvider>
          <InitializerLayout>
            <AppNavigator />
          </InitializerLayout>
          <ToastLayout />
        </MenuProvider>
      </ThemeLayout>
    </Provider>
  );
};

export default withIAPContext(App);
