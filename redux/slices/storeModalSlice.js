import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const storeModalSlice = createSlice({
  name: "storeModal",
  initialState: initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = storeModalSlice.actions;

export default storeModalSlice.reducer;
