import {Close} from '@/assets';
import React, {FC} from 'react';
import {Image, ImageProps, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useStyles} from './useStyles';

type TProps = {
  uri: string;
  onRemove: () => any;
  marginRight: number;

  koef?: number;
};

export const ImageCard: FC<TProps> = ({
  onRemove,
  uri,
  marginRight,
  koef = 3,
}) => {
  const {styles, iconColor} = useStyles({koef});

  return (
    <View style={[styles.wrapper, {marginRight}]}>
      <Image source={{uri}} style={[styles.image]} />
      <View style={styles.removeWrapper}>
        <TouchableOpacity
          onPress={onRemove}
          activeOpacity={0.6}
          style={{
            height: 24,
            width: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Close fill={iconColor} size={6} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
