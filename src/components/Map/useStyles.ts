import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: 256,
          borderRadius: 8,
          overflow: 'hidden',
        },
        content: {
          flex: 1,
        },
      }),
    [pallete],
  );

  return {styles};
};
