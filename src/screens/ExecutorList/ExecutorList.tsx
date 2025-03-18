import {Back} from '@/assets';
import {roleSelectors} from '@/bus/role';
import {
  DebounceField,
  ExecutorCard,
  Loader,
  PopUpButton,
  Refresh,
  Text,
  WarningModal,
} from '@/components';
import {useScrollDirection} from '@/hooks';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {HomeStackParamList} from '@/navigation/HomeNavigator';
import {store} from '@/store';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {useData} from './useData';
import {useStyles} from './useStyles';
import {Executor, executorActions} from '@/bus/executor';
import {useDispatch} from 'react-redux';

type TProps = StackScreenProps<HomeStackParamList, Routes.EXECUTOR_LIST>;

export const ExecutorList: FC<TProps> = ({navigation, route}) => {
  const {styles, iconColor} = useStyles();
  const dispatch = useDispatch();

  const {
    executors,
    isLoading,
    isShowFilter,
    setIsShowFilter,
    onSearch,
    search,
    category,
    onLoad,
    isRefresh,
    onRefresh,
    isOpened,
    setIsOpened,
    user,
    hasMore,
  } = useData();

  const {direction, onScrollEnd, onScrollStart} = useScrollDirection();
  const ref = useRef<TextInput>(null);
  // const [updExec, setUpdExec] = useState<Executor.Item[]>([]);

  const {t} = useTranslation();
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && isLoading ? <Loader height={200} /> : null;
  }, [isFocused]);

  useEffect(() => {
    if (direction === 'bottom') {
      setIsShowFilter(true);
    }
    if (direction === 'top') {
      setIsShowFilter(false);
    }
  }, [direction]);

  useFocusEffect(
    useCallback(() => {
      const role = roleSelectors.getRole(store.getState());
      if (role !== 'customer') {
        navigation.navigate(Routes.HOME_LIST);
      }
    }, []),
  );

  useEffect(() => {
    if (route.params?.focus) {
      setTimeout(() => ref.current?.focus(), 200);
    }
  }, [route.params?.focus]);
  return (
    <GradientLayout>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.6}
          onPress={navigation.goBack}>
          <Back fill={iconColor} size={12} />
          <Text family="medium" margin={{left: 4}}>
            {t('header.back')}
          </Text>
        </TouchableOpacity>
        <DebounceField
          margin={{left: 16, right: 5}}
          wrapperStyles={{flex: 1}}
          blurColor="light"
          focusedColor="light"
          value={search}
          callback={onSearch}
          clearCallback={() => onSearch('')}
          customRef={ref}
          error={undefined}
          placeholder={t('home.what_we_search')}
          errorEmpty={true}
        />
        <PopUpButton
          style={{right: -5}}
          isShow
          isStatic
          onPress={() => {
            navigation.navigate(Routes.FILTER, {parent: 'EXECUTOR_LIST'});
          }}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
          }
          onEndReached={onLoad}
          onScrollEndDrag={onScrollEnd}
          onScrollBeginDrag={onScrollStart}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={isLoading ? <Loader height={200} /> : null}
          data={executors}
          renderItem={({item, index}) => {
            return (
              <>
                <ExecutorCard
                  executor={item}
                  onPress={() =>
                    user
                      ? navigation.navigate(Routes.EXECUTOR_DETAIL, {
                          id: item.id,
                        })
                      : setIsOpened(true)
                  }
                />
                {index === executors.length - 1 &&
                  executors.length > 8 &&
                  hasMore && (
                    <Loader
                      style={{position: 'relative', bottom: 12, padding: 10}}
                    />
                  )}
              </>
            );
          }}
          keyExtractor={(item, i) => `executor-${item.id}`}
        />
      </View>

      <WarningModal
        forLogged
        visible={isOpened}
        onClose={() => setIsOpened(false)}
        renderTitle={<Text size={16}>{t('logged_modal.title')}</Text>}
        handleSubmit={() => {
          setIsOpened(false);
          setTimeout(() => {
            navigation.navigate(Routes.AUTH);
          }, 50);
        }}
      />
    </GradientLayout>
  );
};
