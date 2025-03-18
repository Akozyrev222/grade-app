import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Platform, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

  const {width} = useWindowDimensions();

  const insets = useSafeAreaInsets();

  const headerStyles = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {
            paddingTop: 32,
            height: 94,
          }
        : {
            height: 100,
          },
    [insets],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        header: {
          ...headerStyles,

          backgroundColor: pallete.background.blur,
        },
        content: {
          backgroundColor: '#fff',

          width: width * 0.8,
          height: width * 0.8,

          borderRadius: 16,

          justifyContent: 'center',
          alignItems: 'center',
        },
      }),
    [pallete, width],
  );

  return {styles};
};
