import {filterActions, filterSelectors} from '@/bus/filter';
import {authSelectors} from '@/bus/auth';
import {categoryActions, categorySelectors} from '@/bus/category';
import {uiSelectors} from '@/bus/ui';
import {userSelectors} from '@/bus/user';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce, usePushNotification} from '@/hooks';
import {currenciesActions} from '@/bus/currencies';

export const useData = () => {
  const dispatch = useDispatch();

  const user = useSelector(userSelectors.getDetail);
  const categories = useSelector(categorySelectors.getItems);
  const isLoading = useSelector(uiSelectors.getLoading('category'));
  const name = useSelector(categorySelectors.getName);

  const search = useSelector(filterSelectors.getSearch);
  const [value, setValue] = useState(search);

  const debounce = useDebounce(value);

  const [isRefresh, setIsRefresh] = useState(false);

  const onBootstrap = useCallback(() => {
    dispatch(
      categoryActions.fetchItemsAsync({
        name: '',
      }),
    );
  }, []);

  useEffect(() => {
    onBootstrap();
  }, [onBootstrap]);

  useEffect(() => {
    if (isRefresh && !isLoading) {
      setIsRefresh(false);
    }
  }, [isLoading, isRefresh]);

  const onRefresh = useCallback(() => {
    dispatch(
      categoryActions.fetchItemsAsync({
        name,
      }),
    );

    setIsRefresh(true);
  }, [name]);

  const onSearch = useCallback((value: string) => {
    setValue('');
    dispatch(filterActions.updateSearch(value));
  }, []);

  useEffect(() => {
    dispatch(currenciesActions.fetchItemsAsync());
  }, []);

  return {
    isLoading,
    user,
    categories,
    onRefresh,
    isRefresh,
    onSearch,
    value,
    debounce,
    setValue,
  };
};
