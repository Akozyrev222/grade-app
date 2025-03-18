import {applicationActions, applicationSelectors} from '@/bus/application';
import {useFetchList} from '@/hooks';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useData = () => {
  const dispatch = useDispatch();

  const aplications = useSelector(applicationSelectors.getItems);

  const params = useMemo(() => ({}), []);

  const {isLoading, isRefresh, onBootstrap, onLoad, onRefresh} = useFetchList({
    fetcher: applicationActions.fetchItemsAsync,
    getCurrentPage: applicationSelectors.getPage,
    getHasMore: applicationSelectors.getHasMore,
    loader: 'application',
    params,
  });

  useEffect(() => {
    onBootstrap(1);
  }, [onBootstrap]);

  return {aplications, isLoading, onLoad, onRefresh, isRefresh};
};
