import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,

          minHeight: 48,
        },
        inputWrapper: {
          justifyContent: 'center',
          marginLeft: 4,

          // backgroundColor: '#000',
          height: 30,
        },
        input: {
          height: 30,

          padding: 0,
          marginLeft: 4,
          flex: 1,

          minWidth: 100,

          color: pallete.text.default,
          fontSize: 14,
        },
      }),
    [pallete],
  );

  return {
    styles,
    inputColor: pallete.input,
    iconColor: pallete.icon.default as string,
  };
};
