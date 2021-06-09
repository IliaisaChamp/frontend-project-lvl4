import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';
import messagesReducer from './messages.js';
import modalReducer from './modal.js';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: { channelsInfo: channelsReducer, messagesInfo: messagesReducer, modal: modalReducer },
  middleware,
  devTools: true,
});

export default store;
