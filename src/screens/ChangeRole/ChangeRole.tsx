import {Button, Header, Text} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {AuthStackParamList} from '@/navigation/AuthNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {View} from 'react-native';
import {useData} from './useData';
import {useStyles} from './useStyles';

type TProps = StackScreenProps<AuthStackParamList, Routes.CHANGE_ROLE> & {
  fromRoot?: boolean;
};

export const ChangeRole: FC<TProps> = ({navigation, fromRoot}) => {
  const {styles} = useStyles();
  const {onChangeRole, onLogout} = useData();
  
  const {t} = useTranslation();

  return (
    <GradientLayout>
      <View style={styles.header}>
        {!fromRoot && (
          <Header
            leftIcon="back"
            onPressLeftIcon={() => {
              navigation.goBack();
              onLogout();
            }}
          />
        )}
      </View>

      <View style={styles.wrapper}>
        <Text align="center" size={18}>
          {t('titles.welcome')}
        </Text>
        <Text margin={{bottom: 12}} align="center" family="bold" size={20}>
          {t('app')}
        </Text>
        <Button
          onPress={() => {
            onChangeRole('executor');
            !fromRoot && navigation.navigate(Routes.SIGN_UP);
          }}
          margin={{top: 40}}
          weight="medium"
          size="extraLarge"
          color="gray">
          {t('roles.executor')}
        </Button>
        <Button
          onPress={() => {
            onChangeRole('customer');
            !fromRoot && navigation.navigate(Routes.SIGN_UP);
          }}
          margin={{top: 8, bottom: 90}}
          weight="medium"
          size="extraLarge"
          color="gray">
          {t('roles.customer')}
        </Button>
      </View>
    </GradientLayout>
  );
};
