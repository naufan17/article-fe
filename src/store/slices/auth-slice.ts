import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  isAuthenticated: boolean;
  role: 'Admin' | 'User' | null;
}

const initialState: AuthState = {
  token: '',
  isAuthenticated: false,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<{ token: string; role: 'Admin' | 'User' | null }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.token = '';
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
