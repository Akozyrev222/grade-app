import {Chevron} from '@/assets';
import {
  Header,
  InfoModal,
  Loader,
  Selectbox,
  TagsInput,
  Text,
} from '@/components';
import {LightLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {FilterStackParamList} from '@/navigation/FIlterNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';

import {useData} from './useData';
import {useStyles} from './useStyles';

type TProps = StackScreenProps<FilterStackParamList, Routes.FILTER_LIST> & {
  value: keyof typeof Routes;
};

export const FilterList: FC<TProps> = ({navigation, route, value = ''}) => {
  const {styles, iconColor} = useStyles();
  const {
    distances,
    isLoading,
    distance,
    specialization,
    onCreateTag,
    onRemoveTag,
    tags,
    onReset,
    handleSubmit,
    onSaveTmpDetail,
    role,
    isOpened,
    setIsOpened,
    onOpenModal,
    neededStatus,
    user,
    filter,
  } = useData();

  const {t} = useTranslation();

  if (isLoading) {
    return (
      <LightLayout>
        <View style={styles.header}>
          <Header
            leftIcon="reset"
            rightIcon="search"
            onPressLeftIcon={() => {
              onReset();

              if (role !== 'customer') {
                navigation.navigate(Routes.HOME, {screen: Routes.HOME_LIST});
              } else {
                navigation.navigate(Routes.HOME, {
                  screen: Routes.EXECUTOR_LIST,
                });
              }
            }}
            onPressRightIcon={() => {
              handleSubmit();

              if (role !== 'customer') {
                navigation.navigate(Routes.HOME, {screen: Routes.HOME_LIST});
              } else {
                navigation.navigate(Routes.HOME, {
                  screen: Routes.EXECUTOR_LIST,
                });
              }
            }}>
            {t('filter.title')}
          </Header>
        </View>
        <View style={styles.container}>
          <Loader height={200} />
        </View>
      </LightLayout>
    );
  }

  return (
    <LightLayout>
      <View style={styles.header}>
        <Header
          leftIcon="reset"
          rightIcon="search"
          onPressLeftIcon={() => {
            onReset();

            if (role !== 'customer') {
              navigation.goBack();
            } else {
              navigation.navigate(Routes.HOME, {
                screen: Routes.EXECUTOR_LIST,
              });
            }
          }}
          onPressRightIcon={() => {
            handleSubmit();

            if (role !== 'customer') {
              navigation.goBack();
            } else {
              navigation.navigate(Routes.HOME, {
                screen: Routes.EXECUTOR_LIST,
                value,
              });
            }
          }}>
          {t('filter.title')}
        </Header>
      </View>
      <View style={styles.container}>
        {!!user && (
          <Selectbox
            color="gray"
            onSelectTranslated={(item: any) => {
              onOpenModal(item);
            }}
            translatedItems={distances as any[]}
            current={distance?.name || t('filter.radius')}
          />
        )}

        <TouchableOpacity
          style={[styles.specialization, !user && {marginTop: 0}]}
          activeOpacity={0.6}
          onPress={() => {
            onSaveTmpDetail();
            navigation.navigate(Routes.SPECIALIZATION_LIST, {
              parent: 'FILTER',
              listOfSelectedSpecializations: filter.specialization
                ? [...filter.specialization]
                : [],
            });
          }}>
          <View>
            {specialization && specialization.length > 0 ? (
              specialization.map((item) => (
                <Text key={item.id}>{item.name}</Text>
              ))
            ) : (
              <Text>{t('filter.change_specialization')}</Text>
            )}
          </View>
          <Chevron fill={iconColor} size={14} />
        </TouchableOpacity>

        <TagsInput
          margin={{top: 16}}
          focusedColor="gray_single"
          blurColor="gray_single"
          tags={tags}
          onCreateTag={onCreateTag}
          onRemoveTag={onRemoveTag}
          error={false}
        />

        <Text margin={{top: 16}}>{t('filter.tags')}</Text>
      </View>

      <InfoModal
        buttonTitle={t('filter.modal.button')}
        renderTitle={
          <Text align="center" size={15} style={{textAlignVertical: 'center'}}>
            {t('filter.modal.title1')}
          </Text>
        }
        handleSubmit={() => {
          setIsOpened(false);
          navigation.navigate(Routes.VIP);
        }}
        onClose={(value) => setIsOpened(value)}
        visible={isOpened}
      />
    </LightLayout>
  );
};
