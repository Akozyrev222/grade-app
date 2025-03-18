import {getCurrent, Routes} from '@/navigation';
import {
  useRoute,
  useFocusEffect,
  useNavigationState,
} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';

const HIDDEN_ROUTES = [
  Routes.PROFILE_LIST,
  Routes.EXECUTOR_DETAIL,
  Routes.ORDER_DETAIL,
  Routes.ORDER_USER,
  Routes.PROFILE_ORDER_DETAIL,
  Routes.PROFILE_ORDER_LIST,
  Routes.ORDER_UPDATE,
  Routes.SPECIALIZATION_LIST,
  Routes.ROOM_DETAIL,
  Routes.REVIEW_CREATE,
  Routes.CREATE_EXECUTOR,
];

export const useTabBarState = () => {
  const [route, setRoute] = useState<typeof Routes | ''>('');

  useFocusEffect(() => {
    const currentRoute = getCurrent() as any;

    if (currentRoute) {
      setRoute(currentRoute);
    }
  });

  const isShow = useMemo(() => {
    //@ts-ignore
    return !route ? true : !HIDDEN_ROUTES.includes(route);
  }, [route]);

  return {isShow};
};
