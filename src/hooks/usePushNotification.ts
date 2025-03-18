import {useDispatch, useSelector} from 'react-redux';

import {useCallback, useEffect, useState} from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {authSelectors} from '@/bus/auth';
import {userActions, userSelectors} from '@/bus/user';


import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';

//@ts-ignore
import {store} from '@/store';
import {roomSelectors} from '@/bus/room';

import i18n from '@/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {linkSelectors} from '@/bus/link';

export const usePushNotification = () => {
  const urlMode = useSelector(linkSelectors.getLink);
  const dispatch = useDispatch();
  const logged = useSelector(authSelectors.getToken);

  const onShowMessage = useCallback(
    async (
      channelId: string,
      message: FirebaseMessagingTypes.RemoteMessage,
    ) => {
      try {
        const style = message.data?.image_url
          ? {
              style: {
                type: AndroidStyle.BIGPICTURE,
                picture: `${urlMode}${message.data.image_url}`,
              },
            }
          : {};

        const room = roomSelectors.getDetail(store.getState());

        const messageId =
          message.messageId ||
          `${message?.data?.action}_${message?.data?.chat_id || ''}`;

        const storedMessages =
          JSON.parse(await AsyncStorage.getItem('displayedNotifications')) ||
          [];
        if (storedMessages.includes(messageId)) {
          return;
        }

        storedMessages.push(messageId);
        await AsyncStorage.setItem(
          'displayedNotifications',
          JSON.stringify(storedMessages),
        );
        const res = await AsyncStorage.getItem('displayedNotifications');

        if (
          message?.data?.action === 'new_message' &&
          +message?.data?.chat_id === room?.id
        ) {
          return null;
        }

        if (message?.data?.action === 'unverified') {
          return await notifee.displayNotification({
            title: i18n.t('messages.unverified.title'),
            body: i18n.t('messages.unverified.desc'),
            data: message.data,
            //@ts-ignore
            android: {
              ...style,
              channelId,
              pressAction: {
                id: 'default',
              },
            },
          });
        }

        if (message?.data?.action === 'new_request') {
          return await notifee.displayNotification({
            title: i18n.t('messages.new_request_title'),
            subtitle: i18n.t('messages.new_request_subtitle'),
            body: message.data.body,
            data: message.data,
            //@ts-ignore
            android: {
              ...style,
              channelId,
              pressAction: {
                id: 'default',
              },
            },
          });
        }

        if (message?.data?.action === 'choice_executor') {
          return await notifee.displayNotification({
            title: i18n.t('messages.choice_executor_title'),
            subtitle: i18n.t('messages.choice_executor_subtitle'),
            body: message.data.body,
            data: message.data,
            //@ts-ignore
            android: {
              ...style,
              channelId,
              pressAction: {
                id: 'default',
              },
            },
          });
        }

        return await notifee.displayNotification({
          title: message?.data?.title,
          body: message?.data?.body,
          data: message.data,
          //@ts-ignore
          android: {
            ...style,
            channelId,
            pressAction: {
              id: 'default',
            },
          },
        });
      } catch (e) {
        console.log(`error parse image ${e}`);
      }
    },
    [],
  );

  const onSetUpMessaging = useCallback(async () => {
    if (logged) {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();

        if (token) {
          dispatch(userActions.updateDeviceTokenAsync({device_token: token}));

          try {
            const channelId = await notifee.createChannel({
              id: 'default',
              importance: AndroidImportance.DEFAULT,
            });

            return channelId;
          } catch (error) {
            console.error('Failed to create notification channel', error);
          }

          messaging().onMessage(async (message) => {
            await onShowMessage(channelId, message);
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    onSetUpMessaging();
  }, [onSetUpMessaging]);

  return;
};
