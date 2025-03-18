import {Category} from '@/bus/category';
import {Text} from '@/components';
import React, {FC} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useStyles} from './useStyles';

type TProps = {
  category: Category.Item;
  onPress: () => any;
};

export const CategoryCard: FC<TProps> = ({category, onPress}) => {
  const {styles} = useStyles();

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => onPress()}
      activeOpacity={0.8}>
      <Text family="medium">{category.title}</Text>

      <View style={styles.counter}>
        <Text color="light" family="medium">
          {category.children_count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
