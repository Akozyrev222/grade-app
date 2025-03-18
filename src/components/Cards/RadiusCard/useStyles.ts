import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          padding: 16,
          borderRadius: 8,
          marginTop: 16,
          backgroundColor: pallete.background.blur,
        },
        disabled: {
          backgroundColor: pallete.background.white,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 8,
        },
        title: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        duration: {
          marginTop: 10,
        },
        row: {
          flexDirection: 'row',
        },
        card: {
          width: Dimensions.get('window').width - 122,
        },
        footer:{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          flexWrap: 'wrap'
        }
      }),
    [pallete],
  );

  return {styles};
};
