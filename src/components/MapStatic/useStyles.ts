import {StyleSheet} from 'react-native';
import {useMemo} from 'react';
import {useTheme} from '@/hooks';
export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: 64,
          width: 64,
          borderRadius: 8,

          overflow: 'hidden',
        },
        content: {
          flex: 1,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.dark as string};
};
