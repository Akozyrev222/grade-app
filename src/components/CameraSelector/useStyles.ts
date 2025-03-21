import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: 164,
          backgroundColor: pallete.background.light,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,

          justifyContent: 'center',
        },

        content: {
          paddingVertical: 20,
          paddingHorizontal: 16,
        },
        button: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 32,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
