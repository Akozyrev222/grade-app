import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          borderRadius: 8,

          backgroundColor: pallete.background.light_blue,

          flexDirection: 'row',

          padding: 12,

          marginHorizontal: 16,
        },
        main: {
          flex: 1,

          marginHorizontal: 8,
          paddingVertical: 2,
        },
        subInfo: {
          alignItems: 'center',
        },
        counter: {
          justifyContent: 'center',
          alignItems: 'center',

          height: 21,
          width: 21,

          borderRadius: 21,

          backgroundColor: pallete.background.action,
          marginTop: 14,
        },
        removeWrapper: {
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: pallete.background.danger,

          width: 96,

          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        },
        removeContent: {
          alignItems: 'center',
          justifyContent: 'center',

          width: 96,
          height: '100%',
        },

        images: {
          flex: 1,
          flexDirection: 'row',

          overflow: 'hidden',

          marginTop: 6,
        },
        image: {
          height: 16,
          width: 16,
          borderRadius: 4,

          marginRight: 4,
        },
      }),
    [pallete],
  );

  return {styles, lightIcon: pallete.icon.light as string};
};
