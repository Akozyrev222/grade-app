import {Ui, uiSelectors} from '@/bus/ui';
import {RootState} from '@/store/rootReducer';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type TSelector<R = number> = (state: RootState) => R;

type TPaginationParams = {
  page: number;
  per: number;
};

type TArgs<P = {}> = {
  loader: Ui.FormName;

  fetcher: (params: TPaginationParams & P) => any;

  getHasMore: TSelector<boolean>;
  getCurrentPage: TSelector;

  params: P;
  per?: number;
};

const PER = 30;

export const useFetchList = <P>({
  fetcher,
  getCurrentPage,
  getHasMore,
  loader,
  per = PER,
  params,
}: TArgs<P>) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(uiSelectors.getLoading(loader));
  const page = useSelector(getCurrentPage);
  const hasMore = useSelector(getHasMore);

  const [isRefresh, setIsRefresh] = useState(false);

  const onBootstrap = useCallback(
    (page: number) => {
      dispatch(
        fetcher({
          ...params,
          per: per,
          page,
        }),
      );
    },
    [per, params],
  );

  const onLoad = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(
        fetcher({
          ...params,
          per: per,
          page: page + 1,
        }),
      );
    }
  }, [params, page, hasMore, isLoading]);

  const onRefresh = useCallback(() => {
    if (!isRefresh) {
      onBootstrap(page);

      setIsRefresh(true);
    }
  }, [isRefresh, page, onBootstrap]);

  useEffect(() => {
    if (isRefresh && !isLoading) {
      setIsRefresh(false);
    }
  }, [isLoading, isRefresh]);

  return {
    onLoad,
    onBootstrap,
    onRefresh,

    isLoading,
    isRefresh,
  };
};
