import { configureStore } from '@reduxjs/toolkit';
import storeModalReducer from '@/redux/slices/storeModalSlice';

export const initializeStore = () => {
  return configureStore({
    reducer: {
      store: storeModalReducer,
    },
  });
};
