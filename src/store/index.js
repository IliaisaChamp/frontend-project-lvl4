import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: { channels: channelsReducer },
  middleware,
  devTools: true,
});

export default store;
