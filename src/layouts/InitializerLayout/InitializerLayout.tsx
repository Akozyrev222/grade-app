import {useConnect} from '@/hooks';
import {SplashScreen} from '@/screens';
import React, {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {AppState} from 'react-native';
import {useData} from './useData';

type TProps = {
  children: ReactNode;
};

const HookInitializer = () => {
  useConnect();
  return <></>;
};

export const InitializerLayout: FC<TProps> = ({children}) => {
  const {initialized} = useData();

  const [isActive, setIsActive] = useState(AppState.currentState === 'active');

  useEffect(() => {
    const listener = AppState.addEventListener('change', (e) => {
      setIsActive(e === 'active');
    });
    return () => {
      listener.remove();
    };
  }, []);

  if (!initialized) {
    return null;
  }

  return (
    <>
      {children}
      {isActive && <HookInitializer />}
    </>
  );
};
