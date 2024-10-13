"use client";

import StoreModal from "@/components/modals/StoreModal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return <StoreModal />;
};

export default ModalProvider;
