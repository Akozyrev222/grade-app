import React, {FC} from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {Routes} from './Routes';
import {Empty, FilterList, Specialization} from '@/screens';
import {AppStackParamList} from './AppNavigator';

export type FilterStackParamList = {
  [Routes.SPECIALIZATION_LIST]: {
    parent: keyof typeof Routes;
    listOfSelectedSpecializations: {id: number; name: string}[];
  };
  [Routes.FILTER_LIST]: {parent?: keyof typeof Routes};
  [Routes.HOME]: {
    screen: Routes.HOME_LIST | Routes.EXECUTOR_LIST;
    value?: string;
  };
  [Routes.VIP]: undefined;
};

const FilterStack = createStackNavigator<FilterStackParamList>();

type TProps = StackScreenProps<AppStackParamList, Routes.FILTER>;

export const FilterNavigator: FC<TProps> = ({route}) => {
  return (
    <FilterStack.Navigator screenOptions={{headerShown: false}}>
      <FilterStack.Screen name={Routes.FILTER_LIST} component={FilterList} />

      <FilterStack.Screen
        name={Routes.SPECIALIZATION_LIST}
        component={Specialization}
      />
    </FilterStack.Navigator>
  );
};
