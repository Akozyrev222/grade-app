import React, {FC, useMemo} from 'react';

import {useStyles} from './useStyles';
import {useData} from './useData';
import {GradientLayout} from '@/layouts';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {
  Button,
  CameraSelector,
  CurrencyButtons,
  FilledField,
  Header,
  ImageCard,
  Loader,
  Text,
} from '@/components';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '@/navigation/HomeNavigator';
import {Routes} from '@/navigation';
import {Plus} from '@/assets';

type TProps = StackScreenProps<HomeStackParamList, Routes.APPLICATION_CREATE>;

export const ApplicationCreate: FC<TProps> = ({navigation, route}) => {
  const {id} = route.params;

  const {styles, iconColor} = useStyles();
  const {
    control,
    errors,
    handleSubmit,
    onUpload,
    cameraRef,
    images,
    onRemoveImage,
    isLoading,
    activeCurrency,
    setActiveCurrency,
  } = useData({id});

  const {t} = useTranslation();
  const renderImagePicker = useMemo(() => {
    if (images.length) {
      return (
        <View style={styles.images}>
          {images.map((image, index) => (
            <ImageCard
              uri={image.uri}
              onRemove={() => onRemoveImage(image.uri)}
              key={`image-${image.uri}`}
              marginRight={(index + 1) % 4 === 0 ? 0 : 8}
            />
          ))}

          {images.length < 10 && (
            <TouchableOpacity
              style={styles.plus}
              activeOpacity={0.6}
              onPress={() => {
                cameraRef.current.show();
              }}>
              <Plus size={18} fill={iconColor} />
            </TouchableOpacity>
          )}
        </View>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{alignSelf: 'flex-start'}}
        onPress={() => {
          cameraRef.current.show();
        }}>
        <Text margin={{top: 12, bottom: 16}}>
          +{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            {t('order_form.photo_add')}
          </Text>
        </Text>
      </TouchableOpacity>
    );
  }, [images]);
  return (
    <GradientLayout>
      <View style={styles.header}>
        <Header leftIcon="back" onPressLeftIcon={() => navigation.goBack()}>
          {t('application_form.title')}
        </Header>
      </View>
      {isLoading ? (
        <Loader height={200} />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <Controller
              control={control}
              name="price"
              render={({field: {name, onBlur, onChange, value}}) => (
                <FilledField
                  label={t('application_form.fields.labels.price')}
                  placeholder={t('application_form.fields.placeholders.price')}
                  error={errors[name]}
                  value={value}
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <CurrencyButtons
              hide={false}
              onPress={setActiveCurrency}
              activeCurrency={activeCurrency}
              containerStyles={styles.currencyWrapper}
            />
            <Controller
              control={control}
              name="description"
              render={({field: {name, onBlur, onChange, value}}) => (
                <FilledField
                  label={t('application_form.fields.labels.comment')}
                  placeholder={t(
                    'application_form.fields.placeholders.comment',
                  )}
                  error={errors[name]}
                  style={styles.comment}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                />
              )}
            />
            {renderImagePicker}
          </ScrollView>
          <Button
            onPress={handleSubmit}
            margin={{left: 16, right: 16, bottom: 16}}
            size="large">
            {t('buttons.send')}
          </Button>
        </>
      )}
      <CameraSelector
        cameraRef={cameraRef}
        limit={10}
        onUploadItems={onUpload}
      />
    </GradientLayout>
  );
};
