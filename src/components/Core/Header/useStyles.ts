import {useTheme} from '@/hooks';
import {useMemo} from 'react';
import {Dimensions, StatusBar, StyleSheet} from 'react-native';

export const useStyles = () => {
  const {pallete} = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginTop: (StatusBar.currentHeight || 0) + 22,
          paddingBottom: 16,

          position: 'relative',
        },
        title: {
          flexGrow: 1,
          flexShrink: 1,

          height: 32,

          position: 'absolute',
          right: 0,
          left: 0,

          zIndex: 1,
        },
        leftIconWrapper: {
          flexShrink: 0,

          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,

          height: 24,
          flex: 1,

          // width: Dimensions.get('window').width / 3 - 12,

          justifyContent: 'flex-start',
        },
        rightIconWrapper: {
          flexShrink: 0,
          marginLeft: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',

          zIndex: 2,

          // width: Dimensions.get('window').width / 3 - 12,
          height: 24,
        },
        helping: {
          flexDirection: 'row',
          alignItems: 'center',

          height: 30,

          backgroundColor: `${pallete.background.light as string}80`,
          // opacity: 0.5,
          borderRadius: 8,
          padding: 4,
          paddingHorizontal: 8,
        },
      }),
    [pallete],
  );

  return {styles, iconColor: pallete.icon.default as string};
};
