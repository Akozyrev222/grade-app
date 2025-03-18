import React, {FC} from 'react';

import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {Routes} from './Routes';

import {ApplicationList, OrderDetail} from '@/screens';

export type ApplicationStackParamList = {
  [Routes.APPLICATION_LIST]: undefined;
  [Routes.ORDER_DETAIL]: {id: number};
};

const ApplicationStack = createStackNavigator<ApplicationStackParamList>();

export const ApplicationNavigator = () => {
  return (
    <ApplicationStack.Navigator screenOptions={{headerShown: false}}>
      <ApplicationStack.Screen
        name={Routes.APPLICATION_LIST}
        component={ApplicationList}
      />
      <ApplicationStack.Screen
        name={Routes.ORDER_DETAIL}
        component={OrderDetail}
      />
    </ApplicationStack.Navigator>
  );
};
