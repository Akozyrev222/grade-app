import {Button, Header, Text} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {AuthStackParamList} from '@/navigation/AuthNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';

import {ScrollView, TouchableOpacity, View} from 'react-native';
import {$enum} from 'ts-enum-util';
import {useData} from './useData';
import {useStyles} from './useStyles';
import {Languages} from '@/i18n';

type TProps = StackScreenProps<AuthStackParamList, Routes.CHANGE_LANG> & {
  fromRoot?: boolean;
};

export const ChangeLang: FC<TProps> = ({navigation, fromRoot}) => {
  const {styles} = useStyles();
  const {onChangeLanguage, langIcons} = useData();

  const {t} = useTranslation();

  return (
    <GradientLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {$enum(Languages).map((lang) => {
            const Icon = langIcons[lang];

            return (
              <View key={lang} style={[styles.itemWrapper]}>
                <TouchableOpacity
                  style={styles.item}
                  activeOpacity={0.5}
                  onPress={() => onChangeLanguage(lang)}>
                  <Icon size={90} />
                  <Text
                    color="light"
                    size={12}
                    line={20}
                    style={[
                      styles.text,
                      {
                        marginTop: lang === 'en' ? 12 : 0,
                      },
                    ]}>
                    {t(`locales.${lang}`)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </GradientLayout>
  );
};
