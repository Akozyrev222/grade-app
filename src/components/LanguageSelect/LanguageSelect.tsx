import React, {FC, useEffect} from 'react';

import {useStyles} from './useStyles';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useData} from './useData';
import {Text} from '..';
import {Languages} from '@/i18n';

type TLang = {
  code: string;
  phone_mask: string;
};

type TProps = {
  onSelect: (code: TLang) => any;
};

export const LanguageSelect: FC<TProps> = ({onSelect}) => {
  const {styles} = useStyles();

  const {langs, currentLang, onChangeLanguage} = useData();

  return (
    <Menu>
      <MenuTrigger customStyles={styles}>
        <Text>
          <Text size={24}>{currentLang.flag}</Text>
        </Text>
      </MenuTrigger>
      <MenuOptions customStyles={styles}>
        {langs.map((lang) => (
          <MenuOption
            key={`code-${lang.lang}`}
            onSelect={() => onChangeLanguage(lang.lang as Languages)}>
            <Text>
              <Text size={24}>{lang.flag}</Text>
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};
