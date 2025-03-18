import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          position: 'relative',
          backgroundColor: pallete.background.blur,

          marginTop: 12,

          borderRadius: 8,

          marginHorizontal: 16,
          paddingTop: 8,
        },
        container: {
          paddingHorizontal: 16,
        },
        content: {
          overflow: 'hidden',
        },
        reviews: {
          marginTop: 10,
        },
        badge: {
          position: 'absolute',
          top: -12,
          right: -12,

          height: 22,
          width: 22,

          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: pallete.background.action,

          borderRadius: 24,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        footer: {
          marginTop: 8,

          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
