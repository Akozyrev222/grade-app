import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        socialNetworksBtn: {
          flexDirection: 'row',
          paddingLeft: '20%',
          alignItems: 'center',
          height: 48,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#17264B',
          marginBottom: 8,
        },
        socialNetworksText: {
          marginLeft: 12,
        },
      }),
    [pallete],
  );

  return {styles};
};
