import React, {FC, useMemo} from 'react';
import {Platform, Pressable, View} from 'react-native';
import {Text} from '@/components';

import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';
import {User} from '@/bus/user';
import {format} from 'date-fns';
import {useDateLocale} from '@/hooks';
import {Product, Subscription} from 'react-native-iap';
import {RadioButton} from '@/components/RadioButton';

function monthsDiff(date1, date2) {
  const months =
    (date2.getFullYear() - date1.getFullYear()) * 12 +
    date2.getMonth() -
    date1.getMonth();
  return months;
}

type TProps = {
  active: boolean;
  value: number;
  vip: User.VipStatus;
  date: string;
  setPurchaseType: () => any;
  product?: Product;
  subscription?: Subscription;
  variant?: number;
};

export const RadiusCard: FC<TProps> = ({
  value,
  vip,
  date,
  product,
  setPurchaseType,
  active,
  subscription,
  variant,
}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();
  const {locale} = useDateLocale();

  const isBought = useMemo(() => {
    const radius = vip ? vip.replace('radius_', '') : '';

    if (radius === 'default') {
      return false;
    }

    if (radius === 'unlimited') {
      return true;
    }

    if (value <= Number(radius)) {
      return true;
    }
    return false;
  }, [vip]);

  const secondVariantValid =
    variant === 1 ? monthsDiff(new Date(), new Date(date)) > 1 : true;

  const isValidDate =
    date && new Date(date) > new Date() && isBought && secondVariantValid;
  const price = useMemo(
    () =>
      Platform.select({
        ios: subscription?.localizedPrice || 0,
        android: subscription?.subscriptionOfferDetails
          ? subscription?.subscriptionOfferDetails[variant]?.pricingPhases
              ?.pricingPhaseList[0].formattedPrice
          : 0,
      }),
    [subscription],
  );

  return (
    <Pressable
      style={isValidDate ? [styles.wrapper, styles.disabled] : styles.wrapper}
      onPress={!isValidDate ? setPurchaseType : undefined}>
      <View style={styles.row}>
        <RadioButton
          active={active}
          disabled={!!isValidDate}
          setPurchaseType={!isValidDate ? setPurchaseType : () => {}}
        />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text family="bold" size={14}>
                {t(
                  `vip_statuses.radius_${
                    value === 10000
                      ? variant === 0
                        ? 'unlimited'
                        : 'unlimited_12'
                      : value
                  }`,
                )}
              </Text>
            </View>
            <Text family="bold" color="action">
              {subscription
                ? price
                : product?.oneTimePurchaseOfferDetails?.formattedPrice ||
                  product?.localizedPrice ||
                  0}
            </Text>
          </View>
          {variant !== undefined &&
          <Text margin={{bottom: 8}}>
            { t('vip.work_on') }
          </Text>
          }
          <View style={styles.footer}>
            {isValidDate && (
              <Text
                color="gray"
                style={{textAlign: 'right'}}
                family="medium"
                margin={{top: 0}}
                size={14}>
                {`${t('vip.top.end_time')} ${format(
                  new Date(date),
                  'dd.MM.yyyy',
                  {
                    locale,
                  },
                )}`}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
