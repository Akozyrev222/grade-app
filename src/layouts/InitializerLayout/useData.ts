import {appActions, appSelectors} from '@/bus/app';
import {roleSelectors} from '@/bus/role';
import {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';

export const useData = () => {
  const dispatch = useDispatch();

  const initialized = useSelector(appSelectors.getInitialize);

  const role = useSelector(roleSelectors.getRole);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!initialized && !isReady) {
      dispatch(appActions.bootstrapAsync());
      setTimeout(() => {
        setIsReady(true);
      }, 2000);
    } else {
      if (isReady && initialized) {
        SplashScreen.hide();
      }
    }
  }, [initialized, isReady]);

  useEffect(() => {
    if (role && initialized) {
      dispatch(appActions.bootstrapAsync());
      setTimeout(() => {
        setIsReady(true);
      }, 2000);
    }
  }, [role]);

  return {
    initialized: initialized && isReady,
  };
};
