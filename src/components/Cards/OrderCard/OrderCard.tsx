import React, {FC} from 'react';

import {TouchableOpacity, View} from 'react-native';

import {Text} from '@/components';
import {useStyles} from './useStyles';
import {Order} from '@/bus/order';
import {useTranslation} from 'react-i18next';

type TProps = {
  onPress: () => any;
  order: Order.Item;
  hasDistance: boolean;
  type?: 'private' | 'public';
};

export const OrderCard: FC<TProps> = ({
  onPress,
  order,
  hasDistance,
  type = 'private',
}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.wrapper}
      onPress={onPress}>
      <View style={styles.header}>
        <Text
          style={{flex: 1}}
          family="bold"
          numberOfLines={2}
          ellipsizeMode="tail">
          {order.title}
        </Text>
        <Text size={14} family="medium">
          {order.contract_price
            ? t('order_list.contract')
            : `${order.price || 0} ${order?.currency?.name}`}
        </Text>
      </View>
      <Text size={13} family="medium">
        {order.speciality?.name}
      </Text>
      {!!order.tags?.length && (
        <Text family="medium" color={'gray'}>
          {order.tags.map(({name}) => name).join(', ')}
        </Text>
      )}

      {hasDistance && (
        <Text family="bold">
          {hasDistance &&
            `${order.distance_to ? order.distance_to : 0.01} ${t(
              'distances.km',
            )}`}
        </Text>
      )}
    </TouchableOpacity>
  );
};
