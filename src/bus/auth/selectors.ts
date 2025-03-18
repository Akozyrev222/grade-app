import {RootState} from '@/store/rootReducer';

export const getToken = (state: RootState) => state.auth.token;
export const getPhone = (state: RootState) => state.auth.phone;
export const getRegisterToken = (state: RootState) => state.auth.register_token;

export const getAppleCredentials = (state: RootState) => {
    return {
        email: state.auth.appleEmail,
        fullName: state.auth.appleFullName,
    };
}
