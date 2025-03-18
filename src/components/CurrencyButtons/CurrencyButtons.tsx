import {useTheme} from '@/hooks';
import React, {FC} from 'react';

import {Text, Pressable, View, StyleProp, ViewStyle} from 'react-native';
import {useStyles} from './useStyles';
import {useSelector} from 'react-redux';
import {Currencies, currenciesSelectors} from '@/bus/currencies';

type TProps = {
  hide: boolean;
  activeCurrency: Currencies.Item;
  onPress(val: Currencies.Item): void;
  containerStyles?: StyleProp<ViewStyle>;
};

export const CurrencyButtons: FC<TProps> = ({
  hide,
  activeCurrency,
  onPress,
  containerStyles,
}) => {
  const {styles} = useStyles();
  const {pallete} = useTheme();
  const currencies = useSelector(currenciesSelectors.getItems);

  return hide ? null : (
    <View style={[styles.wrapper, containerStyles]}>
      {currencies?.map((i) => (
        <Pressable
          key={i.code}
          style={[
            styles.button,
            {
              backgroundColor:
                activeCurrency?.code === i.code
                  ? pallete.button.background.white
                  : pallete.button.background.gray,
            },
          ]}
          onPress={() => onPress(i)}>
          <Text style={styles.text}>{i.label}</Text>
        </Pressable>
      ))}
    </View>
  );
};
