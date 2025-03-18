import React, {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Platform,
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import Clipboard from '@react-native-community/clipboard';

import {Text} from '@/components';
import {useStyles} from './useStyles';
import {InputKeysIcon, Text as TText} from '@/themes/palletes/types';
import {FieldError} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {err} from 'react-native-svg/lib/typescript/xml';

type TProps = TextInputProps & {
  label?: string;
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
  leftIcon?: ReactNode;

  errorEmpty?: boolean;
  focus?: boolean;
  required?: boolean;
  wrapperStyles?: StyleProp<ViewStyle>;

  customRef?: RefObject<TextInput>;
  textColor?: keyof TText;
};

export const FilledField: FC<TProps> = ({
  label,
  margin,
  blurColor = 'light',
  focusedColor = 'light_transparent',
  required = false,
  error,
  rightIcon,
  errorEmpty = false,
  leftIcon,
  focus = false,
  wrapperStyles,
  textColor = 'gray',
  onLayout = () => {},
  customRef,
  ...props
}) => {
  const {t} = useTranslation();

  const {styles, inputColor, placeholderColors} = useStyles();
  const focused = useMemo(() => new Animated.Value(0), []);

  const ref = useRef<TextInput>(null);

  // useEffect(() => {
  //   if (focus && ref.current) {
  //     ref.current.focus();
  //   }
  // }, [focus, ref]);

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

  const backgroundColor = useMemo(() => {
    return focused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        inputColor.background[blurColor] as string,
        inputColor.background[focusedColor] as string,
      ],
    });
  }, [focused, blurColor, focusedColor, focused, inputColor]);

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
    <View style={[margins, wrapperStyles]} onLayout={onLayout}>
      {!!label && (
        <Text margin={{bottom: 12}} color={textColor}>
          {label}{' '}
          {required && (
            <Text color="danger" family="roboto">
              *
            </Text>
          )}
        </Text>
      )}
      <Pressable onPress={() => ref.current?.focus()}>
        <Animated.View
          style={[styles.inputWrapper, {backgroundColor, borderColor}]}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <TextInput
            ref={(e) => {
              ref.current = e;
              if (customRef) {
                //@ts-ignore
                customRef.current = e;
              }
            }}
            {...props}
            style={[
              styles.input,
              props.multiline &&
                Platform.OS === 'android' && {
                  textAlignVertical: 'top',
                },
            ]}
            onBlur={(e) => {
              onBlur();
              props.onChangeText(props.value.trim());

              if (props?.onBlur) {
                props.onBlur(e);
              }
            }}
            onFocus={(e) => {
              onFocus();
              if (props.onFocus) {
                props.onFocus(e);
              }
            }}
            caretHidden={false}
            placeholderTextColor={placeholderColors}
          />
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </Animated.View>
      </Pressable>

      {!errorEmpty && (
        <Text margin={{top: 4, bottom: 4}} family="medium" color="danger">
          {!!error && t(`errors.${error.message}`)}
        </Text>
      )}
    </View>
  );
};
