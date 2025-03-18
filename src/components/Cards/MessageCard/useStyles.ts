import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          alignItems: 'center',

          marginBottom: 12,
        },
        content: {
          padding: 12,
          marginHorizontal: 12,

          borderRadius: 16,
          borderBottomLeftRadius: 0,

          backgroundColor: pallete.background.blue,

          maxWidth: Dimensions.get('screen').width * 0.8,

          position: 'relative',
        },
        currentUser: {
          backgroundColor: pallete.background.actionBlur,
          borderBottomLeftRadius: 16,

          borderBottomRightRadius: 0,
        },

        cloudRight: {
          position: 'absolute',
          left: -7,
          bottom: 0,
        },
        cloudLeft: {
          position: 'absolute',
          right: -7,

          bottom: 0,
        },

        images: {
          flexDirection: 'row',
          flexWrap: 'wrap',

          marginBottom: 8,
        },
        image: {
          borderRadius: 16,
          marginRight: 8,
          marginBottom: 8,
        },
      }),
    [pallete],
  );

  return {
    styles,
    currentColor: pallete.background.actionBlur as string,
    notCurrentColor: pallete.background.blue as string,
  };
};
