import {User} from '@/assets';
import React, {FC, useMemo, useState} from 'react';

import {View, ViewProps} from 'react-native';
import {useStyles} from './useStyles';

import Image from 'react-native-fast-image';
import {Loader} from '../Loader';

type TProps = ViewProps & {
  url: string | null;
  variant?: 'square' | 'circle' | 'sharp_square';
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export const Avatar: FC<TProps> = ({
  url,
  variant = 'square',
  margin,
  size = 'large',
  ...props
}) => {
  const [isReady, setIsReady] = useState(false);

  const {styles, iconColor} = useStyles();
  const marginData = useMemo(
    () => ({
      marginBottom: margin?.bottom,
      marginTop: margin?.top,
      marginLeft: margin?.left,
      marginRight: margin?.right,
    }),
    [margin],
  );
  const sizeData = useMemo(() => {
    switch (size) {
      case 'extraSmall':
        return {height: 34, width: 34};
      case 'small':
        return {height: 64, width: 64};
      case 'medium':
        return {height: 96, width: 96};
      case 'large':
        return {height: 164, width: 164};
      default:
        return {};
    }
  }, [size]);

  const border = useMemo(() => {
    switch (variant) {
      case 'circle':
        return {borderRadius: 140};
      case 'square':
        return {borderRadius: 8};
      case 'sharp_square':
        return {borderRadius: 5};
      default:
        return {};
    }
  }, [variant]);

  return (
    <View
      style={[styles.wrapper, sizeData, marginData, border, props.style]}
      {...props}>
      {!isReady && !!url && (
        <View style={styles.loader}>
          <Loader />
        </View>
      )}
      {!url ? (
        <User size={sizeData.height / 2} fill={iconColor} />
      ) : (
        <Image
          style={[
            sizeData,
            border,
            {
              zIndex: 1,
            },
          ]}
          source={{uri: url}}
          onLoadStart={() => setIsReady(true)}
          onLoadEnd={() => setIsReady(true)}
        />
      )}
    </View>
  );
};
