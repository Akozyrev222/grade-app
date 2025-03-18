import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {authActions} from '@/bus/auth';
import {useDispatch} from 'react-redux';
import {Platform} from 'react-native';

export const useData = (refCode: string) => {
  const dispatch = useDispatch();

  const login = () => {
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then((userInfo: User) => {
              dispatch(authActions.clearPhone());
              dispatch(
                authActions.socialNetworksAsync({
                  oauth_token: userInfo.idToken,
                  provider: 'google',
                  platform: Platform.OS,
                  referral_code: refCode,
                }),
              );
            })
            .catch((e) => {
              console.log('e', e);
            });
        }
      })
      .catch((e) => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  return {
    login,
  };
};
