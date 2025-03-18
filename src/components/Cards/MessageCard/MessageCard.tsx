import React, {FC, useEffect, useMemo, useState} from 'react';

import {
  Dimensions,
  Image,
  LayoutChangeEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, ImageZoomer} from '@/components';
import {Cloud} from '@/assets';

import {Message} from '@/bus/message';
import {format} from 'date-fns';

import {useDateLocale} from '@/hooks';
import {useStyles} from './useStyles';

import ENV from '@/configs';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = {
  message: Message.Item;

  isCurrentUser: boolean;

  onLayout: (e: LayoutChangeEvent) => any;
};

const calcWidth = (length: number) => {
  return length > 4
    ? (Dimensions.get('window').width * 0.8) / 4 - 14
    : (Dimensions.get('window').width * 0.8) / length - 30 + (length - 1) * 8;
};

export const MessageCard: FC<TProps> = ({message, isCurrentUser, onLayout}) => {
  const {styles, notCurrentColor, currentColor} = useStyles();

  const [url, setUrl] = useState('');

  const {locale} = useDateLocale();

  const urlMode = useSelector(linkSelectors.getLink);

  const images = useMemo(
    () =>
      message.message_images.map(({image, id}) => ({
        id,
        image: {
          url: typeof id === 'number' ? `${urlMode}${image.url}` : image.url,
        },
      })),
    [message.message_images],
  );

  const renderImages = useMemo(
    () =>
      images.map(({id, image}, index, images) => {
        return (
          <TouchableOpacity
            onPress={() => setUrl(image.url)}
            activeOpacity={0.6}
            key={`image-${message.id}-${id}`}>
            <Image
              source={{uri: image.url}}
              style={[
                styles.image,
                {
                  width: calcWidth(images.length),
                  height: calcWidth(images.length),
                },
                (images.length === 1 || index === images.length - 1) && {
                  marginRight: 0,
                },
              ]}
            />
          </TouchableOpacity>
        );
      }),
    [images],
  );

  return (
    <View
      style={[
        styles.wrapper,
        {
          justifyContent: `flex-${isCurrentUser ? 'end' : 'start'}`,
        },
      ]}
      onLayout={onLayout}>
      {isCurrentUser && (
        <Text>{format(new Date(message.created_at), 'HH:mm', {locale})}</Text>
      )}
      <View style={[styles.content, isCurrentUser && styles.currentUser]}>
        {!isCurrentUser && (
          <View style={styles.cloudRight}>
            <Cloud reverse color={notCurrentColor} size={12} />
          </View>
        )}

        {!!renderImages.length && (
          <View style={[styles.images, !message.text && {marginBottom: 0}]}>
            {renderImages}
          </View>
        )}
        {!!message.text && <Text>{message.text}</Text>}
        {isCurrentUser && (
          <View style={styles.cloudLeft}>
            <Cloud color={currentColor} size={12} />
          </View>
        )}
      </View>
      {!isCurrentUser && (
        <Text>{format(new Date(message.created_at), 'HH:mm', {locale})}</Text>
      )}

      <ImageZoomer
        urls={images.map(({image}) => image)}
        visible={url}
        onClose={setUrl}
      />
    </View>
  );
};
