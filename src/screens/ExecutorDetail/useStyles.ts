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
        dropDown: {
          borderRadius: 10,
          backgroundColor: '#b8e0e7',
          borderWidth: 0,
        },

        container: {
          paddingHorizontal: 16,
        },
        ad: {
          marginTop: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        },
        mainInfo: {
          paddingTop: 16,

          alignItems: 'center',

          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },

        favoriteWrapper: {
          position: 'absolute',

          top: 16,
          right: 0,
        },
        tags: {
          marginTop: 12,
         // maxHeight: 70,
          flexWrap: 'wrap',
          flexDirection: 'row',
          overflow: 'hidden',

        },

        tag: {
          minHeight: 32,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 4,
          backgroundColor: pallete.background.light,

          marginRight: 4,
          marginBottom: 4,
        },

        switchers: {
          flexDirection: 'row',

          backgroundColor: pallete.background.blur,
          borderRadius: 16,

          marginTop: 16,
        },
        switcher: {
          width: Dimensions.get('window').width / 2 - 16,
        },

        reviewWrapper: {
          height: 48,

          borderRadius: 12,

          backgroundColor: pallete.background.blur,

          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          marginTop: 16,
          paddingHorizontal: 16,
          marginBottom: 16,
        },
        footer: {
          height: 85,

          backgroundColor: pallete.background.blur,

          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          paddingHorizontal: 16,
        },

        footerButton: {
          width: (Dimensions.get('screen').width - 32) * 0.48,
        },
      }),
    [pallete],
  );

  return {
    styles,
    likeColor: pallete.icon.default as string,
    unlikeColor: pallete.icon.light_blur as string,

    iconColor: pallete.icon.default as string,
  };
};
