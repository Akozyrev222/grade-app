import {appSelectors} from '@/bus/app';
import {uiActions} from '@/bus/ui';
import {navigate, Routes} from '@/navigation';
import {store} from '@/store';
import {
  LinkingOptions,
  PathConfigMap,
  useNavigation,
} from '@react-navigation/native';
import {useCallback, useMemo} from 'react';
import {Linking} from 'react-native';
import {useDispatch} from 'react-redux';

type TProcessLinkArgs = {
  url: string;
  listener: (url: string) => void;
};

type TConfig = {
  initialRouteName?: Routes;
  screens: PathConfigMap<any>;
};

const CONFIG: TConfig = {
  initialRouteName: Routes.AUTH,
  screens: {
    [Routes.TABS]: {
      screens: {
        [Routes.HOME]: {
          screens: {
            [Routes.EXECUTOR_DETAIL]: {
              path: '/executors/:id',
              parse: {
                id: (id: number) => +id,
              },
            },
          },
        },
      },
    },
  },
};

export const useDeepLinking = () => {
  const dispatch = useDispatch();

  const onProcessLink = useCallback(({url, listener}: TProcessLinkArgs) => {
    try {

      if (matches && matches[1]) {
        const arr = matches[1].split('/');

        if (arr.length) {
          switch (arr[0]) {
            case 'executors': {
              navigate(Routes.EXECUTOR_DETAIL, {id: +arr[1]});

              break;
            }

            case 'customers': {
              navigate(Routes.ORDER_USER, {id: +arr[1]});

              break;
            }
          }
        }
      }
    } catch (error) {
      console.log('error in listener DeepLinking: ', error);
    }
    listener(url);
  }, []);

  const linking: LinkingOptions<any> = useMemo(
    () => ({
      subscribe: (listener) => {
        Linking.addEventListener('url', ({url}) =>
          onProcessLink({url, listener}),
        );

        return () => {
          Linking.removeAllListeners('url');
        };
      },
      config: CONFIG,
    }),
    [onProcessLink],
  );

  return linking;
};
