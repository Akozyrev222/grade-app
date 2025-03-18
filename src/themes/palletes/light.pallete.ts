import type {Pallete} from './types';

const pallete: Pallete = {
  background: {
    blur: '#FFFFFF33',
    light: '#FFFFFF',
    transparent: '#FFFFFF00',
    gray: '#17264B0D',
    light_gray: '#17264B0D',
    dark: '#17264B',
    dark_blur: '#FFFFFFD2',
    action: '#EB84DA',
    danger: '#E23232',
    white: '#00000040',
    pink: '#F2ECFF',

    light_blue: '#96D5E0',

    actionBlur: '#DED0FF',
    blue: '#BDD5F3',
    white: '#FFFFFF',
  },
  text: {
    default: '#17264B',
    gray: '#17264BB2',
    success: '#0A9372',
    danger: '#CD3737',
    light: '#FFFFFF',
    warning: 'yellow',
    light_gray: '#17264B80',
    dark: '#000000',
    action: '#EB84DA',
    green: '#0A9372',
  },
  icon: {
    default: '#182850',
    gray: '#D1D4DB',
    light: '#FFFFFF',
    dark: '#151B29',
    blur: '#17264BB2',
    dark_gray: '#9D9BB2',
    light_blur: '#62AFBD',
    danger: '#CD3737',
  },
  button: {
    background: {
      default: '#182850',
      gray: '#FFFFFF33',
      danger: '#CD3737',
      success: '#0A9372',
      transparent: '#FFFFFF00',
      warning: 'yellow',
      info: '#2B56C0',
      disabled: '#C4C8D3',
      light: '#C8D2EC',
      white: '#FFFFFF',
    },
    text: {
      default: '#FFFFFF',
      gray: '#17264B',
      danger: '#FFFFFF',
      success: '#FFFFFF',
      transparent: '#17264B',
      warning: '#17264B',
      info: '#fff',
      disabled: '#FFFFFF',
      light: '#17264B',
      white: '#17264B',
    },
  },
  border: {
    default: '#182850',
    blur: 'rgba(255, 255, 255, 0.5)',
    gray: '#17264B',
    danger: '#FF6666',
    light: '#fff',
    success: '#0A9372',
    transparent: '#ffffff00',
  },

  input: {
    background: {
      light: '#FFFFFF33',
      light_transparent: '#FFFFFF00',

      // error: '#FF6666',
      transparent: 'transparent',

      gray: '#17264B0D',
      gray_transparent: '#17264B00',
      gray_single: '#17264B0D',
      light_gray: '#F3F4F6',
      dark: '#17264B1A',
    },
    border: {
      light_transparent: 'transparent',
      light: '#FFFFFF33',

      error: '#E23232',
      transparent: 'transparent',

      gray: '#17264B30',
      gray_transparent: 'transparent',
      gray_single: '#17264B0D',

      dark: '#17264B1A',
    },
  },
};

export default pallete;
