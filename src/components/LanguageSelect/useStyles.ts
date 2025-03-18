import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        optionsContainer: {
          marginTop: 26,
          width: 100,
          padding: 4,
          alignItems: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        optionsWrapper: {
          flexDirection: 'row',
          flexWrap: 'wrap',
        },
        optionWrapper: {
          width: 45,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        triggerWrapper: {
          width: 60,
          alignItems: 'center',
        },
      }),
    [pallete],
  );

  return {styles};
};
