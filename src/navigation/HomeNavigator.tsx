import React, {FC} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {
  ApplicationCreate,
  CategoryChildrenList,
  ExecutorDetail,
  ExecutorList,
  Home,
  OrderDetail,
  OrderList,
  OrderUser,
  ReviewCreate,
  RoomDetail,
} from '@/screens';
import {useSelector} from 'react-redux';
import {roleSelectors} from '@/bus/role';
import {Category} from '@/bus/category';
import {TabsStackParamList} from './TabsNavigator';
import {View} from 'react-native';

export type HomeStackParamList = {
  [Routes.HOME_LIST]: undefined;
  [Routes.FILTER]: {parent?: keyof typeof Routes};
  [Routes.AUTH]: undefined;
  [Routes.EXECUTOR_LIST]: {value: string; focus?: boolean};
  [Routes.CATEGORY_CHILDREN_LIST]: {category: Category.Item};
  [Routes.EXECUTOR_DETAIL]: {id: number};
  [Routes.ORDER_USER]: {id: number};
  [Routes.ORDER_DETAIL]: {id: number};
  [Routes.ROOM_DETAIL]: {id: number};
  [Routes.APPLICATION_CREATE]: {id: number};
  [Routes.REPORT]: undefined;
  [Routes.REVIEW_CREATE]: {id: number};
};

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator = () => {
  const role = useSelector(roleSelectors.getRole);

  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name={Routes.HOME_LIST}
        component={role !== 'executor' ? Home : OrderList}
      />
      <HomeStack.Screen name={Routes.EXECUTOR_LIST} component={ExecutorList} />
      <HomeStack.Screen
        name={Routes.CATEGORY_CHILDREN_LIST}
        component={CategoryChildrenList}
      />
      <HomeStack.Screen
        name={Routes.EXECUTOR_DETAIL}
        component={ExecutorDetail}
      />
      <HomeStack.Screen name={Routes.ORDER_USER} component={OrderUser} />
      <HomeStack.Screen name={Routes.ORDER_DETAIL} component={OrderDetail} />
      <HomeStack.Screen
        name={Routes.APPLICATION_CREATE}
        component={ApplicationCreate}
      />
      <HomeStack.Screen name={Routes.ROOM_DETAIL} component={RoomDetail} />
      <HomeStack.Screen name={Routes.REVIEW_CREATE} component={ReviewCreate} />
    </HomeStack.Navigator>
  );
};
