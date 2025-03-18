import React, {FC, useCallback, useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Routes} from './Routes';
import {useTabBarState, useTheme} from '@/hooks';
import {useTranslation} from 'react-i18next';
import {
  ApplicationTabBar,
  ChatTabBar,
  FavoriteTabBar,
  OrderTabBar,
  ProfileTabBar,
  SearchTabBar,
  VipTabBar,
} from '@/assets';
import {
  BadgeButton,
  InfoModal,
  TabBarButton,
  Text,
  WarningModal,
} from '@/components';
import {useDispatch, useSelector} from 'react-redux';
import {roleActions, roleSelectors} from '@/bus/role';
import {Empty} from '@/screens';
import {Platform, TouchableOpacity, useWindowDimensions} from 'react-native';
import {authSelectors} from '@/bus/auth';
import {StackScreenProps} from '@react-navigation/stack';

import {ProfileNavigator} from './ProfileNavigator';
import {AppStackParamList} from './AppNavigator';
import {OrderNavigator} from './OrderNavigator';
import {VipNavigator} from './VipNavigator';
import {ApplicationNavigator} from './ApplicationNavigator';
import {RoomNavigator} from './RoomNavigator';
import {HomeNavigator} from './HomeNavigator';
import {messageSelectors} from '@/bus/message';
import {Fonts} from '@/themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {roomSelectors} from '@/bus/room';
import {FavoriteNavigator} from './FavoriteNavigator';

import notifee, {AndroidStyle, EventType} from '@notifee/react-native';
import {navigate} from './RootNavigation';
import {userActions, userSelectors} from '@/bus/user';
import {store} from '@/store';
import {ModalCover, TabBarModal} from '@/components/Modals/TabBarModal.tsx';
import {useDataModal} from '@/components/Modals/TabBarModal.tsx/useDataModal';
import {ModalNavigator} from './ModalNavigator';
import {applicationActions} from '@/bus/application';

export type TabsStackParamList = {
  [Routes.HOME]: undefined;
  [Routes.PROFILE]: {screen: Routes.PROFILE_LIST};
  [Routes.FAVORITE]: undefined;
  [Routes.ROOM]: undefined;
  [Routes.ORDER]: undefined;
  [Routes.APPLICATON]: undefined;
  [Routes.VIP]: undefined;
  [Routes.AUTH]: undefined;
  [Routes.PROFILE_LIST]: undefined;
};

type TProps = StackScreenProps<TabsStackParamList>;

const TabsStack = createBottomTabNavigator<TabsStackParamList>();

