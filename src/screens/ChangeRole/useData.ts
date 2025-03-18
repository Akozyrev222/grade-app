import {Role, roleActions} from '@/bus/role';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authActions} from './../../bus/auth/slice';
import {userSelectors} from '@/bus/user';
import AsyncStorage from '@react-native-community/async-storage';
import {filterActions, filterSelectors} from '@/bus/filter';

export const useData = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.getDetail);
  const distances = useSelector(filterSelectors.getDistances);

  const onChangeRole = useCallback((role: Role.Item) => {
    let distance;
    if (role === 'executor') {
      distance = distances[2];
    } else {
      distance = distances[6];
    }
    dispatch(roleActions.updateItemAsync(role));
    dispatch(filterActions.saveDetailDistance(distance));
  }, []);

  const onLogout = useCallback(async () => {
    if (user) {
      await AsyncStorage.removeItem('ROLE');
      dispatch(roleActions.saveRole(null));
      dispatch(authActions.logoutAsync());
    }
  }, [user]);

  return {onChangeRole, onLogout};
};
