import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {GradientLayout} from '@/layouts';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Button,
  Header,
  Loader,
  RadiusCard,
  Refresh,
  Text,
  TopCard,
} from '@/components';
import {useTranslation} from 'react-i18next';
import {VipStackParamList} from '@/navigation/VipNavigator';
import {Routes} from '@/navigation';
import {useStyles} from './useStyles';
import {useData} from './useData';
import {format} from 'date-fns';
import {useBackButton, useDateLocale} from '@/hooks';
import {UsePromoCodeModal} from '@/components/Modals/UsePromoCodeModal';
import {Payment} from '@/bus/payment';
import {BackHandler} from 'react-native';
import {StripePayment} from './Stripe';

type TProps = StackScreenProps<VipStackParamList, Routes.VIP_LIST>;

export enum PurchaseType {
  VIP = 'onBuyVip',
  TOP = 'onBuyTop',
}

export type Purchase = {
  purchaseType?: PurchaseType.VIP | PurchaseType.TOP;
  purchase?: string;
  variant?: number;
};

export const Vip: FC<TProps> = () => {
  const {
    onBuyTop,
    onBuyVip,
    isLoading,
    user,
    products,
    subscriptions,
    isBtnLoading,
    isRefresh,
    onRefresh,
  } = useData();
  const {styles} = useStyles();
  const {t} = useTranslation();
  const {locale} = useDateLocale();
  const [purchaseType, setPurchaseType] = useState<Purchase>({
    purchaseType: PurchaseType.TOP,
    purchase: '7',
  });
  const [activeRadioBtn, setActiveRadioBtn] = useState('');
  const [showModal, setShowModal] = useState(false);
  const purchaseSelected = useMemo(() => {
    return purchaseType.hasOwnProperty('purchase');
  }, [purchaseType]);

  useEffect(() => {
    setActiveRadioBtn(purchaseType.purchase);
  }, [purchaseType]);

  useBackButton(() => {
    return false;
  });

  const buy = useCallback(async () => {
    if (purchaseType.purchaseType === PurchaseType.TOP) {
      await onBuyTop(Number(purchaseType.purchase));
    } else {
      await onBuyVip(purchaseType.purchase as Payment.VipStatus);
    }
  }, [purchaseType, onBuyTop, onBuyVip]);

  const executorDate = new Date(user?.executor?.top_end_time);
  const currentDate = new Date();
  //  return <StripePayment />
  return (
    <GradientLayout>
      <View style={styles.header}>
        <Header>{t('header.vip')}</Header>
      </View>
      {isLoading ? (
        <Loader height={200} />
      ) : (
        <ScrollView
          refreshControl={
            <Refresh onRefresh={onRefresh} refreshing={isRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.topWrapper}>
            <View style={styles.topHeader}>
              <View style={styles.topTitle}>
                <Text family="bold" size={16}>
                  {t('vip.top.title')}{' '}
                </Text>
                {!!user?.executor?.top_end_time &&
                  executorDate > currentDate && (
                    <Text
                      color="gray"
                      family="medium"
                      size={10}
                      margin={{left: 8}}>
                      {t('vip.top.end_time')}{' '}
                      {format(
                        new Date(user?.executor?.top_end_time),
                        'dd.MM.yyyy',
                        {
                          locale,
                        },
                      )}
                    </Text>
                  )}
              </View>
            </View>
            <TopCard
              active={activeRadioBtn === '10'}
              product={products['top_3']}
              day={10}
              setPurchaseType={() =>
                setPurchaseType({purchaseType: PurchaseType.TOP, purchase: '10'})
              }
            />
            <TopCard
              active={activeRadioBtn === '30'}
              product={products['top_14']}
              day={30}
              setPurchaseType={() =>
                setPurchaseType({
                  purchaseType: PurchaseType.TOP,
                  purchase: '30',
                })
              }
            />
          </View>
        </ScrollView>
      )}
      {!showModal && (
        <View style={styles.buttonsWrapper}>
          <Button
            disabled={!purchaseSelected}
            size="small"
            style={[styles.button, !purchaseSelected && styles.buttonDisabled]}
            weight={'bold'}
            loading={!!isBtnLoading}
            onPress={() => {
              buy();
            }}>
            {t('buttons.buy')}
          </Button>
          <Button
            disabled={!purchaseSelected}
            size="small"
            style={[
              styles.button,
              styles.promoCodeBtn,
              !purchaseSelected && styles.buttonDisabled,
            ]}
            weight={'bold'}
            color="light"
            onPress={() => {
              setShowModal(true);
            }}>
            {t('buttons.promo_code')}
          </Button>
        </View>
      )}
      <UsePromoCodeModal
        purchase={purchaseType}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        renderTitle={<Text size={14}>{t('success_modal.title')}</Text>}
      />
    </GradientLayout>
  );
};
