import {applicationActions, applicationSelectors} from '@/bus/application';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes} from '@/navigation';

export const useDataModal = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onCloseTabBarModal = useCallback(() => {
    navigation.navigate(Routes.AUTH_NEW, {
      screen: Routes.SIGN_UP_END,
    });
  }, []);

  return {
    onCloseTabBarModal,
  };
};
