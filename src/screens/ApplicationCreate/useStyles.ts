import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
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
        container: {
          paddingTop: 16,
          paddingHorizontal: 16,

          flex: 1,
        },
        comment: {
          textAlignVertical: 'top',
          minHeight: 108,
        },
        images: {
          flexDirection: 'row',
          flexWrap: 'wrap',

          alignItems: 'center',

          marginTop: 8,
        },

        plus: {
          height: Dimensions.get('window').width / 3 - 48,
          width: Dimensions.get('window').width / 3 - 64,

          justifyContent: 'center',
          alignItems: 'center',
        },
        currencyWrapper: {
          marginTop: 0,
          marginBottom: 16,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
