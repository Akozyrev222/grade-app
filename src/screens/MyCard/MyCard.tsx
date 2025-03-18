import {GradientLayout} from '@/layouts';
import React, {FC} from 'react';
import {useWindowDimensions, View, Text} from 'react-native';

import {useData} from './useData';
import {useStyles} from './useStyles';

import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {Header} from '@/components';
import {StackScreenProps} from '@react-navigation/stack';
import {ProfileStackParamList} from '@/navigation/ProfileNavigator';
import {Routes} from '@/navigation';

type TProps = StackScreenProps<ProfileStackParamList, Routes.MY_CARD>;

export const MyCard: FC<TProps> = ({navigation}) => {
  const {styles} = useStyles();

  const {width} = useWindowDimensions();

  const {user} = useData();

  const {t} = useTranslation();

  return (
    <GradientLayout>
      <View style={styles.header}>
        <Header
          family="bold"
          leftIcon="back"
          onPressLeftIcon={() => navigation.goBack()}>
          {t('header.my_card')}
        </Header>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.content}>
        </View>
      </View>
    </GradientLayout>
  );
};
