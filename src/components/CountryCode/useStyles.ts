import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        optionsContainer: {
          marginTop: 26,
          width: Dimensions.get('window').width - 12 * 2 - 36 * 2,
          padding: 4,
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        optionsWrapper: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        optionWrapper: {
          height: 30,
          width: (Dimensions.get('window').width - 12 * 2 - 36 * 2) / 4 - 8,
          marginVertical: 2,
          paddingHorizontal: 2,
        },
      }),
    [pallete],
  );

  return {styles};
};
