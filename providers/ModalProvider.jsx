"use client";

import { useEffect, useState } from "react";
import StoreModal from "@/components/modals/StoreModal";

const ModalProvider = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return <StoreModal />;
};

export default ModalProvider;
