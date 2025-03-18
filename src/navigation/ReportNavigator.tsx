import {Report} from '@/bus/report';
import {Empty, ReportCreate, ReportList} from '@/screens';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Routes} from './Routes';

export type ReportStackParamList = {
  [Routes.REPORT_LIST]: undefined;
  [Routes.REPORT_CREATE]: {type: Report.Type};
};

const ReportStack = createStackNavigator<ReportStackParamList>();

export const ReportNavigator = () => {
  return (
    <ReportStack.Navigator screenOptions={{headerShown: false}}>
      <ReportStack.Screen name={Routes.REPORT_LIST} component={ReportList} />
      <ReportStack.Screen
        name={Routes.REPORT_CREATE}
        component={ReportCreate}
      />
    </ReportStack.Navigator>
  );
};
