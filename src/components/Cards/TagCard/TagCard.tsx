import {Close} from '@/assets';
import {Text} from '@/components';
import React, {FC} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useStyles} from './useStyles';

type TProps = {
  tag: string;
  onRemove: () => any;
};

export const TagCard: FC<TProps> = ({tag, onRemove}) => {
  const {styles, iconColor} = useStyles();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.6} onPress={onRemove}>
        <Close fill={iconColor} size={12} />
      </TouchableOpacity>
      <Text margin={{left: 8}} size={14} family="medium">
        {tag}
      </Text>
    </View>
  );
};
