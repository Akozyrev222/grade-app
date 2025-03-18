import {Close, SearchTabBar} from '@/assets';
import {Fonts} from '@/themes';
import {InputKeysIcon} from '@/themes/palletes/types';
import React, {FC, ReactNode, RefObject, useEffect, useState} from 'react';
import {FieldError} from 'react-hook-form';

import {
  StyleProp,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {FilledField} from '../';
import {useStyles} from './useStyles';

type TProps = TextInputProps & {
  callback: (value: string) => any;
  placeholder?: string;
  error: FieldError;
  leftIcon?: ReactNode;
  numberOfLines?: 1;
  family?: keyof typeof Fonts;
  rightIcon?: ReactNode;
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  hiddenRightIcon?: boolean;
  clearCallback?: (value: string) => any;

  focusedColor?: InputKeysIcon;
  blurColor?: InputKeysIcon;

  errorEmpty?: boolean;
  focus?: boolean;
  wrapperStyles?: StyleProp<ViewStyle>;

  customRef?: RefObject<TextInput>;
};

export const DebounceField: FC<TProps> = ({
  callback,
  hiddenRightIcon,
  clearCallback = () => {},
  ...props
}) => {
  const [value, setValue] = useState(props.value || '');

  const [timer, setTimer] = useState<any | null>(null);
  const [isAccessFetch, setIsAccessFetch] = useState(false);

  const {styles, iconColor} = useStyles();

  useEffect(() => {
    if (isAccessFetch) {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          callback(value);
        }, 500),
      );
    }
  }, [value, isAccessFetch]);

  return (
    <FilledField
      {...props}
      leftIcon={<SearchTabBar fill={iconColor} size={18} isFocused={false} />}
      rightIcon={
        hiddenRightIcon ? null : (
          <TouchableOpacity
            onPress={() => {
              clearCallback(value);
              setValue('');
            }}>
            <Close fill={iconColor} size={18} />
          </TouchableOpacity>
        )
      }
      value={value}
      onChangeText={(text) => {
        if (!isAccessFetch) {
          setIsAccessFetch(true);
        }
        setValue(text);
      }}
    />
  );
};
