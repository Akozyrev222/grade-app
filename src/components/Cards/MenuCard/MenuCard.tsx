import {Chevron} from '@/assets';
import {Text} from '@/components';
import React, {FC} from 'react';

import {TouchableOpacity} from 'react-native';

import {useStyles} from './useStyles';

type TItem = {
  title: string;
  id?: number;
};

type TProps = {
  item: TItem;
  onPress: () => any;
};

export const MenuCard: FC<TProps> = ({item, onPress}) => {
  const {styles, iconColor} = useStyles();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text family="medium" size={14}>
        {item.title}
      </Text>

      <Chevron size={14} fill={iconColor} />
    </TouchableOpacity>
  );
};
