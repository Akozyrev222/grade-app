import React, {useEffect} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '.';
import {useDispatch, useSelector} from 'react-redux';
import {
  ConfirmCode,
  Specialization,
  ResponseList,
  ExecutorDetail,
  RoomDetail,
  CreateExecutor,
} from '@/screens';
import {Profile} from '@/screens/Profile';
import {ReferralProgram} from '@/screens/ReferralProgram';
import {roleSelectors} from '@/bus/role';
import {authSelectors} from '@/bus/auth';
import {OrderNavigator} from './OrderNavigator';
import {MyCard} from '@/screens/MyCard';
import {ProfileEdit} from '@/screens/ProfileEdit';
import {ProfileSettings} from '@/screens/ProfileSettings';
import {ProfileSettingsDetailsPage} from '@/screens/ProfileSettingsDetailsPage';
import {usePushNotification} from '@/hooks';

export type ProfileStackParamList = {
  [Routes.PROFILE_LIST]: undefined;
  [Routes.PROFILE_EDIT]: undefined;
  [Routes.VERIFICATION]: undefined;
  [Routes.MY_CARD]: undefined;
  [Routes.ORDER_NAVIGATOR]: {screen: Routes.PROFILE_ORDER_LIST};
  [Routes.CONFIRM_CODE]: {parent?: keyof typeof Routes};
  [Routes.SPECIALIZATION_LIST]: {
    parent?: keyof typeof Routes;
    listOfSelectedSpecializations?: {id: number; name: string}[];
  };
  [Routes.RESPONSE_LIST]: {id: number};
  [Routes.EXECUTOR_DETAIL]: {id: number};
  [Routes.REPORT]: undefined;
  [Routes.ROOM_DETAIL]: {id: number};
  [Routes.CREATE_EXECUTOR]: undefined;
  [Routes.HOME_LIST]: undefined;
  [Routes.REFERRAL_PROGRAM]: undefined;
  [Routes.PROFILE_SETTINGS]: undefined;
  [Routes.PROFILE_SETTINGS_DETAILS_PAGE]: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export const ProfileNavigator = () => {
  usePushNotification();

  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name={Routes.PROFILE_LIST} component={Profile} />
      <ProfileStack.Screen name={Routes.PROFILE_EDIT} component={ProfileEdit} />
      <ProfileStack.Screen
        name={Routes.PROFILE_SETTINGS}
        component={ProfileSettings}
      />
      <ProfileStack.Screen
        name={Routes.PROFILE_SETTINGS_DETAILS_PAGE}
        component={ProfileSettingsDetailsPage}
      />
      <ProfileStack.Screen name={Routes.MY_CARD} component={MyCard} />
      <ProfileStack.Screen name={Routes.CONFIRM_CODE} component={ConfirmCode} />
      <ProfileStack.Screen
        name={Routes.RESPONSE_LIST}
        component={ResponseList}
      />

      <ProfileStack.Screen
        name={Routes.SPECIALIZATION_LIST}
        component={Specialization}
      />

      <ProfileStack.Screen
        name={Routes.ORDER_NAVIGATOR}
        component={OrderNavigator}
      />
      <ProfileStack.Screen
        name={Routes.EXECUTOR_DETAIL}
        component={ExecutorDetail}
      />
      <ProfileStack.Screen name={Routes.ROOM_DETAIL} component={RoomDetail} />
      <ProfileStack.Screen
        name={Routes.CREATE_EXECUTOR}
        component={CreateExecutor}
      />
      <ProfileStack.Screen
        name={Routes.REFERRAL_PROGRAM}
        component={ReferralProgram}
      />
    </ProfileStack.Navigator>
  );
};
