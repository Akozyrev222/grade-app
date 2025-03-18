import {Close} from '@/assets';
import {IconButton, Loader, MenuCard, Refresh, Text} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {HomeStackParamList} from '@/navigation/HomeNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {View, FlatList} from 'react-native';
import {useData} from './useData';

import {useStyles} from './useStyles';

type TProps = StackScreenProps<
  HomeStackParamList,
  Routes.CATEGORY_CHILDREN_LIST
>;

export const CategoryChildrenList: FC<TProps> = ({navigation, route}) => {
  const {category} = route.params;

  const {isLoading, specializations, onChangeSpeciality, isRefresh, onRefresh} =
    useData({
      category,
    });
  const {styles, iconColor} = useStyles();

  return (
    <GradientLayout>
      <View style={styles.header}>
        <Text size={14} family="medium">
          {category.title}
        </Text>

        <IconButton size={32} onPress={() => navigation.goBack()}>
          <Close fill={iconColor} size={16} />
        </IconButton>
      </View>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={specializations}
          ListEmptyComponent={
            isLoading && !isRefresh ? <Loader height={200} /> : null
          }
          renderItem={({item}) => (
            <MenuCard
              item={{title: item.name}}
              onPress={() => {
                onChangeSpeciality([item]);
                navigation.navigate(Routes.EXECUTOR_LIST, {value: ''});
              }}
            />
          )}
        />
      </View>
    </GradientLayout>
  );
};
