
import appsFlyer from 'react-native-appsflyer';



export enum PAYMENT_EVENTS {
  BUY_TOP_3 = 'Buy Top 3',
  BUY_TOP_7 = 'Buy Top 7',
  BUY_TOP_14 = 'Buy Top 14',
  SUBSCRIBE_30 = 'Subscribe 30',
  SUBSCRIBE_365 = 'Subscribe 365',
}

export enum EVENTS {
  SUCCESSFULL_REG = 'Successful Registration',
  CREATE_ORDER = 'Create Order',
  SEND_MESSAGE = 'Send Message',
  PROFILE_COMPLETED = 'Profile Completed',
  PASS_VERIFICATION = 'Pass Verification',
  USE_PROMOCODE = 'Use Promocode',
}

export const logEvent = (event: EVENTS | PAYMENT_EVENTS, eventValues = {}) => {
  appsFlyer.logEvent(
    event,
    eventValues,
    (res) => {
      console.log('log event:', res);
    },
    (err) => {
      console.error('log event error:', err);
    },
  );
};
