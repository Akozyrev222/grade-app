import React, {FC} from 'react';

import {TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

import {Text} from '@/components';
import {useStyles} from './useStyles';

type TProps = TouchableOpacityProps & {
  count: number;
};

export const BadgeButton: FC<TProps> = ({count, ...props}) => {
  const {styles} = useStyles();

  return (
    <TouchableOpacity {...props} style={[props.style, styles.wrapper]}>
      {props.children}
      {!!count && (
        <View style={styles.badge}>
          <Text size={10}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
