import {configureStore} from '@reduxjs/toolkit';

import {StoreNames} from './config';
import {default as ReceiptReducer} from './reducers/ReceiptReducer';

const store = configureStore({
  reducer: {
    [StoreNames.RECEIPT]: ReceiptReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type StoreState = ReturnType<typeof store.getState>;
