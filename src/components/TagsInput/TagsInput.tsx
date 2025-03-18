import {Plus} from '@/assets';
import {TagCard} from '@/components';
import {InputKeysIcon, Text as TText} from '@/themes/palletes/types';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  TextInputProps,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Text} from '..';
import {useStyles} from './useStyles';

type TProps = TextInputProps & {
  label?: string;
  margin?: {
    right?: number;
    bottom?: number;
    top?: number;
    left?: number;
  };
  focusedColor?: InputKeysIcon;
  blurColor?: InputKeysIcon;
  onCreateTag: (text) => any;
  onRemoveTag: (id) => any;
  tags: {id: number; name: string}[];
  error: boolean;
  textColor?: keyof TText;
};

export const TagsInput: FC<TProps> = ({
  label,
  margin,
  blurColor = 'light',
  focusedColor = 'light_transparent',
  onCreateTag,
  onRemoveTag,
  tags,
  error,
  textColor = 'gray',
  onLayout = () => {},
  ...props
}) => {
  const {styles, inputColor, iconColor} = useStyles();

  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (isInput) {
      inputRef.current.focus();
    }
  }, [isInput]);

  const focused = useMemo(() => new Animated.Value(0), []);
  const onFocus = useCallback(() => {
    Animated.timing(focused, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const onBlur = useCallback(() => {
    Animated.timing(focused, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();

    setIsInput(false);
  }, [focused]);

  const margins = useMemo(
    () => ({
      marginTop: margin?.top || 0,
      marginBottom: margin?.bottom || 0,
      marginLeft: margin?.left || 0,
      marginRight: margin?.right || 0,
    }),
    [margin],
  );

  const backgroundColor = useMemo(() => {
    return focused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        inputColor.background[blurColor] as string,
        inputColor.background[focusedColor] as string,
      ],
    });
  }, [focused, blurColor, focusedColor, focused, inputColor]);
  const borderColor = useMemo(() => {
    return focused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        inputColor.border[error ? 'error' : focusedColor] as string,
        inputColor.border[error ? 'error' : blurColor] as string,
      ],
    });
  }, [focused, blurColor, focusedColor, focused, inputColor, error]);
  return (
    <View style={margins} onLayout={onLayout}>
      {!!label && (
        <Text margin={{bottom: 12}} color={textColor}>
          {label}
        </Text>
      )}

      <Animated.View
        style={[styles.wrapper, {backgroundColor, borderColor}, props.style]}>
        {tags.map((tag) => (
          <TagCard
            onRemove={() => onRemoveTag(tag.id)}
            tag={tag.name}
            key={`tag-${tag.id}`}
          />
        ))}
        {isInput ? (
          <TextInput
            {...props}
            ref={inputRef}
            style={styles.input}
            onFocus={onFocus}
            onBlur={() => {
              if (
                value &&
                tags.length <= 9 &&
                !tags.find(({name}) => name === value.trim())
              ) {
                onCreateTag(value.trim());
              }
              setValue('');
              onBlur();
              setIsInput(false);
              onBlur();
            }}
            value={value}
            onChangeText={(e) => {
              if (e.length < 30) {
                setValue(e);
              }
            }}
            onSubmitEditing={(e) => {
              if (
                value &&
                tags.length <= 9 &&
                !tags.find(({name}) => name === value.trim())
              ) {
                onCreateTag(value.trim());
              }
              setValue('');
              onBlur();
              setIsInput(false);
            }}
          />
        ) : (
          <Pressable
            style={styles.inputWrapper}
            onPress={() => setIsInput(true)}>
            <Plus fill={iconColor} size={14} />
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};
