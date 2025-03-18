import React, {FC} from 'react';

import {ExecutorDetail, OrderUser, RoomDetail, RoomList} from '@/screens';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {Routes} from './Routes';

export type RoomStackParamList = {
  [Routes.ROOM_LIST]: undefined;
  [Routes.ROOM_DETAIL]: {id: number};
  [Routes.EXECUTOR_DETAIL]: {id: number};
  [Routes.ORDER_USER];
};

const RoomStack = createStackNavigator<RoomStackParamList>();

export const RoomNavigator: FC<StackScreenProps<any>> = ({route}) => {
  return (
    <RoomStack.Navigator screenOptions={{headerShown: false}}>
      <RoomStack.Screen name={Routes.ROOM_LIST} component={RoomList} />
      <RoomStack.Screen name={Routes.ROOM_DETAIL}>
        {(props) => (
          <RoomDetail
            {...props}
            route={{
              ...props.route,
              params:
                route.params?.id !== undefined
                  ? {id: route.params.id}
                  : props.route.params,
            }}
          />
        )}
      </RoomStack.Screen>

      <RoomStack.Screen
        name={Routes.EXECUTOR_DETAIL}
        component={ExecutorDetail}
      />
      <RoomStack.Screen name={Routes.ORDER_USER} component={OrderUser} />
    </RoomStack.Navigator>
  );
};
