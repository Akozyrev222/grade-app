import React, {FC, useEffect, useState} from 'react';

import {Text, Avatar, Rating} from '@/components';
import {TouchableOpacity, View} from 'react-native';

import {Favorite} from '@/bus/favorite';

import {useStyles} from './useStyles';

import ENV from '@/configs';
import {useTranslation} from 'react-i18next';
import {Close} from '@/assets';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = {
  favorite: Favorite.Item;
  onPress: () => any;
  onRemove: () => any;
};

export const FavoriteCard: FC<TProps> = ({favorite, onPress, onRemove}) => {
  const {styles, iconColor} = useStyles();

  const {t} = useTranslation();

  const urlMode = useSelector(linkSelectors.getLink);
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.6}>
      <Avatar
        url={favorite.avatar && `${urlMode}${favorite.avatar.large.url}`}
        size="small"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text family="medium" size={14} style={{flex: 1}}>
            {favorite.full_name.split(' ')[0]}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onRemove}
            style={{
              height: 32,
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Close fill={iconColor} size={16} isLight />
          </TouchableOpacity>
        </View>

        <Text color="gray" numberOfLines={1} ellipsizeMode="tail">
          {/* {`${favorite.executor.specialities
            ?.map(({name}) => name)
            .join(', ')}`} */}
          {favorite?.executor?.specialities?.map(({name}) => name).join(', ')}

          {`${favorite.executor.tags.length ? ', ' : ''}${favorite.executor.tags
            .map(({name}) => name)
            .join(', ')}`}
        </Text>

        <View style={styles.footer}>
          <Text family="medium" color="dark" style={{flex: 1}}>
            {favorite.distance_to} {t('distances.km')}
          </Text>
          <Rating rating={favorite.rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
