import {Filter, filterActions, filterSelectors} from '@/bus/filter';
import {roleSelectors} from '@/bus/role';
import {uiSelectors} from '@/bus/ui';
import {userSelectors} from '@/bus/user';
import {VIP} from '@/constants';
import {extractVipName} from '@/helpers';
import {useCallback, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

export const useData = () => {
    const dispatch = useDispatch();

    const distances = useSelector(filterSelectors.getAccessible());
    const role = useSelector(roleSelectors.getRole);
    const specializationData = useSelector(filterSelectors.getSpecialization);

    const user = useSelector(userSelectors.getDetail);

    const filter = useSelector(filterSelectors.getDetail);
    const [neededStatus, setNeededStatus] = useState<keyof typeof VIP>('default');

    const [isOpened, setIsOpened] = useState(false);

    const isLoading = useSelector(uiSelectors.getLoading('distance'));

    const onBootstrap = useCallback(() => {
        dispatch(filterActions.fetchDistancesAsync());
    }, []);

    useEffect(() => {
        onBootstrap();
    }, [onBootstrap]);

    const {watch, setValue, handleSubmit, reset} = useForm<Filter.Item>({
        defaultValues: {
            distance: filter.distance || null,
            specialization: filter.specialization,
            tags: filter.tags,
        },
    });

    useEffect(() => {
        reset({
            distance: filter.distance || null,
            specialization: filter.specialization,
            tags: filter.tags,
        });
    }, [filter]);

    const distance = watch('distance');
    const specialization = watch('specialization');
    const tags = watch('tags');

    useEffect(() => {
        setValue('specialization', specializationData);
    }, [specializationData]);

    const onCreateTag = useCallback(
        (name) => {
            setValue('tags', [...tags, {name, id: new Date().getMilliseconds()}]);
        },
        [tags],
    );

    const onRemoveTag = useCallback(
        (id: number) => {
            setValue(
                'tags',
                tags.filter((tag) => tag.id !== id),
            );
        },
        [tags],
    );

    const onChangeDistance = useCallback((distance: Filter.Distance) => {
        setValue('distance', distance);
    }, []);

    const onReset = useCallback(() => {
        dispatch(filterActions.clearDetail({role}));
    }, []);

    const onSubmit = (data: Filter.Item) => {
        dispatch(filterActions.saveDetail(data));
    };

    const onSaveTmpDetail = useCallback(() => {
        dispatch(
            filterActions.saveTmpDetai({
                distance,
                tags,
                specialization,
            }),
        );
    }, [tags, specialization, distance]);

    const onOpenModal = useCallback(
        (item: Filter.Distance) => {
            /*if (role === 'executor' && VIP[user.executor.vip] < item.value) {
              const name = extractVipName(item.value);

              setIsOpened(true);
              setNeededStatus(name);
            } else {*/
            onChangeDistance(item as any);
            /* }*/
        },
        [user, role],
    );

    return {
        distances,
        isLoading,
        distance,
        onRemoveTag,
        onCreateTag,
        tags,
        specialization,
        onReset,
        handleSubmit: handleSubmit(onSubmit),
        onSaveTmpDetail,
        role,
        setIsOpened,
        isOpened,
        neededStatus,
        onOpenModal,
        user,
        filter,
    };
};
