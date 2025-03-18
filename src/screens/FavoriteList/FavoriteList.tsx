import {EmptyIcon, SearchTabBar} from '@/assets';
import {
  Button,
  FavoriteCard,
  FilledField,
  Loader,
  Refresh,
  Text,
} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {FavoriteStackParamList} from '@/navigation/FavoriteNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, View} from 'react-native';
import {useData} from './useData';
import {useStyles} from './useStyles';
import {useFocusEffect} from '@react-navigation/native';
import {Item} from '@/bus/settings/types';

type TProps = StackScreenProps<FavoriteStackParamList, Routes.FAVORITE_LIST>;

export const FavoriteList: FC<TProps> = ({navigation}) => {
  const {styles, iconColor} = useStyles();
  const [i, setI] = useState<Item[] | undefined>();

  const {
    isLoading,
    isRefresh,
    items,
    onRefresh,
    setIsDistance,
    isDistance,
    setValue,
    value,
    onRemove,
  } = useData();
  const {t} = useTranslation();

  useFocusEffect(
    useCallback(() => {
      // onRefresh();
      setI(items);
    }, []),
  );

  return (
    <GradientLayout>
      <View style={styles.header}>
        <View style={styles.switchers}>
          <Button
            size="small"
            color={isDistance ? 'default' : 'transparent'}
            onPress={() => setIsDistance(true)}
            style={styles.switcher}>
            {t('favorite_list.sorters.by_distance')}
          </Button>
          <Button
            size="small"
            color={!isDistance ? 'default' : 'transparent'}
            onPress={() => setIsDistance(false)}
            style={styles.switcher}>
            {t('favorite_list.sorters.by_time')}
          </Button>
        </View>

        <FilledField
          error={undefined}
          errorEmpty
          margin={{top: 16}}
          style={{fontSize: 14, paddingLeft: 8}}
          blurColor="dark"
          focusedColor="dark"
          onChangeText={setValue}
          value={value}
          placeholder={t('favorite_list.placeholder')}
          leftIcon={
            <SearchTabBar size={18} fill={iconColor} isFocused={false} />
          }
        />
      </View>

      <FlatList
        refreshControl={
          <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
        }
        style={styles.container}
        data={items}
        ListEmptyComponent={
          isLoading && !isRefresh ? (
            <Loader height={200} />
          ) : (
            <View style={styles.wrapper}>
              <View style={styles.emptyWrapper}>
                <EmptyIcon color={iconColor} size={48} />
              </View>
              <Text size={14} align="center">
                {t('favorite_list.empty')}
              </Text>
            </View>
          )
        }
        renderItem={({item}) => (
          <FavoriteCard
            favorite={item}
            onPress={() =>
              navigation.navigate(Routes.EXECUTOR_DETAIL, {id: item.id})
            }
            onRemove={() => onRemove(item.id)}
          />
        )}
        keyExtractor={({id}) => `favorite-${id}`}
      />
    </GradientLayout>
  );
};
