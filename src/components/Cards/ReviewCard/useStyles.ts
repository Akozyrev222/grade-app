import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const {width} = useWindowDimensions();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          padding: 16,

          backgroundColor: pallete.background.blur,

          minHeight: 112,

          borderRadius: 12,

          marginBottom: 12,
        },
        header: {
          flexDirection: 'row',
        },
        main: {
          flex: 1,
          justifyContent: 'space-between',

          marginLeft: 12,
          paddingVertical: 8,
        },
        rating: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        images: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        image: {
          height: width * 0.4 - 64,
          width: width * 0.4 - (72 + width * 0.01),

          marginTop: 12,
          marginRight: width * 0.01,

          borderRadius: 10,
        },
      }),
    [pallete],
  );

  return {styles, emptyColor: pallete.text.light_gray as string};
};
