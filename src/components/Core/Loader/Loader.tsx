import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
//app
import {useTheme} from '@/hooks';

type TProps = ViewProps & {
  width?: number;
  height?: number;
  size?: 'large' | 'small';
};

export const Loader: React.FC<TProps> = ({
  size = 'large',
  width,
  height,
  ...props
}) => {
  const {pallete} = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.wrapper,
        !!width && {
          width,
        },
        !!height && {
          height,
        },
        props.style,
      ]}>
      <ActivityIndicator color={pallete.text.default} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
