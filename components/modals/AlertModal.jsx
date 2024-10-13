'use client';

import { useEffect, useState } from 'react';

import Modal from '../ui/modal';
import { Button } from '../ui/button';

const AlertModal = ({ isOpen, onClose, onConfirm, loading, children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal title="Are you sure?" description="This action cannot be undone." isOpen={isOpen} onClose={onClose}>
      {children}
      <div className="w-full flex items-center gap-2 justify-end">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
