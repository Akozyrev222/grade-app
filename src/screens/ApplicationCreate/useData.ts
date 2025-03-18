import {Application, applicationActions} from '@/bus/application';
import {currenciesSelectors} from '@/bus/currencies';
import {uiSelectors} from '@/bus/ui';
import {useCallback, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import ActionSheet from 'react-native-actions-sheet';
import {Asset} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';

type TArgs = {
  id: number;
};

export const useData = ({id}: TArgs) => {
  const dispatch = useDispatch();
  const currencies = useSelector(currenciesSelectors.getItems);
  const [activeCurrency, setActiveCurrency] = useState(currencies[0]);

  const cameraRef = useRef<ActionSheet>(null);
  const isLoading = useSelector(uiSelectors.getLoading('application'));

  const {
    control,
    setValue,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm<Application.Form>({
    defaultValues: {
      description: '',
      price: '',
      photo_attributes: [],
    },
  });

  const images = watch('photo_attributes');

  const onUpload = useCallback(
    (assets: Asset[]) => {
      setValue('photo_attributes', [...images, ...assets]);
    },
    [images],
  );

  const onSubmit = (data: Application.Form) => {
    if (id) {
      data.currency_id = activeCurrency.id;
      dispatch(
        applicationActions.createItemAsync({
          ...data,
          order_id: id,
        }),
      );
    }
  };
  const onRemoveImage = useCallback(
    (uri: string) => {
      setValue(
        'photo_attributes',
        images.filter((item) => item.uri !== uri),
      );
    },
    [images],
  );
  return {
    control,
    errors,
    onUpload,
    handleSubmit: handleSubmit(onSubmit),
    cameraRef,
    images,
    onRemoveImage,
    isLoading,
    activeCurrency,
    setActiveCurrency,
  };
};
