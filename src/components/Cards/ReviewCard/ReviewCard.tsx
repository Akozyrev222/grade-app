import React, {FC, useEffect, useState} from 'react';

import {Text, Avatar, Rating, ImageZoomer} from '@/components';
import {Image, TouchableOpacity, View} from 'react-native';

import {Review} from '@/bus/review';

import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';

import ENV from '@/configs';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = {
  review: Review.Item;
};

export const ReviewCard: FC<TProps> = ({review}) => {
  const {styles, emptyColor} = useStyles();

  const [isOpened, setIsOpened] = useState('');
  const urlMode = useSelector(linkSelectors.getLink);

  const {t} = useTranslation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Avatar
          url={
            review.creator.avatar &&
            `${urlMode}${review.creator.avatar.small.url}`
          }
          size="small"
          variant="square"
        />
        <View style={styles.main}>
          <Text size={14} family="medium">
            {review.creator.full_name}
          </Text>
          <View style={styles.rating}>
            <Text color="gray" margin={{right: 8}}>
              {t('titles.rating')}
            </Text>
            <Rating rating={review.rating} emptyColor={emptyColor} />
          </View>
        </View>
      </View>
      <Text margin={{top: 12}}>{review.text}</Text>
      <View style={styles.images}>
        {review.feedback_images.map(({image}) => (
          <TouchableOpacity
            onPress={() => setIsOpened(`${urlMode}${image}`)}
            activeOpacity={0.6}
            key={`image-${image}-review-${review.id}`}>
            <Image style={styles.image} source={{uri: `${urlMode}${image}`}} />
          </TouchableOpacity>
        ))}
      </View>
      <ImageZoomer
        urls={review.feedback_images.map(({image}) => ({
          url: `${urlMode}${image}`,
        }))}
        visible={isOpened}
        onClose={setIsOpened}
      />
    </View>
  );
};
