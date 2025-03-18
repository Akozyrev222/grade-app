import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useStyles = () => {
  const {pallete} = useTheme();

  const {top} = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          justifyContent: 'center',
          // flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingHorizontal: 16,
          // backgroundColor: 'green',
        },
        header: {
          marginTop: top,
        },
        container: {
          paddingTop: 32,
          paddingHorizontal: 16,

          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        item: {
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        itemWrapper: {
          flexGrow: 1,
          flexShrink: 0,
          width: '38%',
          alignItems: 'center',

          marginBottom: 22,
        },
        image: {
          borderRadius: 5,

          resizeMode: 'contain',
        },
        text: {
          fontSize: 16,
          textAlign: 'center',
          color: pallete.text.default,
        },
      }),
    [pallete],
  );

  return {styles};
};
