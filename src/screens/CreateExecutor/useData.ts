import {uiSelectors} from '@/bus/ui';
import {User, userActions, userSelectors} from '@/bus/user';
import {yupResolver} from '@hookform/resolvers/yup';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {schema} from './validate';
import { filterActions } from '@/bus/filter';

export const useData = () => {
  const dispatch = useDispatch();

  const specializationData = useSelector(userSelectors.getSpecialization);
  const [specializationString, setSpecializationString] = useState('');
  const isLoading = useSelector(uiSelectors.getLoading('user'));

  useEffect(() => {
    if (specializationData?.length > 0) {
      setSpecializationString(
        specializationData.map((item) => item.name).join(', '),
      );
    } else {
      setSpecializationString('');
    }
  }, [specializationData]);

  const {control, handleSubmit, setValue} = useForm<User.CreateExecutorForm>({
    defaultValues: {
      specialities: [],
      tags_array: [],
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (specializationData) {
      setValue('specialities', specializationData);
    }
  }, [specializationData]);

  const onSubmit = (data: User.CreateExecutorForm) => {
    dispatch(filterActions.clearDistance({role: 'executor'}));
    dispatch(
      userActions.createExecutorAsync({
        executor_attributes: {
          speciality_ids: specializationData.map((item) => item.id),
          tags_array: data.tags_array.map(({name}) => name) || [],
        },
      }),
    );
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    control,
    isLoading,
    specializationData,
    specializationString,
  };
};
