import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          minHeight: 122,

          backgroundColor: pallete.background.blur,

          borderRadius: 12,

          marginTop: 8,
          padding: 16,
        },
        content: {
          flex: 1,
          marginRight: 4,

          textAlignVertical: 'center',
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        mainInfo: {
          flex: 1,
          justifyContent: 'space-around',

          marginLeft: 8,
          marginRight: 8,
        },
        footer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',

          marginTop: 12,
        },
        badge: {
          position: 'absolute',
          top: 4,
          right: 4,

          height: 16,
          width: 16,

          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: pallete.background.action,

          borderRadius: 16,
        },
      }),
    [pallete],
  );

  return {styles};
};
