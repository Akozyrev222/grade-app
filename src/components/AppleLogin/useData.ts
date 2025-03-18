import {appleAuth} from '@invertase/react-native-apple-authentication';
import {useEffect} from 'react';
import {authActions} from '@/bus/auth';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export const useData = (refCode: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);


  async function getAppleCredentials(){
    const appleCredentials = await AsyncStorage.getItem('appleCredentials');
    appleCredentials && dispatch(authActions.setAppleCredentials(JSON.parse(appleCredentials)));
  }


  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (appleAuthRequestResponse.identityToken) {
      if (
        appleAuthRequestResponse.fullName?.givenName &&
        appleAuthRequestResponse.fullName?.familyName &&
        appleAuthRequestResponse.email
      ) {
        const fullName =
          appleAuthRequestResponse.fullName?.givenName +
          ' ' +
          appleAuthRequestResponse.fullName?.familyName;

        const appleCredentials = {
          email: appleAuthRequestResponse.email,
          fullName,
        }
        await AsyncStorage.setItem(
          'appleCredentials', JSON.stringify(appleCredentials),
        )
      }

      getAppleCredentials();

      dispatch(authActions.clearPhone());
      dispatch(
        authActions.socialNetworksAsync({
          oauth_token: appleAuthRequestResponse.identityToken,
          provider: 'apple',
          platform: Platform.OS,
          referral_code: refCode,
        }),
      );
    }
  };

  return {
    onAppleButtonPress,
  };
};
