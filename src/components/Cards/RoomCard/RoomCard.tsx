import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Animated, Image, Pressable, TouchableOpacity, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';

import {Avatar, Text} from '@/components';

import {useStyles} from './useStyles';

import {Room} from '@/bus/room';

import ENV from '@/configs';
import {Trash} from '@/assets';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {useDateLocale} from '@/hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {getAppMode} from '@/hooks/changeUrl';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = {
  room: Room.Item;

  onPress: () => any;
  onRemove: () => any;
};

export const RoomCard: FC<TProps> = ({room, onPress, onRemove}) => {
  const {styles, lightIcon} = useStyles();

  const {t} = useTranslation();
  const ref = useRef<Swipeable>(null);

  const {locale} = useDateLocale();

  const urlMode = useSelector(linkSelectors.getLink);
  const [progress, serProgress] =
    useState<Animated.AnimatedInterpolation | null>(null);

  const translate = useMemo(
    () =>
      progress
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 23],
          })
        : 0,
    [progress],
  );

  const renderRightActions = useCallback(
    (progress: Animated.AnimatedInterpolation) => {
      serProgress(progress);
      const translate = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [96, 0],
      });

      return (
        <Animated.View
          style={[
            styles.removeWrapper,
            {transform: [{translateX: translate}]},
          ]}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              onRemove();
              ref?.current?.close();
            }}
            style={styles.removeContent}>
            <Trash color={lightIcon} size={24} />
            <Text margin={{top: 8}} color="light">
              {t('buttons.remove')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [],
  );

  const renderLastMessage = useMemo(() => {
    if (!room.last_message) {
      return null;
    }

    if (room.last_message.message_images.length) {
      return (
        <View style={styles.images}>
          {room.last_message.message_images.map(({id, image}) => (
            <Image
              source={{uri: `${urlMode}${image.url}`}}
              style={styles.image}
              key={`image-${id}-${room.id}`}
            />
          ))}
        </View>
      );
    }

    return (
      <Text
        margin={{top: 6}}
        color="gray"
        numberOfLines={1}
        ellipsizeMode="tail">
        {room.last_message?.text || ''}
      </Text>
    );
  }, [room.last_message]);

  if (!room.last_message) {
    return null;
  }

  return (
    <Pressable onPress={onPress} style={{marginTop: 16}}>
      <Swipeable
        ref={ref}
        useNativeAnimations={false}
        renderRightActions={renderRightActions}
        overshootRight={false}>
        <Animated.View
          style={[styles.wrapper, {transform: [{translateX: translate}]}]}>
          <Avatar
            url={room.user.avatar && `${urlMode}${room.user.avatar.small.url}`}
            size="small"
          />

          <View style={styles.main}>
            <Text
              size={14}
              family="medium"
              numberOfLines={1}
              ellipsizeMode="tail">
              {room.user.full_name}
            </Text>
            {renderLastMessage}
          </View>
          <View style={styles.subInfo}>
            <Text color="gray" size={10}>
              {format(
                room.last_message?.created_at
                  ? new Date(room.last_message.created_at)
                  : new Date(),
                'HH:mm',
                {
                  locale,
                },
              )}
            </Text>
            {!!room.not_read_count && (
              <View style={styles.counter}>
                <Text family="bold" size={10}>
                  {room.not_read_count}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </Swipeable>
    </Pressable>
  );
};
