import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
export const useBackButton = (callback: () => boolean) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', callback);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', callback);
    }

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', callback);
    };
  }, [isFocused]);
};
