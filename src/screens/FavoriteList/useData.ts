import {Favorite, favoriteActions, favoriteSelectors} from '@/bus/favorite';
import {useDebounce, useFetchList} from '@/hooks';
import {useEffect, useMemo, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const useData = () => {
  const dispatch = useDispatch();

  const items = useSelector(favoriteSelectors.getItems);

  const [isDistance, setIsDistance] = useState(false);

  const [value, setValue] = useState('');
  const search = useDebounce(value);

  const params = useMemo(
    () => ({
      by_distance: isDistance,
      search,
    }),
    [isDistance, search],
  );

  const {isLoading, isRefresh, onBootstrap, onRefresh} =
    useFetchList<Favorite.ReqFetchItems>({
      fetcher: (params) =>
        favoriteActions.fetchItemsAsync({
          by_distance: params.by_distance,
          search: params.search,
        }),
      getCurrentPage: () => 1,
      getHasMore: () => false,
      loader: 'favorite',
      params,
    });

  useEffect(() => {
    onBootstrap(1);
  }, [onBootstrap]);

  const onRemove = useCallback((id: number) => {
    dispatch(favoriteActions.removeItemAsync({id}));
  }, []);

  return {
    isLoading,
    isRefresh,
    onRefresh,
    items,
    setIsDistance,
    isDistance,
    setValue,
    value,
    onRemove,
  };
};
