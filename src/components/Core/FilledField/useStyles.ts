import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete, fonts} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        inputWrapper: {
          borderRadius: 8,
          borderWidth: 1,

          minHeight: 48,
          paddingHorizontal: 8,

          flexDirection: 'row',
          alignItems: 'center',
        },
        input: {
          color: pallete.text.default,

          fontFamily: fonts.regular,
          fontSize: 14,

          flexShrink: 1,
          flexGrow: 1,
        },
        rightIcon: {flexShrink: 0, paddingRight: 5},
        leftIcon: {flexShrink: 0, paddingRight: 5},
      }),
    [pallete, fonts],
  );

  return {
    styles,
    inputColor: pallete.input,
    placeholderColors: pallete.text.gray as string,
  };
};
