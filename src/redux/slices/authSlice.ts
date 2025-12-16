import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
  auth: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  auth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.auth = true;
    },
    logout: () => initialState,
  },
});

export const {setAccessToken, logout} = authSlice.actions;
export default authSlice.reducer;
