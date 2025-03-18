import {ColorValue} from 'react-native';

export type Background = {
  blur: ColorValue;
  dark_blur: ColorValue;
  light: ColorValue;
  gray: ColorValue;
  light_gray: ColorValue;
  white: ColorValue;
  transparent: ColorValue;
  dark: ColorValue;
  action: ColorValue;
  danger: ColorValue;

  pink: ColorValue;

  blue: ColorValue;
  light_blue: ColorValue;
  actionBlur: ColorValue;
  white: ColorValue;
};

export type Text = {
  default: ColorValue;
  gray: ColorValue;
  success: ColorValue;
  danger: ColorValue;
  light: ColorValue;
  warning: ColorValue;
  light_gray: ColorValue;
  dark: ColorValue;
  action: ColorValue;
  green: ColorValue;
};

export type Icon = {
  default: ColorValue;
  gray: ColorValue;
  light: ColorValue;
  dark: ColorValue;
  blur: ColorValue;
  light_blur: ColorValue;
  dark_gray: ColorValue;
  danger: ColorValue;
};

type Input = {
  background: {
    light_transparent: ColorValue;
    light: ColorValue;

    // error: ColorValue;
    transparent: ColorValue;

    gray: ColorValue;
    gray_transparent: ColorValue;
    gray_single: ColorValue;
    light_gray: ColorValue;
    dark: ColorValue;
  };
  border: {
    light_transparent: ColorValue;
    light: ColorValue;

    transparent: ColorValue;
    error: ColorValue;

    gray: ColorValue;
    gray_transparent: ColorValue;
    gray_single: ColorValue;

    dark: ColorValue;
  };
};

type Button = {
  background: {
    default: ColorValue;
    gray: ColorValue;
    danger: ColorValue;
    info: ColorValue;
    success: ColorValue;
    transparent: ColorValue;
    warning: ColorValue;
    disabled: ColorValue;
    light: ColorValue;
    white: ColorValue;
  };
  text: {
    default: ColorValue;
    gray: ColorValue;
    danger: ColorValue;
    success: ColorValue;
    transparent: ColorValue;
    warning: ColorValue;
    info: ColorValue;
    disabled: ColorValue;
    light: ColorValue;
    white: ColorValue;
  };
};
type Border = {
  default: ColorValue;
  blur: ColorValue;
  gray: ColorValue;
  danger: ColorValue;
  light: ColorValue;
  success: ColorValue;
  transparent: ColorValue;
};

export type ButtonKeysIcon = keyof Button['background'];
export type InputKeysIcon = keyof Input['background'];

export type Pallete = {
  background: Background;
  text: Text;
  icon: Icon;
  button: Button;
  border: Border;
  input: Input;
};
