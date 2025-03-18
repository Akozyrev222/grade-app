import React, {FC, useEffect, useMemo, useState} from 'react';

import {Executor} from '@/bus/executor';
import {Avatar, Text, Rating} from '@/components';
import {TouchableOpacity, View} from 'react-native';

import {useStyles} from './useStyles';

import ENV from '@/configs';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = {
  onPress: () => any;
  executor: Executor.Item;
};

export const ExecutorCard: FC<TProps> = ({onPress, executor}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();
  const urlMode = useSelector(linkSelectors.getLink);

  const renderVerification = useMemo(() => {
    if (executor.executor.need_verification) {
      return (
        <Text color="danger">
          {t('profile_list.verification_status.not_verificate')}
        </Text>
      );
    }
    if (executor.executor.approved) {
      return (
        <Text color="success">
          {t('profile_list.verification_status.verificated')}
        </Text>
      );
    }

    return (
      <Text color="warning">
        {t('profile_list.verification_status.verificating')}
      </Text>
    );
  }, [executor.executor]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      {executor.top && (
        <View style={styles.top}>
          <Text size={10} family="medium" color="light">
            {t('vip.top.title').toUpperCase()}
          </Text>
        </View>
      )}
      <Avatar
        url={executor.avatar && `${urlMode}${executor.avatar.large.url}`}
        size="small"
      />
      <View style={styles.info}>
        <View style={styles.header}>
          <Text family="medium" size={14}>
            {executor.full_name.split(' ')[0]}
          </Text>
          <Rating rating={executor.rating} />
        </View>

        <Text
          color="gray"
          numberOfLines={1}
          ellipsizeMode="tail"
          margin={{bottom: 3}}>
          {`${executor?.executor?.specialities
            ?.map(({name}) => name)
            .join(', ')}`}
        </Text>

        <Text color="gray" numberOfLines={1} ellipsizeMode="tail">
          {`${executor.executor.tags.map(({name}) => name).join(', ')}`}
        </Text>

        <View style={styles.footer}>
          {!!executor.distance_to && (
            <Text family="medium" color="dark">
              {executor.distance_to} {t('distances.km')}
            </Text>
          )}
          {renderVerification}
        </View>
      </View>
    </TouchableOpacity>
  );
};
