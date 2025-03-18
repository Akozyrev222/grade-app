import {Asset} from 'react-native-image-picker';

export namespace Auth {
  export type ResSignUp = {
    auth_token: string;
  };

  export type AppleCredentials = {
    email: string;
    fullName: string;
  }

  export type SignUpForm = {
    full_name: string;
    email: string;
    phone: string;
    description: string;
    address: string;
    phones_attributes: string[];
    avatar: Asset | null;
  };

  export type ReqSignUp = {
    user: {
      full_name: string;
      email: string;
      description: string;
      address: string;
      phones_attributes: {value: string}[];
      latitude: number | null;
      longitude: number | null;
      executor_attributes?: {
        speciality_ids: number[];
        tags_array: string[];
      };
      avatar: Asset | null;
    };
  };

  export type Phone = {
    code: string;
    value: string;
  };

  export type ReqSendCode = {
    phone: Phone;
    referral_code?: string;
  };
  export type ResSendCode = {
    phone: string;
    success: boolean;
    is_complete: boolean;
  };

  export type ReqConfirmCode = {
    phone: string;
    password: string;
  };

  export type ResConfirmCode = {
    auth_token: string;
    is_complete: boolean;
  };

  export type ReqSocialNetworksLogin = {
    oauth_token: string;
    provider?: string;
    platform?: string;
    mode?: string;
    role?: string;
    referral_code?: string;
  };
}
