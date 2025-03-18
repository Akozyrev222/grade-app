import {
  Button,
  Header,
  Loader,
  SpecializationCard,
  TagsInput,
  Text,
} from '@/components';
import {GradientLayout} from '@/layouts';
import {Routes} from '@/navigation';
import {ProfileStackParamList} from '@/navigation/ProfileNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import {useData} from './useData';
import {useStyles} from './useStyles';
import {Platform} from 'react-native';

type TProps = StackScreenProps<ProfileStackParamList, Routes.CREATE_EXECUTOR>;

export const CreateExecutor: FC<TProps> = ({navigation}) => {
  const {
    control,
    handleSubmit,
    isLoading,
    specializationData,
    specializationString,
  } = useData();

  const {styles} = useStyles();

  const {t} = useTranslation();

  return (
    <GradientLayout>
      <View style={styles.header}>
        <Header leftIcon="back" onPressLeftIcon={navigation.goBack}></Header>
      </View>
      {isLoading ? (
        <Loader height={200} />
      ) : (
        <ScrollView
          style={styles.wrapper}
          contentContainerStyle={{paddingVertical: 12}}>
          <Controller
            control={control}
            name="tags_array"
            render={({field: {value, onChange}, fieldState: {error}}) => (
              <>
                <TagsInput
                  error={!!error?.message}
                  tags={value}
                  label={t('sign_up.fields.tags')}
                  textColor="default"
                  onCreateTag={(name) =>
                    onChange([...value, {name, id: new Date().getTime()}])
                  }
                  onRemoveTag={(id) =>
                    onChange(value.filter((item) => item.id !== id))
                  }
                />
                <Text color="danger">
                  {!!error?.message && t(`errors.${error?.message}`)}
                </Text>
              </>
            )}
          />

          <Text margin={{top: 16, bottom: 8}}>
            {t('sign_up.fields.specialization')}
          </Text>

          <Controller
            control={control}
            name="specialities"
            render={({field: {value}, fieldState: {error}}) => (
              <>
                <SpecializationCard
                  color="gray"
                  name={
                    !specializationString.length
                      ? t('sign_up.fields.change_specialization')
                      : specializationString
                  }
                  onPress={() => {
                    navigation.navigate(Routes.SPECIALIZATION_LIST, {
                      parent: 'PROFILE_LIST',
                      listOfSelectedSpecializations: specializationData || [],
                    });
                  }}
                  error={!!error?.message}
                />
                <Text color="danger">
                  {!!error?.message && t(`errors.${error?.message}`)}
                </Text>
              </>
            )}
          />
        </ScrollView>
      )}

      {!isLoading && (
        <View style={styles.footer}>
          <View style={Platform.OS !== 'ios' && styles.btnAndroid}>
            <Button onPress={handleSubmit} size="large">
              {t('buttons.save')}
            </Button>
          </View>
        </View>
      )}
    </GradientLayout>
  );
};
