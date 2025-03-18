import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

export const useStyles = () => {
  const {pallete, fonts} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        inputWrapper: {
          borderRadius: 8,
          paddingHorizontal: 8,
          borderWidth: 1,

          height: 48,

          flexDirection: 'row',
          alignItems: 'center',
        },
        transparentInputWrapper: {
          width: Dimensions.get('window').width - 150,
        },
        input: {
          color: pallete.text.default,
          fontFamily: fonts.regular,
          fontSize: 14,
          height: 48,
          flexShrink: 1,
          flexGrow: 1,
          width: Dimensions.get('window').width - 140,
        },
        rightIcon: {flexShrink: 0, paddingRight: 5},
        leftIcon: {flexShrink: 0, paddingLeft: 5, marginRight: 5},
      }),
    [pallete],
  );

  return {
    styles,
    inputColor: pallete.input,
  };
};
