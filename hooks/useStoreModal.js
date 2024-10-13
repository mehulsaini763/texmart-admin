import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { close, open } from "@/redux/slices/storeModalSlice";

const useStoreModal = () => {
  const { isOpen } = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(close());
  const onOpen = () => dispatch(open());

  return {
    isOpen,
    onClose,
    onOpen,
  };
};

export default useStoreModal;
