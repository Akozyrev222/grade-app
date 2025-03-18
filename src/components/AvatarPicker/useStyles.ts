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
        },
        editButtonWrapper: {
          height: 10,
          width: 10,
          position: 'absolute',
          top: 4,
          right: 4,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 200,
        },
        editButton: {
          borderRadius: 36,
          height: 18,
          width: 18,
          top: 4,
          right: 4,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: pallete.background.blur,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
