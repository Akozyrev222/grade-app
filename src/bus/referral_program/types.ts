export enum types {
  FETCH_REFERRALS = 'REFERRALS/FETCH_REFERRALS',
  ACTIVATE_REFERRAL = 'REFERRALS/ACTIVATE_REFERRAL',
}

export type ReferralProgram = {
  acceptable_for_use: boolean;
  amount: number;
  id: number;
  identifier: string;
  referrals_count: number;
  used: boolean;
};

export type ReferralProgramResponse = {
  referral_programs: Array<ReferralProgram>;
  success: boolean;
  message?: string;
};

export type ReferralProgramState = {
  referral_programs_list: Array<ReferralProgram>;
  loading: boolean;
  activateReferralLoading: boolean;
};
