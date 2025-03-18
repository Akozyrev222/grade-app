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

type TCode = {
  code: string;
  phone_mask: string;
};

type TProps = {
  onSelect: (code: TCode) => any;
  code?: any;
};

export const CountryCode: FC<TProps> = ({onSelect, code}) => {
  const {styles} = useStyles();

  const {codes, id, setId, currentCode} = useData(code);

  useEffect(() => {
    if (code) {
      setId(codes.find((item) => item.code === code).id);
    }
  }, []);

  useEffect(() => {
    if (currentCode) {
      onSelect({
        code: currentCode.code,
        phone_mask: currentCode.mask,
      });
    }
  }, [currentCode]);
    return (
    <Menu>
      <MenuTrigger>
        <Text>
          <Text size={14}>{currentCode.flag} </Text>
          <Text size={14}>{currentCode.code}</Text>
        </Text>
      </MenuTrigger>
      <MenuOptions customStyles={styles}>
        {codes.map((code) => (
          <MenuOption key={`code-${code.lang}`} onSelect={() => setId(code.id)}>
            <Text>
              <Text style={{marginRight: 5}}>{code.flag} </Text>
              <Text>{code.code}</Text>
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};
