"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { initializeStore } from "@/redux/store";

const ReduxProvider = ({ children }) => {
  const storeRef = useRef();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = initializeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
