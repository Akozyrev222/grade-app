import {InputKeysIcon} from '@/themes/palletes/types';
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {FieldError} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {Animated, TextInput, TextInputProps, View} from 'react-native';

import {mask} from 'react-native-mask-text';
import {Text} from '..';
import {useStyles} from './useStyles';

type TProps = TextInputProps & {
  phone_mask: string | string[];
  label?: string;
  margin?: {
    right?: number;
    bottom?: number;
    top?: number;
    left?: number;
  };
  error: FieldError | null;
  focusedColor?: InputKeysIcon;
  blurColor?: InputKeysIcon;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  setPhoneValue?: any;
  value: string;
  has_error?: boolean;
};

export const MaskedField: FC<TProps> = ({
  phone_mask,
  margin,
  focusedColor = 'light_transparent',
  blurColor = 'light',
  label,
  error,
  rightIcon,
  value,
  has_error = true,
  leftIcon,
  onLayout = () => {},
  setPhoneValue = () => {},
  ...props
}) => {
  const {t} = useTranslation();

  const {styles, inputColor} = useStyles();
  const focused = useMemo(() => new Animated.Value(0), []);
  const margins = useMemo(
    () => ({
      marginTop: margin?.top || 0,
      marginBottom: margin?.bottom || 0,
      marginLeft: margin?.left || 0,
      marginRight: margin?.right || 0,
    }),
    [margin],
  );
  const onFocus = useCallback(() => {
    Animated.timing(focused, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const onBlur = useCallback(() => {
    Animated.timing(focused, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  useEffect(() => {
    const newValue = mask(value, phone_mask);

    props.onChangeText(newValue);
  }, [phone_mask, value]);

  const backgroundColor = useMemo(() => {
    return focused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        inputColor.background[blurColor] as string,
        inputColor.background[focusedColor] as string,
      ],
    });
  }, [focused, blurColor, focusedColor, focused, inputColor, error]);
  const borderColor = useMemo(() => {
    return focused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        inputColor.border[error ? 'error' : focusedColor] as string,
        inputColor.border[error ? 'error' : blurColor] as string,
      ],
    });
  }, [focused, blurColor, focusedColor, , focused, inputColor, error]);

  return (
    <View style={margins} onLayout={onLayout}>
      {!!label && (
        <Text margin={{bottom: 12}} color="gray">
          {label}
        </Text>
      )}
      <Animated.View
        style={[styles.inputWrapper, {backgroundColor, borderColor}]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          {...props}
          value={value}
          style={[styles.input, props.style]}
          onBlur={onBlur}
          onFocus={onFocus}
          onChangeText={(value) => {
            setPhoneValue(value);
            props.onChangeText(value);
          }}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </Animated.View>
      {has_error && (
        <Text margin={{top: 4}} family="medium" color="danger">
          {!!error && t(`errors.${error.message}`)}
        </Text>
      )}
    </View>
  );
};
