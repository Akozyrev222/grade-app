import {createContext} from 'react';
import {StatusBarStyle} from 'react-native';

//themes
import {Pallete} from './palletes/';
import * as palletes from './palletes/';

export enum ThemesName {
  LIGHT = 'light',
}

export enum Fonts {
  black = 'Raleway-Black',
  bold = 'Raleway-Bold',
  light = 'Raleway-Light',
  medium = 'Raleway-Medium',
  regular = 'Raleway-Regular',
  roboto = 'Roboto-Regular',
}

type ThemesItem = {
  pallete: Pallete;
  name: ThemesName;
  statusBarStyle: StatusBarStyle;
  fonts: typeof Fonts;
};

type Themes = {
  light: ThemesItem;
};

export const themes: Themes = {
  light: {
    pallete: palletes[ThemesName.LIGHT],
    name: ThemesName.LIGHT,
    statusBarStyle: 'dark-content',
    fonts: Fonts,
  },
  // dark: {
  //   pallete: palletes[ThemesName.DARK],
  //   name: ThemesName.DARK,
  //   statusBarStyle: 'light-content',
  //   fonts: Fonts,
  // },
};

export const ThemeContext = createContext(themes[ThemesName.LIGHT]);
