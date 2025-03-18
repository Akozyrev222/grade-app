import React, {FC} from 'react';

import {TouchableOpacity} from 'react-native';
import {Text} from '@/components';

import {useData} from './useData';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';

type TProps = {
  title: string;
  onPress: () => any;
  withIcon?: boolean;
};

export const ReportCard: FC<TProps> = ({title, onPress, withIcon}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();

  const {socIcons} = useData();

  const Icon = socIcons[title];

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.6}
      onPress={onPress}>
      {withIcon && <Icon size={28} style={{marginRight: 15}} />}
      <Text>{t(`report_types.${title}`)}</Text>
    </TouchableOpacity>
  );
};
