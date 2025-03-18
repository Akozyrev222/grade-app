import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: pallete.background.blur,
          padding: 16,
          borderRadius: 8,
          marginTop: 8,
        },
        activeCard: {
          backgroundColor: pallete.background.light_gray,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        title: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        text: {
          marginTop: 8,
        },
        boldText: {
          fontWeight: 'bold',
        },
        button: {
          alignSelf: 'flex-end',
          width: 80,
          height: 32,
          borderRadius: 9,
        },
        footer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles};
};
