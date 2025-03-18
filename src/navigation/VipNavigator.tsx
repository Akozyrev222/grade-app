import React, {FC} from 'react';

import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {Routes} from './Routes';

import {useSelector} from 'react-redux';
import {roleSelectors} from '@/bus/role';

import {Vip} from '@/screens';

export type VipStackParamList = {
  [Routes.VIP_LIST]: undefined;
};

const VipStack = createStackNavigator<VipStackParamList>();

export const VipNavigator = () => {
  return (
    <VipStack.Navigator screenOptions={{headerShown: false}}>
      <VipStack.Screen name={Routes.VIP_LIST} component={Vip} />
    </VipStack.Navigator>
  );
};
