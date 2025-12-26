import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
  new_customer: boolean;
  auth: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  new_customer: false,
  auth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<{accessToken: string | null; new_customer: boolean;}>) => {
      state.accessToken = action.payload.accessToken;
      state.new_customer = action.payload.new_customer;
      state.auth = true;
    },
    logout: () => initialState,
  },
});

export const {setAccessToken, logout} = authSlice.actions;
export default authSlice.reducer;
