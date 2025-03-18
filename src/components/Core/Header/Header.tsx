import {Back, Close, Helping, Trash} from '@/assets';
import {QRCode} from '@/assets/icons/QRCode';
import {Fonts} from '@/themes';
import React, {FC, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {Pressable, View, TouchableOpacity} from 'react-native';

import {Text} from '../Text';
import {useStyles} from './useStyles';
import {useSelector} from 'react-redux';
import {appSelectors} from '@/bus/app';

type TProps = {
  children?: string;
  leftIcon?: 'back' | 'reset' | 'close';
  rightIcon?:
    | 'close'
    | 'helping'
    | 'search'
    | 'send'
    | 'remove'
    | 'qr_code'
    | Array<{name: string; onPress: () => void}>;
  onPressRightIcon?: () => any;
  onPressLeftIcon?: () => any;

  size?: number;
  family?: keyof typeof Fonts;

  padding?: number;
};

export const Header: FC<TProps> = ({
  leftIcon,
  children,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  family = 'medium',
  size = 14,
  padding = 16,
}) => {
  const {styles, iconColor} = useStyles();

  const {t} = useTranslation();

  const locale = useSelector(appSelectors.getLanguage);

  const renderRightIcon = useCallback(
    (rightIcon: string) => {
      switch (rightIcon) {
        case 'close':
          return <Close fill={iconColor} size={14} />;
        case 'helping':
          return (
            <View style={styles.helping}>
              <Text style={{
                color: '#17264B',
                fontSize: 14,
                fontWeight: '600',
                //lineHeight: 24,
                marginRight: 8
              }}>{t('header.helping')}</Text>
              <Helping size={24} fill={iconColor} />
            </View>
          );
        case 'qr_code':
          return (
            <View style={styles.helping}>
              <QRCode size={30} fill={iconColor} />
            </View>
          );
        case 'search':
          return (
            <Text family="medium" color="success">
              {t('header.search')}
            </Text>
          );
        case 'send':
          return (
            <Text family="medium" color="success">
              {t('header.send')}
            </Text>
          );
        case 'remove':
          return <Trash color={iconColor} size={24} />;
        default:
          return null;
      }
    },
    [rightIcon],
  );

  const RenderLeftIcon = () => {
    switch (leftIcon) {
      case 'back':
        return (
          <>
            <Back fill={iconColor} size={12} />
            <Text family="medium" margin={{left: 4}}>
              {t('header.back')}
            </Text>
          </>
        );
      case 'reset':
        return (
          <Text family="medium" color="light_gray">
            {t('header.reset')}
          </Text>
        );

      case 'close':
        return (
          <Text family="medium" color="light_gray">
            {t('header.close')}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.wrapper, {paddingHorizontal: padding}]}>
      {!!RenderLeftIcon && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.leftIconWrapper]}
          onPress={onPressLeftIcon}>
          <RenderLeftIcon />
        </TouchableOpacity>
      )}
      <View
        style={[styles.title, leftIcon === 'back' && {paddingHorizontal: 76}]}>
        {!!children && (
          <Text
            style={{width: '100%'}}
            family={family}
            size={size}
            align="center"
            numberOfLines={1}
            ellipsizeMode="tail">
            {children}
          </Text>
        )}
      </View>
      {!!renderRightIcon && typeof rightIcon === 'string' && (
        <TouchableOpacity
          style={styles.rightIconWrapper}
          activeOpacity={0.6}
          onPress={onPressRightIcon}>
          {renderRightIcon(rightIcon)}
        </TouchableOpacity>
      )}
      {Array.isArray(rightIcon) &&
        rightIcon.map((item) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.rightIconWrapper}
              activeOpacity={0.6}
              onPress={item.onPress}>
              {renderRightIcon(item.name)}
            </TouchableOpacity>
          );
        })}
    </View>
  );
};
