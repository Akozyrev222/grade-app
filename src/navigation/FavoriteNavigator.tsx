import {Empty, ExecutorDetail, FavoriteList} from '@/screens';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Routes} from './Routes';

export type FavoriteStackParamList = {
  [Routes.FAVORITE_LIST]: undefined;
  [Routes.EXECUTOR_DETAIL]: {id: number};
};

const FavoriteStack = createStackNavigator<FavoriteStackParamList>();

export const FavoriteNavigator = () => {
  return (
    <FavoriteStack.Navigator screenOptions={{headerShown: false}}>
      <FavoriteStack.Screen
        name={Routes.FAVORITE_LIST}
        component={FavoriteList}
      />
      <FavoriteStack.Screen
        name={Routes.EXECUTOR_DETAIL}
        component={ExecutorDetail}
      />
    </FavoriteStack.Navigator>
  );
};
