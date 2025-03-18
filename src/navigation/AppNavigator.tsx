import React, {useCallback, useEffect} from 'react';

import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {Routes} from './Routes';
import {navigationRef} from './RootNavigation';
import {appSelectors} from '@/bus/app';
import {AuthNavigator} from './AuthNavigator';
import {GradientLayout} from '@/layouts';
import {TabsNavigator} from './TabsNavigator';
import {FilterNavigator} from './FIlterNavigator';
import {authSelectors} from '@/bus/auth';
import {ChangeRole, Verification} from '@/screens';
import {uiActions, uiSelectors} from '@/bus/ui';
import {Loader} from '@/components';
import {Linking} from 'react-native';
import {initAppsFlyer, useDeepLinking} from '@/hooks';
import {ReportNavigator} from './ReportNavigator';
import {getAvailablePurchases, useIAP} from 'react-native-iap';
import {PRODUCTS} from '@/constants';
import {roleSelectors} from '@/bus/role';
import {ChangeLang} from '@/screens/ChangeLang';
import axios from '@/services/axios';
import {userActions} from '@/bus/user';
import {LogBox} from 'react-native';
import {linkActions} from '@/bus/link';
import AsyncStorage from '@react-native-community/async-storage';
import ENV from '@/configs';
import notifee from '@notifee/react-native';

LogBox.ignoreLogs(['new NativeEventEmitter']);

export type AppStackParamList = {
  [Routes.AUTH]: undefined;
  [Routes.TABS]: undefined;
  [Routes.FILTER]: {parent: keyof typeof Routes};
  [Routes.VERIFICATION]: undefined;
  [Routes.SPLASH]: undefined;
  [Routes.MODAL]: undefined;
  [Routes.CHANGE_ROLE]: undefined;
};

const AppStack = createStackNavigator();

export const AppNavigator = () => {
  initAppsFlyer();

  useEffect(() => {
    const changeMode = async () => {
      await AsyncStorage.removeItem('displayedNotifications');
      const devMode = await AsyncStorage.getItem('dev');
      if (devMode === null) {
        dispatch(linkActions.saveLink(ENV.BASE_URL_PROD));
      } else {
        dispatch(linkActions.saveLink(ENV.BASE_URL));
      }
    };
    changeMode();
  }, []);

  const dispatch = useDispatch();

  const token = useSelector(authSelectors.getToken);

  const link = useSelector(uiSelectors.getOpenLink);

  const isChangeLanguage = useSelector(uiSelectors.getLoading('language'));
  const isLogout = useSelector(uiSelectors.getLoading('logout'));

  const linking = useDeepLinking();

  const role = useSelector(roleSelectors.getRole);
  const locale = useSelector(appSelectors.getLanguage);

  const {connected, getProducts, getSubscriptions} = useIAP();

  async function checkCurrentSubscription() {
    try {
      const purchases = await getAvailablePurchases();
      const subscriptionPurchase = purchases.find(
        (purchase) =>
          purchase.productId === 'radius_unlimited_month' ||
          purchase.productId === 'month1' ||
          purchase.productId === 'month_12',
      );
      if (!subscriptionPurchase) {
        console.log('Подписка не куплена!');
      } else {
        const month_count =
          subscriptionPurchase.developerPayloadAndroid ===
            'radius_unlimited_month_12' ||
          subscriptionPurchase.productId === 'month_12'
            ? 12
            : 1;
        const res = await axios({
          url: '/update_vip',
          method: 'get',
          params: {
            month_count,
          },
        });

        console.log('Подписка куплена!');
        dispatch(userActions.fetchDetailAsync());
      }
    } catch (error) {
      console.warn('Failed to get available purchases', error);
    }
  }

  useEffect(() => {
    checkCurrentSubscription();
  }, []);

  const onBootstrap = useCallback(async () => {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification && initialNotification.notification) {
      const data = initialNotification.notification.data as any;
      return data;
    }
  }, []);

  const onBootstrapProducts = useCallback(async () => {
    if (connected) {
      await getSubscriptions({
        skus: ['radius_unlimited_month', 'month1', 'month_12'],
      });
      await getProducts({skus: PRODUCTS});
    }
  }, [connected]);

  useEffect(() => {
    onBootstrap();
    onBootstrapProducts();
  }, [onBootstrapProducts, onBootstrap]);

  const onOpenLink = useCallback(async () => {
    if (link) {
      Linking.openURL(link);
      dispatch(uiActions.clearLink());
    }
  }, [link]);

  useEffect(() => {
    onOpenLink();
  }, [onOpenLink]);

  return (
    <GradientLayout>
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
          },
        }}>
        {isChangeLanguage || isLogout ? (
          <Loader height={200} />
        ) : (
          <AppStack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: true,
              animationTypeForReplace: 'push',
              cardStyle: {
                backgroundColor: 'transparent',
              },
            }}>
            {locale === null && (
              <AppStack.Screen
                name={Routes.CHANGE_LANG}
                component={ChangeLang}
              />
            )}
            {role === null && (
              <AppStack.Screen name={Routes.CHANGE_ROLE}>
                {(props) => <ChangeRole {...props} fromRoot />}
              </AppStack.Screen>
            )}
            <AppStack.Screen name={Routes.TABS} component={TabsNavigator} />
            {!token && (
              <AppStack.Screen name={Routes.AUTH} component={AuthNavigator} />
            )}
            <AppStack.Screen name={Routes.AUTH_NEW} component={AuthNavigator} />

            <AppStack.Screen
              name={Routes.VERIFICATION}
              component={Verification}
            />

            <AppStack.Screen name={Routes.FILTER} component={FilterNavigator} />
            <AppStack.Screen name={Routes.REPORT} component={ReportNavigator} />
          </AppStack.Navigator>
        )}
      </NavigationContainer>
    </GradientLayout>
  );
};
