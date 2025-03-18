import React, {FC, useState} from 'react';
import {Application} from '@/bus/application';
import {Text, UserResponseCard} from '@/components';

import {Animated, TouchableOpacity, View} from 'react-native';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';
import {Chevron} from '@/assets';
import {useAnimation} from './useAnimation';

type TProps = {
  response: Application.Item;

  onConfirmItem: (id: number) => any;
  onOpenChat: (room: number, user: number) => any;

  onOpenExecutor: (id: number) => any;
  onReadResponce: (id: number) => any;
  initialIsOpened: boolean;
  showBadge?: boolean;
};

export const ResponseCard: FC<TProps> = ({
  response,
  onConfirmItem,
  onOpenChat,
  onOpenExecutor,
  initialIsOpened,
  onReadResponce,
  showBadge,
}) => {
  const [fullHeight, setFullHeight] = useState(0);

  const {isOpened, setIsOpened, height} = useAnimation(
    fullHeight,
    initialIsOpened,
  );

  const {t} = useTranslation();

  const {styles, iconColor} = useStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.wrapper}
      onPress={() => setIsOpened(!isOpened)}>
      {!!response.not_read_requests && (
        <View style={styles.badge}>
          <Text>{response.not_read_requests}</Text>
        </View>
      )}
      <Animated.View style={[styles.content, {height}]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={{flex: 1}}
              family="bold"
              numberOfLines={2}
              ellipsizeMode="tail">
              {response.title}
            </Text>
            <Text size={14} family="medium">
              {response.contract_price
                ? t('order_list.contract')
                : `${response.price || 0} ${response?.currency?.name}`}
            </Text>
          </View>
          <Text family="medium">{response.speciality.name}</Text>
          {!!response.tags?.length && (
            <Text family="medium" color="gray">
              {response.tags.map(({name}) => name).join(', ')}
            </Text>
          )}
          <View style={styles.footer}>
            <Text>{t('response_list.show_all_request')}</Text>
            <Chevron size={12} fill={iconColor} vertical={isOpened} />
          </View>
        </View>

        <View style={styles.reviews}>
          {response.requests?.map((item) => (
            <UserResponseCard
              onLayout={(e) =>
                setFullHeight(fullHeight + e.nativeEvent.layout.height + 8)
              }
              item={item}
              onPress={() => {
                onOpenExecutor(item.user.id);
                onReadResponce(item.id);
              }}
              onOpenChat={() => {
                onOpenChat(item.user.chat_id, item.user.id);
                onReadResponce(item.id);
              }}
              onConfirmItem={() => onConfirmItem(item.id)}
              key={`application-user-${response.id}-${item.id}`}
              hasButtons
              showBadge
            />
          ))}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};
