import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {authActions} from '@/bus/auth';
import {useDispatch} from 'react-redux';

export const useData = (refCode: string) => {
  const dispatch = useDispatch();

  const login = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            dispatch(authActions.clearPhone());
            dispatch(
              authActions.socialNetworksAsync({
                oauth_token: data.accessToken.toString(),
                provider: 'facebook',
                referral_code: refCode,
              }),
            );
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  return {
    login,
  };
};
