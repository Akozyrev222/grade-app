import React, {FC, useEffect, useMemo, useState} from 'react';

import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStyles} from './useStyles';

import {Button, Avatar, Text, Rating} from '@/components';
import {useTranslation} from 'react-i18next';
import {Application} from '@/bus/application';

import ENV from '@/configs';
import {useDateLocale} from '@/hooks';
import {formatDistanceToNow} from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = {
  item: Application.Request;

  onConfirmItem: () => any;
  onOpenChat: () => any;
  onPress: () => any;

  hasButtons?: boolean;
  showBadge?: boolean;

  onLayout?: (e: LayoutChangeEvent) => any;
};

export const UserResponseCard: FC<TProps> = ({
  item,
  onConfirmItem,
  onOpenChat,
  onPress,
  hasButtons,
  showBadge,
  onLayout = () => {},
}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();
  const {locale} = useDateLocale();

  const urlMode = useSelector(linkSelectors.getLink);

  const renderVerification = useMemo(() => {
    if (item.user.executor.need_verification) {
      return (
        <Text color="danger" align="right">
          {t('profile_list.verification_status.not_verificate')}
        </Text>
      );
    }
    if (item.user.executor.approved) {
      return (
        <Text color="success" align="right">
          {t('profile_list.verification_status.verificated')}
        </Text>
      );
    }

    return (
      <Text color="warning" align="right">
        {t('profile_list.verification_status.verificating')}
      </Text>
    );
  }, [item]);

  return (
    <TouchableOpacity
      activeOpacity={hasButtons ? 0.6 : 1}
      style={[styles.wrapper, hasButtons && {height: 252}]}
      onPress={onPress}
      onLayout={onLayout}>
      {!item.is_read && showBadge && (
        <View style={styles.badge}>
          <Text>!</Text>
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Avatar
            size="extraSmall"
            url={
              item.user.avatar &&
              `${urlMode}${item.user.avatar.extra_small.url}`
            }
          />
          <View style={styles.mainInfo}>
            <Text family="bold" numberOfLines={1} ellipsizeMode="tail">
              {item.user.full_name}
            </Text>
            <Text family="regular">{item.user.executor?.speciality?.name}</Text>
          </View>
          <View>
            <Rating rating={item.user.rating} />
            {renderVerification}
          </View>
        </View>

        {!!item.description && (
          <Text numberOfLines={2} ellipsizeMode="tail" margin={{top: 12}}>
            {item.description}
          </Text>
        )}
        <View style={styles.footer}>
          <Text style={styles.content} color="gray" family="medium">
            {t('response_list.created_at')}{' '}
            {formatDistanceToNow(new Date(item.created_at), {
              locale,
              addSuffix: true,
            })}
          </Text>
          <Text family="bold" color="gray" margin={{right: 8}}>
            {item.user.distance}
            {t('distances.km')}
          </Text>
          <Text family="bold">
            {item.price} {item?.currency?.name}
          </Text>
        </View>
      </View>
      {hasButtons && (
        <>
          <Button onPress={onOpenChat}>{t('buttons.reply')}</Button>
          <Button onPress={onConfirmItem} color="info" margin={{top: 8}}>
            {t('buttons.confirm_executor')}{' '}
          </Button>
        </>
      )}
    </TouchableOpacity>
  );
};
