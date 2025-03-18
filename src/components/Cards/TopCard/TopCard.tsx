import React, {FC} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '@/components';
import {useStyles} from './useStyles';
import {useTranslation} from 'react-i18next';
import {Product} from 'react-native-iap';
import {RadioButton} from '@/components/RadioButton';
import {Pressable, View} from 'react-native';

type TProps = {
  active: boolean;
  day: number;
  product: Product | null;
  setPurchaseType: () => any;
};

export const TopCard: FC<TProps> = ({
  day,
  product,
  setPurchaseType,
  active,
}) => {
  const {styles} = useStyles();

  const {t} = useTranslation();

  return (
    <Pressable onPress={setPurchaseType}>
    <LinearGradient
      style={styles.wrapper}
      start={{x: 0, y: 0}}
      end={{x: 0.7, y: 0}}
      colors={['rgba(255, 255, 255, 0.35)', 'rgba(255, 255, 255, 0)']}>
      <View style={styles.row}>
        <RadioButton active={active} setPurchaseType={setPurchaseType} />
        <Text family="bold" size={14} style={{}}>
          {day} {t(`vip.top.${day < 4 ? 'days' : 'day'}`)}
        </Text>
      </View>

      <Text color="action" family="bold" size={14}>
        {product?.oneTimePurchaseOfferDetails?.formattedPrice || product?.localizedPrice || 0}
      </Text>
    </LinearGradient>
    </Pressable>
  );
};
