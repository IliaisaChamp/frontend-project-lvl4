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
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    updateChannels: (state, { payload }) => {
      const channel = state.channels.find((c) => c.id === payload.id);
      if (channel) {
        channel.name = payload.name;
        channel.id = payload.id;
      }
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter((c) => c.id !== payload.id);
    },
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});
// eslint-disable-next-line max-len
export const { getChannels, setCurrentChannelId, addChannel, updateChannels, removeChannel } = channels.actions;

export default channels.reducer;
