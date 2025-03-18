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
            paddingTop: 16,
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

        container: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          paddingBottom: 122,
        },
        topWrapper: {
          backgroundColor: pallete.background.blur,

          paddingTop: 16,
          paddingBottom: 8,

          borderRadius: 8,
        },
        topHeader: {
          paddingHorizontal: 16,
        },
        topTitle: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        button: {
          width: '100%',
          height: 48,
          borderRadius: 10,
          fontSize: 14,
        },
        buttonDisabled: {
          opacity: 0.8,
        },
        promoCodeBtn: {
          marginTop: 10,
        },
        buttonsWrapper: {
          paddingBottom: 8,
          width: '100%',
          paddingHorizontal: 30,
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          right: 0,
        },
      }),
    [pallete],
  );

  return {styles};
};
