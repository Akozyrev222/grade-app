import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: 88,

          marginBottom: 16,

          backgroundColor: pallete.background.blur,

          borderRadius: 8,

          padding: 12,

          flexDirection: 'row',
        },

        content: {
          flex: 1,

          marginLeft: 12,

          justifyContent: 'space-between',
        },

        header: {
          flexDirection: 'row',
          alignItems: 'center',

          marginTop: -4,
        },
        footer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
