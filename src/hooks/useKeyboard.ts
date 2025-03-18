import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const useKeyboard = () => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setIsOpened(true);
    });

    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setIsOpened(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isOpened;
};
