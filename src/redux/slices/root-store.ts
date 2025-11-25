import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface RootStoreState {
  auth: boolean;
  accessToken: string | null;
}

const initialState: RootStoreState = {
  auth: false,
  accessToken: null,
};

const rootStoreSlice = createSlice({
  name: 'rootStore',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<RootStoreState['auth']>) {
      state.auth = action.payload;
    },
    setLogout() {
      return initialState;
    },
  },
});

export const {setLogout, setAuth} = rootStoreSlice.actions;

export default rootStoreSlice.reducer;
