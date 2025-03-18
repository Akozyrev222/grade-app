import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

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
        header: {
          ...headerStyles,
          backgroundColor: pallete.background.blur,
        },
        wrapper: {
          flex: 1,
          paddingHorizontal: 16,
        },
        footer: {
          paddingBottom: insets.bottom,

          paddingHorizontal: 16,
        },
        btnAndroid: {
          marginBottom: 25,
        },
      }),
    [pallete],
  );

  return {styles};
};
