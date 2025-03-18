import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete, fonts} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          //flex: 1,
          width: '100%',
          backgroundColor: pallete.background.white,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute', 
          bottom: 0
        },
        viewWrapper: {
          flex: 1,
          width: '100%',
          backgroundColor: pallete.background.white,
          justifyContent: 'center',
          alignItems: 'center',
        },
        wrapper: {
          width: Dimensions.get('window').width - 6,
          color: pallete.text.default,
          backgroundColor: pallete.background.light,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          padding: 24,
          justifyContent: 'flex-start',
          position: 'absolute',
          bottom: 0,
        },
        content: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
        },
        input: {
          fontFamily: fonts['regular'],
          width: '100%',
          height: 48,
          backgroundColor: pallete.input.background.light_gray,
          borderRadius: 10,
          padding: 12,
          marginBottom: 10,
          color: pallete.text.gray,
        },
        inputWrapper: {
          marginBottom: 14,
        },
        loader: {
          position: 'absolute',
          alignSelf: 'center',
          top: 58,
        },
      }),
    [pallete],
  );

  return {styles, placeholderColors: pallete.text.gray as string};
};
