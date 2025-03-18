import {InputKeysIcon, Text as TText} from '@/themes/palletes/types';
import Geolocation from '@react-native-community/geolocation';
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {FieldError} from 'react-hook-form';

import {Animated, Keyboard, TextInputProps, View} from 'react-native';
import {FilledField, Text} from '../Core';

import Geocoder from '@timwangdev/react-native-geocoder';
import {useStyles} from './useStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LatLng} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {appSelectors} from '@/bus/app';
import {current} from '@reduxjs/toolkit';

import ENV from '@/configs';

type TProps = TextInputProps & {
  label?: string;
  cords: LatLng | null;
  margin?: {
    right?: number;
    bottom?: number;
    top?: number;
    left?: number;
  };
  error: FieldError;
  focusedColor?: InputKeysIcon;
  blurColor?: InputKeysIcon;
  rightIcon?: ReactNode;
  onSetLocation: (location: LatLng) => any;
  isNotFromGeocoder: boolean;
  setIsNotFromGeocoder: (value: boolean) => any;
  required?: boolean;
  textColor?: keyof TText;
};

export const GeoCoderField: FC<TProps> = ({
  value,
  margin,
  onSetLocation,
  cords,
  isNotFromGeocoder,
  setIsNotFromGeocoder,
  label,
  onLayout = () => {},
  ...props
}) => {
  const {styles} = useStyles();

  const [items, setItems] = useState<{name: string; id: string}[]>([]);

  const [timer, setTimer] = useState<any | null>(null);
  const [isAccessFetch, setIsAccessFetch] = useState(false);

  const locale = useSelector(appSelectors.getLanguage);

  const margins = useMemo(
    () => ({
      marginTop: margin?.top || 0,
      marginBottom: margin?.bottom || 0,
      marginLeft: margin?.left || 0,
      marginRight: margin?.right || 0,
    }),
    [margin],
  );

  const onDecode = useCallback(
    async (location: string) => {
      try {
        const res = await Geocoder.geocodeAddressGoogle(location, {
          locale,
          apiKey: ENV.API_KEY,
        });

        if (res.length) {
          const coords = res[0].position;

          onSetLocation({latitude: coords.lat, longitude: coords.lng});

          setItems([]);
        }
      } catch (e) {
        console.log(`error decode ${e}`);
      }
    },
    [items, locale],
  );

  useEffect(() => {
    if (isAccessFetch) {
      clearTimeout(timer);
      if (!isNotFromGeocoder) {
        setTimer(
          setTimeout(async () => {
            try {
              const res = await Geocoder.geocodeAddressGoogle(value, {
                locale,
                apiKey: ENV.API_KEY,
              });

              if (res.length > 1) {
                const results = res.map((item) => {
                  const locationsArr = [
                    item.adminArea,
                    item.locality,
                    item.streetName,
                    item.streetNumber,
                  ]
                    .filter((item) => item)
                    .join(', ');

                  const name = locationsArr;

                  return {
                    name,
                    id: `${item.position.lat}-${item.position.lng}`,
                  };
                });

                setItems(results);
              } else {
                if (res.length) {
                  const locationName = [
                    res[0].adminArea,
                    res[0].locality,
                    res[0].streetName,
                    res[0].streetNumber,
                  ]
                    .filter((item) => item)
                    .join(', ');

                  if (value === locationName) {
                    onSetLocation({
                      latitude: res[0].position.lat,
                      longitude: res[0].position.lng,
                    });
                    setItems([]);
                  } else {
                    setItems([
                      {
                        name: locationName,
                        id: `${res[0].position.lat}-${res[0].position.lng}`,
                      },
                    ]);
                  }
                }
              }
            } catch (e) {
              console.log(`error parse address ${e}`);
              setItems([]);
            }
          }, 500),
        );
      }
    }
  }, [value, isAccessFetch, isNotFromGeocoder, locale]);

  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        styles.wrapper,
        {height: (label ? 88 : 48) + items.length * 42},
        margins,
        props.style,
      ]}>
      <FilledField
        {...props}
        value={value}
        errorEmpty
        label={label}
        onChangeText={(text) => {
          if (!isAccessFetch) {
            setIsAccessFetch(true);
          }
          setIsNotFromGeocoder(false);

          props.onChangeText(text);
        }}
      />
      {items.map((item) => (
        <TouchableOpacity
          style={styles.item}
          key={`address-item-${item.id}`}
          activeOpacity={0.6}
          onPress={() => {
            props.onChangeText(item.name);
            setItems([]);
            onDecode(item.name);
            Keyboard.dismiss();
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};
