import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string }>,
    ) => {
      state.accessToken = action.payload.accessToken;
    //   state.refreshToken = action.payload.refreshToken;
    },
    // setUser: (state, action: PayloadAction<any>) => {
    //   state.user = action.payload;
    // },
    logout: state => {
      state.accessToken = null;
    //   state.refreshToken = null;
    //   state.user = null;
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
