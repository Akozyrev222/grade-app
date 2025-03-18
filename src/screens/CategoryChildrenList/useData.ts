import {Category, categoryActions} from '@/bus/category';
import {Filter, filterActions, filterSelectors} from '@/bus/filter';
import {uiSelectors} from '@/bus/ui';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

type TArgs = {
  category: Category.Item;
};

export const useData = ({category}: TArgs) => {
  const dispatch = useDispatch();

  const specializations = useSelector(filterSelectors.getSpecializations);

  const isLoading = useSelector(uiSelectors.getLoading('specialization'));

  const filter = useSelector(filterSelectors.getDetail);

  const [isRefresh, setIsRefresh] = useState(false);

  const onBootstrap = useCallback(() => {
    dispatch(
      filterActions.fetchSpecializationAsync({
        category_id: category.id,
      }),
    );
  }, [category.id]);

  useEffect(() => {
    onBootstrap();
  }, [onBootstrap]);

  const onChangeSpeciality = useCallback(
    (specialization: Filter.Specialization[]) => {
      if (filter) {
        dispatch(
          filterActions.saveDetail({
            ...filter,
            specialization,
          }),
        );
      } else {
        dispatch(
          filterActions.saveDetail({
            distance: null,
            tags: [],
            specialization,
          }),
        );
      }

      dispatch(categoryActions.saveDetail(category));
    },
    [filter, category],
  );

  useEffect(() => {
    if (isRefresh && !isLoading) {
      setIsRefresh(false);
    }
  }, [isLoading, isRefresh]);

  const onRefresh = useCallback(() => {
    dispatch(
      filterActions.fetchSpecializationAsync({
        category_id: category.id,
      }),
    );
    setIsRefresh(true);
  }, [category.id]);

  return {
    specializations,
    isLoading,
    onChangeSpeciality,
    isRefresh,
    onRefresh,
  };
};
