import {Filter, filterActions, filterSelectors} from '@/bus/filter';
import {Executor, executorActions, executorSelectors} from '@/bus/executor';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {categorySelectors} from '@/bus/category';
import {useFetchList} from '@/hooks';
import {userSelectors} from '@/bus/user';
import {roleSelectors} from '@/bus/role';

export const useData = () => {
  const dispatch = useDispatch();
  const role = useSelector(roleSelectors.getRole);

  const executors = useSelector(executorSelectors.getItems);
  const filter = useSelector(filterSelectors.getDetail);
  const category = useSelector(categorySelectors.getDETAIL);
  const hasMore = useSelector(executorSelectors.getHasMore);
  const user = useSelector(userSelectors.getDetail);

  const [tmpFilter, setTmpFilter] = useState<Filter.Item>(filter);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const [isOpened, setIsOpened] = useState(false);

  const search = useSelector(filterSelectors.getSearch);

  const params = useMemo(
    () => ({
      distance_id: tmpFilter.distance?.id || null,
      speciality_ids: tmpFilter.specialization?.map((item) => item.id) || [],
      tags: tmpFilter.tags.map(({name}) => name),
      search: search || null,
    }),
    [tmpFilter, search],
  );

  useEffect(() => {
    setTmpFilter(filter);
  }, [filter]);

  const {onBootstrap, onLoad, onRefresh, isLoading, isRefresh} =
    useFetchList<Executor.FetchItemsParams>({
      fetcher: executorActions.fetchItemsAsync,
      loader: 'executor',
      getCurrentPage: executorSelectors.getCurrentPage,
      getHasMore: executorSelectors.getHasMore,
      params,
    });

  useEffect(() => {
    onBootstrap(1);
  }, [onBootstrap]);

  useEffect(() => {
    return () => {
      dispatch(filterActions.updateSearch(''));
    };
  }, []);

  useEffect(() => {
    if (filter.distance || filter.specialization || filter.tags.length) {
      if (filter.distance?.id !== tmpFilter.distance?.id) {
        setTmpFilter(filter);
      } else {
        let check = false;
        filter.tags.forEach((item) => {
          const index = tmpFilter.tags.findIndex(
            ({name}) => name === item.name,
          );
          if (index === -1) {
            check = true;
          }
        });

        if (check || !filter.tags.length) {
          setTmpFilter(filter);
        }
      }
    }
  }, [filter, tmpFilter]);

  const onSearch = useCallback(
    (value) => {
      if (value !== search && value.length > 2) {
        dispatch(filterActions.updateSearch(value));
        dispatch(filterActions.clearDetail({role}));
      }

      if (!value && search) {
        dispatch(filterActions.updateSearch(''));
      }
    },
    [search, category],
  );
  const executorsData = useMemo(
    () => executors.filter(({id}) => id !== user?.id),
    [user, executors],
  );

  return {
    executors: executorsData,
    isLoading,
    isShowFilter,
    setIsShowFilter,
    onSearch,
    search,
    category,
    onLoad,
    onRefresh,
    isRefresh,
    isOpened,
    setIsOpened,
    user,
    hasMore,
  };
};
