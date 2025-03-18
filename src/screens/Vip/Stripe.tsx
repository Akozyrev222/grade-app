import {
  PlatformPay,
  PlatformPayButton,
  useStripe,
} from '@stripe/stripe-react-native';
import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import ENV from '@/configs';

export const StripePayment = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    // const response = await fetch(`${ENV.BASE_URL}/payment-sheet`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const { paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent:
        'pi_3OqhD62eZvKYlo2C1ifNTW71_secret_wVfUUp0cgLsdCYV6tAyrfR5VM',
      ephemeralKey:
        'ek_test_YWNjdF8xMDMyRDgyZVp2S1lsbzJDLFc3czZYa0pXTk5jb2JBeElJUFJQczVJNWQ1M1NQOTI_008DgGwiqK',
      customer: 'cus_Pg1qadsfnjdJOX',
    };
  };

  const initializePaymentSheet = async () => {
    try {
      const {paymentIntent, ephemeralKey, customer} =
        await fetchPaymentSheetParams();

      const {error} = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        googlePay: {
          merchantCountryCode: 'US',
          testEnv: true, // use test environment
        },
        applePay: {
          merchantCountryCode: 'US',
        },
      });
      if (!error) {
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openPaymentSheet = async () => {
    const {error, paymentOption} = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={{marginTop: 400}}>
      <Button disabled={!loading} title="Checkout" onPress={openPaymentSheet} />
    </View>
  );
};
