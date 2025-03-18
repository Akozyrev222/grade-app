import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, Platform, StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

  const insets = useSafeAreaInsets();

  const headerStyles = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {
            paddingTop: insets.top + 16,
            height: 192,
          }
        : {
            paddingTop: StatusBar.currentHeight + 16,

            height: 166,
          },
    [insets],
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          marginTop: '35%',

          justifyContent: 'center',
          alignItems: 'center',

          paddingHorizontal: 38,
        },

        container: {
          paddingHorizontal: 16,

          paddingTop: 16,
        },

        header: {
          ...headerStyles,

          paddingHorizontal: 16,

          backgroundColor: pallete.background.blur,
        },

        emptyWrapper: {
          backgroundColor: pallete.background.blur,

          height: 108,
          width: 118,

          borderRadius: 8,

          justifyContent: 'center',
          alignItems: 'center',

          marginBottom: 16,
        },

        switchers: {
          flexDirection: 'row',

          backgroundColor: pallete.background.blur,
          borderRadius: 16,
        },
        switcher: {
          width: Dimensions.get('window').width / 2 - 16,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.blur as string};
};
