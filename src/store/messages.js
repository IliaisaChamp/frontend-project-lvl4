/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});
export const { getMessages } = messages.actions;

export default messages.reducer;
