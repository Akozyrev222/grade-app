import {
  Avatar,
  Button,
  Header,
  Loader,
  Rating,
  Refresh,
  ReviewCard,
  Text,
} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {HomeStackParamList} from '@/navigation/HomeNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';

import {useData} from './useData';
import {useStyles} from './useStyles';

import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {useDateLocale} from '@/hooks';
import {formatOnline, formatPhone} from '@/helpers';
import {FavoriteTabBar, Pencil} from '@/assets';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import {Path, Svg} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {linkSelectors} from '@/bus/link';

type TProps = StackScreenProps<HomeStackParamList, Routes.EXECUTOR_DETAIL>;
const adUnitId = Platform.select({
  ios: 'ca-app-pub-7005498814058806/6053114285',
  android: 'ca-app-pub-7005498814058806/7553898212',
});

export const ExecutorDetail: FC<TProps> = ({navigation, route}) => {
  const {id} = route.params;
  const [open, setOpen] = useState(false);
  const [tagsOpened, setTagsOpened] = useState(false);
  const {
    detail,
    isInfo,
    setIsInfo,
    onCall,
    isLoading,
    isRefresh,
    onRefresh,
    onCreateRoom,
    onToggleFavorite,
    isLoadingFavorite,
  } = useData({id});
  const {styles, likeColor, unlikeColor, iconColor} = useStyles();

  const {t} = useTranslation();
  const {locale} = useDateLocale();
  const urlMode = useSelector(linkSelectors.getLink);

  const renderVerification = useMemo(() => {
    if (!detail) return null;

    if (detail.executor.need_verification) {
      return (
        <Text color="danger">
          {t('profile_list.verification_status.not_verificate')}
        </Text>
      );
    }
    if (detail.executor.approved) {
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
  }, [detail]);

  const specItems = useMemo(
    () =>
      detail?.executor.specialities.map((spec) => {
        return {
          label: spec.name,
          value: spec.id,
        };
      }),
    [detail],
  );

  const online = useMemo(
    () => detail && formatOnline({online: detail.online}),
    [detail],
  );

  const renderInfo = useMemo(() => {
    if (!detail) return null;

    if (isInfo) {
      return (
        <View>
          <Text margin={{top: 12}} color="gray">
            {t('executor_detail.address')}
          </Text>
          <Text margin={{top: 12}} size={14} family="bold">
            {detail.address}
          </Text>
          <Text margin={{top: 12}} color="gray">
            {t('executor_detail.desc')}
          </Text>
          <Text margin={{top: 12}} size={14} family="bold">
            {detail.description}
          </Text>

          <Text margin={{top: 12}} color="gray">
            {t('executor_detail.task_completed')}
          </Text>
          <Text margin={{top: 12}} family="bold">
            {detail.finished_task_count}
          </Text>

          <Text margin={{top: 12}} color="gray">
            {t('executor_detail.created_at')}
          </Text>
          <Text margin={{top: 12, bottom: 12}} family="bold">
            {format(new Date(detail.created_at), 'dd MMMM yyyy', {
              locale,
            })}{' '}
            {t('profile_list.year')}{' '}
          </Text>
        </View>
      );
    }

    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate(Routes.REVIEW_CREATE, {id: detail.id})
          }
          style={styles.reviewWrapper}>
          <Text color="gray">{t('order_detail.create_review')}</Text>

          <Pencil color={iconColor} size={24} />
        </TouchableOpacity>

        {detail.feedbacks.map((review) => (
          <ReviewCard key={`review-${review.id}`} review={review} />
        ))}
      </View>
    );
  }, [isInfo, detail]);

  if (!detail || (isLoading && !isRefresh)) {
    return (
      <GradientLayout>
        <View style={styles.header}>
          <Header
            leftIcon="back"
            rightIcon="helping"
            onPressLeftIcon={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate(Routes.EXECUTOR_LIST);
              }
            }}
            onPressRightIcon={() => navigation.navigate(Routes.REPORT)}
          />
        </View>
        <Loader height={200} />
      </GradientLayout>
    );
  }

  return (
    <GradientLayout>
      <View style={styles.header}>
        <Header
          leftIcon="back"
          rightIcon="helping"
          onPressLeftIcon={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate(Routes.EXECUTOR_LIST);
            }
          }}
          onPressRightIcon={() => navigation.navigate(Routes.REPORT)}
        />
      </View>
      <ScrollView
        refreshControl={
          <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <View style={styles.mainInfo}>
          <Avatar
            size="medium"
            url={detail.avatar && `${urlMode}${detail.avatar.normal.url}`}
          />

          <View style={styles.favoriteWrapper}>
            {isLoadingFavorite ? (
              <Loader height={24} />
            ) : (
              <TouchableOpacity onPress={onToggleFavorite} activeOpacity={0.6}>
                <FavoriteTabBar
                  isFocused
                  fill={detail.favorite ? likeColor : unlikeColor}
                  size={24}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{marginLeft: 32}}>
            <Text family="medium" margin={{top: 0, bottom: 6}}>
              {detail.full_name.split(' ')[0]}
            </Text>

            <Rating
              rating={detail.rating}
              style={{display: 'flex', flexDirection: 'row'}}
            />

            {online && (
              <Text
                margin={{bottom: 8, top: 6}}
                color={online.status ? 'success' : 'danger'}>
                {
                  online.status
                    ? t('user_statuses.online')
                    : t('executor_detail.was')
                }
              </Text>
            )}

            {renderVerification}
          </View>
        </View>
        <View>
          <DropDownPicker
            listMode="SCROLLVIEW"
            open={open}
            value={''}
            placeholder={t('sign_up.fields.specialization')}
            items={specItems as unknown as ItemType<''>[]}
            setOpen={setOpen}
            setValue={() => {}}
            setItems={() => {}}
            style={styles.dropDown}
            placeholderStyle={{
              color: '#17264B',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: '600',
            }}
            dropDownContainerStyle={{
              backgroundColor: '#b8e0e7',
              borderWidth: 0,
              marginTop: 5,
              borderRadius: 10,
              zIndex: 10000,
            }}
            disableBorderRadius={false}
          />

          <View
            style={{...styles.tags, maxHeight: tagsOpened ? undefined : 72}}>
            {Array(1).fill(
              detail.executor.tags.map((tag) => (
                <View style={styles.tag} key={`tag-${tag.id}`}>
                  <Text family="bold" size={14}>
                    {tag.name}
                  </Text>
                </View>
              )),
            )}
          </View>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.6}}
          colors={['rgba(255, 255, 255, 0.18)', 'rgba(255, 255, 255, 0.34)']}
          style={{
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              transform: tagsOpened ? [{rotate: '180deg'}] : [{rotate: '0deg'}],
            }}
            onPress={() => setTagsOpened(!tagsOpened)}>
            <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <Path
                d="M18.5 10L12.5 16L6.5 10"
                stroke="#1E2839"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.ad}>
          <BannerAd unitId={adUnitId} size={BannerAdSize.MEDIUM_RECTANGLE} />
        </View>
        <View style={styles.switchers}>
          <Button
            size="small"
            color={isInfo ? 'default' : 'transparent'}
            onPress={() => setIsInfo(true)}
            style={styles.switcher}>
            {t('profile_list.info')}
          </Button>
          <Button
            size="small"
            color={!isInfo ? 'default' : 'transparent'}
            onPress={() => setIsInfo(false)}
            rightIcon={
              <Text
                size={10}
                margin={{bottom: 4}}
                family="medium"
                color={isInfo ? 'default' : 'light'}>
                {detail.feedbacks.length || ''}
              </Text>
            }
            style={styles.switcher}>
            {t('profile_list.reviews')}
          </Button>
        </View>

        {renderInfo}
      </ScrollView>

      <View style={styles.footer}>
        <Button style={styles.footerButton} onPress={onCall}>
          {t('executor_detail.call')}
        </Button>
        <Button
          style={styles.footerButton}
          onPress={() => {
            if (!detail.chat_id) {
              onCreateRoom();
            }

            navigation.navigate(Routes.ROOM_DETAIL, {
              id: detail.chat_id || 0,
            });
          }}>
          {t('executor_detail.go_to_chat')}
        </Button>
      </View>
    </GradientLayout>
  );
};
