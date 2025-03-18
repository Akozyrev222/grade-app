import {authSelectors, authActions} from '@/bus/auth';
import {uiSelectors} from '@/bus/ui';
import {userSelectors, userActions} from '@/bus/user';
import {Routes} from '@/navigation';
import {useIsFocused} from '@react-navigation/native';
import {useEffect, useCallback, useState, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
export const useData = (parent: keyof typeof Routes) => {
  const dispatch = useDispatch();

  const phoneData = useSelector(authSelectors.getPhone);
  const isLoading = useSelector(uiSelectors.getLoading('code'));

  const user = useSelector(userSelectors.getDetail);

  const isFocused = useIsFocused();

  const deadLine = useMemo(() => 120000, [isFocused]);

  const [isSubmit, setIsSubmit] = useState(false);

  const [time, setTime] = useState(deadLine);
  const [timer, setTimer] = useState(null);

  const onClock = useCallback(() => {
    setTime((prev) => prev - 1000);
  }, []);

  useEffect(() => {
    setIsSubmit(!isFocused);
    if (isFocused) {
      if (time - 1000 <= 0) {
        clearTimeout(timer);
        setTime(0);
        setTimer(null);
      } else {
        setTimer(setTimeout(onClock, 1000));
      }
    } else {
      clearTimeout(timer);
      setTimer(null);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [time, isFocused]);

  const timeData = useMemo(() => {
    const data = new Date(time);

    const secondsData = data.getSeconds();
    const minutesData = data.getMinutes();

    const minutes = `${minutesData < 10 ? `0${minutesData}` : minutesData}`;
    const seconds = `${secondsData < 10 ? `0${secondsData}` : secondsData}`;
    return !minutesData && !secondsData ? '' : `${minutes}: ${seconds}`;
  }, [time]);

  const onSendCode = useCallback(() => {
    if (phoneData) {
      dispatch(authActions.sendCodeAsync({phone: phoneData}));
    }
  }, [phoneData]);

  const handleSubmit = useCallback(
    (value: string) => {
      const phone = `${phoneData.code} ${phoneData.value}`;
      if (parent === 'PROFILE_LIST') {
        if (user?.phone) {
          dispatch(
            userActions.confirmPhoneAsync({
              new_phone: phone,
              phone: user?.phone,
              password: value,
            }),
          );
        }
      } else {
        dispatch(authActions.confirmCodeAsync({password: value, phone}));
      }
      setIsSubmit(true);
    },
    [phoneData, parent],
  );

  const phone = useMemo(() => {
    if (phoneData) {
      return `${phoneData.code} ${phoneData.value}`;
    }

    return '';
  }, [phoneData]);

  return {
    phone,
    time: timeData,
    onSendCode,
    handleSubmit,
    isLoading,
    isSubmit,
  };
};
