import {Payment, paymentActions} from '@/bus/payment';
import {uiSelectors} from '@/bus/ui';
import {userActions, userSelectors} from '@/bus/user';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Purchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  useIAP,
} from 'react-native-iap';
import {useDispatch, useSelector} from 'react-redux';

import {PRODUCTS, TOP_PRODUCT} from '@/constants';
import {Platform} from 'react-native';
import {formatProducts} from '@/helpers';
import {EVENTS, PAYMENT_EVENTS, logEvent} from '@/hooks/useAppsFlyer';

export const useData = () => {
  const dispatch = useDispatch();
  const [isBtnLoading, setBtnLoading] = useState<boolean | number | string>(
    false,
  );

  const [isRefresh, setIsRefresh] = useState(false);
  const isLoading = useSelector(uiSelectors.getLoading('payment'));
  const user = useSelector(userSelectors.getDetail);

  const [currentDays, setCurrentDays] = useState(0);
  const currentDaysRef = useRef(currentDays);
  currentDaysRef.current = currentDays;
  const [currentRadius, setCurrentRadius] = useState('');
  const currentRadiusRef = useRef(currentRadius);
  currentRadiusRef.current = currentRadius;

  const {
    connected,
    finishTransaction,
    products,
    subscriptions,
    requestPurchase,
    requestSubscription,
  } = useIAP();

  useEffect(() => {
    const subscription = purchaseUpdatedListener(async (purchase: Purchase) => {
      console.log(
        '--------------------------------------------------------------------------------------purchase\n',
        JSON.stringify(purchase),
      );
      try {
        let transaction;
        if (purchase.productId === 'radius_unlimited_month') {
          await acknowledgePurchaseAndroid({token: purchase.purchaseToken});
          transaction = await finishTransaction({
            purchase,
            developerPayloadAndroid:
              currentRadiusRef.current === 'month_12'
                ? 'radius_unlimited_month_12'
                : 'radius_unlimited_month',
          });
        } else {
          transaction = await finishTransaction({
            purchase,
            isConsumable: true,
          });
        }

        if (purchase.originalTransactionDateIOS) return;

        const isRadius =
          purchase.productId.includes('radius') ||
          purchase.productId === 'month1' ||
          purchase.productId === 'month_12';

        let product_identifier;
        if (isRadius) {
          const event =
            currentRadiusRef.current === 'month_12'
              ? PAYMENT_EVENTS.SUBSCRIBE_365
              : PAYMENT_EVENTS.SUBSCRIBE_30;
          const eventValues = {
            af_content_id: purchase.productId,
            af_currency: 'USD',
            af_revenue: currentRadiusRef.current === 'month_12' ? '50' : '5',
          };
          logEvent(event, eventValues);
          product_identifier =
            currentRadiusRef.current === 'month_12'
              ? 'radius_unlimited_month_12'
              : currentRadiusRef.current;
        } else {
          let event,
            eventValues = {
              af_content_id: purchase.productId,
              af_currency: 'USD',
              af_revenue: '0',
            };
          switch (currentDaysRef.current) {
            case 3:
              event = PAYMENT_EVENTS.BUY_TOP_3;
              eventValues.af_revenue = '2';
              break;
            case 7:
              event = PAYMENT_EVENTS.BUY_TOP_7;
              eventValues.af_revenue = '6';
              break;
            case 14:
              event = PAYMENT_EVENTS.BUY_TOP_14;
              eventValues.af_revenue = '10';
              break;
            default:
              break;
          }
          if (event) {
            logEvent(event, eventValues);
          }
          product_identifier = purchase.productId;
        }

        const payment: Payment.Item = {
          platform: Platform.OS,
          product_identifier, //purchase.productId === 'radius_unlimited_month' || purchase.productId === 'month1'  ? 'radius_unlimited' : purchase.productId,
          transaction_receipt: JSON.stringify(purchase),
        };

        if (isRadius) {
          dispatch(
            paymentActions.createVipItem({
              radius: 'radius_unlimited',
              payment,
            }),
          );
        } else {
          dispatch(
            paymentActions.createTopItem({
              days: currentDaysRef.current,
              payment,
            }),
          );
        }
      } catch (e) {
        console.log(`error do payment ${e}`);
        console.log('Error code: ' + (e as any).code);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onCreatePurchase = useCallback(
    async (sku: string) => {
      try {
        if (connected) {
          let purchase;
          if (sku === 'radius_unlimited' || sku === 'month_12') {
            const androidVariant = sku === 'month_12' ? 1 : 0;
            const iosVariant = sku === 'month_12' ? 'month_12' : 'month1';

            if (Platform.OS === 'ios') {
              purchase = await requestSubscription({
                sku: iosVariant,
                subscriptionOffers: [
                  {
                    sku: iosVariant,
                    offerToken: '',
                  },
                ],
              });
            } else if (Platform.OS === 'android') {
              purchase = await requestSubscription({
                sku: 'radius_unlimited_month',
                subscriptionOffers: [
                  {
                    sku: 'radius_unlimited_month',
                    offerToken: subscriptions[0]?.subscriptionOfferDetails
                      ? subscriptions[0]?.subscriptionOfferDetails[
                          androidVariant
                        ].offerToken
                      : '',
                  },
                ],
              });
            }
          } else {
            if (Platform.OS === 'ios') {
              await requestPurchase({sku});
            } else if (Platform.OS === 'android') {
              await requestPurchase({skus: [sku]});
            }
          }
          if (!purchase) return null;
        }
      } catch (e) {
        console.log(`error create purchase ${e}`);
      } finally {
        setBtnLoading(false);
      }

      return null;
    },
    [connected, products, subscriptions],
  );

  const onBuyTop = useCallback(
    async (days: number) => {
      setCurrentDays(days);
      setCurrentRadius('');
      setBtnLoading(days);
      const payment = await onCreatePurchase(TOP_PRODUCT[days]);

      if (payment) {
        //  dispatch(paymentActions.createTopItem({days, payment}));
      }
    },
    [onCreatePurchase],
  );

  const onBuyVip = useCallback(
    async (radius: Payment.VipStatus) => {
      setCurrentRadius(radius);
      setCurrentDays(0);
      setBtnLoading(radius);
      const payment = await onCreatePurchase(radius);

      if (payment) {
        //   dispatch(paymentActions.createVipItem({radius, payment}));
      }
    },
    [onCreatePurchase],
  );

  const onRefresh = useCallback(() => {
    dispatch(userActions.fetchDetailAsync());

    setIsRefresh(true);
  }, []);

  useEffect(() => {
    if (isRefresh && !isLoading) {
      setIsRefresh(false);
    }
  }, [isLoading, isRefresh]);

  const productsData = useMemo(
    () => formatProducts({products}),
    [products, user],
  );


  return {
    onBuyTop,
    onBuyVip,
    isLoading,
    user,
    products: productsData,
    isBtnLoading,
    isRefresh,
    onRefresh,
    subscriptions,
  };
};
