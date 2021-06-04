import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsInfo: {
    channels: [],
  },
};

const channels = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, action) => {
      state.channelsInfo.channels.push(action.payload);
    },
  },
});
export const { getChannels } = channels.actions;

export default channels.reducer;
