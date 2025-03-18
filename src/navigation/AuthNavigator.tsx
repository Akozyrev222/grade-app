import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import {
  ChangeRole,
  SignIn,
  SignUp,
  ConfirmCode,
  Specialization,
} from '@/screens';
import { SignUpFull } from '@/screens/SignUp/SignUpFull';
import { SignUpEnd } from '@/screens/SignUp/SignUpEnd';

export type AuthStackParamList = {
  [Routes.SIGN_UP]: undefined;
  [Routes.SIGN_UP_MAIN]: {
    isSignIn: boolean;
  };
  [Routes.SIGN_IN]: {
    isSignIn: boolean;
  };
  [Routes.HOME]: undefined;
  [Routes.SPECIALIZATION_LIST]: {
    parent: keyof typeof Routes;
    listOfSelectedSpecializations: {id: number; name: string}[];
  };
  [Routes.CONFIRM_CODE]: {parent?: keyof typeof Routes};
  [Routes.CHANGE_ROLE]: undefined;
  [Routes.CHANGE_LANG]: undefined;
  [Routes.SIGN_UP_END]: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={Routes.SIGN_UP_MAIN} initialParams={{isSignIn: false}} component={SignIn} />
      <AuthStack.Screen name={Routes.SIGN_IN} initialParams={{isSignIn: true}} component={SignIn} />
      <AuthStack.Screen name={Routes.CHANGE_ROLE} component={ChangeRole} />
      <AuthStack.Screen name={Routes.SIGN_UP} component={SignUp} />
      <AuthStack.Screen name={Routes.SIGN_UP_END} component={SignUpEnd} />
      <AuthStack.Screen name={Routes.CONFIRM_CODE} component={ConfirmCode} />
      <AuthStack.Screen
        name={Routes.SPECIALIZATION_LIST}
        component={Specialization}
      />
    </AuthStack.Navigator>
  );
};
