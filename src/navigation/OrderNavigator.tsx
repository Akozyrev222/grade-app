import React from 'react';

import {
  OrderCreate,
  OrderUpdate,
  ProfileOrderDetail,
  ProfileOrderList,
  Specialization,
} from '@/screens';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {useSelector} from 'react-redux';
import {roleSelectors} from '@/bus/role';

export type OrderStackParamList = {
  [Routes.ORDER_CREATE]: undefined;
  [Routes.ORDER_UPDATE]: undefined;
  [Routes.PROFILE_ORDER_LIST]: undefined;
  [Routes.PROFILE_ORDER_DETAIL]: {id: number};
  [Routes.SPECIALIZATION_LIST]: {
    parent: keyof typeof Routes;
    listOfSelectedSpecializations: {id: number; name: string}[];
  };
};

const OrderStack = createStackNavigator<OrderStackParamList>();

export const OrderNavigator = () => {
  const role = useSelector(roleSelectors.getRole);

  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name={Routes.ORDER_CREATE} component={OrderCreate} />
      <OrderStack.Screen
        name={Routes.SPECIALIZATION_LIST}
        component={Specialization}
      />
      <OrderStack.Screen
        name={Routes.PROFILE_ORDER_LIST}
        component={ProfileOrderList}
      />
      <OrderStack.Screen
        name={Routes.PROFILE_ORDER_DETAIL}
        component={ProfileOrderDetail}
      />

      <OrderStack.Screen name={Routes.ORDER_UPDATE} component={OrderUpdate} />
    </OrderStack.Navigator>
  );
};
