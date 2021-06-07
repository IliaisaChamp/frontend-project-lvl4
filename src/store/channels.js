/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});
export const { getChannels, setCurrentChannelId } = channels.actions;

export default channels.reducer;
