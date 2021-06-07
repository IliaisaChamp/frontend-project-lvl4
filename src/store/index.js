import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';
import messagesReducer from './messages.js';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: { channelsInfo: channelsReducer, messagesInfo: messagesReducer },
  middleware,
  devTools: true,
});

export default store;
