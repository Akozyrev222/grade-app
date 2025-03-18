import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ReferralProgram,
  ReferralProgramState,
} from '@/bus/referral_program/types';
import {types} from './types';

const initialState: ReferralProgramState = {
  referral_programs_list: [],
  loading: false,
  activateReferralLoading: false,
};

const slice = createSlice({
  name: 'Referral_program',
  initialState,
  reducers: {
    setProgramsList: (
      state: ReferralProgramState,
      action: PayloadAction<{referral_programs: ReferralProgram[]}>,
    ) => {
      state.referral_programs_list = action.payload.referral_programs;
      state.loading = false;
    },
    setLoading: (state: ReferralProgramState) => {
      state.loading = true;
    },
    removeLoader: (state: ReferralProgramState) => {
      state.loading = false;
    },
    setActivateReferralLoading: (state: ReferralProgramState) => {
      state.activateReferralLoading = true;
    },
    removeActivateReferralLoader: (state: ReferralProgramState) => {
      state.activateReferralLoading = false;
    },
  },
});

export default slice.reducer;

export const referralProgramActions = {
  ...slice.actions,

  fetchReferrals: () => ({
    type: types.FETCH_REFERRALS,
  }),
  activateReferral: (payload: {id: string}) => ({
    type: types.ACTIVATE_REFERRAL,
    payload,
  }),
};
