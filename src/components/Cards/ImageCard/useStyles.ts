import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

type TArgs = {
  koef: number;
};

export const useStyles = ({koef}: TArgs) => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        removeWrapper: {
          position: 'absolute',
          top: 0,
          right: 0,

          backgroundColor: pallete.background.dark,
          borderColor: pallete.border.light,
          borderWidth: 1,

          height: 18,
          width: 18,

          borderRadius: 24,

          justifyContent: 'center',
          alignItems: 'center',

          zIndex: 2,
        },
        wrapper: {
          position: 'relative',

          height: Dimensions.get('window').width / koef - 38,
          width: Dimensions.get('window').width / koef - 38,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        },
        image: {
          height: Dimensions.get('window').width / koef - 44,
          width: Dimensions.get('window').width / koef - 44,

          borderRadius: 8,
        },
      }),
    [pallete, koef],
  );

  return {styles, iconColor: pallete.icon.light as string};
};
