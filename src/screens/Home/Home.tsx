import React, {FC} from 'react';

import {Text, Avatar, CategoryCard, Loader, Refresh} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {HomeStackParamList} from '@/navigation/HomeNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';

import {FlatList, TouchableOpacity, View} from 'react-native';
import {useData} from './useData';
import {useStyles} from './useStyles';

import {SearchTabBar} from '@/assets';

import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = StackScreenProps<HomeStackParamList, Routes.HOME_LIST>;

export const Home: FC<TProps> = ({navigation}) => {
  const {isLoading, user, categories, isRefresh, onRefresh} = useData();
  const {styles, iconColor} = useStyles();

  const {t} = useTranslation();

  const urlMode = useSelector(linkSelectors.getLink);

  return (
    <GradientLayout>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.subtitle}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {t('home.hello')}
            </Text>
            <Text
              family="bold"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{flex: 1}}>
              {user?.full_name || t('home.not_authorize')}
            </Text>
          </View>
          <Avatar
            margin={{left: 16}}
            url={user?.avatar && `${urlMode}${user.avatar.normal.url}`}
            variant="circle"
            size="small"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(Routes.EXECUTOR_LIST, {focus: true, value: ''})
          }
          activeOpacity={0.6}>
          <SearchTabBar fill={iconColor} size={18} isFocused={false} />
          <Text style={{flex: 1}} color="gray" margin={{left: 4}}>
            {t('home.what_we_search')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          renderItem={({item}) => (
            <CategoryCard
              category={item}
              onPress={() =>
                navigation.navigate(Routes.CATEGORY_CHILDREN_LIST, {
                  category: item,
                })
              }
            />
          )}
          refreshControl={
            <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
          }
          keyExtractor={(item) => `category-${item.id}`}
          ListEmptyComponent={
            isLoading && !isRefresh ? <Loader height={200} /> : null
          }
        />
      </View>
    </GradientLayout>
  );
};
