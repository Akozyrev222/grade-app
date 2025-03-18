import {Header, Loader, OrderCard, Refresh} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {ApplicationStackParamList} from '@/navigation/ApplicationNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {FlatList, RefreshControl, View} from 'react-native';
import {useData} from './useData';
import {useStyles} from './useStyles';

type TProps = StackScreenProps<
  ApplicationStackParamList,
  Routes.APPLICATION_LIST
>;

export const ApplicationList: FC<TProps> = ({navigation}) => {
  const {styles} = useStyles();

  const {isLoading, aplications, onLoad, onRefresh, isRefresh} = useData();

  const {t} = useTranslation();

  return (
    <GradientLayout>
      <View style={styles.header}>
        <Header size={14} family="bold">
          {t('application_list.title')}
        </Header>
      </View>
      <FlatList
        ListEmptyComponent={isLoading ? <Loader height={200} /> : null}
        data={aplications}
        style={styles.container}
        refreshing={isRefresh}
        refreshControl={
          <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
        }
        renderItem={({item}) => (
          <OrderCard
            type="public"
            order={item}
            hasDistance={false}
            onPress={() =>
              navigation.navigate(Routes.ORDER_DETAIL, {id: item.id})
            }
          />
        )}
        keyExtractor={(item) => `application-${item.id}`}
      />
    </GradientLayout>
  );
};
