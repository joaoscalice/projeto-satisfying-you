import {createSlice} from '@reduxjs/toolkit';

const initialValues = {
  email: null,
  password: null,
  id: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialValues,
  reducers: {
    reducerSetLogin: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.id = action.payload.id;
    },
    reducerLogout: state => {
      Object.assign(state, {...initialValues});
    },
  },
});

export const {reducerSetLogin, reducerLogout} = loginSlice.actions;

export default loginSlice.reducer;
