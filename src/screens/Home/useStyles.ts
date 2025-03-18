import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Platform, StatusBar, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const insets = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        header: {
          paddingHorizontal: 16,
          paddingTop:
            StatusBar.currentHeight ||
            0 + (Platform.OS === 'ios' ? insets.top : 0),

          // backgroundColor: '#ffff',

          // height: 168,
          flexDirection: 'row',
          alignItems: 'center',

          justifyContent: 'space-between',

          overflow: 'hidden',
        },
        title: {
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'space-between',
        },
        subtitle: {
          marginTop: 4,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',

          flex: 1,
        },
        signIn: {
          borderBottomColor: pallete.border.default,
          borderBottomWidth: 2,
        },

        container: {
          paddingHorizontal: 16,

          position: 'relative',

          flex: 1,
        },
        headerContainer: {
          paddingHorizontal: 16,
        },

        button: {
          height: 48,

          flexDirection: 'row',
          alignItems: 'center',

          backgroundColor: pallete.input.background.light,

          borderWidth: 1,
          borderColor: pallete.input.border.light,

          borderRadius: 8,

          paddingHorizontal: 12,
          paddingRight: 14,

          marginTop: 16,
          marginBottom: 14,
        },
      }),
    [pallete],
  );

  return {
    styles,
    iconColor: pallete.icon.default as string,
  };
};
