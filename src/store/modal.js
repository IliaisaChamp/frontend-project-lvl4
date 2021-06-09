/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpened: false,
  type: null,
  extra: {},
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpened: (state, { payload }) => {
      state.isOpened = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
  },
});
export const { setOpened, setType } = modal.actions;

export default modal.reducer;
