import {appActions} from '@/bus/app';
import {executorActions, executorSelectors} from '@/bus/executor';
import {favoriteActions} from '@/bus/favorite';
import {roomActions} from '@/bus/room';
import {uiActions, uiSelectors} from '@/bus/ui';
import {useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type TArgs = {
  id: number;
};

export const useData = ({id}: TArgs) => {
  const dispatch = useDispatch();

  const detail = useSelector(executorSelectors.getDetail);
  const isLoading = useSelector(uiSelectors.getLoading('executor'));
  const isLoadingFavorite = useSelector(uiSelectors.getLoading('favorite'));

  const [isInfo, setIsInfo] = useState(true);
  const [isRefresh, setIsRefresh] = useState(true);

  const isFocused = useIsFocused();

  const onCall = useCallback(() => {
    if (detail) {
      dispatch(uiActions.openLink(`tel:${detail.phone}`));
    }
  }, [detail]);

  useEffect(() => {
    dispatch(appActions.toggleTabBar(!isFocused));
  }, [isFocused]);

  const onBootstrap = useCallback(() => {
    if (id) {
      dispatch(executorActions.fetchDetailAsync({id}));
    }
  }, [id]);

  useEffect(() => {
    onBootstrap();
  }, [onBootstrap]);

  const onRefresh = useCallback(() => {
    if (id) {
      dispatch(executorActions.fetchDetailAsync({id}));

      setIsRefresh(true);
    }
  }, [id]);

  useEffect(() => {
    if (isRefresh && !isLoading) {
      setIsRefresh(false);
    }
  }, [isLoading, isRefresh]);

  const onCreateRoom = useCallback(() => {
    if (detail) {
      setTimeout(() => {
        dispatch(
          roomActions.createItemAsync({
            executor_id: detail.id,
          }),
        );
      }, 1000);
    }
  }, [detail]);

  const onToggleFavorite = useCallback(() => {
    if (detail) {
      if (detail.favorite) {
        dispatch(favoriteActions.removeItemAsync({id: detail.id}));
      } else {
        dispatch(favoriteActions.createItemAsync({id: detail.id}));
        setIsRefresh(true);
      }
    }
  }, [detail]);

  return {
    detail,
    isInfo,
    setIsInfo,
    onCall,
    isLoading,
    isRefresh,
    onRefresh,
    onCreateRoom,
    onToggleFavorite,
    isLoadingFavorite,
  };
};