export const TabsNavigator: FC<TProps> = ({navigation}) => {
  const {pallete} = useTheme();
  const {width} = useWindowDimensions();
  const textSize =
    Platform.OS === 'android'
      ? width < 430
        ? 10
        : 11
      : width < 380
      ? 9.5
      : 12;

  const dispatch = useDispatch();
  const user = useSelector(userSelectors.getDetail);
  const role = useSelector(roleSelectors.getRole);
  const token = useSelector(authSelectors.getToken);

  const count = useSelector(roomSelectors.getNotReadCount);
  const insets = useSafeAreaInsets();

  const [isOpened, setIsOpened] = useState(false);

  const {isShow} = useTabBarState();

  const {t} = useTranslation();

  const onBootstrap = async () => {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification && initialNotification.notification) {
      const data = initialNotification.notification.data as any;

      switch (data.action) {
        case 'unverified': {
          if (role !== 'executor') {
            dispatch(roleActions.updateItemAsync(data.for_role));
          }
          dispatch(userActions.fetchDetailAsync());

          navigate(Routes.PROFILE);

          break;
        }
        case 'new_request': {
          const payload = {id: data.order_id};
          const role = roleSelectors.getRole(store.getState());

          if (role !== data.for_role) {
            dispatch(roleActions.updateItemAsync(data.for_role));
          }

          navigate(Routes.RESPONSE_LIST, payload);

          break;
        }
        case 'new_message': {
          const payload = {id: data.chat_id};
          const role = roleSelectors.getRole(store.getState());

          if (role !== data.for_role) {
            dispatch(roleActions.updateItemAsync(data.for_role));
          }

          dispatch(userActions.addChatId([Number(data.chat_id)]));

          navigate(Routes.ROOM_DETAIL, payload);

          break;
        }
        case 'choice_executor': {
          const payload = {id: data.order_id};
          const role = roleSelectors.getRole(store.getState());

          if (role !== data.for_role) {
            dispatch(roleActions.updateItemAsync(data.for_role));
          }

          navigate(Routes.ORDER_DETAIL, payload);

          break;
        }
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(onBootstrap, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <TabsStack.Navigator>
        <TabsStack.Screen
          name={Routes.HOME}
          component={HomeNavigator}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                size={textSize}
                family={focused ? 'bold' : 'medium'}
                color="default">
                {t('tabBar.search')}
              </Text>
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate(Routes.HOME);
                }}>
                {props.children}
              </TouchableOpacity>
            ),
            tabBarIcon: ({focused, size}) => (
              <SearchTabBar
                size={28}
                isFocused={focused}
                fill={pallete.icon.default as string}
              />
            ),
          })}
        />

        {role === 'customer' && (
          <TabsStack.Screen
            name={Routes.FAVORITE}
            component={FavoriteNavigator}
            options={() => ({
              tabBarLabel: ({focused}) => (
                <Text
                  size={textSize}
                  family={focused ? 'bold' : 'medium'}
                  color="default">
                  {t('tabBar.favorite')}
                </Text>
              ),
              tabBarButton: (props) => (
                <TabBarButton
                  {...props}
                  needBeLogged
                  setIsOpened={() => setIsOpened(true)}
                />
              ),
              tabBarIcon: ({focused, size}) => (
                <FavoriteTabBar
                  size={27}
                  isFocused={focused}
                  fill={pallete.icon.default as string}
                />
              ),
            })}
          />
        )}
        {role === 'customer' && (
          <TabsStack.Screen
            name={Routes.ORDER}
            component={OrderNavigator}
            options={() => ({
              tabBarStyle: {
                display: 'none',
              },
              tabBarLabel: ({focused}) => (
                <Text
                  size={textSize}
                  family={focused ? 'bold' : 'medium'}
                  color="default">
                  {t('tabBar.order')}
                </Text>
              ),
              tabBarButton: (props) => (
                <TabBarButton
                  {...props}
                  needBeLogged
                  setIsOpened={() => {
                    setIsOpened(true);
                  }}
                />
              ),
              tabBarIcon: ({focused, size}) => (
                <OrderTabBar
                  size={28}
                  isFocused={focused}
                  fill={pallete.icon.default as string}
                />
              ),
            })}
          />
        )}
        {role === 'executor' && (
          <TabsStack.Screen
            name={Routes.APPLICATON}
            component={ApplicationNavigator}
            options={() => ({
              tabBarLabel: ({focused}) => (
                <Text
                  size={textSize}
                  family={focused ? 'bold' : 'medium'}
                  color="default">
                  {t('tabBar.application')}
                </Text>
              ),
              tabBarButton: (props) => (
                <TabBarButton
                  {...props}
                  needBeLogged
                  setIsOpened={() => setIsOpened(true)}
                />
              ),
              tabBarIcon: ({focused, size}) => (
                <ApplicationTabBar
                  size={28}
                  isFocused={focused}
                  fill={pallete.icon.default as string}
                />
              ),
            })}
          />
        )}

        <TabsStack.Screen
          name={Routes.ROOM}
          component={RoomNavigator}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                size={textSize}
                family={focused ? 'bold' : 'medium'}
                color="default">
                {t('tabBar.chat')}
              </Text>
            ),
            tabBarBadgeStyle: {
              backgroundColor: pallete.background.action,
              fontSize: 10,
              fontFamily: Fonts.regular,

              height: 18,
              width: 18,

              justifyContent: 'center',
              alignItems: 'center',
            },
            tabBarButton: (props) => (
              <BadgeButton
                {...props}
                count={count}
                onPress={() => {
                  if (token) {
                    navigation.navigate(Routes.ROOM);
                  } else {
                    setIsOpened(true);
                  }
                }}
              />
            ),

            tabBarIcon: ({focused, size}) => (
              <ChatTabBar
                size={28}
                isFocused={focused}
                fill={pallete.icon.default as string}
              />
            ),
          })}
        />
        <TabsStack.Screen
          name={Routes.PROFILE}
          component={ProfileNavigator}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                size={textSize}
                family={focused ? 'bold' : 'medium'}
                color="default"
                align="center"
                numberOfLines={1}
                style={{width: 100}}>
                {t('tabBar.profile')}
              </Text>
            ),
            tabBarButton: (props) => (
              <TabBarButton
                {...props}
                needBeLogged
                setIsOpened={() => setIsOpened(true)}
              />
            ),
            tabBarIcon: ({focused, size}) => (
              <ProfileTabBar
                size={29}
                isFocused={focused}
                fill={pallete.icon.default as string}
              />
            ),
          })}
        />
        {role === 'executor' && (
          <TabsStack.Screen
            name={Routes.VIP}
            component={VipNavigator}
            options={() => ({
              tabBarLabel: ({focused}) => (
                <Text
                  size={textSize}
                  family={focused ? 'bold' : 'medium'}
                  color="default">
                  {t('tabBar.vip')}
                </Text>
              ),
              tabBarButton: (props) => (
                <TabBarButton
                  {...props}
                  needBeLogged
                  setIsOpened={() => setIsOpened(true)}
                />
              ),
              tabBarIcon: ({focused, size}) => (
                <VipTabBar
                  size={28}
                  isFocused={focused}
                  fill={pallete.icon.default as string}
                />
              ),
            })}
          />
        )}
      </TabsStack.Navigator>

      <WarningModal
        forLogged
        visible={isOpened}
        onClose={() => setIsOpened(false)}
        renderTitle={<Text size={16}>{t('logged_modal.title')}</Text>}
        handleSubmit={() => {
          setIsOpened(false);
          setTimeout(() => {
            navigation.navigate(Routes.AUTH);
          }, 50);
        }}
      />
    </>
  );
};
