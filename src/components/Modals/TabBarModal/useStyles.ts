import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlayView: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        },
        overlay: {
          flex: 1,
          width: '100%',
          backgroundColor: '#00000040',
          justifyContent: 'center',
          alignItems: 'center',
        },
        wrapper: {
          width: Dimensions.get('window').width - 64,
          height: 145,
          backgroundColor: pallete.background.light,
          borderRadius: 8,
          padding: 20,
          justifyContent: 'space-between',
        },
        text: {fontSize: 16, color: '#272727'},
        content: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        footer: {
          flexDirection: 'row',

          justifyContent: 'space-between',
        },

        button: {
          width: '100%',
        },
      }),
    [pallete],
  );

  return {styles};
};
